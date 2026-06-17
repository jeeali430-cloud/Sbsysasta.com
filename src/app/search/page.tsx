import type { Metadata } from "next";
import { Search as SearchIcon } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/ui/product-card";
import { RevealStagger, RevealItem } from "@/components/effects/reveal";
import { listProducts } from "@/lib/repo/products";
import { buildMetadata } from "@/lib/seo";

type Props = { searchParams: { q?: string } };

export function generateMetadata({ searchParams }: Props): Metadata {
  const q = (searchParams.q ?? "").trim();
  const title = q ? `Results for “${q}”` : "Search";
  return buildMetadata({
    title,
    description: q
      ? `Appliances and electronics matching ${q} at Sbsysasta — same-day delivery in Lahore, cash on delivery, easy installments.`
      : "Search home appliances and electronics in Lahore.",
    path: q ? `/search?q=${encodeURIComponent(q)}` : "/search",
    noIndex: true,
  });
}

function matches(product: { title: string; brand: string }, q: string) {
  const haystack = `${product.title} ${product.brand}`.toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export default async function SearchPage({ searchParams }: Props) {
  const q = (searchParams.q ?? "").trim();
  const all = await listProducts();
  const results = q ? all.filter((p) => matches(p, q)) : [];

  return (
    <>
      <Header />
      <main className="bg-porcelain min-h-screen pb-16">
        <Container className="pt-10 pb-6">
          <p className="text-caption uppercase tracking-[0.18em] text-copper font-medium">
            Search
          </p>
          <h1 className="mt-2 font-display text-h1 sm:text-display-lg font-semibold tracking-tight text-graphite">
            {q ? `Results for “${q}”` : "Find what you need"}
          </h1>

          <form
            action="/search"
            method="GET"
            className="mt-6 flex max-w-lg items-center gap-2 rounded-full border border-mist bg-white px-4"
          >
            <SearchIcon className="h-4 w-4 text-graphite-400" />
            <input
              type="search"
              name="q"
              defaultValue={q}
              autoFocus
              placeholder="Search refrigerators, ACs, TVs…"
              className="h-12 w-full bg-transparent text-small placeholder:text-graphite-300 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-graphite text-white px-4 h-9 text-caption font-medium"
            >
              Search
            </button>
          </form>
        </Container>

        <Container>
          {q && results.length === 0 ? (
            <div className="rounded-2xl border border-mist bg-white p-12 text-center">
              <p className="font-display text-h2 font-semibold text-graphite">
                No matches for “{q}”.
              </p>
              <p className="mt-2 text-small text-slate">
                Try a brand name (Haier, Samsung) or a category (refrigerator,
                inverter AC).
              </p>
            </div>
          ) : results.length > 0 ? (
            <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((p) => (
                <RevealItem key={p.id}>
                  <ProductCard product={p} />
                </RevealItem>
              ))}
            </RevealStagger>
          ) : (
            <p className="text-small text-slate">
              Type a brand, category or model number to begin.
            </p>
          )}
        </Container>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
