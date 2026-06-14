"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { X } from "lucide-react";
import type { Category } from "@/data/categories";
import { PRICE_BANDS } from "@/lib/filter-products";
import { cn } from "@/lib/utils";

type FilterPanelProps = {
  category: Category;
  brandsAvailable: string[];
  className?: string;
  onApply?: () => void;
};

export function FilterPanel({
  category,
  brandsAvailable,
  className,
  onApply,
}: FilterPanelProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const current = useMemo(() => {
    return {
      sub: (params.get("sub") ?? "").split(",").filter(Boolean),
      brand: (params.get("brand") ?? "").split(",").filter(Boolean),
      price: params.get("price") ?? "",
    };
  }, [params]);

  const update = useCallback(
    (next: { sub?: string[]; brand?: string[]; price?: string | null }) => {
      const sp = new URLSearchParams(params.toString());
      if (next.sub !== undefined) {
        if (next.sub.length) sp.set("sub", next.sub.join(","));
        else sp.delete("sub");
      }
      if (next.brand !== undefined) {
        if (next.brand.length) sp.set("brand", next.brand.join(","));
        else sp.delete("brand");
      }
      if (next.price !== undefined) {
        if (next.price) sp.set("price", next.price);
        else sp.delete("price");
      }
      const qs = sp.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [params, pathname, router]
  );

  const toggleArray = (key: "sub" | "brand", value: string) => {
    const set = new Set(current[key]);
    if (set.has(value)) set.delete(value);
    else set.add(value);
    update({ [key]: [...set] } as Parameters<typeof update>[0]);
    onApply?.();
  };

  const setPrice = (value: string) => {
    update({ price: value === current.price ? null : value });
    onApply?.();
  };

  const clearAll = () => {
    const sp = new URLSearchParams();
    const sort = params.get("sort");
    if (sort) sp.set("sort", sort);
    const qs = sp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    onApply?.();
  };

  const activeCount =
    current.sub.length + current.brand.length + (current.price ? 1 : 0);

  return (
    <aside className={cn("flex flex-col gap-8", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-display text-h2 font-semibold text-graphite">
          Filters
        </h3>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex items-center gap-1 text-caption text-copper hover:text-copper-600"
          >
            Clear all <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {category.subTypes.length > 0 && (
        <Group title="Type">
          <ul className="space-y-2.5">
            {category.subTypes.map((st) => (
              <CheckRow
                key={st.slug}
                label={st.name}
                checked={current.sub.includes(st.slug)}
                onChange={() => toggleArray("sub", st.slug)}
              />
            ))}
          </ul>
        </Group>
      )}

      {brandsAvailable.length > 0 && (
        <Group title="Brand">
          <ul className="space-y-2.5">
            {brandsAvailable.map((b) => (
              <CheckRow
                key={b}
                label={b}
                checked={current.brand.includes(b.toLowerCase())}
                onChange={() => toggleArray("brand", b.toLowerCase())}
              />
            ))}
          </ul>
        </Group>
      )}

      <Group title="Price">
        <ul className="space-y-2">
          {PRICE_BANDS.map((b) => (
            <li key={b.value}>
              <button
                type="button"
                onClick={() => setPrice(b.value)}
                className={cn(
                  "w-full rounded-md border px-3 py-2 text-left text-small transition-all duration-200",
                  current.price === b.value
                    ? "border-copper bg-copper-50 text-graphite font-medium"
                    : "border-mist bg-white text-slate hover:border-graphite-200"
                )}
              >
                {b.label}
              </button>
            </li>
          ))}
        </ul>
      </Group>
    </aside>
  );
}

function Group({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-3 text-caption uppercase tracking-[0.14em] text-graphite-400">
        {title}
      </p>
      {children}
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <li>
      <label className="group flex cursor-pointer items-center gap-3 text-small text-graphite">
        <span
          className={cn(
            "grid h-4 w-4 shrink-0 place-items-center rounded border transition-colors",
            checked
              ? "border-copper bg-copper"
              : "border-graphite-200 bg-white group-hover:border-graphite"
          )}
        >
          {checked && (
            <svg
              viewBox="0 0 12 12"
              fill="none"
              className="h-3 w-3 text-white"
              aria-hidden
            >
              <path
                d="M2 6.5 5 9.5 10 3.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
        />
        <span className="leading-tight">{label}</span>
      </label>
    </li>
  );
}
