import { NextResponse } from "next/server";
import { createOrder } from "@/lib/repo/orders";
import type { OrderInsert } from "@/lib/supabase/types";

export const runtime = "nodejs";

const PAYMENTS = new Set(["cod", "jazzcash", "easypaisa", "bank", "card"]);
const REGIONS = new Set(["lahore", "nationwide"]);

function bad(msg: string, status = 400) {
  return NextResponse.json({ ok: false, error: msg }, { status });
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return bad("Invalid JSON");
  }

  if (typeof body !== "object" || body === null) return bad("Invalid body");
  const b = body as Record<string, unknown>;

  if (typeof b.id !== "string" || !b.id.startsWith("SBS-")) return bad("Bad id");
  if (typeof b.customer_name !== "string" || b.customer_name.length < 2)
    return bad("Name required");
  if (typeof b.customer_phone !== "string" || b.customer_phone.length < 7)
    return bad("Phone required");
  if (typeof b.address !== "string" || b.address.length < 5)
    return bad("Address required");
  if (typeof b.city !== "string") return bad("City required");
  if (typeof b.region !== "string" || !REGIONS.has(b.region))
    return bad("Bad region");
  if (typeof b.payment_method !== "string" || !PAYMENTS.has(b.payment_method))
    return bad("Bad payment method");
  if (typeof b.total !== "number" || b.total < 0) return bad("Bad total");
  if (!Array.isArray(b.items) || b.items.length === 0)
    return bad("No items in order");

  const input: OrderInsert = {
    id: b.id,
    customer_name: b.customer_name,
    customer_phone: b.customer_phone,
    customer_email:
      typeof b.customer_email === "string" && b.customer_email
        ? b.customer_email
        : null,
    address: b.address,
    city: b.city,
    region: b.region as OrderInsert["region"],
    payment_method: b.payment_method as OrderInsert["payment_method"],
    coupon_code:
      typeof b.coupon_code === "string" && b.coupon_code ? b.coupon_code : null,
    subtotal: Number(b.subtotal ?? 0),
    discount: Number(b.discount ?? 0),
    delivery: Number(b.delivery ?? 0),
    total: Number(b.total),
    notes: typeof b.notes === "string" ? b.notes : null,
    items: b.items as OrderInsert["items"],
  };

  const result = await createOrder(input);
  if (!result.ok) return bad(result.error, 500);

  return NextResponse.json(result);
}
