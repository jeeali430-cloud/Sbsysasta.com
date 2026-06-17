"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/guard";
import { getAdminClient } from "@/lib/supabase/client";

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

  revalidatePath("/admin/products");
  revalidatePath(`/products/${id}`);
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
