import {
  products as memProducts,
  type Product,
} from "@/data/products";
import { getServerClient } from "@/lib/supabase/client";
import type { ProductRow } from "@/lib/supabase/types";

type CategoryMini = { id: string; slug: string };

function rowToProduct(row: ProductRow, catSlug: string): Product {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    brand: row.brand_name,
    categorySlug: catSlug,
    subTypeSlug: row.sub_type_slug ?? undefined,
    price: row.price,
    originalPrice: row.original_price ?? undefined,
    installmentFrom: row.installment_from ?? undefined,
    image: row.image,
    gallery: row.gallery ?? undefined,
    highlights: row.highlights ?? [],
    description: row.description ?? undefined,
    specs: row.specs ?? undefined,
    rating: row.rating_value
      ? { value: Number(row.rating_value), count: row.rating_count ?? 0 }
      : undefined,
    inStock: row.in_stock,
    warranty: row.warranty ?? "1 year",
    bundleWith: row.bundle_with ?? undefined,
    badges: (row.badges as Product["badges"]) ?? undefined,
  };
}

async function fetchAll(): Promise<Product[] | null> {
  const supabase = getServerClient();
  if (!supabase) return null;

  const [{ data: products }, { data: cats }] = await Promise.all([
    supabase.from("products").select("*"),
    supabase.from("categories").select("id, slug"),
  ]);

  if (!products) return null;

  const catBySlug = new Map<string, CategoryMini>();
  (cats as CategoryMini[] | null)?.forEach((c) => catBySlug.set(c.id, c));

  return (products as ProductRow[]).map((row) => {
    const cat = row.category_id ? catBySlug.get(row.category_id) : undefined;
    return rowToProduct(row, cat?.slug ?? "");
  });
}

export async function listProducts(): Promise<Product[]> {
  return (await fetchAll()) ?? memProducts;
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  const all = await listProducts();
  return all.find((p) => p.slug === slug);
}

export async function getProductById(
  id: string
): Promise<Product | undefined> {
  const all = await listProducts();
  return all.find((p) => p.id === id);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await listProducts();
  return all
    .filter((p) => p.badges?.includes("featured"))
    .concat(all.filter((p) => p.badges?.includes("bestseller")));
}

export async function getDealProducts(): Promise<Product[]> {
  const all = await listProducts();
  return all.filter((p) => p.badges?.includes("deal"));
}

export async function getRelatedProducts(
  p: Product,
  limit = 4
): Promise<Product[]> {
  const all = await listProducts();
  return all
    .filter((x) => x.id !== p.id && x.categorySlug === p.categorySlug)
    .slice(0, limit);
}

export async function getBundleProducts(p: Product): Promise<Product[]> {
  if (!p.bundleWith?.length) return [];
  const all = await listProducts();
  return p.bundleWith
    .map((id) => all.find((x) => x.id === id))
    .filter((x): x is Product => Boolean(x));
}
