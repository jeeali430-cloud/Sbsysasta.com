import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { listCategories } from "@/lib/repo/categories";
import { listProducts } from "@/lib/repo/products";

type Entry = MetadataRoute.Sitemap[number];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products] = await Promise.all([
    listCategories(),
    listProducts(),
  ]);
  const now = new Date();
  const base = site.url;

  const home: Entry = {
    url: base,
    lastModified: now,
    changeFrequency: "daily",
    priority: 1.0,
  };

  const policyUrls: Entry[] = [
    "/installments",
    "/shipping",
    "/returns",
    "/warranty",
    "/about",
    "/contact",
    "/faq",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const virtual: Entry[] = [
    {
      url: `${base}/collections/all`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.6,
    },
    {
      url: `${base}/collections/deals`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  const categoryUrls: Entry[] = categories.map((c) => ({
    url: `${base}/collections/${c.seoSlug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.9,
  }));

  const productUrls: Entry[] = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [home, ...categoryUrls, ...virtual, ...productUrls, ...policyUrls];
}
