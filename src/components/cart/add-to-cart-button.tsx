"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "./cart-provider";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

export function AddToCartButton({
  product,
  quantity = 1,
  variant = "primary",
  size = "lg",
  className,
  label = "Add to Cart",
}: {
  product: Product;
  quantity?: number;
  variant?: "primary" | "dark";
  size?: "md" | "lg";
  className?: string;
  label?: string;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function onClick() {
    add(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  const sizeClass = size === "lg" ? "h-[3.25rem] px-7 text-body" : "h-11 px-5 text-small";
  const variantClass =
    variant === "primary"
      ? "bg-copper text-white hover:bg-copper-600 shadow-soft hover:shadow-lift"
      : "bg-graphite text-white hover:bg-graphite-700";

  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor="cart"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 ease-premium focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-porcelain whitespace-nowrap",
        sizeClass,
        variantClass,
        className
      )}
    >
      {added ? (
        <>
          <Check className="h-4 w-4" />
          Added to cart
        </>
      ) : (
        <>
          <ShoppingBag className="h-4 w-4" />
          {label}
        </>
      )}
    </button>
  );
}
