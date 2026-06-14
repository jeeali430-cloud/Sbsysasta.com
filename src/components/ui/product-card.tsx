import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import type { Product } from "@/data/products";
import { Price } from "./price";
import { Badge } from "./badge";
import { formatPKR } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      data-cursor="view"
      className="group relative flex flex-col overflow-hidden rounded-lg border border-mist bg-white transition-all duration-500 ease-premium hover:-translate-y-1 hover:shadow-lift focus-visible:-translate-y-1 focus-visible:shadow-lift h-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-porcelain">
        <Image
          src={product.image}
          alt={`${product.title} — buy in Lahore`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badges?.includes("bestseller") && (
            <Badge tone="ink">Bestseller</Badge>
          )}
          {product.badges?.includes("new") && <Badge tone="copper">New</Badge>}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <span className="text-caption uppercase tracking-[0.14em] text-graphite-400">
            {product.brand}
          </span>
          {product.inStock && (
            <span className="inline-flex items-center gap-1 text-caption text-pine">
              <span className="h-1.5 w-1.5 rounded-full bg-pine" /> In stock
            </span>
          )}
        </div>

        <h3 className="text-h3 font-display font-medium leading-snug text-graphite line-clamp-2">
          {product.title}
        </h3>

        <Price
          price={product.price}
          originalPrice={product.originalPrice}
          size="sm"
        />

        {product.installmentFrom && (
          <p className="text-caption text-slate">
            EMI from{" "}
            <span className="font-medium text-graphite">
              {formatPKR(product.installmentFrom)}/mo
            </span>
          </p>
        )}

        <div className="mt-auto flex items-center gap-2 pt-2 text-caption text-graphite-400">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>{product.warranty}</span>
        </div>
      </div>
    </Link>
  );
}
