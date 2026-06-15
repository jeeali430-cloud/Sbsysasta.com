import { NextResponse } from "next/server";
import { lookupCoupon } from "@/lib/repo/coupons";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: { code: string } }
) {
  const coupon = await lookupCoupon(params.code);
  if (!coupon) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }
  return NextResponse.json({ ok: true, coupon });
}
