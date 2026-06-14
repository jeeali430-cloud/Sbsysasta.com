"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MessageCircle, ShoppingBag, Check } from "lucide-react";
import { formatPKR } from "@/lib/utils";
import { whatsappLink } from "@/data/site";
import { useCart } from "@/components/cart/cart-provider";
import type { Product } from "@/data/products";

type Props = {
  product: Product;
};

export function StickyBar({ product }: Props) {
  const { title, brand, image, price, originalPrice } = product;
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const message = `Salam! I'm interested in the ${title}. Is it available?`;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-400 ease-premium lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <div className="border-t border-mist bg-white px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-lift">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-mist bg-porcelain">
            <Image src={image} alt="" fill sizes="48px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-caption uppercase tracking-[0.12em] text-graphite-400">
              {brand}
            </p>
            <p className="flex items-baseline gap-1.5">
              <span className="font-display text-h3 font-semibold text-graphite">
                {formatPKR(price)}
              </span>
              {originalPrice && originalPrice > price && (
                <span className="text-caption line-through text-graphite-300">
                  {formatPKR(originalPrice)}
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <a
            href={whatsappLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="wa"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-pine text-small font-medium text-white"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <button
            type="button"
            data-cursor="cart"
            onClick={() => {
              add(product, 1);
              setAdded(true);
              setTimeout(() => setAdded(false), 1400);
            }}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-copper text-small font-medium text-white transition-colors"
          >
            {added ? (
              <>
                <Check className="h-4 w-4" />
                Added
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
