import type { Product } from "@/data/products";

export type CartItem = {
  id: string;
  slug: string;
  title: string;
  brand: string;
  image: string;
  price: number;
  originalPrice?: number;
  quantity: number;
};

export type Coupon = {
  code: string;
  type: "percent" | "flat" | "freeDelivery";
  value: number;
  label: string;
};

export type CartState = {
  items: CartItem[];
  coupon: Coupon | null;
};

export const FREE_DELIVERY_THRESHOLD = 50000;
export const LAHORE_DELIVERY_FEE = 500;
export const NATIONWIDE_DELIVERY_FEE = 1500;

export const STORAGE_KEY = "sbs-cart-v1";

export function toCartItem(p: Product, qty = 1): CartItem {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    brand: p.brand,
    image: p.image,
    price: p.price,
    originalPrice: p.originalPrice,
    quantity: qty,
  };
}

export function subtotal(items: CartItem[]): number {
  return items.reduce((s, i) => s + i.price * i.quantity, 0);
}

export function originalSubtotal(items: CartItem[]): number {
  return items.reduce(
    (s, i) => s + (i.originalPrice ?? i.price) * i.quantity,
    0
  );
}

export function count(items: CartItem[]): number {
  return items.reduce((s, i) => s + i.quantity, 0);
}

export function couponDiscount(sub: number, coupon: Coupon | null): number {
  if (!coupon) return 0;
  if (coupon.type === "percent")
    return Math.round((sub * coupon.value) / 100);
  if (coupon.type === "flat") return Math.min(coupon.value, sub);
  return 0;
}

export function deliveryFee(
  sub: number,
  coupon: Coupon | null,
  region: "lahore" | "nationwide"
): number {
  if (coupon?.type === "freeDelivery") return 0;
  if (sub >= FREE_DELIVERY_THRESHOLD) return 0;
  return region === "lahore" ? LAHORE_DELIVERY_FEE : NATIONWIDE_DELIVERY_FEE;
}

export function totalDue(
  sub: number,
  coupon: Coupon | null,
  region: "lahore" | "nationwide"
): number {
  return sub - couponDiscount(sub, coupon) + deliveryFee(sub, coupon, region);
}
