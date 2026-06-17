-- Sbsysasta.com — Seed PART B: products 1-4
-- Run AFTER 0002a_seed_taxonomy.sql.

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
  'Haier 1.5 Ton Inverter AC - HSU-18HFCF (Heat and Cool)',
  b.id, 'Haier',
  c.id, 'inverter-ac',
  189500, 215000, 9475,
  'https://images.unsplash.com/photo-1631545806609-e1cb04b7d908?w=900&q=85&auto=format&fit=crop',
  '["https://images.unsplash.com/photo-1631545806609-e1cb04b7d908?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1581275234363-2e7c1edd6d99?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1614633833026-0820552978b8?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1615873968403-89e068629265?w=900&q=85&auto=format&fit=crop"]'::jsonb,
  '["DC Inverter - up to 60% power saving","Heat and Cool, T3 compressor for Lahore summers","10-year compressor warranty","Self-clean and turbo cool modes"]'::jsonb,
  'Built for the Lahore climate, the Haier HSU-18HFCF runs a DC inverter compressor that throttles smoothly between 30 and 110 percent capacity instead of cycling on and off. In a typical 12x14 ft room, you get a noticeably cooler room in under 90 seconds on Turbo Cool, then drop into a near-silent steady state that holds the set temperature within 0.5 C. The T3 compressor is rated to keep cooling output stable up to 55 C ambient - exactly what Lahore needs in June. The self-clean cycle dries the evaporator after every session to keep that musty smell away. Comes with copper piping, brand-original installation kit, and 1-year unit plus 10-year compressor warranty.',
  '[{"label":"Capacity","value":"1.5 Ton (18,000 BTU)"},{"label":"Type","value":"Split, DC Inverter"},{"label":"Mode","value":"Heat and Cool"},{"label":"Compressor","value":"T3 Rotary, Copper"},{"label":"Energy efficiency","value":"EER 3.5 - A++"},{"label":"Refrigerant","value":"R-410A"},{"label":"Noise level","value":"26 dB indoor / 54 dB outdoor"},{"label":"Installation","value":"Free in Lahore"}]'::jsonb,
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
  'Samsung 55 inch Crystal UHD 4K Smart TV - CU7000',
  b.id, 'Samsung',
  c.id, '50-55-inch',
  142000, 159000, 7100,
  'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=900&q=85&auto=format&fit=crop',
  '["https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1467293622093-9f15c96be70f?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1461151304267-38535e780c79?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1601944179066-29786cb9d32a?w=900&q=85&auto=format&fit=crop"]'::jsonb,
  '["4K UHD with PurColor and HDR10+","Tizen Smart TV - Netflix, YouTube, Tapmad pre-installed","Object Tracking Sound Lite","Official Samsung Pakistan warranty"]'::jsonb,
  'Samsung CU7000 is the safe pick for a 55-inch family TV in Lahore - Crystal Processor 4K upscales local cable and YouTube content to near-native UHD, and HDR10+ keeps PSL matches and Netflix dramas looking punchy without crushing the blacks. Tizen OS is faster than most Android TVs in this price range, and the bundled remote has dedicated Netflix, Prime, YouTube and Tapmad keys. Eligible for Samsung Pakistan service across all major cities.',
  '[{"label":"Screen size","value":"55 inch (139 cm)"},{"label":"Resolution","value":"3840 x 2160 (4K UHD)"},{"label":"Panel","value":"Crystal Display, LED-backlit"},{"label":"HDR","value":"HDR10+, HLG"},{"label":"OS","value":"Tizen Smart TV"},{"label":"HDMI / USB","value":"3 x HDMI, 1 x USB"},{"label":"Sound","value":"20W, Object Tracking Sound Lite"},{"label":"Wi-Fi / Bluetooth","value":"Wi-Fi 5, Bluetooth 5.2"}]'::jsonb,
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
  'Dawlance Double Door Refrigerator - 9173 WB Avante+',
  b.id, 'Dawlance',
  c.id, 'double-door',
  134900, 149900, 6745,
  'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=900&q=85&auto=format&fit=crop',
  '["https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1536353284924-9220c464e262?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1584568694244-14fbdf83bd02?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=900&q=85&auto=format&fit=crop"]'::jsonb,
  '["Inverter compressor - low electricity bills","14 cu ft - perfect for a family of 5","Tempered glass shelves and vegetable crisper","12-year compressor warranty"]'::jsonb,
  'Dawlance Avante+ 9173 WB is the workhorse refrigerator in most Lahore households - built locally, parts available everywhere, and an inverter compressor that drops monthly running cost by 30 percent versus the older non-inverter Avante. The 14 cu ft layout gives you a properly tall freezer for 2-litre bottles and a humidity-controlled crisper that keeps vegetables fresh for a real week, not just three days.',
  '[{"label":"Capacity","value":"14 cu ft (398 L)"},{"label":"Type","value":"Double door, top freezer"},{"label":"Compressor","value":"Inverter, copper coil"},{"label":"Cooling","value":"Direct cool"},{"label":"Shelves","value":"Tempered glass x 3"},{"label":"Dimensions","value":"1610 x 622 x 660 mm"},{"label":"Voltage stabilizer","value":"Built-in, 140-260 V"},{"label":"Made in","value":"Pakistan (Dawlance Karachi)"}]'::jsonb,
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
  'Haier Front Load Washing Machine - 8kg HWM-80-BP10829',
  b.id, 'Haier',
  c.id, 'front-load',
  109500, 119500, 5475,
  'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=900&q=85&auto=format&fit=crop',
  '["https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=900&q=85&auto=format&fit=crop"]'::jsonb,
  '["8 kg capacity, inverter direct motor","16 wash programs, child lock","Pillow Drum - gentle on fabric","1200 RPM spin"]'::jsonb,
  'Haier HWM-80-BP10829 fits an 8 kg load - enough for a family-size kameez set plus bed sheets - and the inverter direct-drive motor cuts vibration so much that you can stack a basket on top without it walking. 16 programs include a Lahore-friendly Heavy Duty mode that handles dust and motorcycle exhaust grime on khadi and cotton without bleaching the colour.',
  '[{"label":"Capacity","value":"8 kg"},{"label":"Type","value":"Front load, fully automatic"},{"label":"Motor","value":"Inverter direct drive"},{"label":"Spin speed","value":"1200 RPM"},{"label":"Programs","value":"16, with child lock"},{"label":"Energy rating","value":"A++"},{"label":"Water connection","value":"Cold inlet"},{"label":"Dimensions","value":"850 x 595 x 540 mm"}]'::jsonb,
  4.6, 78,
  true, '1 year unit, 10 years motor',
  array['p-003'], array['new']
from brands b, categories c
where b.slug = 'haier' and c.slug = 'washing-machines'
on conflict (id) do update set title = excluded.title, price = excluded.price;
