# Sbsysasta.com

Premium home appliances & electronics e-commerce for Lahore, Pakistan.

## Stack
Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · GSAP · Supabase

## Local dev (no Supabase required)
```bash
npm install
cp .env.example .env.local
npm run dev
```
Open http://localhost:3000

Without env vars, the site runs on the in-memory seed data in `src/data/*` — every page, filter, cart and checkout still works. Orders persist to `localStorage` only.

## Connecting Supabase (optional — recommended for real data)
1. Create a project at [supabase.com](https://supabase.com)
2. Open **SQL Editor** and run, in order:
   - `supabase/migrations/0001_init.sql` — creates tables, indexes, RLS policies
   - `supabase/migrations/0002_seed.sql` — inserts brands, categories, sub-types, products, coupons
   - `supabase/migrations/0003_storage.sql` — creates the `product-images` bucket for admin uploads
3. In **Project Settings → API**, copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` *(server-only, never commit)*
4. Restart `npm run dev`. The catalog will be served from Supabase, coupons validate via the database, and orders POST to `/api/orders` and land in the `orders` table.

### Data model
- `categories`, `sub_types`, `brands`, `category_brands` — catalog taxonomy
- `products` — primary table with jsonb gallery, specs and highlights
- `customers` (optional FK), `orders` (insert-only for the public, status managed by admin)
- `coupons` — active codes
- `reviews` — gated by `status = 'approved'` for public reads

Public read is allowed via RLS for catalog + active coupons + approved reviews. Customer/order data is locked down to the service-role key.

## Build status (per workflow)
- [x] Step 1 — Design direction approved
- [x] Step 2 — Design system (Tailwind tokens, base components)
- [x] Step 3 — Homepage (static + animations + custom cursor)
- [x] Step 4 — Category / listing pages with URL-driven filters
- [x] Step 5 — Product detail page with gallery, specs, bundle, related
- [x] Step 6 — Cart drawer, full cart, guest checkout, order confirmation
- [x] Step 7 — Supabase schema + repo abstraction + /api/orders + /api/coupons
- [x] Step 8 — Cart drawer & checkout wired to Supabase
- [x] Step 9 — Admin dashboard (products CRUD, orders, reviews, customers, coupons)
- [x] Step 10 — SEO polish (OG images, JSON-LD, hreflang, /search)
- [x] Step 11 — Image audit (alt text, sizes, priority, blur placeholders)
- [x] Step 12 — Payment icons + installment calculator + animated WhatsApp
- [x] Step 13 — Mobile + accessibility (skip link, ARIA, focus rings, reduced-motion)
- [x] Step 14 — Performance (lazy-load cursor, code-split, static prerender)
- [ ] Step 15 — Deployment (Vercel + Supabase) ← awaiting approval
