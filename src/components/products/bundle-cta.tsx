"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import type { Product } from "@/data/products";

export function BundleCta({ products }: { products: Product[] }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function onClick() {
    products.forEach((p) => add(p, 1));
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <button
      type="button"
      data-cursor="cart"
      onClick={onClick}
      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-graphite text-white h-12 text-body font-medium hover:bg-graphite-700 transition-colors"
    >
      {added ? (
        <>
          <Check className="h-4 w-4" />
          Bundle added
        </>
      ) : (
        <>
          Add bundle to cart
          <ArrowRight className="h-4 w-4" />
        </>
      )}
    </button>
  );
}
