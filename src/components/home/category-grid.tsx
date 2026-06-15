import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { listCategories } from "@/lib/repo/categories";
import { RevealStagger, RevealItem } from "@/components/effects/reveal";

const accents = [
  "from-copper/20 to-copper/0",
  "from-graphite/15 to-graphite/0",
  "from-pine/15 to-pine/0",
  "from-copper/15 to-copper/0",
  "from-graphite/10 to-graphite/0",
  "from-saffron/15 to-saffron/0",
];

export async function CategoryGrid() {
  const categories = await listCategories();
  return (
    <Section
      eyebrow="Shop by category"
      title="Everything for a Pakistani home."
      subtitle="From the rasoi to the drawing room — the brands you trust, at prices you can verify."
    >
      <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c, i) => (
          <RevealItem key={c.slug}>
          <Link
            href={`/collections/${c.seoSlug}`}
            data-cursor="view"
            className={`group relative block h-full overflow-hidden rounded-xl border border-mist bg-white p-7 transition-all duration-500 ease-premium hover:-translate-y-1 hover:shadow-lift hover:border-graphite-200`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${accents[i % accents.length]} opacity-60 transition-opacity duration-500 group-hover:opacity-100`}
              aria-hidden
            />
            <div className="relative flex h-full flex-col">
              <div className="flex items-start justify-between">
                <h3 className="font-display text-h2 font-semibold text-graphite">
                  {c.name}
                </h3>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-mist bg-white text-graphite transition-all duration-500 group-hover:bg-graphite group-hover:text-white group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-3 max-w-md text-small text-slate text-pretty">
                {c.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-mist/80">
                {c.brands.slice(0, 4).map((b) => (
                  <span
                    key={b}
                    className="rounded-full bg-white/70 border border-mist px-2.5 py-0.5 text-caption font-medium text-graphite-400 backdrop-blur-sm"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </Link>
          </RevealItem>
        ))}
      </RevealStagger>
    </Section>
  );
}
