import "server-only";
import { getAdminClient } from "@/lib/supabase/client";

export type AdminOrder = {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  address: string;
  city: string;
  region: "lahore" | "nationwide";
  payment_method: "cod" | "jazzcash" | "easypaisa" | "bank" | "card";
  coupon_code: string | null;
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  notes: string | null;
  items: Array<{ id: string; title: string; quantity: number; price: number }>;
  placed_at: string;
};

export type DashboardStats = {
  totalOrders: number;
  pendingOrders: number;
  revenue30d: number;
  ordersToday: number;
  lowStock: number;
};

export type AdminProduct = {
  id: string;
  slug: string;
  title: string;
  brand_name: string;
  price: number;
  original_price: number | null;
  in_stock: boolean;
  badges: string[] | null;
  rating_count: number | null;
};

export type AdminCoupon = {
  code: string;
  type: "percent" | "flat" | "freeDelivery";
  value: number;
  label: string;
  active: boolean;
  expires_at: string | null;
};

export async function listOrders(limit = 100): Promise<AdminOrder[]> {
  const supabase = getAdminClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("orders")
    .select("*")
    .order("placed_at", { ascending: false })
    .limit(limit);
  return (data as AdminOrder[] | null) ?? [];
}

export async function getOrder(id: string): Promise<AdminOrder | null> {
  const supabase = getAdminClient();
  if (!supabase) return null;
  const { data } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  return (data as AdminOrder | null) ?? null;
}

export async function listProducts(): Promise<AdminProduct[]> {
  const supabase = getAdminClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("products")
    .select(
      "id, slug, title, brand_name, price, original_price, in_stock, badges, rating_count"
    )
    .order("title");
  return (data as AdminProduct[] | null) ?? [];
}

export async function listCoupons(): Promise<AdminCoupon[]> {
  const supabase = getAdminClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("coupons")
    .select("*")
    .order("code");
  return (data as AdminCoupon[] | null) ?? [];
}

export async function dashboardStats(): Promise<DashboardStats> {
  const supabase = getAdminClient();
  if (!supabase)
    return {
      totalOrders: 0,
      pendingOrders: 0,
      revenue30d: 0,
      ordersToday: 0,
      lowStock: 0,
    };

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const [totalRes, pendingRes, revenueRes, todayRes, lowStockRes] =
    await Promise.all([
      supabase.from("orders").select("id", { count: "exact", head: true }),
      supabase
        .from("orders")
        .select("id", { count: "exact", head: true })
        .eq("status", "pending"),
      supabase
        .from("orders")
        .select("total")
        .gte("placed_at", thirtyDaysAgo)
        .in("status", ["confirmed", "shipped", "delivered"]),
      supabase
        .from("orders")
        .select("id", { count: "exact", head: true })
        .gte("placed_at", startOfToday.toISOString()),
      supabase
        .from("products")
        .select("id", { count: "exact", head: true })
        .eq("in_stock", false),
    ]);

  const revenue30d = (
    (revenueRes.data as { total: number }[] | null) ?? []
  ).reduce((s, r) => s + (r.total ?? 0), 0);

  return {
    totalOrders: totalRes.count ?? 0,
    pendingOrders: pendingRes.count ?? 0,
    revenue30d,
    ordersToday: todayRes.count ?? 0,
    lowStock: lowStockRes.count ?? 0,
  };
}
