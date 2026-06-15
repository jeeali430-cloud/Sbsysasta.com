export type ProductRow = {
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
  rating_value: number | null;
  rating_count: number | null;
  in_stock: boolean;
  warranty: string | null;
  bundle_with: string[] | null;
  badges: string[] | null;
};

export type CategoryRow = {
  id: string;
  slug: string;
  seo_slug: string;
  name: string;
  description: string | null;
  position: number;
};

export type SubTypeRow = {
  id: string;
  category_id: string;
  slug: string;
  name: string;
};

export type BrandRow = {
  id: string;
  slug: string;
  name: string;
  blurb: string | null;
};

export type CouponRow = {
  code: string;
  type: "percent" | "flat" | "freeDelivery";
  value: number;
  label: string;
  active: boolean;
};

export type OrderInsert = {
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
  notes: string | null;
  items: Array<{ id: string; title: string; quantity: number; price: number }>;
};
