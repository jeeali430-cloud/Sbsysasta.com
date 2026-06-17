import type { Metadata } from "next";
import { site } from "@/data/site";

const HREFLANG_LOCALE = "en-PK";

export function buildMetadata({
  title,
  description,
  path = "/",
  ogImage,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    metadataBase: new URL(site.url),
    alternates: {
      canonical: url,
      languages: {
        [HREFLANG_LOCALE]: url,
        "x-default": url,
      },
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: site.name,
      locale: "en_PK",
      ...(ogImage && {
        images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
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
  logo: `${site.url}/opengraph-image`,
  image: `${site.url}/opengraph-image`,
  telephone: site.supportPhoneDisplay,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  areaServed: [
    { "@type": "City", name: "Lahore" },
    { "@type": "Country", name: "Pakistan" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "10:00",
      closes: "21:00",
    },
  ],
  priceRange: "₨₨",
  paymentAccepted: [
    "Cash on Delivery",
    "JazzCash",
    "EasyPaisa",
    "Bank Transfer",
    "Credit Card",
    "Debit Card",
  ],
  currenciesAccepted: "PKR",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: site.supportPhoneDisplay,
      contactType: "customer support",
      areaServed: "PK",
      availableLanguage: ["en", "ur"],
    },
  ],
  sameAs: [site.social.facebook, site.social.instagram],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}#website`,
  url: site.url,
  name: site.name,
  inLanguage: "en-PK",
  publisher: { "@id": `${site.url}#localbusiness` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${site.url}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export function buildItemListJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: it.url,
    })),
  };
}
