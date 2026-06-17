import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/ui/product-card";
import { FilterPanel } from "@/components/collections/filter-panel";
import { SortSelect } from "@/components/collections/sort-select";
import { MobileFilterBar } from "@/components/collections/mobile-filter-bar";
import { Breadcrumbs } from "@/components/collections/breadcrumbs";
import { EmptyState } from "@/components/collections/empty-state";
import { Reveal, RevealStagger, RevealItem } from "@/components/effects/reveal";
import { type Category } from "@/data/categories";
import { listCategories, getCategoryBySlug } from "@/lib/repo/categories";
import { listProducts } from "@/lib/repo/products";
import {
  applyFilters,
  parseFilters,
  activeFilterCount,
} from "@/lib/filter-products";
import { buildMetadata, buildItemListJsonLd } from "@/lib/seo";
import { site } from "@/data/site";

type Props = {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
};

const ALL: Category = {
  name: "All Appliances",
  slug: "all",
  seoSlug: "all",
  description:
    "Browse every appliance and electronic in stock at Sbsysasta — TVs, refrigerators, air conditioners, washing machines, microwaves and kitchen appliances.",
  subTypes: [],
  brands: [],
};

const DEALS: Category = {
  name: "Today's Deals",
  slug: "deals",
  seoSlug: "deals",
  description:
    "Hand-picked appliance deals across Lahore — refreshed every 24 hours. Cash on delivery, easy installments.",
  subTypes: [],
  brands: [],
};

type Resolved = {
  category: Category;
  pool: Awaited<ReturnType<typeof listProducts>>;
  isVirtual: boolean;
};

async function resolveCategory(slug: string): Promise<Resolved | null> {
  const products = await listProducts();
  if (slug === "all") {
    return { category: ALL, pool: products, isVirtual: true };
  }
  if (slug === "deals") {
    return {
      category: DEALS,
      pool: products.filter((p) => p.badges?.includes("deal")),
      isVirtual: true,
    };
  }
  const category = await getCategoryBySlug(slug);
  if (!category) return null;
  return {
    category,
    pool: products.filter((p) => p.categorySlug === category.slug),
    isVirtual: false,
  };
}

export async function generateStaticParams() {
  const categories = await listCategories();
  return [
    { slug: "all" },
    { slug: "deals" },
    ...categories.map((c) => ({ slug: c.seoSlug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await resolveCategory(params.slug);
  if (!resolved) return {};
  const { category } = resolved;
  const path = `/collections/${category.seoSlug}`;
  const title =
    category.slug === "all"
      ? "All Home Appliances & Electronics in Lahore"
      : category.slug === "deals"
        ? "Today's Appliance Deals in Lahore & Pakistan"
        : `${category.name} Price in Lahore, Pakistan`;
  return buildMetadata({
    title,
    description: category.description,
    path,
  });
}

export default async function CollectionPage({ params, searchParams }: Props) {
  const resolved = await resolveCategory(params.slug);
  if (!resolved) notFound();
  const { category, pool, isVirtual } = resolved;

  const filters = parseFilters(searchParams);
  const filtered = applyFilters(pool, filters);
  const activeCount = activeFilterCount(filters);

  const brandsAvailable = isVirtual
    ? Array.from(new Set(pool.map((p) => p.brand)))
    : category.brands;

  const crumbs = [
    { href: "/", label: "Home" },
    { href: "/collections/all", label: "Shop" },
    { href: `/collections/${category.seoSlug}`, label: category.name },
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${site.url}${c.href}`,
    })),
  };

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    url: `${site.url}/collections/${category.seoSlug}`,
    description: category.description,
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
  };

  const itemListJsonLd = buildItemListJsonLd(
    filtered.slice(0, 24).map((p) => ({
      name: p.title,
      url: `${site.url}/products/${p.slug}`,
    }))
  );

  return (
    <>
      <Header />
      <main id="main-content" className="bg-porcelain">
        <Container className="pt-8 pb-4">
          <Breadcrumbs crumbs={crumbs} />
        </Container>

        <Container>
          <Reveal className="max-w-3xl pt-3 pb-8">
            <h1 className="font-display text-h1 sm:text-display-lg font-semibold tracking-tight text-graphite text-balance">
              {category.slug === "deals"
                ? "Today's appliance deals in Lahore."
                : category.slug === "all"
                  ? "Every appliance, every brand — in one place."
                  : `${category.name} price in Lahore, Pakistan.`}
            </h1>
            <p className="mt-3 max-w-2xl text-body text-slate text-pretty">
              {category.description}
            </p>
          </Reveal>
        </Container>

        <Container className="pb-20">
          <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-10">
            <FilterPanel
              category={category}
              brandsAvailable={brandsAvailable}
              className="hidden lg:flex sticky top-28 self-start max-h-[calc(100vh-8rem)] overflow-y-auto pr-2"
            />

            <div>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <p className="text-small text-graphite-400">
                  Showing{" "}
                  <span className="font-medium text-graphite">
                    {filtered.length}
                  </span>{" "}
                  result{filtered.length === 1 ? "" : "s"}
                  {activeCount > 0 && (
                    <>
                      {" "}
                      ·{" "}
                      <Link
                        href={`/collections/${category.seoSlug}`}
                        className="text-copper hover:text-copper-600"
                      >
                        Clear filters
                      </Link>
                    </>
                  )}
                </p>
                <div className="hidden lg:block">
                  <SortSelect />
                </div>
                <MobileFilterBar
                  category={category}
                  brandsAvailable={brandsAvailable}
                  activeCount={activeCount}
                  resultCount={filtered.length}
                />
              </div>

              {filtered.length === 0 ? (
                <EmptyState categoryName={category.name} />
              ) : (
                <RevealStagger className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((p) => (
                    <RevealItem key={p.id}>
                      <ProductCard product={p} />
                    </RevealItem>
                  ))}
                </RevealStagger>
              )}
            </div>
          </div>
        </Container>

        {!isVirtual && (
          <section className="border-t border-mist bg-white py-16">
            <Container>
              <div className="max-w-3xl">
                <h2 className="font-display text-h1 font-semibold text-graphite text-balance">
                  About {category.name.toLowerCase()} in Lahore &amp; Pakistan
                </h2>
                <p className="mt-4 text-body text-slate text-pretty">
                  {category.description} Every unit we ship is brand-new, sealed
                  and backed by the official manufacturer warranty. We carry{" "}
                  {category.brands.slice(0, -1).join(", ")} and{" "}
                  {category.brands.slice(-1)} — the brands Lahore households and
                  small businesses actually buy.
                </p>
                <p className="mt-4 text-body text-slate text-pretty">
                  Same-day delivery is available across Lahore for orders placed
                  before 4 PM. For other cities, expect 2–4 working days with
                  cash on delivery. Easy monthly installments are available
                  through bank EMI or our in-house plan with only your CNIC.
                </p>
              </div>
            </Container>
          </section>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
    </>
  );
}
