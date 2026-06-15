import { categories as memCategories, type Category } from "@/data/categories";
import { getServerClient } from "@/lib/supabase/client";
import type { CategoryRow, SubTypeRow } from "@/lib/supabase/types";

function rowToCategory(
  c: CategoryRow,
  subTypes: SubTypeRow[],
  brandNames: string[]
): Category {
  return {
    name: c.name,
    slug: c.slug,
    seoSlug: c.seo_slug,
    description: c.description ?? "",
    subTypes: subTypes
      .filter((s) => s.category_id === c.id)
      .map((s) => ({ name: s.name, slug: s.slug })),
    brands: brandNames,
  };
}

export async function listCategories(): Promise<Category[]> {
  const supabase = getServerClient();
  if (!supabase) return memCategories;

  const [{ data: cats }, { data: subs }, { data: links }] = await Promise.all([
    supabase.from("categories").select("*").order("position"),
    supabase.from("sub_types").select("*"),
    supabase
      .from("category_brands")
      .select("category_id, brand_id, brands(name)"),
  ]);

  if (!cats) return memCategories;

  type LinkRow = {
    category_id: string;
    brand_id: string;
    brands: { name: string } | { name: string }[] | null;
  };
  const linkRows = (links ?? []) as unknown as LinkRow[];

  return (cats as CategoryRow[]).map((c) => {
    const brandNames = linkRows
      .filter((l) => l.category_id === c.id)
      .map((l) => {
        if (!l.brands) return "";
        return Array.isArray(l.brands) ? l.brands[0]?.name ?? "" : l.brands.name;
      })
      .filter(Boolean);
    return rowToCategory(c, (subs as SubTypeRow[]) ?? [], brandNames);
  });
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | undefined> {
  const list = await listCategories();
  return list.find((c) => c.slug === slug || c.seoSlug === slug);
}
