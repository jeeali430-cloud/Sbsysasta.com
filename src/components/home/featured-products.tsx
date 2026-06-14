import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import { products } from "@/data/products";

export function FeaturedProducts() {
  const featured = products.slice(0, 4);

  return (
    <Section
      bg="white"
      eyebrow="Featured this week"
      title="Hand-picked, in stock, ready to ship."
      subtitle="Our team checks pricing and stock every morning. If it's listed here, it's available — and we'll send it out today inside Lahore."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Button href="/collections/all" variant="outline" size="lg">
          See all products
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Section>
  );
}
