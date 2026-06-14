import type { Product } from "@/data/products";
import { ProductCard } from "@/components/ui/product-card";
import { RevealStagger, RevealItem } from "@/components/effects/reveal";

export function RelatedProducts({ items }: { items: Product[] }) {
  if (!items.length) return null;
  return (
    <section className="border-t border-mist bg-porcelain py-16 sm:py-20">
      <div className="container">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-h1 sm:text-display-lg font-semibold tracking-tight text-graphite">
            More from this category
          </h2>
        </div>
        <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => (
            <RevealItem key={p.id}>
              <ProductCard product={p} />
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
