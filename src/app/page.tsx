import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedProducts } from "@/components/home/featured-products";
import { DailyDeals } from "@/components/home/daily-deals";
import { InstallmentsCTA } from "@/components/home/installments-cta";
import { BrandStrip } from "@/components/home/brand-strip";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Testimonials } from "@/components/home/testimonials";
import { FAQ, homepageFAQs } from "@/components/home/faq";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = buildMetadata({
  title: `${site.name} — Home Appliances & Electronics in Lahore, Pakistan`,
  description:
    "Buy LED TVs, refrigerators, ACs, washing machines and kitchen appliances online in Lahore. Genuine Samsung, LG, Haier, Dawlance, Gree, TCL — Cash on Delivery, easy installments, same-day delivery.",
  path: "/",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homepageFAQs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <TrustStrip />
        <CategoryGrid />
        <FeaturedProducts />
        <DailyDeals />
        <InstallmentsCTA />
        <BrandStrip />
        <WhyChooseUs />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
