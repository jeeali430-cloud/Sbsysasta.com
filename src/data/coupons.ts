import type { Coupon } from "@/lib/cart";

export const coupons: Coupon[] = [
  {
    code: "WELCOME10",
    type: "percent",
    value: 10,
    label: "10% off your first order",
  },
  {
    code: "LAHORE2K",
    type: "flat",
    value: 2000,
    label: "₨ 2,000 off any order",
  },
  {
    code: "FREESHIP",
    type: "freeDelivery",
    value: 0,
    label: "Free delivery, any city",
  },
];

export function findCoupon(code: string): Coupon | undefined {
  const c = code.trim().toUpperCase();
  return coupons.find((x) => x.code === c);
}
