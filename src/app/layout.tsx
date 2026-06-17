import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import { site } from "@/data/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { CartProvider } from "@/components/cart/cart-provider";
import { CartDrawer } from "@/components/cart/cart-drawer";

const Cursor = dynamic(
  () => import("@/components/effects/cursor").then((m) => m.Cursor),
  { ssr: false }
);

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Home Appliances & Electronics in Lahore, Pakistan`,
    template: `%s · ${site.name}`,
  },
  description:
    "Buy LED TVs, refrigerators, air conditioners, washing machines & kitchen appliances online in Lahore. Genuine Samsung, LG, Haier, Dawlance, Gree, TCL. Cash on Delivery, easy installments, same-day delivery.",
  keywords: [
    "home appliances Lahore",
    "electronics store Lahore",
    "LED TV price in Pakistan",
    "refrigerator price in Pakistan",
    "AC price in Lahore",
    "washing machine price in Pakistan",
    "Dawlance",
    "Haier",
    "Samsung Pakistan",
    "Gree AC Pakistan",
    "installment plans",
    "cash on delivery Lahore",
  ],
  alternates: {
    canonical: site.url,
    languages: {
      "en-PK": site.url,
      "x-default": site.url,
    },
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    locale: "en_PK",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-PK" className={inter.variable}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
        <Cursor />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </body>
    </html>
  );
}
