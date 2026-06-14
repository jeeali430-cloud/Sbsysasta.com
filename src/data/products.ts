export type Product = {
  id: string;
  slug: string;
  title: string;
  brand: string;
  categorySlug: string;
  subTypeSlug?: string;
  price: number;
  originalPrice?: number;
  installmentFrom?: number;
  image: string;
  highlights: string[];
  inStock: boolean;
  warranty: string;
  badges?: ("featured" | "bestseller" | "new" | "deal")[];
};

export const products: Product[] = [
  {
    id: "p-001",
    slug: "haier-1-5-ton-inverter-ac-hsu-18hfcf",
    title: "Haier 1.5 Ton Inverter AC — HSU-18HFCF (Heat & Cool)",
    brand: "Haier",
    categorySlug: "air-conditioners",
    subTypeSlug: "inverter-ac",
    price: 189500,
    originalPrice: 215000,
    installmentFrom: 9475,
    image:
      "https://images.unsplash.com/photo-1631545806609-e1cb04b7d908?w=900&q=80&auto=format&fit=crop",
    highlights: [
      "DC Inverter — up to 60% power saving",
      "Heat & Cool, T3 compressor",
      "10-year compressor warranty",
    ],
    inStock: true,
    warranty: "1 year unit, 10 years compressor",
    badges: ["featured", "deal"],
  },
  {
    id: "p-002",
    slug: "samsung-55-inch-crystal-uhd-4k-tv-cu7000",
    title: 'Samsung 55" Crystal UHD 4K Smart TV — CU7000',
    brand: "Samsung",
    categorySlug: "led-tvs",
    subTypeSlug: "50-55-inch",
    price: 142000,
    originalPrice: 159000,
    installmentFrom: 7100,
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=900&q=80&auto=format&fit=crop",
    highlights: [
      "4K UHD with PurColor",
      "Tizen Smart TV — Netflix, YouTube, Tapmad",
      "Official Samsung Pakistan warranty",
    ],
    inStock: true,
    warranty: "2 years panel, 1 year parts",
    badges: ["bestseller"],
  },
  {
    id: "p-003",
    slug: "dawlance-double-door-refrigerator-9173-wb-avante",
    title: "Dawlance Double Door Refrigerator — 9173 WB Avante+",
    brand: "Dawlance",
    categorySlug: "refrigerators",
    subTypeSlug: "double-door",
    price: 134900,
    originalPrice: 149900,
    installmentFrom: 6745,
    image:
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=900&q=80&auto=format&fit=crop",
    highlights: [
      "Inverter compressor, low electricity bills",
      "14 cu ft — perfect for a family of 5",
      "12-year compressor warranty",
    ],
    inStock: true,
    warranty: "1 year unit, 12 years compressor",
    badges: ["bestseller", "deal"],
  },
  {
    id: "p-004",
    slug: "haier-front-load-washing-machine-hwm-80-bp10829",
    title: "Haier Front Load Washing Machine — 8kg HWM-80-BP10829",
    brand: "Haier",
    categorySlug: "washing-machines",
    subTypeSlug: "front-load",
    price: 109500,
    originalPrice: 119500,
    installmentFrom: 5475,
    image:
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=900&q=80&auto=format&fit=crop",
    highlights: [
      "8 kg capacity, inverter motor",
      "16 wash programs, child lock",
      "Pillow Drum — gentle on fabric",
    ],
    inStock: true,
    warranty: "1 year unit, 10 years motor",
    badges: ["new"],
  },
  {
    id: "p-005",
    slug: "tcl-43-inch-android-smart-tv-43s5400",
    title: 'TCL 43" Android Smart TV — 43S5400',
    brand: "TCL",
    categorySlug: "led-tvs",
    subTypeSlug: "32-43-inch",
    price: 64500,
    originalPrice: 72000,
    installmentFrom: 3225,
    image:
      "https://images.unsplash.com/photo-1467293622093-9f15c96be70f?w=900&q=80&auto=format&fit=crop",
    highlights: [
      "Android 11 — Play Store apps",
      "Google Assistant voice remote",
      "Dolby Audio",
    ],
    inStock: true,
    warranty: "1 year panel, 1 year parts",
    badges: ["deal"],
  },
  {
    id: "p-006",
    slug: "dawlance-microwave-oven-dw-115-cg",
    title: "Dawlance Microwave Oven — DW-115 CG (Grill)",
    brand: "Dawlance",
    categorySlug: "microwave-ovens",
    subTypeSlug: "grill-microwave",
    price: 28900,
    originalPrice: 32500,
    installmentFrom: 1445,
    image:
      "https://images.unsplash.com/photo-1574269910231-bc508bcb73e0?w=900&q=80&auto=format&fit=crop",
    highlights: [
      "20L capacity with grill function",
      "Press-key control, child lock",
      "Easy-clean cavity",
    ],
    inStock: true,
    warranty: "1 year",
    badges: ["new"],
  },
  {
    id: "p-007",
    slug: "gree-1-ton-inverter-ac-gs-12pith11w",
    title: "Gree 1 Ton Inverter AC — GS-12PITH11W Pular",
    brand: "Gree",
    categorySlug: "air-conditioners",
    subTypeSlug: "1-ton",
    price: 154900,
    originalPrice: 169000,
    installmentFrom: 7745,
    image:
      "https://images.unsplash.com/photo-1581275234363-2e7c1edd6d99?w=900&q=80&auto=format&fit=crop",
    highlights: [
      "Inverter compressor — saves up to 65% power",
      "Wi-Fi enabled, Gree+ app control",
      "Heat & cool, T3 ready",
    ],
    inStock: true,
    warranty: "1 year unit, 10 years compressor",
  },
  {
    id: "p-008",
    slug: "westpoint-blender-grinder-wf-9293",
    title: "Westpoint Blender Grinder Mixer — WF-9293",
    brand: "Westpoint",
    categorySlug: "kitchen-appliances",
    subTypeSlug: "blenders-juicers",
    price: 11500,
    originalPrice: 13800,
    installmentFrom: 575,
    image:
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=900&q=80&auto=format&fit=crop",
    highlights: [
      "3-in-1 blender, grinder, mill",
      "Stainless steel blades",
      "1 year replacement warranty",
    ],
    inStock: true,
    warranty: "1 year",
    badges: ["deal"],
  },
];

export function getFeaturedProducts() {
  return products.filter((p) => p.badges?.includes("featured")).concat(
    products.filter((p) => p.badges?.includes("bestseller"))
  );
}

export function getDealProducts() {
  return products.filter((p) => p.badges?.includes("deal"));
}
