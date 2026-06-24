import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import { listProducts } from "@/lib/repo/products";
import { RevealStagger, RevealItem, Reveal } from "@/components/effects/reveal";

export async function FeaturedProducts() {
  const all = await listProducts();
  const featured = all.slice(0, 4);

  return (
    <Section
      bg="white"
      eyebrow="Featured this week"
      title="Hand-picked, in stock, ready to ship."
      subtitle="Our team checks pricing and stock every morning. If it's listed here, it's available — and we'll send it out today inside Lahore."
      className="!py-4 sm:!py-6 lg:!py-8"
    >
      <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((p) => (
          <RevealItem key={p.id}>
            <ProductCard product={p} />
          </RevealItem>
        ))}
      </RevealStagger>

      <Reveal className="mt-12 flex justify-center" delay={0.1}>
        <Button
          href="/collections/all"
          variant="outline"
          size="lg"
          data-cursor="view"
        >
          See all products
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Reveal>
    </Section>
  );
}
