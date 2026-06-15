"use client";

import { useState } from "react";
import { Check, Tag, X } from "lucide-react";
import { useCart } from "./cart-provider";

export function CouponField() {
  const { coupon, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `/api/coupons/${encodeURIComponent(code.trim().toUpperCase())}`
      );
      if (!res.ok) {
        setError("That code isn't valid right now.");
        return;
      }
      const body = (await res.json()) as { coupon: Parameters<typeof applyCoupon>[0] };
      applyCoupon(body.coupon);
      setError(null);
      setCode("");
    } catch {
      setError("Couldn't reach the server. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (coupon) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-pine/30 bg-pine/5 px-3 py-2.5">
        <div className="flex items-center gap-2 text-small text-graphite">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-pine text-white">
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
          <span>
            <span className="font-medium">{coupon.code}</span> applied —{" "}
            <span className="text-graphite-400">{coupon.label}</span>
          </span>
        </div>
        <button
          type="button"
          onClick={removeCoupon}
          aria-label="Remove coupon"
          className="grid h-7 w-7 place-items-center rounded-full text-graphite-400 hover:bg-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-1.5">
      <label className="flex items-stretch gap-2">
        <span className="flex flex-1 items-center gap-2 rounded-full border border-mist bg-white px-3.5">
          <Tag className="h-3.5 w-3.5 text-graphite-300" />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Promo code"
            className="h-10 w-full bg-transparent text-small uppercase tracking-wide placeholder:normal-case placeholder:text-graphite-300 focus:outline-none"
          />
        </span>
        <button
          type="submit"
          className="rounded-full bg-graphite px-4 h-10 text-small font-medium text-white hover:bg-graphite-700 transition-colors disabled:opacity-50"
          disabled={!code.trim() || loading}
        >
          {loading ? "…" : "Apply"}
        </button>
      </label>
      {error && <p className="text-caption text-carmine">{error}</p>}
      <p className="text-caption text-graphite-400">
        Try{" "}
        <button
          type="button"
          onClick={() => setCode("WELCOME10")}
          className="underline-offset-4 hover:underline text-copper"
        >
          WELCOME10
        </button>{" "}
        for 10% off
      </p>
    </form>
  );
}
