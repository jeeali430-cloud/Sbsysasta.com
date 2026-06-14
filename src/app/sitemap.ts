import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
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
