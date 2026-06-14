import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  Wallet,
  RefreshCcw,
  MessageCircle,
  Star,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { Breadcrumbs } from "@/components/collections/breadcrumbs";
import { ProductGallery } from "@/components/products/gallery";
import { SpecsTable } from "@/components/products/specs-table";
import { Highlights } from "@/components/products/highlights";
import { StickyBar } from "@/components/products/sticky-bar";
import { RelatedProducts } from "@/components/products/related-products";
import { Bundle } from "@/components/products/bundle";
import { Reveal } from "@/components/effects/reveal";
import {
  products,
  getProductBySlug,
  getRelatedProducts,
  getBundleProducts,
} from "@/data/products";
import { getCategoryBySlug } from "@/data/categories";
import { categories } from "@/data/categories";
import { buildMetadata } from "@/lib/seo";
import { site, whatsappLink } from "@/data/site";
import { formatPKR } from "@/lib/utils";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return buildMetadata({
    title: `${product.title} — Price in Lahore, Pakistan`,
    description:
      product.description?.slice(0, 160) ??
      `Buy ${product.title} online in Lahore. ${product.warranty}. Cash on Delivery & easy monthly installments.`,
    path: `/products/${product.slug}`,
  });
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const category =
    categories.find((c) => c.slug === product.categorySlug) ??
    getCategoryBySlug(product.categorySlug);

  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const related = getRelatedProducts(product);
  const bundleExtras = getBundleProducts(product);

  const crumbs = [
    { href: "/", label: "Home" },
    {
      href: `/collections/${category?.seoSlug ?? "all"}`,
      label: category?.name ?? "Shop",
    },
    { href: `/products/${product.slug}`, label: product.title },
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

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: gallery.map((g) => g),
    description: product.description ?? product.highlights.join(". "),
    brand: { "@type": "Brand", name: product.brand },
    sku: product.id,
    category: category?.name ?? "Home Appliances",
    offers: {
      "@type": "Offer",
      url: `${site.url}/products/${product.slug}`,
      priceCurrency: "PKR",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: site.name },
    },
    ...(product.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating.value,
        reviewCount: product.rating.count,
      },
    }),
  };

  const waMessage = `Salam! I'm interested in the ${product.title}. Is it available?`;

  return (
    <>
      <Header />
      <main className="bg-porcelain pb-32 lg:pb-20">
        <Container className="pt-8 pb-4">
          <Breadcrumbs crumbs={crumbs} />
        </Container>

        <Container>
          <div className="grid gap-10 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
            <Reveal y={16}>
              <ProductGallery images={gallery} alt={product.title} />
            </Reveal>

            <Reveal y={16} delay={0.05} className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-caption uppercase tracking-[0.16em] text-graphite-400">
                  {product.brand}
                </span>
                {product.inStock && (
                  <span className="inline-flex items-center gap-1.5 text-caption text-pine">
                    <span className="h-1.5 w-1.5 rounded-full bg-pine" />
                    In stock — ships today in Lahore
                  </span>
                )}
                {product.badges?.includes("bestseller") && (
                  <Badge tone="ink">Bestseller</Badge>
                )}
                {product.badges?.includes("new") && (
                  <Badge tone="copper">New</Badge>
                )}
              </div>

              <h1 className="mt-3 font-display text-h1 lg:text-display-lg font-semibold tracking-tight text-graphite text-balance">
                {product.title}
              </h1>

              {product.rating && (
                <div className="mt-3 flex items-center gap-2 text-small text-graphite-400">
                  <span className="flex items-center gap-0.5 text-copper">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4"
                        fill={
                          i < Math.round(product.rating!.value)
                            ? "currentColor"
                            : "transparent"
                        }
                        strokeWidth={1.5}
                      />
                    ))}
                  </span>
                  <span className="font-medium text-graphite">
                    {product.rating.value.toFixed(1)}
                  </span>
                  <span>({product.rating.count} reviews)</span>
                </div>
              )}

              <div className="mt-6">
                <Price
                  price={product.price}
                  originalPrice={product.originalPrice}
                  size="lg"
                />
                {product.installmentFrom && (
                  <p className="mt-2 text-small text-slate">
                    or{" "}
                    <span className="font-medium text-graphite">
                      {formatPKR(product.installmentFrom)}/month
                    </span>{" "}
                    on easy installments —{" "}
                    <a
                      href="/installments"
                      className="text-copper underline-offset-4 hover:underline"
                    >
                      check plans
                    </a>
                  </p>
                )}
              </div>

              <div className="mt-7">
                <Highlights items={product.highlights} />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <AddToCartButton
                  product={product}
                  variant="primary"
                  className="flex-1 min-w-[200px]"
                />
                <Button
                  href={whatsappLink(waMessage)}
                  variant="dark"
                  size="lg"
                  data-cursor="wa"
                  className="flex-1 min-w-[200px]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Order on WhatsApp
                </Button>
              </div>

              <Button
                href="/installments"
                variant="ghost"
                size="md"
                data-cursor="read"
                className="mt-3 self-start"
              >
                Buy on Easy Monthly Installments →
              </Button>

              <ul className="mt-8 grid gap-3 border-t border-mist pt-6 sm:grid-cols-2">
                <TrustRow
                  icon={Truck}
                  title="Same-Day Delivery"
                  sub="Lahore — order before 4 PM"
                />
                <TrustRow
                  icon={Wallet}
                  title="Cash on Delivery"
                  sub="Available nationwide"
                />
                <TrustRow
                  icon={ShieldCheck}
                  title={product.warranty}
                  sub="Direct from brand"
                />
                <TrustRow
                  icon={RefreshCcw}
                  title="7-Day Easy Returns"
                  sub="No restocking fee"
                />
              </ul>
            </Reveal>
          </div>
        </Container>

        <Container className="py-8">
          <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
            <Reveal>
              <h2 className="font-display text-h1 font-semibold text-graphite">
                About this {category?.name?.toLowerCase().replace(/s$/, "") ?? "product"}
              </h2>
              {product.description && (
                <p className="mt-4 text-body text-slate text-pretty leading-relaxed">
                  {product.description}
                </p>
              )}
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="font-display text-h1 font-semibold text-graphite mb-5">
                Specifications
              </h2>
              {product.specs && product.specs.length > 0 ? (
                <SpecsTable specs={product.specs} />
              ) : (
                <p className="text-small text-slate">
                  Detailed specs available on request — message us on WhatsApp.
                </p>
              )}
            </Reveal>
          </div>
        </Container>

        {bundleExtras.length > 0 && (
          <Bundle primary={product} extras={bundleExtras} />
        )}

        {related.length > 0 && <RelatedProducts items={related} />}
      </main>

      <StickyBar product={product} />

      <Footer />
      <WhatsAppButton productName={product.title} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    </>
  );
}

function TrustRow({
  icon: Icon,
  title,
  sub,
}: {
  icon: typeof ShieldCheck;
  title: string;
  sub: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white border border-mist text-copper">
        <Icon className="h-4 w-4" />
      </span>
      <div className="leading-tight">
        <p className="text-small font-medium text-graphite">{title}</p>
        <p className="text-caption text-graphite-400">{sub}</p>
      </div>
    </li>
  );
}
