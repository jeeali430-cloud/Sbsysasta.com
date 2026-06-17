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

export type AdminProductFull = {
  id: string;
  slug: string;
  title: string;
  brand_id: string | null;
  brand_name: string;
  category_id: string | null;
  sub_type_slug: string | null;
  price: number;
  original_price: number | null;
  installment_from: number | null;
  image: string;
  gallery: string[] | null;
  highlights: string[] | null;
  description: string | null;
  specs: { label: string; value: string }[] | null;
  warranty: string | null;
  in_stock: boolean;
  badges: string[] | null;
};

export async function getProductFull(
  id: string
): Promise<AdminProductFull | null> {
  const supabase = getAdminClient();
  if (!supabase) return null;
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  return (data as AdminProductFull | null) ?? null;
}

export type BrandLite = { id: string; slug: string; name: string };
export type CategoryLite = {
  id: string;
  slug: string;
  name: string;
  sub_types: { slug: string; name: string }[];
};

export async function listBrandsLite(): Promise<BrandLite[]> {
  const supabase = getAdminClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("brands")
    .select("id, slug, name")
    .order("name");
  return (data as BrandLite[] | null) ?? [];
}

export async function listCategoriesLite(): Promise<CategoryLite[]> {
  const supabase = getAdminClient();
  if (!supabase) return [];
  const [{ data: cats }, { data: subs }] = await Promise.all([
    supabase.from("categories").select("id, slug, name").order("position"),
    supabase.from("sub_types").select("category_id, slug, name"),
  ]);
  return ((cats as { id: string; slug: string; name: string }[] | null) ?? []).map(
    (c) => ({
      ...c,
      sub_types: (
        (subs as { category_id: string; slug: string; name: string }[] | null) ?? []
      )
        .filter((s) => s.category_id === c.id)
        .map((s) => ({ slug: s.slug, name: s.name })),
    })
  );
}

export type AdminReview = {
  id: string;
  product_id: string | null;
  customer_name: string;
  rating: number;
  title: string | null;
  body: string | null;
  city: string | null;
  status: "pending" | "approved" | "hidden";
  created_at: string;
  products?: { slug: string; title: string } | { slug: string; title: string }[] | null;
};

export async function listReviews(): Promise<AdminReview[]> {
  const supabase = getAdminClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("reviews")
    .select("*, products(slug, title)")
    .order("created_at", { ascending: false });
  return (data as AdminReview[] | null) ?? [];
}

export type AdminCustomer = {
  name: string;
  phone: string;
  email: string | null;
  city: string;
  orderCount: number;
  totalSpent: number;
  lastOrderAt: string;
};

export async function listCustomers(): Promise<AdminCustomer[]> {
  const supabase = getAdminClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("orders")
    .select("customer_name, customer_phone, customer_email, city, total, placed_at, status")
    .order("placed_at", { ascending: false })
    .limit(500);

  const rows =
    (data as
      | {
          customer_name: string;
          customer_phone: string;
          customer_email: string | null;
          city: string;
          total: number;
          placed_at: string;
          status: string;
        }[]
      | null) ?? [];

  const byPhone = new Map<string, AdminCustomer>();
  for (const r of rows) {
    const key = r.customer_phone || `${r.customer_name}@${r.city}`;
    const existing = byPhone.get(key);
    if (existing) {
      existing.orderCount += 1;
      if (r.status !== "cancelled") existing.totalSpent += r.total;
    } else {
      byPhone.set(key, {
        name: r.customer_name,
        phone: r.customer_phone,
        email: r.customer_email,
        city: r.city,
        orderCount: 1,
        totalSpent: r.status === "cancelled" ? 0 : r.total,
        lastOrderAt: r.placed_at,
      });
    }
  }
  return Array.from(byPhone.values()).sort(
    (a, b) => b.totalSpent - a.totalSpent
  );
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
