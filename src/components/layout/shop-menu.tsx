"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "@/data/categories";

type Props = {
  categories: Category[];
};

export function ShopMenu({ categories }: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close on outside click + Escape
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-1 hover:text-copper transition-colors duration-300"
      >
        Shop
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      <div
        role="menu"
        className={cn(
          "absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3",
          "transition-opacity duration-200",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="w-[520px] rounded-xl border border-mist bg-white shadow-lift p-4">
          <div className="grid grid-cols-2 gap-1">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/collections/${c.seoSlug}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-small font-medium text-graphite hover:bg-porcelain hover:text-copper transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
          <div className="mt-3 border-t border-mist pt-3 flex items-center justify-between text-caption">
            <Link
              href="/collections/deals"
              onClick={() => setOpen(false)}
              className="font-medium text-copper hover:text-copper-600"
            >
              Today's Deals →
            </Link>
            <Link
              href="/installments"
              onClick={() => setOpen(false)}
              className="font-medium text-graphite hover:text-copper"
            >
              Easy Installments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
