-- Sbsysasta.com — Seed PART A: taxonomy
-- Brands, categories, sub-types, category-brand mapping.
-- Run first (after 0001_init.sql).

-- ---------- Brands ----------

insert into brands (slug, name, blurb) values
  ('samsung',     'Samsung',      'Korean tech, global warranty'),
  ('lg',          'LG',           'Inverter expertise'),
  ('haier',       'Haier',        'Pakistan-assembled, 12-year compressor'),
  ('dawlance',    'Dawlance',     'Pakistans trusted refrigerator brand'),
  ('orient',      'Orient',       'Local manufacturing, value pricing'),
  ('pel',         'PEL',          'Heritage Pakistani appliance brand'),
  ('tcl',         'TCL',          'Smart TVs at honest prices'),
  ('gree',        'Gree',         'Worlds largest AC manufacturer'),
  ('ecostar',     'EcoStar',      'Affordable LED TVs'),
  ('westpoint',   'Westpoint',    'Kitchen appliance specialist'),
  ('national',    'National',     'Trusted home brand'),
  ('anex',        'Anex',         'Affordable small appliances'),
  ('black-decker','Black & Decker','American power kitchen brand')
on conflict (slug) do update set
  name = excluded.name,
  blurb = excluded.blurb;

-- ---------- Categories ----------

insert into categories (slug, seo_slug, name, description, position) values
  ('led-tvs',              'led-tvs-price-in-lahore',                'LED & Smart TVs',
   '4K UHD, QLED & Android Smart TVs from Samsung, TCL, Haier and more - with same-day delivery in Lahore.', 1),
  ('refrigerators',        'refrigerators-price-in-pakistan',        'Refrigerators',
   'Inverter, no-frost and side-by-side refrigerators with full brand warranty and free Lahore delivery.', 2),
  ('air-conditioners',     'air-conditioners-price-in-pakistan',     'Air Conditioners',
   'Inverter and floor-standing ACs - 1 ton, 1.5 ton, 2 ton. Heat & cool. Installation available in Lahore.', 3),
  ('washing-machines',     'washing-machines-price-in-lahore',       'Washing Machines',
   'Front load, top load and twin tub washing machines from trusted Pakistani and global brands.', 4),
  ('microwave-ovens',      'microwave-ovens-price-in-pakistan',      'Microwave & Ovens',
   'Microwave ovens, baking ovens and air fryers - perfect for everyday Lahore kitchens.', 5),
  ('kitchen-appliances',   'kitchen-appliances-price-in-pakistan',   'Kitchen Appliances',
   'Blenders, juicers, kettles, sandwich makers, food factories - small appliances for the daily rasoi.', 6)
on conflict (slug) do update set
  seo_slug = excluded.seo_slug,
  name = excluded.name,
  description = excluded.description,
  position = excluded.position;

-- ---------- Sub-types ----------

insert into sub_types (category_id, slug, name)
select c.id, st.slug, st.name
from categories c
join (values
  ('led-tvs',          '32-43-inch',         '32-43 inch'),
  ('led-tvs',          '50-55-inch',         '50-55 inch'),
  ('led-tvs',          '65-inch-and-above',  '65 inch and above'),
  ('led-tvs',          'qled',               'QLED'),
  ('led-tvs',          'android-tv',         'Android TV'),
  ('refrigerators',    'single-door',        'Single Door'),
  ('refrigerators',    'double-door',        'Double Door'),
  ('refrigerators',    'side-by-side',       'Side-by-Side'),
  ('refrigerators',    'inverter',           'Inverter'),
  ('air-conditioners', 'inverter-ac',        'Inverter AC'),
  ('air-conditioners', 'floor-standing',     'Floor Standing'),
  ('air-conditioners', '1-ton',              '1 Ton'),
  ('air-conditioners', '1-5-ton',            '1.5 Ton'),
  ('air-conditioners', '2-ton',              '2 Ton'),
  ('washing-machines', 'front-load',         'Front Load'),
  ('washing-machines', 'top-load-automatic', 'Top Load Automatic'),
  ('washing-machines', 'twin-tub',           'Twin Tub / Semi-Auto'),
  ('washing-machines', 'washer-dryer',       'Washer + Dryer'),
  ('microwave-ovens',  'solo-microwave',     'Solo Microwave'),
  ('microwave-ovens',  'grill-microwave',    'Grill Microwave'),
  ('microwave-ovens',  'convection-baking',  'Convection / Baking'),
  ('microwave-ovens',  'air-fryers',         'Air Fryers'),
  ('kitchen-appliances','blenders-juicers',  'Blenders & Juicers'),
  ('kitchen-appliances','kettles',           'Kettles'),
  ('kitchen-appliances','sandwich-makers',   'Sandwich Makers'),
  ('kitchen-appliances','food-factory',      'Food Factory')
) as st (cat_slug, slug, name) on st.cat_slug = c.slug
on conflict (category_id, slug) do update set name = excluded.name;

-- ---------- Category to Brand mapping ----------

insert into category_brands (category_id, brand_id)
select c.id, b.id
from (values
  ('led-tvs',           'samsung'),
  ('led-tvs',           'tcl'),
  ('led-tvs',           'haier'),
  ('led-tvs',           'ecostar'),
  ('led-tvs',           'lg'),
  ('refrigerators',     'dawlance'),
  ('refrigerators',     'haier'),
  ('refrigerators',     'pel'),
  ('refrigerators',     'samsung'),
  ('refrigerators',     'lg'),
  ('refrigerators',     'orient'),
  ('air-conditioners',  'gree'),
  ('air-conditioners',  'haier'),
  ('air-conditioners',  'dawlance'),
  ('air-conditioners',  'orient'),
  ('air-conditioners',  'pel'),
  ('air-conditioners',  'tcl'),
  ('washing-machines',  'haier'),
  ('washing-machines',  'dawlance'),
  ('washing-machines',  'samsung'),
  ('washing-machines',  'lg'),
  ('washing-machines',  'pel'),
  ('microwave-ovens',   'dawlance'),
  ('microwave-ovens',   'haier'),
  ('microwave-ovens',   'pel'),
  ('microwave-ovens',   'samsung'),
  ('microwave-ovens',   'orient'),
  ('kitchen-appliances','westpoint'),
  ('kitchen-appliances','national'),
  ('kitchen-appliances','anex'),
  ('kitchen-appliances','black-decker'),
  ('kitchen-appliances','orient')
) as m (cat_slug, brand_slug)
join categories c on c.slug = m.cat_slug
join brands     b on b.slug = m.brand_slug
on conflict do nothing;
