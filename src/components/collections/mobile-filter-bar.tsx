"use client";

import { useEffect, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import type { Category } from "@/data/categories";
import { FilterPanel } from "./filter-panel";
import { SortSelect } from "./sort-select";
import { cn } from "@/lib/utils";

export function MobileFilterBar({
  category,
  brandsAvailable,
  activeCount,
  resultCount,
}: {
  category: Category;
  brandsAvailable: string[];
  activeCount: number;
  resultCount: number;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <div className="flex items-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-mist bg-white px-4 h-11 text-small font-medium text-graphite"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeCount > 0 && (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-copper px-1.5 text-caption font-medium text-white">
              {activeCount}
            </span>
          )}
        </button>
        <SortSelect />
      </div>

      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-opacity duration-300",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-graphite/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-2xl bg-porcelain p-6 pb-10 transition-transform duration-400 ease-premium",
            open ? "translate-y-0" : "translate-y-full"
          )}
          role="dialog"
          aria-label="Filters"
        >
          <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-graphite-200" />
          <div className="flex items-center justify-between mb-6">
            <p className="font-display text-h2 font-semibold text-graphite">
              {resultCount} result{resultCount === 1 ? "" : "s"}
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close filters"
              className="grid h-9 w-9 place-items-center rounded-full border border-mist bg-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <FilterPanel
            category={category}
            brandsAvailable={brandsAvailable}
            onApply={() => {}}
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-8 w-full rounded-full bg-graphite text-white h-12 text-body font-medium"
          >
            Show {resultCount} result{resultCount === 1 ? "" : "s"}
          </button>
        </div>
      </div>
    </>
  );
}
