import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/client";

export const runtime = "nodejs";

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

  const product_id = typeof b.product_id === "string" ? b.product_id : null;
  const customer_name =
    typeof b.customer_name === "string" ? b.customer_name.trim() : "";
  const rating = Number(b.rating);
  const title =
    typeof b.title === "string" && b.title.trim() ? b.title.trim() : null;
  const reviewBody =
    typeof b.body === "string" && b.body.trim() ? b.body.trim() : null;
  const city =
    typeof b.city === "string" && b.city.trim() ? b.city.trim() : null;

  if (!product_id) return bad("Product is required");
  if (customer_name.length < 2) return bad("Name is required");
  if (!Number.isFinite(rating) || rating < 1 || rating > 5)
    return bad("Rating must be 1-5");
  if (reviewBody && reviewBody.length > 2000)
    return bad("Review body is too long");

  const supabase = getAdminClient();
  if (!supabase) {
    // Without Supabase configured we accept silently so the form still works
    return NextResponse.json({ ok: true, persisted: false });
  }

  const { error } = await supabase.from("reviews").insert({
    product_id,
    customer_name,
    rating: Math.round(rating),
    title,
    body: reviewBody,
    city,
    status: "pending",
  });
  if (error) return bad(error.message, 500);

  return NextResponse.json({ ok: true, persisted: true });
}
