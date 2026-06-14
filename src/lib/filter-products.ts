import type { Product } from "@/data/products";

export type Sort =
  | "popular"
  | "price-asc"
  | "price-desc"
  | "discount"
  | "newest";

export type ParsedFilters = {
  brands: string[];
  subTypes: string[];
  priceBand: string | undefined;
  sort: Sort;
};

export const PRICE_BANDS: { value: string; label: string; min?: number; max?: number }[] = [
  { value: "u50", label: "Under ₨ 50,000", max: 50000 },
  { value: "50-100", label: "₨ 50,000 – ₨ 100,000", min: 50000, max: 100000 },
  { value: "100-200", label: "₨ 100,000 – ₨ 200,000", min: 100000, max: 200000 },
  { value: "o200", label: "Over ₨ 200,000", min: 200000 },
];

export const SORTS: { value: Sort; label: string }[] = [
  { value: "popular", label: "Most popular" },
  { value: "price-asc", label: "Price — low to high" },
  { value: "price-desc", label: "Price — high to low" },
  { value: "discount", label: "Biggest discount" },
  { value: "newest", label: "Newest first" },
];

type SP = Record<string, string | string[] | undefined>;

function readMulti(sp: SP, key: string): string[] {
  const v = sp[key];
  if (!v) return [];
  const s = Array.isArray(v) ? v[0] : v;
  return s.split(",").map((x) => x.trim()).filter(Boolean);
}

function readOne(sp: SP, key: string): string | undefined {
  const v = sp[key];
  if (!v) return undefined;
  return Array.isArray(v) ? v[0] : v;
}

export function parseFilters(sp: SP): ParsedFilters {
  const sortRaw = readOne(sp, "sort") as Sort | undefined;
  const sort: Sort = SORTS.some((s) => s.value === sortRaw)
    ? (sortRaw as Sort)
    : "popular";
  return {
    brands: readMulti(sp, "brand"),
    subTypes: readMulti(sp, "sub"),
    priceBand: readOne(sp, "price"),
    sort,
  };
}

function score(p: Product): number {
  let s = 0;
  if (p.badges?.includes("featured")) s += 3;
  if (p.badges?.includes("bestseller")) s += 2;
  if (p.badges?.includes("deal")) s += 1;
  return s;
}

function discount(p: Product): number {
  if (!p.originalPrice || p.originalPrice <= p.price) return 0;
  return (p.originalPrice - p.price) / p.originalPrice;
}

export function applyFilters(
  pool: Product[],
  filters: ParsedFilters
): Product[] {
  let out = [...pool];

  if (filters.brands.length) {
    const set = new Set(filters.brands.map((b) => b.toLowerCase()));
    out = out.filter((p) => set.has(p.brand.toLowerCase()));
  }

  if (filters.subTypes.length) {
    const set = new Set(filters.subTypes);
    out = out.filter((p) => p.subTypeSlug && set.has(p.subTypeSlug));
  }

  if (filters.priceBand) {
    const band = PRICE_BANDS.find((b) => b.value === filters.priceBand);
    if (band) {
      out = out.filter((p) => {
        if (band.min !== undefined && p.price < band.min) return false;
        if (band.max !== undefined && p.price > band.max) return false;
        return true;
      });
    }
  }

  switch (filters.sort) {
    case "price-asc":
      out.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      out.sort((a, b) => b.price - a.price);
      break;
    case "discount":
      out.sort((a, b) => discount(b) - discount(a));
      break;
    case "newest":
      out.sort((a, b) => {
        const an = a.badges?.includes("new") ? 1 : 0;
        const bn = b.badges?.includes("new") ? 1 : 0;
        return bn - an;
      });
      break;
    default:
      out.sort((a, b) => score(b) - score(a));
  }

  return out;
}

export function activeFilterCount(f: ParsedFilters): number {
  return f.brands.length + f.subTypes.length + (f.priceBand ? 1 : 0);
}
