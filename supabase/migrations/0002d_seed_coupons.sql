-- Sbsysasta.com — Seed PART D: coupons
-- Run AFTER 0002c.

insert into coupons (code, type, value, label, active) values
  ('WELCOME10', 'percent',      10,   '10% off your first order',    true),
  ('LAHORE2K',  'flat',         2000, 'Rs 2,000 off any order',      true),
  ('FREESHIP',  'freeDelivery', 0,    'Free delivery, any city',     true)
on conflict (code) do update set
  type = excluded.type,
  value = excluded.value,
  label = excluded.label,
  active = excluded.active;
