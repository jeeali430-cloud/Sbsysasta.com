# Deploying Sbsysasta.com

This is the 5-minute punch list to take the `claude/epic-hawking-zr5yd2` branch live on `sbsysasta.com` using Vercel (frontend) + Supabase (database, auth, storage).

You only have to do this **once**. After that, every push to `main` (or whichever branch you pick) auto-deploys.

---

## 1. Create the Supabase project (~2 min)

1. Go to **https://supabase.com** → **New project**
2. Name: `sbsysasta-prod`
3. Region: **South Asia (Mumbai)** — closest to Lahore
4. Save the database password somewhere safe (you can ignore it after this)
5. Wait for the project to provision (~1 min)

## 2. Run the migrations (~2 min)

In Supabase Studio → **SQL Editor** → paste each file from `supabase/migrations/` in order and click **Run** for each one:

| Order | File | What it does |
|---|---|---|
| 1 | `0001_init.sql` | Creates all tables, indexes, RLS policies |
| 2 | `0002_seed.sql` | Idempotent seed — brands, 6 categories, 8 products, 3 coupons |
| 3 | `0003_storage.sql` | Creates the `product-images` storage bucket with public read |

After step 2, open **Table Editor → products** and confirm 8 rows. After step 3, open **Storage** and confirm a `product-images` bucket exists.

## 3. Copy the keys

Supabase Studio → **Project Settings → API**, copy these three values into a note — you'll paste them into Vercel in a moment:

| Vercel env var | Source |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | "Project URL" |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | "anon public" key |
| `SUPABASE_SERVICE_ROLE_KEY` | "service_role" key — **never commit, never expose to the client** |

## 4. Configure Supabase Auth redirect URLs

Studio → **Authentication → URL Configuration** → **Redirect URLs**, add (one per line):

```
https://sbsysasta.com/auth/callback
https://*.vercel.app/auth/callback
http://localhost:3000/auth/callback
```

Save. This lets the magic-link admin login redirect back to your site (production + preview deploys + local dev).

## 5. Deploy to Vercel (~3 min)

1. Go to **https://vercel.com/new**
2. **Import Git Repository** → pick `jeeali430-cloud/sbsysasta.com`
3. **Project name**: `sbsysasta` (or anything you like)
4. **Framework Preset**: Next.js (auto-detected — don't change)
5. **Build & Output Settings**: leave defaults
6. **Environment Variables** — paste these (Production · Preview · Development all three checked unless noted):

   | Name | Value | Notes |
   |---|---|---|
   | `NEXT_PUBLIC_SITE_URL` | `https://sbsysasta.com` | Use the preview URL initially if you don't have DNS yet |
   | `NEXT_PUBLIC_WHATSAPP_NUMBER` | `923202785197` | |
   | `NEXT_PUBLIC_SUPPORT_PHONE` | `03202785197` | |
   | `NEXT_PUBLIC_SUPABASE_URL` | *(from step 3)* | |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | *(from step 3)* | |
   | `SUPABASE_SERVICE_ROLE_KEY` | *(from step 3)* | **Production-only** — uncheck Preview & Development |
   | `ADMIN_EMAILS` | `jeeali430@gmail.com` | Comma-separated for multiple admins |

7. **Production Branch**: change from `main` to **`claude/epic-hawking-zr5yd2`** (or merge that branch into `main` first — either works)
8. Click **Deploy**

Wait ~90 seconds. You'll get a URL like `sbsysasta-xyz.vercel.app`. Open it — you should see the homepage with real prices and the Daily Deals section.

## 6. Point the domain at Vercel

1. In Vercel project → **Settings → Domains** → add `sbsysasta.com` and `www.sbsysasta.com`
2. Vercel shows you exact DNS records — copy them into your domain registrar:
   - **A** record on `@` (apex) → `76.76.21.21`
   - **CNAME** on `www` → `cname.vercel-dns.com`
3. Save in your registrar. DNS usually propagates in 5–30 minutes (sometimes hours).
4. Once propagated, Vercel auto-provisions an HTTPS cert. Both `sbsysasta.com` and `www.sbsysasta.com` start serving.

## 7. Post-deploy smoke tests (5 min)

Open the live site and confirm each:

- [ ] **Homepage** — hero loads, scrolling triggers reveal animations, custom cursor visible on desktop
- [ ] **Category page** — `/collections/refrigerators-price-in-pakistan` — toggle a brand filter, URL updates with `?brand=...`
- [ ] **Product page** — `/products/haier-1-5-ton-inverter-ac-hsu-18hfcf` — gallery thumbnails switch, installment calculator updates monthly figure
- [ ] **Cart** — click "Add to Cart" → drawer slides in → apply code `WELCOME10` → discount appears
- [ ] **Checkout** — fill the form, place a test COD order → land on success page → order ID copies
- [ ] **Order persisted** — Supabase Studio → Table Editor → `orders` → confirm the new row
- [ ] **Admin login** — `/admin/login` → enter `jeeali430@gmail.com` → check inbox for magic link → click → land on `/admin` dashboard
- [ ] **OG image** — paste `https://sbsysasta.com/products/haier-1-5-ton-inverter-ac-hsu-18hfcf` into [opengraph.xyz](https://www.opengraph.xyz) — should render the product card image
- [ ] **Sitemap** — `https://sbsysasta.com/sitemap.xml` lists every category + product
- [ ] **Robots** — `https://sbsysasta.com/robots.txt` allows `/`, disallows `/admin` and `/api`
- [ ] **Rich Results** — paste any product URL into [Google's Rich Results Test](https://search.google.com/test/rich-results) → should detect Product + BreadcrumbList

## 8. Submit to Google (the same day)

1. **Search Console** → add property `https://sbsysasta.com`
2. Verify via DNS TXT record (Vercel makes this easy)
3. Submit `https://sbsysasta.com/sitemap.xml`
4. Request indexing on the homepage and 3 highest-value category pages (refrigerators, ACs, LED TVs)

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| Admin login → "Supabase not connected" banner | Env vars not picked up — confirm they're set on the Vercel project for **Production**, then redeploy |
| Admin login email arrives but the link 404s | Step 4 missed — add `https://sbsysasta.com/auth/callback` to Supabase redirect URLs and try again |
| `Upload image` fails on admin product edit | Either `SUPABASE_SERVICE_ROLE_KEY` isn't set, or migration `0003_storage.sql` hasn't been run |
| Checkout succeeds but no row in `orders` table | `SUPABASE_SERVICE_ROLE_KEY` missing on Vercel — the `/api/orders` route silently no-ops in that case (the customer still sees the success page) |
| Categories or products empty on the homepage | Migration `0002_seed.sql` not run — re-run it (it's idempotent) |
| Build fails on Vercel | Open the build log — most common issue is an env var typo (extra space, missing quote). Don't wrap values in quotes when pasting into Vercel |

---

## After deploy

- **Adding a new admin**: update `ADMIN_EMAILS` in Vercel env vars (comma-separated) and redeploy.
- **Updating products from your phone**: `https://sbsysasta.com/admin` works on mobile.
- **Connecting WhatsApp Business**: the WhatsApp links already use `wa.me/923202785197` — change `NEXT_PUBLIC_WHATSAPP_NUMBER` in Vercel env vars if you move to a different number.
- **Future tweaks**: edit on the `claude/epic-hawking-zr5yd2` branch (or merge it into `main`), push, Vercel auto-rebuilds in ~90 seconds.
