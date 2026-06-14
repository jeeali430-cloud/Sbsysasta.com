import type { Metadata } from "next";
import { site } from "@/data/site";

export function buildMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    metadataBase: new URL(site.url),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: site.name,
      locale: "en_PK",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}#localbusiness`,
  name: site.name,
  legalName: site.legalName,
  description: site.tagline,
  url: site.url,
  telephone: site.supportPhoneDisplay,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressCountry: "PK",
  },
  areaServed: [
    { "@type": "City", name: "Lahore" },
    { "@type": "Country", name: "Pakistan" },
  ],
  openingHours: "Mo-Sa 10:00-21:00",
  priceRange: "₨₨",
};
