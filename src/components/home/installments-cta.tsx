import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CreditCard, FileCheck, Clock } from "lucide-react";
import { Reveal } from "@/components/effects/reveal";

export function InstallmentsCTA() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal className="overflow-hidden rounded-2xl border border-mist bg-gradient-to-br from-white via-porcelain to-copper-50">
          <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <p className="text-caption uppercase tracking-[0.18em] text-copper font-medium">
                Easy Monthly Installments
              </p>
              <h2 className="mt-3 font-display text-h1 sm:text-display-lg font-semibold text-graphite text-balance">
                Take it home today. Pay over 6, 12 or 24 months.
              </h2>
              <p className="mt-4 max-w-xl text-body text-slate text-pretty">
                Bank EMI from UBL, HBL, Faysal, Alfalah and Meezan — plus an
                in-house plan for customers without a credit card. Same-day
                approval on most applications.
              </p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-3 text-small">
                <li className="flex items-center gap-2 text-graphite">
                  <CreditCard className="h-4 w-4 text-copper" />
                  0% markup options
                </li>
                <li className="flex items-center gap-2 text-graphite">
                  <FileCheck className="h-4 w-4 text-copper" />
                  Only CNIC required
                </li>
                <li className="flex items-center gap-2 text-graphite">
                  <Clock className="h-4 w-4 text-copper" />
                  Same-day approval
                </li>
              </ul>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  href="/installments"
                  variant="primary"
                  size="lg"
                  data-cursor="read"
                >
                  Check installment plans
                </Button>
                <Button
                  href="https://wa.me/923202785197?text=Salam!%20I%20want%20to%20buy%20on%20installments."
                  variant="ghost"
                  size="lg"
                  data-cursor="wa"
                >
                  Apply on WhatsApp
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl border border-mist bg-white p-6 shadow-soft">
                <p className="text-caption uppercase tracking-[0.14em] text-graphite-400">
                  Example
                </p>
                <p className="mt-2 font-display text-h3 text-graphite">
                  Haier 1.5 Ton Inverter AC
                </p>
                <div className="mt-5 space-y-3 text-small">
                  <Row label="Total price" value="₨ 189,500" />
                  <Row label="Down payment (20%)" value="₨ 37,900" />
                  <Row label="Monthly (12 months)" value="₨ 13,158" highlight />
                  <Row label="Markup" value="0% (bank EMI)" />
                </div>
                <p className="mt-5 text-caption text-graphite-400">
                  Indicative example. Exact terms depend on your bank or our
                  in-house plan.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between border-b border-mist pb-3 last:border-0 last:pb-0 ${
        highlight ? "text-copper font-medium" : "text-graphite"
      }`}
    >
      <span className="text-slate">{label}</span>
      <span className={highlight ? "font-display text-h3" : "font-medium"}>
        {value}
      </span>
    </div>
  );
}
