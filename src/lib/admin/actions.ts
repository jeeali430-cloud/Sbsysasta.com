"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/guard";
import { getAdminClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";

type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";
const VALID_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

export async function updateOrderStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as OrderStatus;
  if (!id || !VALID_STATUSES.includes(status)) return;

  const supabase = getAdminClient();
  if (!supabase) return;

  await supabase.from("orders").update({ status }).eq("id", id);
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);
  revalidatePath("/admin");
}

export async function updateProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const price = Number(formData.get("price"));
  const originalPriceRaw = formData.get("original_price");
  const originalPrice =
    typeof originalPriceRaw === "string" && originalPriceRaw.trim().length
      ? Number(originalPriceRaw)
      : null;
  const inStock = formData.get("in_stock") === "on";

  if (!Number.isFinite(price) || price < 0) return;

  const supabase = getAdminClient();
  if (!supabase) return;

  await supabase
    .from("products")
    .update({
      price: Math.round(price),
      original_price: originalPrice !== null ? Math.round(originalPrice) : null,
      in_stock: inStock,
    })
    .eq("id", id);

  revalidatePath("/", "layout");
}

const VALID_BADGES = new Set(["featured", "bestseller", "new", "deal"]);

function parseLines(raw: string | undefined | null): string[] {
  if (!raw) return [];
  return raw
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseSpecs(
  raw: string | undefined | null
): { label: string; value: string }[] {
  return parseLines(raw)
    .map((line) => {
      const idx = line.indexOf(":");
      if (idx === -1) return null;
      const label = line.slice(0, idx).trim();
      const value = line.slice(idx + 1).trim();
      if (!label || !value) return null;
      return { label, value };
    })
    .filter((x): x is { label: string; value: string } => Boolean(x));
}

function parseBadges(formData: FormData): string[] {
  return formData
    .getAll("badges")
    .map(String)
    .filter((b) => VALID_BADGES.has(b));
}

function readPriceFields(formData: FormData) {
  const price = Number(formData.get("price"));
  const originalRaw = formData.get("original_price");
  const installmentRaw = formData.get("installment_from");
  return {
    price: Number.isFinite(price) ? Math.round(price) : 0,
    original_price:
      typeof originalRaw === "string" && originalRaw.trim().length
        ? Math.round(Number(originalRaw))
        : null,
    installment_from:
      typeof installmentRaw === "string" && installmentRaw.trim().length
        ? Math.round(Number(installmentRaw))
        : null,
  };
}

async function nextProductId(): Promise<string> {
  const supabase = getAdminClient();
  if (!supabase) return `p-${Date.now().toString(36)}`;
  const { data } = await supabase
    .from("products")
    .select("id")
    .like("id", "p-%")
    .order("id", { ascending: false })
    .limit(1);
  const last = (data as { id: string }[] | null)?.[0]?.id;
  if (!last) return "p-001";
  const num = Number(last.replace(/^p-/, ""));
  if (!Number.isFinite(num)) return `p-${Date.now().toString(36)}`;
  return `p-${String(num + 1).padStart(3, "0")}`;
}

export async function createProduct(formData: FormData) {
  await requireAdmin();
  const supabase = getAdminClient();
  if (!supabase) redirect("/admin/products?error=db");

  const title = String(formData.get("title") ?? "").trim();
  const brandId = String(formData.get("brand_id") ?? "").trim();
  const brandName = String(formData.get("brand_name") ?? "").trim();
  const categoryId = String(formData.get("category_id") ?? "").trim();
  const subTypeSlug =
    String(formData.get("sub_type_slug") ?? "").trim() || null;
  const image = String(formData.get("image") ?? "").trim();
  const warranty = String(formData.get("warranty") ?? "").trim() || null;
  const description =
    String(formData.get("description") ?? "").trim() || null;

  if (!title || !brandId || !brandName || !categoryId || !image) {
    redirect("/admin/products/new?error=missing-fields");
  }

  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugInput ? slugify(slugInput) : slugify(title);
  const id = await nextProductId();
  const prices = readPriceFields(formData);

  const { error } = await supabase.from("products").insert({
    id,
    slug,
    title,
    brand_id: brandId,
    brand_name: brandName,
    category_id: categoryId,
    sub_type_slug: subTypeSlug,
    image,
    gallery: [image],
    highlights: parseLines(String(formData.get("highlights") ?? "")),
    description,
    specs: parseSpecs(String(formData.get("specs") ?? "")),
    warranty,
    in_stock: formData.get("in_stock") === "on",
    badges: parseBadges(formData),
    ...prices,
  });
  if (error) {
    redirect(
      `/admin/products/new?error=${encodeURIComponent(error.message)}`
    );
  }

  revalidatePath("/", "layout");
  redirect(`/admin/products/${id}/edit?saved=1`);
}

export async function updateProductFull(formData: FormData) {
  await requireAdmin();
  const supabase = getAdminClient();
  if (!supabase) redirect("/admin/products?error=db");

  const id = String(formData.get("id") ?? "");
  if (!id) redirect("/admin/products?error=missing-id");

  const title = String(formData.get("title") ?? "").trim();
  const brandId = String(formData.get("brand_id") ?? "").trim();
  const brandName = String(formData.get("brand_name") ?? "").trim();
  const categoryId = String(formData.get("category_id") ?? "").trim();
  const subTypeSlug =
    String(formData.get("sub_type_slug") ?? "").trim() || null;
  const warranty = String(formData.get("warranty") ?? "").trim() || null;
  const description =
    String(formData.get("description") ?? "").trim() || null;
  const slugInput = String(formData.get("slug") ?? "").trim();
  const prices = readPriceFields(formData);

  if (!title || !brandId || !brandName || !categoryId) {
    redirect(`/admin/products/${id}/edit?error=missing-fields`);
  }

  const { error } = await supabase
    .from("products")
    .update({
      title,
      slug: slugInput ? slugify(slugInput) : slugify(title),
      brand_id: brandId,
      brand_name: brandName,
      category_id: categoryId,
      sub_type_slug: subTypeSlug,
      highlights: parseLines(String(formData.get("highlights") ?? "")),
      description,
      specs: parseSpecs(String(formData.get("specs") ?? "")),
      warranty,
      in_stock: formData.get("in_stock") === "on",
      badges: parseBadges(formData),
      ...prices,
    })
    .eq("id", id);

  if (error) {
    redirect(
      `/admin/products/${id}/edit?error=${encodeURIComponent(error.message)}`
    );
  }

  revalidatePath("/", "layout");
  redirect(`/admin/products/${id}/edit?saved=1`);
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = getAdminClient();
  if (!supabase) return;
  await supabase.from("products").delete().eq("id", id);
  revalidatePath("/", "layout");
  redirect("/admin/products");
}

export async function uploadProductImage(formData: FormData) {
  await requireAdmin();
  const supabase = getAdminClient();
  if (!supabase) return;

  const file = formData.get("image") as File | null;
  const productId = String(formData.get("product_id") ?? "");
  if (!file || file.size === 0 || !productId) return;

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/avif"];
  if (!allowed.includes(file.type)) return;

  const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase();
  const path = `${productId}/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}.${ext}`;

  const buf = Buffer.from(await file.arrayBuffer());
  const { error: upErr } = await supabase.storage
    .from("product-images")
    .upload(path, buf, { contentType: file.type, upsert: false });
  if (upErr) return;

  const {
    data: { publicUrl },
  } = supabase.storage.from("product-images").getPublicUrl(path);

  const { data: prod } = await supabase
    .from("products")
    .select("gallery, image")
    .eq("id", productId)
    .single();
  const current = (prod as { gallery: string[] | null; image: string } | null) ?? {
    gallery: [],
    image: "",
  };
  const nextGallery = [...(current.gallery ?? []), publicUrl];

  await supabase
    .from("products")
    .update({
      gallery: nextGallery,
      image: current.image || publicUrl,
    })
    .eq("id", productId);

  revalidatePath("/", "layout");
}

export async function setPrimaryImage(formData: FormData) {
  await requireAdmin();
  const supabase = getAdminClient();
  if (!supabase) return;
  const id = String(formData.get("product_id") ?? "");
  const url = String(formData.get("url") ?? "");
  if (!id || !url) return;
  await supabase.from("products").update({ image: url }).eq("id", id);
  revalidatePath("/", "layout");
}

export async function removeGalleryImage(formData: FormData) {
  await requireAdmin();
  const supabase = getAdminClient();
  if (!supabase) return;
  const id = String(formData.get("product_id") ?? "");
  const url = String(formData.get("url") ?? "");
  if (!id || !url) return;
  const { data: prod } = await supabase
    .from("products")
    .select("gallery, image")
    .eq("id", id)
    .single();
  const current = (prod as { gallery: string[] | null; image: string } | null) ?? {
    gallery: [],
    image: "",
  };
  const nextGallery = (current.gallery ?? []).filter((u) => u !== url);
  const nextImage =
    current.image === url ? nextGallery[0] ?? current.image : current.image;
  await supabase
    .from("products")
    .update({ gallery: nextGallery, image: nextImage })
    .eq("id", id);
  revalidatePath("/", "layout");
}

export async function setReviewStatus(formData: FormData) {
  await requireAdmin();
  const supabase = getAdminClient();
  if (!supabase) return;
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !["pending", "approved", "hidden"].includes(status)) return;
  await supabase.from("reviews").update({ status }).eq("id", id);
  revalidatePath("/admin/reviews");
}

export async function deleteReview(formData: FormData) {
  await requireAdmin();
  const supabase = getAdminClient();
  if (!supabase) return;
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await supabase.from("reviews").delete().eq("id", id);
  revalidatePath("/admin/reviews");
}

export async function setCouponActive(formData: FormData) {
  await requireAdmin();
  const code = String(formData.get("code") ?? "");
  const active = formData.get("active") === "true";
  if (!code) return;

  const supabase = getAdminClient();
  if (!supabase) return;
  await supabase.from("coupons").update({ active }).eq("code", code);
  revalidatePath("/admin/coupons");
}

export async function createCoupon(formData: FormData) {
  await requireAdmin();
  const code = String(formData.get("code") ?? "")
    .trim()
    .toUpperCase();
  const type = String(formData.get("type") ?? "");
  const valueRaw = Number(formData.get("value") ?? 0);
  const label = String(formData.get("label") ?? "");

  if (!code || !label) return;
  if (!["percent", "flat", "freeDelivery"].includes(type)) return;
  const value = Number.isFinite(valueRaw) ? Math.round(valueRaw) : 0;

  const supabase = getAdminClient();
  if (!supabase) return;
  await supabase
    .from("coupons")
    .upsert({ code, type, value, label, active: true });
  revalidatePath("/admin/coupons");
}
