-- Sbsysasta.com — Seed PART C: products 5-8
-- Run AFTER 0002b.

insert into products (
  id, slug, title, brand_id, brand_name, category_id, sub_type_slug,
  price, original_price, installment_from,
  image, gallery, highlights, description, specs,
  rating_value, rating_count, in_stock, warranty, bundle_with, badges
)
select
  'p-005',
  'tcl-43-inch-android-smart-tv-43s5400',
  'TCL 43 inch Android Smart TV - 43S5400',
  b.id, 'TCL',
  c.id, '32-43-inch',
  64500, 72000, 3225,
  'https://images.unsplash.com/photo-1467293622093-9f15c96be70f?w=900&q=85&auto=format&fit=crop',
  '["https://images.unsplash.com/photo-1467293622093-9f15c96be70f?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1461151304267-38535e780c79?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1601944179066-29786cb9d32a?w=900&q=85&auto=format&fit=crop"]'::jsonb,
  '["Android 11 - Play Store apps","Google Assistant voice remote","Dolby Audio","Chromecast built-in"]'::jsonb,
  'TCL 43S5400 is the practical Android TV for a second bedroom or drawing room - you get Play Store apps, voice search, and Chromecast for around half the price of the equivalent Samsung. Picture quality is good for SD cable and HD streaming. For true 4K you will want a larger panel. Excellent for the price point.',
  '[{"label":"Screen size","value":"43 inch (108 cm)"},{"label":"Resolution","value":"1920 x 1080 (Full HD)"},{"label":"Panel","value":"LED, IPS-like"},{"label":"OS","value":"Android 11 TV"},{"label":"HDMI / USB","value":"2 x HDMI, 1 x USB"},{"label":"Voice control","value":"Google Assistant"},{"label":"Sound","value":"16W, Dolby Audio"},{"label":"Wi-Fi","value":"Wi-Fi 5, Bluetooth"}]'::jsonb,
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
  'Dawlance Microwave Oven - DW-115 CG (Grill)',
  b.id, 'Dawlance',
  c.id, 'grill-microwave',
  28900, 32500, 1445,
  'https://images.unsplash.com/photo-1574269910231-bc508bcb73e0?w=900&q=85&auto=format&fit=crop',
  '["https://images.unsplash.com/photo-1574269910231-bc508bcb73e0?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1585515320310-259814833e62?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85&auto=format&fit=crop"]'::jsonb,
  '["20L capacity with grill function","Press-key control, child lock","Easy-clean cavity","5 power levels"]'::jsonb,
  'Dawlance DW-115 CG is a no-nonsense 20-litre grill microwave that handles everyday reheating, defrosting, and chicken tikka grill on the side rack. The cavity wipes clean with a damp cloth - important if you reheat a lot of biryani - and the press-key control is more reliable long-term than the rotating dial on cheaper imports.',
  '[{"label":"Capacity","value":"20 litres"},{"label":"Type","value":"Grill microwave"},{"label":"Power","value":"700W microwave, 1000W grill"},{"label":"Control","value":"Press-key (membrane), child lock"},{"label":"Power levels","value":"5"},{"label":"Cavity","value":"Easy-clean enamel"},{"label":"Timer","value":"Up to 30 minutes"},{"label":"Dimensions","value":"440 x 257 x 358 mm"}]'::jsonb,
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
  'Gree 1 Ton Inverter AC - GS-12PITH11W Pular',
  b.id, 'Gree',
  c.id, '1-ton',
  154900, 169000, 7745,
  'https://images.unsplash.com/photo-1581275234363-2e7c1edd6d99?w=900&q=85&auto=format&fit=crop',
  '["https://images.unsplash.com/photo-1581275234363-2e7c1edd6d99?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1631545806609-e1cb04b7d908?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1614633833026-0820552978b8?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1615873968403-89e068629265?w=900&q=85&auto=format&fit=crop"]'::jsonb,
  '["Inverter compressor - up to 65 percent power saving","Wi-Fi enabled, Gree+ app control","Heat and cool, T3 ready","Golden fin condenser"]'::jsonb,
  'Gree is the worlds largest AC manufacturer for a reason - and the Pular GS-12PITH11W is their take on a reliable 1-ton inverter for a 10x12 ft room. T3-ready means it will keep cooling at 50 C+ ambient, which is the cliff cheaper imports fall off in May. Wi-Fi control through Gree+ lets you switch it on 15 minutes before you reach home from work.',
  '[{"label":"Capacity","value":"1 Ton (12,000 BTU)"},{"label":"Type","value":"Split, DC Inverter"},{"label":"Mode","value":"Heat and Cool"},{"label":"Compressor","value":"T3 Rotary, copper"},{"label":"Wi-Fi","value":"Yes, Gree+ app (iOS / Android)"},{"label":"Refrigerant","value":"R-410A"},{"label":"Condenser","value":"Golden fin (corrosion resistant)"},{"label":"Noise level","value":"27 dB indoor"}]'::jsonb,
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
  'Westpoint Blender Grinder Mixer - WF-9293',
  b.id, 'Westpoint',
  c.id, 'blenders-juicers',
  11500, 13800, 575,
  'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=900&q=85&auto=format&fit=crop',
  '["https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1585515320310-259814833e62?w=900&q=85&auto=format&fit=crop","https://images.unsplash.com/photo-1574269910231-bc508bcb73e0?w=900&q=85&auto=format&fit=crop"]'::jsonb,
  '["3-in-1 blender, grinder, mill","Stainless steel blades","1 year replacement warranty","350W motor"]'::jsonb,
  'Westpoint WF-9293 covers the three jars every Pakistani kitchen needs - a blender for lassi and smoothies, a chutney jar for masala and ginger-garlic paste, and a dry mill jar for haldi, dhania and garam masala. The stainless steel blades hold their edge much longer than the imported plastic-bodied units in this price range.',
  '[{"label":"Motor","value":"350W"},{"label":"Jars","value":"Blender 1.25L, chutney 0.4L, mill 0.3L"},{"label":"Blades","value":"Stainless steel"},{"label":"Speeds","value":"2 + pulse"},{"label":"Body","value":"ABS plastic with metal trim"},{"label":"Cord length","value":"1.2 m"},{"label":"Voltage","value":"220V / 50Hz"}]'::jsonb,
  4.3, 124,
  true, '1 year replacement',
  array[]::text[], array['deal']
from brands b, categories c
where b.slug = 'westpoint' and c.slug = 'kitchen-appliances'
on conflict (id) do update set title = excluded.title, price = excluded.price;
