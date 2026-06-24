import { Container } from "@/components/ui/container";
import { brands } from "@/data/brands";

export function BrandStrip() {
  return (
    <section className="border-y border-mist bg-white py-4 sm:py-6">
      <Container>
        <p className="text-center text-caption uppercase tracking-[0.18em] text-graphite-400">
          Authorized partners for
        </p>
        <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {brands.map((b) => (
            <li
              key={b.slug}
              className="font-display text-h2 font-medium text-graphite-300 hover:text-graphite transition-colors duration-300"
            >
              {b.name}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
