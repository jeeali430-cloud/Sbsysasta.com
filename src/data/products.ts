export type ProductSpec = { label: string; value: string };

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
  gallery?: string[];
  highlights: string[];
  description?: string;
  specs?: ProductSpec[];
  rating?: { value: number; count: number };
  inStock: boolean;
  warranty: string;
  bundleWith?: string[];
  badges?: ("featured" | "bestseller" | "new" | "deal")[];
};

const galleryByCategory: Record<string, string[]> = {
  "air-conditioners": [
    "https://images.unsplash.com/photo-1631545806609-e1cb04b7d908?w=900&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581275234363-2e7c1edd6d99?w=900&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1614633833026-0820552978b8?w=900&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1615873968403-89e068629265?w=900&q=85&auto=format&fit=crop",
  ],
  "led-tvs": [
    "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=900&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1467293622093-9f15c96be70f?w=900&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=900&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1601944179066-29786cb9d32a?w=900&q=85&auto=format&fit=crop",
  ],
  refrigerators: [
    "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=900&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1536353284924-9220c464e262?w=900&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584568694244-14fbdf83bd02?w=900&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=900&q=85&auto=format&fit=crop",
  ],
  "washing-machines": [
    "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=900&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=900&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=900&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=900&q=85&auto=format&fit=crop&sat=-30",
  ],
  "microwave-ovens": [
    "https://images.unsplash.com/photo-1574269910231-bc508bcb73e0?w=900&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1585515320310-259814833e62?w=900&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1574269910231-bc508bcb73e0?w=900&q=85&auto=format&fit=crop&sat=-20",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85&auto=format&fit=crop",
  ],
  "kitchen-appliances": [
    "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=900&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1585515320310-259814833e62?w=900&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1574269910231-bc508bcb73e0?w=900&q=85&auto=format&fit=crop",
  ],
};

function buildGallery(image: string, categorySlug: string): string[] {
  const pool = galleryByCategory[categorySlug] ?? [image];
  const set = [image, ...pool.filter((u) => u !== image)];
  return Array.from(new Set(set)).slice(0, 4);
}

const baseList: Omit<Product, "gallery">[] = [
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
      "https://images.unsplash.com/photo-1631545806609-e1cb04b7d908?w=900&q=85&auto=format&fit=crop",
    highlights: [
      "DC Inverter — up to 60% power saving",
      "Heat & Cool, T3 compressor for Lahore summers",
      "10-year compressor warranty",
      "Self-clean & turbo cool modes",
    ],
    description:
      "Built for the Lahore climate, the Haier HSU-18HFCF runs a DC inverter compressor that throttles smoothly between 30% and 110% capacity instead of cycling on and off. In a typical 12x14 ft room, you get a noticeably cooler room in under 90 seconds on Turbo Cool, then drop into a near-silent steady state that holds the set temperature within ±0.5 °C. The T3 compressor is rated to keep cooling output stable up to 55 °C ambient — exactly what Lahore needs in June. The self-clean cycle dries the evaporator after every session to keep that musty smell away. Comes with copper piping, brand-original installation kit, and 1-year unit + 10-year compressor warranty.",
    specs: [
      { label: "Capacity", value: "1.5 Ton (18,000 BTU)" },
      { label: "Type", value: "Split, DC Inverter" },
      { label: "Mode", value: "Heat & Cool" },
      { label: "Compressor", value: "T3 Rotary, Copper" },
      { label: "Energy efficiency", value: "EER 3.5 — A++" },
      { label: "Refrigerant", value: "R-410A" },
      { label: "Noise level", value: "26 dB indoor / 54 dB outdoor" },
      { label: "Installation", value: "Free in Lahore" },
    ],
    rating: { value: 4.7, count: 138 },
    inStock: true,
    warranty: "1 year unit, 10 years compressor",
    bundleWith: ["p-002", "p-006"],
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
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=900&q=85&auto=format&fit=crop",
    highlights: [
      "4K UHD with PurColor & HDR10+",
      "Tizen Smart TV — Netflix, YouTube, Tapmad pre-installed",
      "Object Tracking Sound Lite",
      "Official Samsung Pakistan warranty",
    ],
    description:
      "Samsung's CU7000 is the safe pick for a 55-inch family TV in Lahore — Crystal Processor 4K upscales local cable and YouTube content to near-native UHD, and HDR10+ keeps PSL matches and Netflix dramas looking punchy without crushing the blacks. Tizen OS is faster than most Android TVs in this price range, and the bundled remote has dedicated Netflix, Prime, YouTube and Tapmad keys. Eligible for Samsung Pakistan service across all major cities.",
    specs: [
      { label: "Screen size", value: '55" (139 cm)' },
      { label: "Resolution", value: "3840 × 2160 (4K UHD)" },
      { label: "Panel", value: "Crystal Display, LED-backlit" },
      { label: "HDR", value: "HDR10+, HLG" },
      { label: "OS", value: "Tizen Smart TV" },
      { label: "HDMI / USB", value: "3 × HDMI, 1 × USB" },
      { label: "Sound", value: "20W, Object Tracking Sound Lite" },
      { label: "Wi-Fi / Bluetooth", value: "Wi-Fi 5, Bluetooth 5.2" },
    ],
    rating: { value: 4.6, count: 92 },
    inStock: true,
    warranty: "2 years panel, 1 year parts",
    bundleWith: ["p-001", "p-008"],
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
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=900&q=85&auto=format&fit=crop",
    highlights: [
      "Inverter compressor — low electricity bills",
      "14 cu ft — perfect for a family of 5",
      "Tempered glass shelves & vegetable crisper",
      "12-year compressor warranty",
    ],
    description:
      "Dawlance's Avante+ 9173 WB is the workhorse refrigerator in most Lahore households — built locally, parts available everywhere, and an inverter compressor that drops monthly running cost by ~30% versus the older non-inverter Avante. The 14 cu ft layout gives you a properly tall freezer for 2-litre bottles and a humidity-controlled crisper that keeps vegetables fresh for a real week, not just three days.",
    specs: [
      { label: "Capacity", value: "14 cu ft (398 L)" },
      { label: "Type", value: "Double door, top freezer" },
      { label: "Compressor", value: "Inverter, copper coil" },
      { label: "Cooling", value: "Direct cool" },
      { label: "Shelves", value: "Tempered glass × 3" },
      { label: "Dimensions", value: "1610 × 622 × 660 mm" },
      { label: "Voltage stabilizer", value: "Built-in, 140–260 V" },
      { label: "Made in", value: "Pakistan (Dawlance Karachi)" },
    ],
    rating: { value: 4.8, count: 211 },
    inStock: true,
    warranty: "1 year unit, 12 years compressor",
    bundleWith: ["p-006", "p-008"],
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
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=900&q=85&auto=format&fit=crop",
    highlights: [
      "8 kg capacity, inverter direct motor",
      "16 wash programs, child lock",
      "Pillow Drum — gentle on fabric",
      "1200 RPM spin",
    ],
    description:
      "Haier's HWM-80-BP10829 fits an 8 kg load — enough for a family-size kameez set plus bed sheets — and the inverter direct-drive motor cuts vibration so much that you can stack a basket on top without it walking. 16 programs include a Lahore-friendly 'Heavy Duty' that handles dust and motorcycle exhaust grime on khadi and cotton without bleaching the colour.",
    specs: [
      { label: "Capacity", value: "8 kg" },
      { label: "Type", value: "Front load, fully automatic" },
      { label: "Motor", value: "Inverter direct drive" },
      { label: "Spin speed", value: "1200 RPM" },
      { label: "Programs", value: "16, with child lock" },
      { label: "Energy rating", value: "A++" },
      { label: "Water connection", value: "Cold inlet" },
      { label: "Dimensions", value: "850 × 595 × 540 mm" },
    ],
    rating: { value: 4.6, count: 78 },
    inStock: true,
    warranty: "1 year unit, 10 years motor",
    bundleWith: ["p-003"],
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
      "https://images.unsplash.com/photo-1467293622093-9f15c96be70f?w=900&q=85&auto=format&fit=crop",
    highlights: [
      "Android 11 — Play Store apps",
      "Google Assistant voice remote",
      "Dolby Audio",
      "Chromecast built-in",
    ],
    description:
      "TCL's 43S5400 is the practical Android TV for a second bedroom or drawing room — you get Play Store apps, voice search, and Chromecast for around half the price of the equivalent Samsung. Picture quality is good for SD cable and HD streaming; for true 4K you'll want a larger panel. Excellent for the price point.",
    specs: [
      { label: "Screen size", value: '43" (108 cm)' },
      { label: "Resolution", value: "1920 × 1080 (Full HD)" },
      { label: "Panel", value: "LED, IPS-like" },
      { label: "OS", value: "Android 11 TV" },
      { label: "HDMI / USB", value: "2 × HDMI, 1 × USB" },
      { label: "Voice control", value: "Google Assistant" },
      { label: "Sound", value: "16W, Dolby Audio" },
      { label: "Wi-Fi", value: "Wi-Fi 5, Bluetooth" },
    ],
    rating: { value: 4.4, count: 56 },
    inStock: true,
    warranty: "1 year panel, 1 year parts",
    bundleWith: ["p-008"],
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
      "https://images.unsplash.com/photo-1574269910231-bc508bcb73e0?w=900&q=85&auto=format&fit=crop",
    highlights: [
      "20L capacity with grill function",
      "Press-key control, child lock",
      "Easy-clean cavity",
      "5 power levels",
    ],
    description:
      "Dawlance's DW-115 CG is a no-nonsense 20-litre grill microwave that handles everyday reheating, defrosting, and chicken tikka grill on the side rack. The cavity wipes clean with a damp cloth — important if you reheat a lot of biryani — and the press-key control is more reliable long-term than the rotating dial on cheaper imports.",
    specs: [
      { label: "Capacity", value: "20 litres" },
      { label: "Type", value: "Grill microwave" },
      { label: "Power", value: "700W microwave, 1000W grill" },
      { label: "Control", value: "Press-key (membrane), child lock" },
      { label: "Power levels", value: "5" },
      { label: "Cavity", value: "Easy-clean enamel" },
      { label: "Timer", value: "Up to 30 minutes" },
      { label: "Dimensions", value: "440 × 257 × 358 mm" },
    ],
    rating: { value: 4.5, count: 41 },
    inStock: true,
    warranty: "1 year",
    bundleWith: ["p-003"],
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
      "https://images.unsplash.com/photo-1581275234363-2e7c1edd6d99?w=900&q=85&auto=format&fit=crop",
    highlights: [
      "Inverter compressor — up to 65% power saving",
      "Wi-Fi enabled, Gree+ app control",
      "Heat & cool, T3 ready",
      "Golden fin condenser",
    ],
    description:
      "Gree is the world's largest AC manufacturer for a reason — and the Pular GS-12PITH11W is their take on a reliable 1-ton inverter for a 10×12 ft room. T3-ready means it'll keep cooling at 50 °C+ ambient, which is the cliff cheaper imports fall off in May. Wi-Fi control through Gree+ lets you switch it on 15 minutes before you reach home from work.",
    specs: [
      { label: "Capacity", value: "1 Ton (12,000 BTU)" },
      { label: "Type", value: "Split, DC Inverter" },
      { label: "Mode", value: "Heat & Cool" },
      { label: "Compressor", value: "T3 Rotary, copper" },
      { label: "Wi-Fi", value: "Yes, Gree+ app (iOS / Android)" },
      { label: "Refrigerant", value: "R-410A" },
      { label: "Condenser", value: "Golden fin (corrosion resistant)" },
      { label: "Noise level", value: "27 dB indoor" },
    ],
    rating: { value: 4.5, count: 64 },
    inStock: true,
    warranty: "1 year unit, 10 years compressor",
    bundleWith: ["p-002"],
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
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=900&q=85&auto=format&fit=crop",
    highlights: [
      "3-in-1 blender, grinder, mill",
      "Stainless steel blades",
      "1 year replacement warranty",
      "350W motor",
    ],
    description:
      "Westpoint's WF-9293 covers the three jars every Pakistani kitchen needs — a blender for lassi and smoothies, a chutney jar for masala and ginger-garlic paste, and a dry mill jar for haldi, dhania and garam masala. The stainless steel blades hold their edge much longer than the imported plastic-bodied units in this price range.",
    specs: [
      { label: "Motor", value: "350W" },
      { label: "Jars", value: "Blender 1.25L, chutney 0.4L, mill 0.3L" },
      { label: "Blades", value: "Stainless steel" },
      { label: "Speeds", value: "2 + pulse" },
      { label: "Body", value: "ABS plastic with metal trim" },
      { label: "Cord length", value: "1.2 m" },
      { label: "Voltage", value: "220V / 50Hz" },
    ],
    rating: { value: 4.3, count: 124 },
    inStock: true,
    warranty: "1 year replacement",
    badges: ["deal"],
  },
];

export const products: Product[] = baseList.map((p) => ({
  ...p,
  gallery: buildGallery(p.image, p.categorySlug),
}));

export function getFeaturedProducts() {
  return products
    .filter((p) => p.badges?.includes("featured"))
    .concat(products.filter((p) => p.badges?.includes("bestseller")));
}

export function getDealProducts() {
  return products.filter((p) => p.badges?.includes("deal"));
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(p: Product, limit = 4): Product[] {
  return products
    .filter((x) => x.id !== p.id && x.categorySlug === p.categorySlug)
    .slice(0, limit);
}

export function getBundleProducts(p: Product): Product[] {
  if (!p.bundleWith?.length) return [];
  return p.bundleWith
    .map((id) => getProductById(id))
    .filter((x): x is Product => Boolean(x));
}
