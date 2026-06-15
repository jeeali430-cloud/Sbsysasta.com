import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { listCategories } from "@/lib/repo/categories";
import { listProducts } from "@/lib/repo/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products] = await Promise.all([
    listCategories(),
    listProducts(),
  ]);
  const now = new Date();
  const base = site.url;

  const staticUrls = [
    "",
    "/installments",
    "/shipping",
    "/returns",
    "/warranty",
    "/about",
    "/contact",
    "/faq",
    "/privacy",
    "/terms",
  ];

  const categoryUrls = categories.map((c) => `/collections/${c.seoSlug}`);
  const productUrls = products.map((p) => `/products/${p.slug}`);

  return [...staticUrls, ...categoryUrls, ...productUrls].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1.0 : 0.7,
  }));
}
