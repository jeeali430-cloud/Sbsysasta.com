"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuantityStepper({
  value,
  onChange,
  size = "md",
  className,
}: {
  value: number;
  onChange: (next: number) => void;
  size?: "sm" | "md";
  className?: string;
}) {
  const h = size === "sm" ? "h-8" : "h-10";
  const w = size === "sm" ? "w-8" : "w-10";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-mist bg-white",
        className
      )}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(value - 1)}
        className={cn(
          h,
          w,
          "grid place-items-center text-graphite-400 hover:text-graphite transition-colors disabled:opacity-30"
        )}
        disabled={value <= 0}
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span
        className={cn(
          "min-w-8 text-center text-small font-medium tabular-nums",
          h
        )}
        aria-live="polite"
      >
        <span className="grid h-full place-items-center">{value}</span>
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
        className={cn(
          h,
          w,
          "grid place-items-center text-graphite-400 hover:text-graphite transition-colors"
        )}
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
