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
      className="!py-4 sm:!py-6 lg:!py-8"
    >
      <RevealStagger className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((c, i) => (
          <RevealItem key={c.slug}>
          <Link
            href={`/collections/${c.seoSlug}`}
            data-cursor="view"
            className={`group relative block h-full overflow-hidden rounded-xl border border-mist bg-white p-4 transition-all duration-500 ease-premium hover:-translate-y-1 hover:shadow-lift hover:border-graphite-200`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${accents[i % accents.length]} opacity-60 transition-opacity duration-500 group-hover:opacity-100`}
              aria-hidden
            />
            <div className="relative flex h-full flex-col">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display text-small lg:text-body font-semibold text-graphite leading-tight">
                  {c.name}
                </h3>
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-mist bg-white text-graphite transition-all duration-500 group-hover:bg-graphite group-hover:text-white group-hover:rotate-45">
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
              <p className="mt-2 text-caption text-slate line-clamp-2">
                {c.description}
              </p>
            </div>
          </Link>
          </RevealItem>
        ))}
      </RevealStagger>
    </Section>
  );
}
