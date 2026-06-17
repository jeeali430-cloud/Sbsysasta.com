import { Star, Quote } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Reveal, RevealStagger, RevealItem } from "@/components/effects/reveal";

const reviews = [
  {
    name: "Ayesha Khan",
    city: "Lahore · DHA Phase 5",
    rating: 5,
    title: "Same-day delivery actually means same day.",
    body: "Ordered a Dawlance fridge at 11 AM, the rider was outside our gate by 6 PM with installation. Original Dawlance card was inside the box. First time in Pakistan I've seen this work.",
    product: "Dawlance 9173 WB Avante+",
  },
  {
    name: "Faisal Mehmood",
    city: "Lahore · Bahria Town",
    rating: 5,
    title: "Honest people. Honest prices.",
    body: "Compared the Haier inverter AC price with Hafeez Centre and three other online shops — Sbsysasta was 8,000 cheaper. Plus installment plan from Meezan at 0% markup. Took the deal.",
    product: "Haier 1.5 Ton Inverter AC",
  },
  {
    name: "Saima Tariq",
    city: "Karachi · Gulshan",
    rating: 5,
    title: "Reached Karachi in 3 days, packed properly.",
    body: "Was nervous ordering a 55-inch TV online from another city. Came in a wooden frame with double padding, zero damage. Tizen smart TV setup took 10 minutes.",
    product: "Samsung 55\" Crystal UHD",
  },
  {
    name: "Ali Raza",
    city: "Lahore · Johar Town",
    rating: 5,
    title: "After-sales is the real differentiator.",
    body: "Our LG washer had a small water inlet issue after 2 months. WhatsApped them — engineer came next day, fixed it under warranty, no charge. Most shops disappear after they take your money.",
    product: "LG Front Load 8kg",
  },
];

export function Testimonials() {
  return (
    <Section
      bg="white"
      eyebrow="Real customer reviews"
      title="What Lahore households are saying."
      subtitle="Genuine reviews from buyers across Pakistan, pulled from WhatsApp follow-ups and post-delivery surveys. Names shown with permission."
    >
      <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {reviews.map((r) => (
          <RevealItem key={r.name + r.product}>
            <article className="relative h-full flex flex-col rounded-xl border border-mist bg-porcelain/30 p-6">
              <Quote
                className="absolute top-5 right-5 h-6 w-6 text-copper/20"
                aria-hidden
              />
              <div className="flex items-center gap-0.5 text-copper">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5"
                    fill={i < r.rating ? "currentColor" : "transparent"}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <h3 className="mt-4 font-display text-h3 font-semibold text-graphite leading-snug">
                "{r.title}"
              </h3>
              <p className="mt-3 text-small text-slate leading-relaxed text-pretty">
                {r.body}
              </p>
              <div className="mt-auto pt-5 border-t border-mist text-caption">
                <p className="font-medium text-graphite">{r.name}</p>
                <p className="text-graphite-400">{r.city}</p>
                <p className="mt-1 text-copper-600">on {r.product}</p>
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealStagger>
    </Section>
  );
}
