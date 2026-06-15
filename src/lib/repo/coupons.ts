import { coupons as memCoupons } from "@/data/coupons";
import type { Coupon } from "@/lib/cart";
import { getServerClient } from "@/lib/supabase/client";
import type { CouponRow } from "@/lib/supabase/types";

function rowToCoupon(c: CouponRow): Coupon {
  return { code: c.code, type: c.type, value: c.value, label: c.label };
}

export async function lookupCoupon(code: string): Promise<Coupon | null> {
  const upper = code.trim().toUpperCase();
  if (!upper) return null;

  const supabase = getServerClient();
  if (supabase) {
    const { data } = await supabase
      .from("coupons")
      .select("*")
      .eq("code", upper)
      .eq("active", true)
      .maybeSingle();
    if (data) return rowToCoupon(data as CouponRow);
  }

  return memCoupons.find((c) => c.code === upper) ?? null;
}
