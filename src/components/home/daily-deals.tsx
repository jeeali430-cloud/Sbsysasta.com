import Link from "next/link";
import { Flame, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/ui/product-card";
import { getDealProducts } from "@/data/products";

export function DailyDeals() {
  const deals = getDealProducts();

  return (
    <section className="relative overflow-hidden bg-graphite py-20 text-porcelain sm:py-24">
      <div
        className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-copper/20 blur-3xl"
        aria-hidden
      />
      <Container className="relative">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="inline-flex items-center gap-2 text-caption uppercase tracking-[0.18em] text-copper-300 font-medium">
              <Flame className="h-4 w-4" /> Today's deals
            </p>
            <h2 className="mt-3 font-display text-h1 sm:text-display-lg font-semibold tracking-tight text-white text-balance">
              Save more before the sun sets.
            </h2>
            <p className="mt-3 max-w-xl text-body text-graphite-200">
              Prices on these refresh every 24 hours. Lock in today's deal — pay
              cash on delivery or split it into easy installments.
            </p>
          </div>
          <Link
            href="/collections/deals"
            className="inline-flex items-center gap-2 text-small font-medium text-copper-200 hover:text-white transition-colors"
          >
            View all deals <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {deals.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}
