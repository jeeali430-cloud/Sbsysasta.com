import { Section } from "@/components/ui/section";
import { categories } from "@/data/categories";
import { Reveal, RevealStagger, RevealItem } from "@/components/effects/reveal";

const points = [
  {
    title: "Real Lahore warehouse",
    body: "We don't drop-ship. Every product on Sbsysasta is held in our Lahore warehouse, inspected, and dispatched the same day for city orders.",
  },
  {
    title: "Prices that match the market",
    body: "Refrigerator, AC and LED TV prices in Pakistan move every week. We re-check ours against the local Hall Road and Hafeez Centre rates daily — so you don't get quoted last month's price.",
  },
  {
    title: "Full brand warranty, never refurbished",
    body: "Every Samsung, LG, Haier, Dawlance, PEL and Gree unit comes sealed with the official brand warranty card. We don't sell open-box or B-stock as new.",
  },
  {
    title: "Installment plans that actually work",
    body: "0% markup options on select fridges, ACs and TVs through bank EMI and our in-house plan. Apply in 5 minutes — approval typically same day.",
  },
];

export function WhyChooseUs() {
  return (
    <Section
      eyebrow="Why Lahore shops with us"
      title="Built for Pakistani buyers — not copy-pasted from a foreign template."
      subtitle="Sbsysasta.com is run by a small team in Lahore that has been selling home appliances since 2014. Here's what that means for you."
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <RevealStagger className="grid gap-5 sm:grid-cols-2">
          {points.map((p) => (
            <RevealItem
              key={p.title}
              className="rounded-xl border border-mist bg-white p-6"
            >
              <h3 className="font-display text-h3 font-semibold text-graphite">
                {p.title}
              </h3>
              <p className="mt-2 text-small text-slate text-pretty">{p.body}</p>
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal className="rounded-xl border border-mist bg-white p-7" delay={0.1}>
          <h3 className="font-display text-h2 font-semibold text-graphite">
            Categories & brands we carry
          </h3>
          <p className="mt-2 text-small text-slate">
            A quick reference for what's available — covering the most-searched
            appliance categories in Lahore and Pakistan.
          </p>
          <table className="mt-5 w-full text-small">
            <thead>
              <tr className="text-left text-caption uppercase tracking-[0.12em] text-graphite-400">
                <th className="border-b border-mist pb-3 font-medium">
                  Category
                </th>
                <th className="border-b border-mist pb-3 font-medium">
                  Brands
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.slug} className="align-top">
                  <td className="border-b border-mist py-3 pr-4 font-medium text-graphite">
                    {c.name}
                  </td>
                  <td className="border-b border-mist py-3 text-slate">
                    {c.brands.join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </Section>
  );
}
