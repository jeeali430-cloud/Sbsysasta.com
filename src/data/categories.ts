export type SubType = {
  name: string;
  slug: string;
};

export type Category = {
  name: string;
  slug: string;
  seoSlug: string;
  description: string;
  subTypes: SubType[];
  brands: string[];
};

export const categories: Category[] = [
  {
    name: "LED & Smart TVs",
    slug: "led-tvs",
    seoSlug: "led-tvs-price-in-lahore",
    description:
      "4K UHD, QLED & Android Smart TVs from Samsung, TCL, Haier and more — with same-day delivery in Lahore.",
    subTypes: [
      { name: "32-43 inch", slug: "32-43-inch" },
      { name: "50-55 inch", slug: "50-55-inch" },
      { name: "65 inch & above", slug: "65-inch-and-above" },
      { name: "QLED", slug: "qled" },
      { name: "Android TV", slug: "android-tv" },
    ],
    brands: ["Samsung", "TCL", "Haier", "EcoStar", "LG"],
  },
  {
    name: "Refrigerators",
    slug: "refrigerators",
    seoSlug: "refrigerators-price-in-pakistan",
    description:
      "Inverter, no-frost and side-by-side refrigerators with full brand warranty and free Lahore delivery.",
    subTypes: [
      { name: "Single Door", slug: "single-door" },
      { name: "Double Door", slug: "double-door" },
      { name: "Side-by-Side", slug: "side-by-side" },
      { name: "Inverter", slug: "inverter" },
    ],
    brands: ["Dawlance", "Haier", "PEL", "Samsung", "LG", "Orient"],
  },
  {
    name: "Air Conditioners",
    slug: "air-conditioners",
    seoSlug: "air-conditioners-price-in-pakistan",
    description:
      "Inverter and floor-standing ACs — 1 ton, 1.5 ton, 2 ton. Heat & cool. Installation available in Lahore.",
    subTypes: [
      { name: "Inverter AC", slug: "inverter-ac" },
      { name: "Floor Standing", slug: "floor-standing" },
      { name: "1 Ton", slug: "1-ton" },
      { name: "1.5 Ton", slug: "1-5-ton" },
      { name: "2 Ton", slug: "2-ton" },
    ],
    brands: ["Gree", "Haier", "Dawlance", "Orient", "PEL", "TCL"],
  },
  {
    name: "Washing Machines",
    slug: "washing-machines",
    seoSlug: "washing-machines-price-in-lahore",
    description:
      "Front load, top load and twin tub washing machines from trusted Pakistani and global brands.",
    subTypes: [
      { name: "Front Load", slug: "front-load" },
      { name: "Top Load Automatic", slug: "top-load-automatic" },
      { name: "Twin Tub / Semi-Auto", slug: "twin-tub" },
      { name: "Washer + Dryer", slug: "washer-dryer" },
    ],
    brands: ["Haier", "Dawlance", "Samsung", "LG", "PEL"],
  },
  {
    name: "Microwave & Ovens",
    slug: "microwave-ovens",
    seoSlug: "microwave-ovens-price-in-pakistan",
    description:
      "Microwave ovens, baking ovens and air fryers — perfect for everyday Lahore kitchens.",
    subTypes: [
      { name: "Solo Microwave", slug: "solo-microwave" },
      { name: "Grill Microwave", slug: "grill-microwave" },
      { name: "Convection / Baking", slug: "convection-baking" },
      { name: "Air Fryers", slug: "air-fryers" },
    ],
    brands: ["Dawlance", "Haier", "PEL", "Samsung", "Orient"],
  },
  {
    name: "Kitchen Appliances",
    slug: "kitchen-appliances",
    seoSlug: "kitchen-appliances-price-in-pakistan",
    description:
      "Blenders, juicers, kettles, sandwich makers, food factories — small appliances for the daily rasoi.",
    subTypes: [
      { name: "Blenders & Juicers", slug: "blenders-juicers" },
      { name: "Kettles", slug: "kettles" },
      { name: "Sandwich Makers", slug: "sandwich-makers" },
      { name: "Food Factory", slug: "food-factory" },
    ],
    brands: ["Westpoint", "National", "Anex", "Black & Decker", "Orient"],
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug || c.seoSlug === slug);
}
