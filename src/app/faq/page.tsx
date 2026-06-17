import { PolicyLayout } from "@/components/static/policy-layout";
import { buildMetadata } from "@/lib/seo";
import { homepageFAQs } from "@/components/home/faq";

export const metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to the most common questions about ordering from Sbsysasta — genuine products, cash on delivery, installments, delivery times, and returns.",
  path: "/faq",
});

const extra = [
  {
    q: "How do I know my refrigerator / AC will fit in my home?",
    a: "Every product page lists the unit's exact dimensions (mm) under Specifications. Measure the entryway, the kitchen alcove, and any stairs the unit needs to clear. If you're not sure, WhatsApp us a photo of the space — we'll tell you whether it fits.",
  },
  {
    q: "Do you provide installation?",
    a: "Yes. For ACs, fridges and front-load washing machines, the brand's installation crew handles it free in major cities (we coordinate the visit). For LED TVs, wall mounting is available on request for ₨ 2,000 inside Lahore.",
  },
  {
    q: "Can I return an item if it doesn't fit?",
    a: "Yes — if the box is unopened and you tell us within 7 days. If you've already opened it and the unit works, we may charge a small restocking fee on full-size appliances to cover the rider's second trip.",
  },
  {
    q: "What if my product breaks during the brand warranty period?",
    a: "WhatsApp us with the serial number. We raise the warranty claim with the brand on your behalf and follow up until it's resolved. Engineers usually visit within 48 hours in Lahore.",
  },
  {
    q: "Do you offer corporate or bulk pricing?",
    a: "Yes — for orders of 5+ units (housing societies, hotels, offices) we offer discounted pricing, scheduled installation and consolidated invoicing. Email support@sbsysasta.com with your requirement.",
  },
];

const allFaqs = [...homepageFAQs, ...extra];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FAQPage() {
  return (
    <>
      <PolicyLayout
        eyebrow="Help"
        title="Frequently asked questions"
        intro="Everything we get asked before, during and after an order. If your question isn't here, WhatsApp us — we update this page based on real customer messages."
        crumbLabel="FAQ"
      >
        <div className="not-prose space-y-3">
          {allFaqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-mist bg-white p-6 transition-colors hover:border-graphite-200"
            >
              <summary className="cursor-pointer list-none font-display text-h3 font-medium text-graphite [&::-webkit-details-marker]:hidden flex items-start justify-between gap-4">
                <span>{f.q}</span>
                <span
                  className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-mist bg-white text-graphite-400 transition-transform group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-small text-slate text-pretty leading-relaxed">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </PolicyLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
