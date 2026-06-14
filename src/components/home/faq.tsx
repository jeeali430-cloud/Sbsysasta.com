import { Section } from "@/components/ui/section";

const faqs = [
  {
    q: "Are your products genuine and brand-warrantied?",
    a: "Yes — every product on Sbsysasta is 100% original and sealed with the official manufacturer warranty card (Samsung, LG, Haier, Dawlance, Gree, PEL, Orient, TCL etc.). We do not sell refurbished, used, or 'open-box' units as new.",
  },
  {
    q: "Do you offer cash on delivery in Lahore and across Pakistan?",
    a: "Yes. Cash on Delivery is available across all major cities — Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar and more. For Lahore orders, our rider can deliver and collect cash the same day if you order before 4 PM.",
  },
  {
    q: "Do you offer easy monthly installments?",
    a: "Yes. We offer bank EMI plans (UBL, HBL, Faysal, Bank Alfalah, Meezan) with markup as low as 0% on select fridges, ACs and TVs, plus an in-house installment plan that requires only your CNIC and a small advance. Visit the Installments page or message us on WhatsApp to check eligibility.",
  },
  {
    q: "How fast can you deliver inside Lahore?",
    a: "If you order before 4 PM, we deliver inside Lahore the same day. Orders placed after 4 PM go out the next morning. Outside Lahore, standard delivery is 2–4 working days.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Cash on Delivery, JazzCash, EasyPaisa, bank transfer (HBL / Meezan / UBL), and debit/credit cards (Visa, Master). Installation charges, where applicable, can also be paid on delivery.",
  },
  {
    q: "What is your return and replacement policy?",
    a: "7-day easy returns on any unit that arrives damaged, defective, or different from what was ordered. We replace or refund the full amount including delivery — no questions, no restocking fee. Brand warranty handles defects beyond 7 days.",
  },
];

export function FAQ() {
  return (
    <Section
      bg="white"
      eyebrow="Common questions"
      title="Everything Lahore buyers ask before placing an order."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group rounded-xl border border-mist bg-porcelain/40 p-6 transition-colors hover:bg-porcelain"
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
            <p className="mt-3 text-small text-slate text-pretty">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

export const homepageFAQs = faqs;
