"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Trash2 } from "lucide-react";
import { useCart } from "./cart-provider";
import { QuantityStepper } from "./quantity-stepper";
import { FreeDeliveryBar } from "./free-delivery-bar";
import { CouponField } from "./coupon-field";
import { couponDiscount } from "@/lib/cart";
import { formatPKR } from "@/lib/utils";

export function CartPageInner() {
  const { items, coupon, subtotal, remove, setQuantity } = useCart();
  const discount = couponDiscount(subtotal, coupon);
  const total = subtotal - discount;

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-mist bg-white p-12 text-center">
        <h2 className="font-display text-h2 font-semibold text-graphite">
          Your cart is empty.
        </h2>
        <p className="mx-auto mt-2 max-w-md text-small text-slate">
          Browse our category grid to find refrigerators, ACs, TVs and more —
          all with same-day delivery in Lahore.
        </p>
        <Link
          href="/collections/all"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-copper px-6 h-11 text-small font-medium text-white hover:bg-copper-600"
        >
          Start shopping <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:gap-12">
      <div className="space-y-4">
        <FreeDeliveryBar subtotal={subtotal} />

        <ul className="space-y-3">
          {items.map((it) => (
            <li
              key={it.id}
              className="flex gap-4 rounded-xl border border-mist bg-white p-4 sm:p-5"
            >
              <Link
                href={`/products/${it.slug}`}
                className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-lg bg-porcelain"
                data-cursor="view"
              >
                <Image
                  src={it.image}
                  alt={it.title}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </Link>
              <div className="min-w-0 flex-1">
                <p className="text-caption uppercase tracking-[0.12em] text-graphite-400">
                  {it.brand}
                </p>
                <Link
                  href={`/products/${it.slug}`}
                  className="block text-small font-medium text-graphite hover:text-copper line-clamp-2 leading-snug"
                >
                  {it.title}
                </Link>
                <p className="mt-1 font-display text-h3 font-semibold text-graphite">
                  {formatPKR(it.price)}
                </p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <QuantityStepper
                    value={it.quantity}
                    onChange={(q) => setQuantity(it.id, q)}
                  />
                  <button
                    type="button"
                    onClick={() => remove(it.id)}
                    aria-label="Remove from cart"
                    className="inline-flex items-center gap-1.5 text-caption text-graphite-400 hover:text-carmine"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-xl border border-mist bg-white p-6 space-y-4">
          <h2 className="font-display text-h2 font-semibold text-graphite">
            Order summary
          </h2>

          <CouponField />

          <div className="space-y-2 text-small border-t border-mist pt-4">
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
                  : "From ₨ 500"
              }
              accent={
                subtotal >= 50000 || coupon?.type === "freeDelivery"
                  ? "pine"
                  : undefined
              }
            />
            <div className="border-t border-mist pt-3 flex items-baseline justify-between">
              <span className="font-medium text-graphite">Estimated total</span>
              <span className="font-display text-h2 font-semibold text-graphite tabular-nums">
                {formatPKR(total)}
              </span>
            </div>
          </div>

          <Link
            href="/checkout"
            data-cursor="cart"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-graphite text-white h-12 text-body font-medium hover:bg-graphite-700 transition-colors"
          >
            Checkout securely
            <ArrowRight className="h-4 w-4" />
          </Link>

          <p className="text-caption text-graphite-400">
            Guest checkout — no account required. Pay Cash on Delivery,
            JazzCash, EasyPaisa, bank transfer or card.
          </p>
        </div>
      </aside>
    </div>
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
