"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { SORTS } from "@/lib/filter-products";

export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const current = params.get("sort") ?? "popular";

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sp = new URLSearchParams(params.toString());
    if (e.target.value === "popular") sp.delete("sort");
    else sp.set("sort", e.target.value);
    const qs = sp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <label className="relative inline-flex items-center gap-2 rounded-full border border-mist bg-white pl-4 pr-3 h-11 text-small text-graphite focus-within:border-graphite-200">
      <span className="text-graphite-400">Sort:</span>
      <select
        value={current}
        onChange={onChange}
        className="appearance-none bg-transparent pr-5 font-medium focus:outline-none cursor-pointer"
        aria-label="Sort products"
      >
        {SORTS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="h-4 w-4 text-graphite-400 pointer-events-none"
        aria-hidden
      />
    </label>
  );
}
