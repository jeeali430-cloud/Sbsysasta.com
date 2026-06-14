"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, Trash2, X, ArrowRight } from "lucide-react";
import { useCart } from "./cart-provider";
import { QuantityStepper } from "./quantity-stepper";
import { FreeDeliveryBar } from "./free-delivery-bar";
import { CouponField } from "./coupon-field";
import { couponDiscount } from "@/lib/cart";
import { formatPKR } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function CartDrawer() {
  const {
    items,
    coupon,
    subtotal,
    drawerOpen,
    closeDrawer,
    remove,
    setQuantity,
  } = useCart();

  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [drawerOpen]);

  const discount = couponDiscount(subtotal, coupon);
  const total = subtotal - discount;

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeDrawer}
            aria-hidden
            className="fixed inset-0 z-50 bg-graphite/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease }}
            role="dialog"
            aria-label="Your cart"
            className="fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-porcelain shadow-lift"
          >
            <header className="flex items-center justify-between border-b border-mist bg-white px-5 py-4">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-5 w-5 text-graphite" />
                <p className="font-display text-h3 font-semibold text-graphite">
                  Your cart{" "}
                  <span className="text-graphite-400 font-medium">
                    · {items.length} {items.length === 1 ? "item" : "items"}
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close cart"
                className="grid h-9 w-9 place-items-center rounded-full border border-mist bg-white text-graphite hover:bg-porcelain"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {items.length === 0 ? (
                <EmptyCart onClose={closeDrawer} />
              ) : (
                <div className="space-y-5">
                  <FreeDeliveryBar subtotal={subtotal} />

                  <ul className="space-y-4">
                    {items.map((it) => (
                      <li
                        key={it.id}
                        className="flex gap-3 rounded-lg border border-mist bg-white p-3"
                      >
                        <Link
                          href={`/products/${it.slug}`}
                          onClick={closeDrawer}
                          className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-porcelain"
                          data-cursor="view"
                        >
                          <Image
                            src={it.image}
                            alt={it.title}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </Link>
                        <div className="min-w-0 flex-1">
                          <p className="text-caption uppercase tracking-[0.12em] text-graphite-400">
                            {it.brand}
                          </p>
                          <Link
                            href={`/products/${it.slug}`}
                            onClick={closeDrawer}
                            className="block text-small font-medium leading-snug text-graphite line-clamp-2 hover:text-copper"
                          >
                            {it.title}
                          </Link>
                          <div className="mt-2 flex items-center justify-between gap-2">
                            <QuantityStepper
                              size="sm"
                              value={it.quantity}
                              onChange={(q) => setQuantity(it.id, q)}
                            />
                            <p className="font-display text-small font-semibold text-graphite tabular-nums">
                              {formatPKR(it.price * it.quantity)}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(it.id)}
                          aria-label="Remove from cart"
                          className="self-start text-graphite-300 hover:text-carmine"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>

                  <CouponField />
                </div>
              )}
            </div>

            {items.length > 0 && (
              <footer className="border-t border-mist bg-white px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 space-y-3">
                <div className="space-y-1.5 text-small">
                  <Row label="Subtotal" value={formatPKR(subtotal)} />
                  {discount > 0 && (
                    <Row
                      label={`Discount (${coupon?.code})`}
                      value={`− ${formatPKR(discount)}`}
                      accent="pine"
                    />
                  )}
                  <Row
                    label="Delivery"
                    value={
                      subtotal >= 50000 || coupon?.type === "freeDelivery"
                        ? "Free"
                        : "Calculated at checkout"
                    }
                    accent={
                      subtotal >= 50000 || coupon?.type === "freeDelivery"
                        ? "pine"
                        : undefined
                    }
                  />
                  <div className="border-t border-mist pt-2 flex items-baseline justify-between">
                    <span className="font-medium text-graphite">Total</span>
                    <span className="font-display text-h2 font-semibold text-graphite tabular-nums">
                      {formatPKR(total)}
                    </span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  data-cursor="cart"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-graphite text-white h-12 text-body font-medium hover:bg-graphite-700 transition-colors"
                >
                  Checkout securely
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="block w-full text-center text-caption text-graphite-400 hover:text-graphite"
                >
                  Continue shopping
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "pine";
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-graphite-400">{label}</span>
      <span
        className={`tabular-nums ${
          accent === "pine" ? "text-pine font-medium" : "text-graphite"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center py-16 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-white border border-mist text-graphite-300">
        <ShoppingBag className="h-7 w-7" />
      </span>
      <h3 className="mt-5 font-display text-h2 font-semibold text-graphite">
        Your cart is empty.
      </h3>
      <p className="mt-2 max-w-xs text-small text-slate">
        Browse our category grid for refrigerators, ACs, TVs and more — same-day
        delivery in Lahore.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-copper px-5 h-11 text-small font-medium text-white"
      >
        Start shopping
      </button>
    </div>
  );
}
