"use client";

import { Truck } from "lucide-react";
import { FREE_DELIVERY_THRESHOLD } from "@/lib/cart";
import { formatPKR } from "@/lib/utils";

export function FreeDeliveryBar({ subtotal }: { subtotal: number }) {
  const reached = subtotal >= FREE_DELIVERY_THRESHOLD;
  const remaining = Math.max(FREE_DELIVERY_THRESHOLD - subtotal, 0);
  const pct = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  return (
    <div className="rounded-lg border border-mist bg-porcelain p-4">
      <div className="flex items-start gap-2.5">
        <span
          className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full ${
            reached ? "bg-pine text-white" : "bg-white text-copper border border-mist"
          }`}
        >
          <Truck className="h-3.5 w-3.5" />
        </span>
        <p className="text-small text-graphite leading-snug">
          {reached ? (
            <span>
              <span className="font-medium">Free delivery unlocked</span> across
              Lahore.
            </span>
          ) : (
            <span>
              Add{" "}
              <span className="font-medium text-graphite">
                {formatPKR(remaining)}
              </span>{" "}
              more for{" "}
              <span className="font-medium">free Lahore delivery</span>.
            </span>
          )}
        </p>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-mist">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${
            reached ? "bg-pine" : "bg-copper"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
