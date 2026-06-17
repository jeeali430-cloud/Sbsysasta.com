-- Sbsysasta.com — Storage bucket for product imagery
-- Run after 0001_init.sql + 0002_seed.sql

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = excluded.public;

-- Public read for everyone (so <Image src> works without signed URLs)
drop policy if exists "product-images public read" on storage.objects;
create policy "product-images public read"
  on storage.objects
  for select
  using (bucket_id = 'product-images');

-- Writes go through the service_role key from the admin server actions,
-- which already bypasses RLS — no INSERT/UPDATE/DELETE policy needed for
-- the public anon key.
