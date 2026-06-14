export type Brand = {
  name: string;
  slug: string;
  blurb: string;
};

export const brands: Brand[] = [
  { name: "Samsung", slug: "samsung", blurb: "Korean tech, global warranty" },
  { name: "LG", slug: "lg", blurb: "Inverter expertise" },
  { name: "Haier", slug: "haier", blurb: "Pakistan-assembled, 12-year compressor" },
  { name: "Dawlance", slug: "dawlance", blurb: "Pakistan's trusted refrigerator brand" },
  { name: "Orient", slug: "orient", blurb: "Local manufacturing, value pricing" },
  { name: "PEL", slug: "pel", blurb: "Heritage Pakistani appliance brand" },
  { name: "TCL", slug: "tcl", blurb: "Smart TVs at honest prices" },
  { name: "Gree", slug: "gree", blurb: "World's largest AC manufacturer" },
  { name: "EcoStar", slug: "ecostar", blurb: "Affordable LED TVs" },
];
