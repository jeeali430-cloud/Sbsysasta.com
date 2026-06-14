import Image from "next/image";
import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";
import { formatPKR } from "@/lib/utils";

export function Bundle({
  primary,
  extras,
}: {
  primary: Product;
  extras: Product[];
}) {
  if (!extras.length) return null;

  const all = [primary, ...extras];
  const total = all.reduce((sum, p) => sum + p.price, 0);
  const totalOriginal = all.reduce(
    (sum, p) => sum + (p.originalPrice ?? p.price),
    0
  );
  const savings = totalOriginal - total;

  return (
    <section className="border-t border-mist bg-white py-16 sm:py-20">
      <div className="container">
        <div className="mb-8 max-w-2xl">
          <p className="text-caption uppercase tracking-[0.16em] text-copper font-medium">
            Frequently bought together
          </p>
          <h2 className="mt-2 font-display text-h1 font-semibold tracking-tight text-graphite">
            Save when you buy the set.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:gap-10">
          <div className="flex flex-wrap items-center gap-4">
            {all.map((p, i) => (
              <div key={p.id} className="flex items-center gap-4">
                <Link
                  href={`/products/${p.slug}`}
                  data-cursor="view"
                  className="group block w-[150px] sm:w-[180px]"
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg border border-mist bg-porcelain">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="180px"
                      className="object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-2 text-caption uppercase tracking-[0.12em] text-graphite-400">
                    {p.brand}
                  </p>
                  <p className="text-small font-medium text-graphite line-clamp-2 leading-snug">
                    {p.title}
                  </p>
                  <p className="mt-1 text-small font-semibold text-graphite">
                    {formatPKR(p.price)}
                  </p>
                </Link>
                {i < all.length - 1 && (
                  <Plus className="h-5 w-5 text-graphite-300 shrink-0" />
                )}
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-mist bg-porcelain p-6">
            <p className="text-caption uppercase tracking-[0.14em] text-graphite-400">
              Bundle total
            </p>
            <p className="mt-2 font-display text-display-lg font-semibold text-graphite">
              {formatPKR(total)}
            </p>
            {savings > 0 && (
              <p className="mt-1 text-small text-pine">
                Save {formatPKR(savings)} vs. buying separately
              </p>
            )}
            <button
              type="button"
              data-cursor="cart"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-graphite text-white h-12 text-body font-medium hover:bg-graphite-700 transition-colors"
            >
              Add bundle to cart
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-3 text-caption text-graphite-400">
              Free delivery in Lahore on bundles over ₨ 50,000.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
