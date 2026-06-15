-- Sbsysasta.com — schema bootstrap
-- Run inside Supabase SQL editor (or `supabase db push`).

create extension if not exists pgcrypto;

-- ---------- Catalog ----------

create table if not exists categories (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  seo_slug    text unique not null,
  name        text not null,
  description text,
  position    int  default 0,
  created_at  timestamptz default now()
);

create table if not exists sub_types (
  id          uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id) on delete cascade,
  slug        text not null,
  name        text not null,
  unique (category_id, slug)
);

create table if not exists brands (
  id    uuid primary key default gen_random_uuid(),
  slug  text unique not null,
  name  text not null,
  blurb text
);

create table if not exists category_brands (
  category_id uuid references categories(id) on delete cascade,
  brand_id    uuid references brands(id)     on delete cascade,
  primary key (category_id, brand_id)
);

create table if not exists products (
  id               text primary key,           -- 'p-001' etc preserved from seed
  slug             text unique not null,
  title            text not null,
  brand_id         uuid references brands(id),
  brand_name       text not null,
  category_id      uuid references categories(id),
  sub_type_slug    text,
  price            int not null,
  original_price   int,
  installment_from int,
  image            text not null,
  gallery          jsonb,
  highlights       jsonb,
  description      text,
  specs            jsonb,
  rating_value     numeric(3,1),
  rating_count     int default 0,
  in_stock         boolean default true,
  warranty         text,
  bundle_with      text[] default array[]::text[],
  badges           text[] default array[]::text[],
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- ---------- Commerce ----------

create table if not exists customers (
  id         uuid primary key default gen_random_uuid(),
  email      text,
  phone      text not null,
  name       text not null,
  created_at timestamptz default now()
);

create table if not exists orders (
  id              text primary key,            -- 'SBS-XXXX' from client
  customer_id     uuid references customers(id),
  customer_name   text not null,
  customer_phone  text not null,
  customer_email  text,
  address         text not null,
  city            text not null,
  region          text not null check (region in ('lahore','nationwide')),
  payment_method  text not null check (payment_method in ('cod','jazzcash','easypaisa','bank','card')),
  coupon_code     text,
  subtotal        int not null,
  discount        int default 0,
  delivery        int default 0,
  total           int not null,
  status          text not null default 'pending'
    check (status in ('pending','confirmed','shipped','delivered','cancelled')),
  notes           text,
  items           jsonb not null,
  placed_at       timestamptz default now()
);

create table if not exists coupons (
  code       text primary key,
  type       text not null check (type in ('percent','flat','freeDelivery')),
  value      int not null default 0,
  label      text not null,
  active     boolean default true,
  expires_at timestamptz
);

create table if not exists reviews (
  id            uuid primary key default gen_random_uuid(),
  product_id    text references products(id) on delete cascade,
  customer_name text not null,
  rating        int not null check (rating between 1 and 5),
  title         text,
  body          text,
  city          text,
  status        text not null default 'pending' check (status in ('pending','approved','hidden')),
  created_at    timestamptz default now()
);

-- ---------- Indexes ----------

create index if not exists idx_products_category on products (category_id);
create index if not exists idx_products_brand    on products (brand_id);
create index if not exists idx_products_badges   on products using gin (badges);
create index if not exists idx_orders_placed     on orders (placed_at desc);
create index if not exists idx_orders_status     on orders (status);
create index if not exists idx_reviews_product   on reviews (product_id, status);

-- ---------- RLS ----------

alter table categories     enable row level security;
alter table sub_types      enable row level security;
alter table brands         enable row level security;
alter table category_brands enable row level security;
alter table products       enable row level security;
alter table coupons        enable row level security;
alter table reviews        enable row level security;
alter table customers      enable row level security;
alter table orders         enable row level security;

-- Public catalog reads
create policy "public read categories"      on categories      for select using (true);
create policy "public read sub_types"       on sub_types       for select using (true);
create policy "public read brands"          on brands          for select using (true);
create policy "public read category_brands" on category_brands for select using (true);
create policy "public read products"        on products        for select using (true);
create policy "public read active coupons"  on coupons         for select using (active = true);
create policy "public read approved reviews" on reviews        for select using (status = 'approved');

-- Guest checkout — anyone may insert their own customer row & order
create policy "public insert customers" on customers for insert with check (true);
create policy "public insert orders"    on orders    for insert with check (true);

-- (No public select on customers / orders — admin reads via service role key only.)

-- ---------- Helpers ----------

create or replace function touch_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_touch_updated_at on products;
create trigger products_touch_updated_at
  before update on products
  for each row execute function touch_updated_at();
