-- Sbsysasta.com — seed data
-- Mirrors src/data/{categories,brands,products,coupons}.ts
-- Safe to re-run: every insert is upserted by primary/unique key.

-- ---------- Brands ----------

insert into brands (slug, name, blurb) values
  ('samsung',     'Samsung',      'Korean tech, global warranty'),
  ('lg',          'LG',           'Inverter expertise'),
  ('haier',       'Haier',        'Pakistan-assembled, 12-year compressor'),
  ('dawlance',    'Dawlance',     'Pakistan''s trusted refrigerator brand'),
  ('orient',      'Orient',       'Local manufacturing, value pricing'),
  ('pel',         'PEL',          'Heritage Pakistani appliance brand'),
  ('tcl',         'TCL',          'Smart TVs at honest prices'),
  ('gree',        'Gree',         'World''s largest AC manufacturer'),
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
   '4K UHD, QLED & Android Smart TVs from Samsung, TCL, Haier and more — with same-day delivery in Lahore.', 1),
  ('refrigerators',        'refrigerators-price-in-pakistan',        'Refrigerators',
   'Inverter, no-frost and side-by-side refrigerators with full brand warranty and free Lahore delivery.', 2),
  ('air-conditioners',     'air-conditioners-price-in-pakistan',     'Air Conditioners',
   'Inverter and floor-standing ACs — 1 ton, 1.5 ton, 2 ton. Heat & cool. Installation available in Lahore.', 3),
  ('washing-machines',     'washing-machines-price-in-lahore',       'Washing Machines',
   'Front load, top load and twin tub washing machines from trusted Pakistani and global brands.', 4),
  ('microwave-ovens',      'microwave-ovens-price-in-pakistan',      'Microwave & Ovens',
   'Microwave ovens, baking ovens and air fryers — perfect for everyday Lahore kitchens.', 5),
  ('kitchen-appliances',   'kitchen-appliances-price-in-pakistan',   'Kitchen Appliances',
   'Blenders, juicers, kettles, sandwich makers, food factories — small appliances for the daily rasoi.', 6)
on conflict (slug) do update set
  seo_slug = excluded.seo_slug,
  name = excluded.name,
  description = excluded.description,
  position = excluded.position;

-- ---------- Sub-types ----------

with cat as (select id, slug from categories)
insert into sub_types (category_id, slug, name)
select cat.id, st.slug, st.name from cat
join (values
  ('led-tvs',          '32-43-inch',         '32-43 inch'),
  ('led-tvs',          '50-55-inch',         '50-55 inch'),
  ('led-tvs',          '65-inch-and-above',  '65 inch & above'),
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
) as st (cat_slug, slug, name) on st.cat_slug = cat.slug
on conflict (category_id, slug) do update set name = excluded.name;

-- ---------- Category ↔ Brand mapping ----------

with mapping as (
  select * from (values
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
  ) as t (cat_slug, brand_slug)
)
insert into category_brands (category_id, brand_id)
select c.id, b.id
from mapping m
join categories c on c.slug = m.cat_slug
join brands     b on b.slug = m.brand_slug
on conflict do nothing;

-- ---------- Products ----------

-- Helper: each insert is wrapped to attach brand_id / category_id by slug.
-- Pattern: insert ... select c.id, b.id, ... from categories c, brands b where c.slug = ... and b.slug = ...

insert into products (
  id, slug, title,
  brand_id, brand_name,
  category_id, sub_type_slug,
  price, original_price, installment_from,
  image, gallery, highlights, description, specs,
  rating_value, rating_count,
  in_stock, warranty, bundle_with, badges
)
select
  'p-001',
  'haier-1-5-ton-inverter-ac-hsu-18hfcf',
  'Haier 1.5 Ton Inverter AC — HSU-18HFCF (Heat & Cool)',
  b.id, 'Haier',
  c.id, 'inverter-ac',
  189500, 215000, 9475,
  'https://images.unsplash.com/photo-1631545806609-e1cb04b7d908?w=900&q=85&auto=format&fit=crop',
  '["https://images.unsplash.com/photo-1631545806609-e1cb04b7d908?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1581275234363-2e7c1edd6d99?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1614633833026-0820552978b8?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1615873968403-89e068629265?w=900&q=85&auto=format&fit=crop"]'::jsonb,
  '["DC Inverter — up to 60% power saving","Heat & Cool, T3 compressor for Lahore summers","10-year compressor warranty","Self-clean & turbo cool modes"]'::jsonb,
  'Built for the Lahore climate, the Haier HSU-18HFCF runs a DC inverter compressor that throttles smoothly between 30% and 110% capacity instead of cycling on and off. In a typical 12x14 ft room, you get a noticeably cooler room in under 90 seconds on Turbo Cool, then drop into a near-silent steady state that holds the set temperature within ±0.5 °C. The T3 compressor is rated to keep cooling output stable up to 55 °C ambient — exactly what Lahore needs in June. The self-clean cycle dries the evaporator after every session to keep that musty smell away. Comes with copper piping, brand-original installation kit, and 1-year unit + 10-year compressor warranty.',
  '[{"label":"Capacity","value":"1.5 Ton (18,000 BTU)"},{"label":"Type","value":"Split, DC Inverter"},{"label":"Mode","value":"Heat & Cool"},{"label":"Compressor","value":"T3 Rotary, Copper"},{"label":"Energy efficiency","value":"EER 3.5 — A++"},{"label":"Refrigerant","value":"R-410A"},{"label":"Noise level","value":"26 dB indoor / 54 dB outdoor"},{"label":"Installation","value":"Free in Lahore"}]'::jsonb,
  4.7, 138,
  true, '1 year unit, 10 years compressor',
  array['p-002','p-006'], array['featured','deal']
from brands b, categories c
where b.slug = 'haier' and c.slug = 'air-conditioners'
on conflict (id) do update set
  title = excluded.title, price = excluded.price, original_price = excluded.original_price;

insert into products (
  id, slug, title, brand_id, brand_name, category_id, sub_type_slug,
  price, original_price, installment_from,
  image, gallery, highlights, description, specs,
  rating_value, rating_count, in_stock, warranty, bundle_with, badges
)
select
  'p-002',
  'samsung-55-inch-crystal-uhd-4k-tv-cu7000',
  'Samsung 55" Crystal UHD 4K Smart TV — CU7000',
  b.id, 'Samsung',
  c.id, '50-55-inch',
  142000, 159000, 7100,
  'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=900&q=85&auto=format&fit=crop',
  '["https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1467293622093-9f15c96be70f?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1461151304267-38535e780c79?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1601944179066-29786cb9d32a?w=900&q=85&auto=format&fit=crop"]'::jsonb,
  '["4K UHD with PurColor & HDR10+","Tizen Smart TV — Netflix, YouTube, Tapmad pre-installed","Object Tracking Sound Lite","Official Samsung Pakistan warranty"]'::jsonb,
  'Samsung''s CU7000 is the safe pick for a 55-inch family TV in Lahore — Crystal Processor 4K upscales local cable and YouTube content to near-native UHD, and HDR10+ keeps PSL matches and Netflix dramas looking punchy without crushing the blacks. Tizen OS is faster than most Android TVs in this price range, and the bundled remote has dedicated Netflix, Prime, YouTube and Tapmad keys. Eligible for Samsung Pakistan service across all major cities.',
  '[{"label":"Screen size","value":"55\" (139 cm)"},{"label":"Resolution","value":"3840 × 2160 (4K UHD)"},{"label":"Panel","value":"Crystal Display, LED-backlit"},{"label":"HDR","value":"HDR10+, HLG"},{"label":"OS","value":"Tizen Smart TV"},{"label":"HDMI / USB","value":"3 × HDMI, 1 × USB"},{"label":"Sound","value":"20W, Object Tracking Sound Lite"},{"label":"Wi-Fi / Bluetooth","value":"Wi-Fi 5, Bluetooth 5.2"}]'::jsonb,
  4.6, 92,
  true, '2 years panel, 1 year parts',
  array['p-001','p-008'], array['bestseller']
from brands b, categories c
where b.slug = 'samsung' and c.slug = 'led-tvs'
on conflict (id) do update set title = excluded.title, price = excluded.price;

insert into products (
  id, slug, title, brand_id, brand_name, category_id, sub_type_slug,
  price, original_price, installment_from,
  image, gallery, highlights, description, specs,
  rating_value, rating_count, in_stock, warranty, bundle_with, badges
)
select
  'p-003',
  'dawlance-double-door-refrigerator-9173-wb-avante',
  'Dawlance Double Door Refrigerator — 9173 WB Avante+',
  b.id, 'Dawlance',
  c.id, 'double-door',
  134900, 149900, 6745,
  'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=900&q=85&auto=format&fit=crop',
  '["https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1536353284924-9220c464e262?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1584568694244-14fbdf83bd02?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=900&q=85&auto=format&fit=crop"]'::jsonb,
  '["Inverter compressor — low electricity bills","14 cu ft — perfect for a family of 5","Tempered glass shelves & vegetable crisper","12-year compressor warranty"]'::jsonb,
  'Dawlance''s Avante+ 9173 WB is the workhorse refrigerator in most Lahore households — built locally, parts available everywhere, and an inverter compressor that drops monthly running cost by ~30% versus the older non-inverter Avante. The 14 cu ft layout gives you a properly tall freezer for 2-litre bottles and a humidity-controlled crisper that keeps vegetables fresh for a real week, not just three days.',
  '[{"label":"Capacity","value":"14 cu ft (398 L)"},{"label":"Type","value":"Double door, top freezer"},{"label":"Compressor","value":"Inverter, copper coil"},{"label":"Cooling","value":"Direct cool"},{"label":"Shelves","value":"Tempered glass × 3"},{"label":"Dimensions","value":"1610 × 622 × 660 mm"},{"label":"Voltage stabilizer","value":"Built-in, 140–260 V"},{"label":"Made in","value":"Pakistan (Dawlance Karachi)"}]'::jsonb,
  4.8, 211,
  true, '1 year unit, 12 years compressor',
  array['p-006','p-008'], array['bestseller','deal']
from brands b, categories c
where b.slug = 'dawlance' and c.slug = 'refrigerators'
on conflict (id) do update set title = excluded.title, price = excluded.price;

insert into products (
  id, slug, title, brand_id, brand_name, category_id, sub_type_slug,
  price, original_price, installment_from,
  image, gallery, highlights, description, specs,
  rating_value, rating_count, in_stock, warranty, bundle_with, badges
)
select
  'p-004',
  'haier-front-load-washing-machine-hwm-80-bp10829',
  'Haier Front Load Washing Machine — 8kg HWM-80-BP10829',
  b.id, 'Haier',
  c.id, 'front-load',
  109500, 119500, 5475,
  'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=900&q=85&auto=format&fit=crop',
  '["https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=900&q=85&auto=format&fit=crop"]'::jsonb,
  '["8 kg capacity, inverter direct motor","16 wash programs, child lock","Pillow Drum — gentle on fabric","1200 RPM spin"]'::jsonb,
  'Haier''s HWM-80-BP10829 fits an 8 kg load — enough for a family-size kameez set plus bed sheets — and the inverter direct-drive motor cuts vibration so much that you can stack a basket on top without it walking. 16 programs include a Lahore-friendly ''Heavy Duty'' that handles dust and motorcycle exhaust grime on khadi and cotton without bleaching the colour.',
  '[{"label":"Capacity","value":"8 kg"},{"label":"Type","value":"Front load, fully automatic"},{"label":"Motor","value":"Inverter direct drive"},{"label":"Spin speed","value":"1200 RPM"},{"label":"Programs","value":"16, with child lock"},{"label":"Energy rating","value":"A++"},{"label":"Water connection","value":"Cold inlet"},{"label":"Dimensions","value":"850 × 595 × 540 mm"}]'::jsonb,
  4.6, 78,
  true, '1 year unit, 10 years motor',
  array['p-003'], array['new']
from brands b, categories c
where b.slug = 'haier' and c.slug = 'washing-machines'
on conflict (id) do update set title = excluded.title, price = excluded.price;

insert into products (
  id, slug, title, brand_id, brand_name, category_id, sub_type_slug,
  price, original_price, installment_from,
  image, gallery, highlights, description, specs,
  rating_value, rating_count, in_stock, warranty, bundle_with, badges
)
select
  'p-005',
  'tcl-43-inch-android-smart-tv-43s5400',
  'TCL 43" Android Smart TV — 43S5400',
  b.id, 'TCL',
  c.id, '32-43-inch',
  64500, 72000, 3225,
  'https://images.unsplash.com/photo-1467293622093-9f15c96be70f?w=900&q=85&auto=format&fit=crop',
  '["https://images.unsplash.com/photo-1467293622093-9f15c96be70f?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1461151304267-38535e780c79?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1601944179066-29786cb9d32a?w=900&q=85&auto=format&fit=crop"]'::jsonb,
  '["Android 11 — Play Store apps","Google Assistant voice remote","Dolby Audio","Chromecast built-in"]'::jsonb,
  'TCL''s 43S5400 is the practical Android TV for a second bedroom or drawing room — you get Play Store apps, voice search, and Chromecast for around half the price of the equivalent Samsung. Picture quality is good for SD cable and HD streaming; for true 4K you''ll want a larger panel. Excellent for the price point.',
  '[{"label":"Screen size","value":"43\" (108 cm)"},{"label":"Resolution","value":"1920 × 1080 (Full HD)"},{"label":"Panel","value":"LED, IPS-like"},{"label":"OS","value":"Android 11 TV"},{"label":"HDMI / USB","value":"2 × HDMI, 1 × USB"},{"label":"Voice control","value":"Google Assistant"},{"label":"Sound","value":"16W, Dolby Audio"},{"label":"Wi-Fi","value":"Wi-Fi 5, Bluetooth"}]'::jsonb,
  4.4, 56,
  true, '1 year panel, 1 year parts',
  array['p-008'], array['deal']
from brands b, categories c
where b.slug = 'tcl' and c.slug = 'led-tvs'
on conflict (id) do update set title = excluded.title, price = excluded.price;

insert into products (
  id, slug, title, brand_id, brand_name, category_id, sub_type_slug,
  price, original_price, installment_from,
  image, gallery, highlights, description, specs,
  rating_value, rating_count, in_stock, warranty, bundle_with, badges
)
select
  'p-006',
  'dawlance-microwave-oven-dw-115-cg',
  'Dawlance Microwave Oven — DW-115 CG (Grill)',
  b.id, 'Dawlance',
  c.id, 'grill-microwave',
  28900, 32500, 1445,
  'https://images.unsplash.com/photo-1574269910231-bc508bcb73e0?w=900&q=85&auto=format&fit=crop',
  '["https://images.unsplash.com/photo-1574269910231-bc508bcb73e0?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1585515320310-259814833e62?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85&auto=format&fit=crop"]'::jsonb,
  '["20L capacity with grill function","Press-key control, child lock","Easy-clean cavity","5 power levels"]'::jsonb,
  'Dawlance''s DW-115 CG is a no-nonsense 20-litre grill microwave that handles everyday reheating, defrosting, and chicken tikka grill on the side rack. The cavity wipes clean with a damp cloth — important if you reheat a lot of biryani — and the press-key control is more reliable long-term than the rotating dial on cheaper imports.',
  '[{"label":"Capacity","value":"20 litres"},{"label":"Type","value":"Grill microwave"},{"label":"Power","value":"700W microwave, 1000W grill"},{"label":"Control","value":"Press-key (membrane), child lock"},{"label":"Power levels","value":"5"},{"label":"Cavity","value":"Easy-clean enamel"},{"label":"Timer","value":"Up to 30 minutes"},{"label":"Dimensions","value":"440 × 257 × 358 mm"}]'::jsonb,
  4.5, 41,
  true, '1 year',
  array['p-003'], array['new']
from brands b, categories c
where b.slug = 'dawlance' and c.slug = 'microwave-ovens'
on conflict (id) do update set title = excluded.title, price = excluded.price;

insert into products (
  id, slug, title, brand_id, brand_name, category_id, sub_type_slug,
  price, original_price, installment_from,
  image, gallery, highlights, description, specs,
  rating_value, rating_count, in_stock, warranty, bundle_with, badges
)
select
  'p-007',
  'gree-1-ton-inverter-ac-gs-12pith11w',
  'Gree 1 Ton Inverter AC — GS-12PITH11W Pular',
  b.id, 'Gree',
  c.id, '1-ton',
  154900, 169000, 7745,
  'https://images.unsplash.com/photo-1581275234363-2e7c1edd6d99?w=900&q=85&auto=format&fit=crop',
  '["https://images.unsplash.com/photo-1581275234363-2e7c1edd6d99?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1631545806609-e1cb04b7d908?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1614633833026-0820552978b8?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1615873968403-89e068629265?w=900&q=85&auto=format&fit=crop"]'::jsonb,
  '["Inverter compressor — up to 65% power saving","Wi-Fi enabled, Gree+ app control","Heat & cool, T3 ready","Golden fin condenser"]'::jsonb,
  'Gree is the world''s largest AC manufacturer for a reason — and the Pular GS-12PITH11W is their take on a reliable 1-ton inverter for a 10×12 ft room. T3-ready means it''ll keep cooling at 50 °C+ ambient, which is the cliff cheaper imports fall off in May. Wi-Fi control through Gree+ lets you switch it on 15 minutes before you reach home from work.',
  '[{"label":"Capacity","value":"1 Ton (12,000 BTU)"},{"label":"Type","value":"Split, DC Inverter"},{"label":"Mode","value":"Heat & Cool"},{"label":"Compressor","value":"T3 Rotary, copper"},{"label":"Wi-Fi","value":"Yes, Gree+ app (iOS / Android)"},{"label":"Refrigerant","value":"R-410A"},{"label":"Condenser","value":"Golden fin (corrosion resistant)"},{"label":"Noise level","value":"27 dB indoor"}]'::jsonb,
  4.5, 64,
  true, '1 year unit, 10 years compressor',
  array['p-002'], array[]::text[]
from brands b, categories c
where b.slug = 'gree' and c.slug = 'air-conditioners'
on conflict (id) do update set title = excluded.title, price = excluded.price;

insert into products (
  id, slug, title, brand_id, brand_name, category_id, sub_type_slug,
  price, original_price, installment_from,
  image, gallery, highlights, description, specs,
  rating_value, rating_count, in_stock, warranty, bundle_with, badges
)
select
  'p-008',
  'westpoint-blender-grinder-wf-9293',
  'Westpoint Blender Grinder Mixer — WF-9293',
  b.id, 'Westpoint',
  c.id, 'blenders-juicers',
  11500, 13800, 575,
  'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=900&q=85&auto=format&fit=crop',
  '["https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1585515320310-259814833e62?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1574269910231-bc508bcb73e0?w=900&q=85&auto=format&fit=crop"]'::jsonb,
  '["3-in-1 blender, grinder, mill","Stainless steel blades","1 year replacement warranty","350W motor"]'::jsonb,
  'Westpoint''s WF-9293 covers the three jars every Pakistani kitchen needs — a blender for lassi and smoothies, a chutney jar for masala and ginger-garlic paste, and a dry mill jar for haldi, dhania and garam masala. The stainless steel blades hold their edge much longer than the imported plastic-bodied units in this price range.',
  '[{"label":"Motor","value":"350W"},{"label":"Jars","value":"Blender 1.25L, chutney 0.4L, mill 0.3L"},{"label":"Blades","value":"Stainless steel"},{"label":"Speeds","value":"2 + pulse"},{"label":"Body","value":"ABS plastic with metal trim"},{"label":"Cord length","value":"1.2 m"},{"label":"Voltage","value":"220V / 50Hz"}]'::jsonb,
  4.3, 124,
  true, '1 year replacement',
  array[]::text[], array['deal']
from brands b, categories c
where b.slug = 'westpoint' and c.slug = 'kitchen-appliances'
on conflict (id) do update set title = excluded.title, price = excluded.price;

-- ---------- Coupons ----------

insert into coupons (code, type, value, label, active) values
  ('WELCOME10', 'percent',      10,   '10% off your first order',    true),
  ('LAHORE2K',  'flat',         2000, '₨ 2,000 off any order',       true),
  ('FREESHIP',  'freeDelivery', 0,    'Free delivery, any city',     true)
on conflict (code) do update set
  type = excluded.type,
  value = excluded.value,
  label = excluded.label,
  active = excluded.active;
