"use client";

import { useState } from "react";
import { CreditCard, ArrowRight } from "lucide-react";
import { formatPKR } from "@/lib/utils";
import { whatsappLink } from "@/data/site";

const TERMS = [
  { months: 6, markup: 0 },
  { months: 12, markup: 0 },
  { months: 18, markup: 8 },
  { months: 24, markup: 12 },
];

function downPayment(price: number) {
  // 20% standard down payment for the in-house plan
  return Math.round(price * 0.2);
}

function monthly(price: number, months: number, markupPct: number) {
  const principal = price - downPayment(price);
  const total = principal * (1 + markupPct / 100);
  return Math.round(total / months);
}

export function InstallmentCalculator({
  price,
  productTitle,
}: {
  price: number;
  productTitle: string;
}) {
  const [months, setMonths] = useState(12);
  const term = TERMS.find((t) => t.months === months) ?? TERMS[1];
  const dp = downPayment(price);
  const mo = monthly(price, term.months, term.markup);

  const waMessage = `Salam! I'd like to buy the ${productTitle} on a ${months}-month installment plan. Down payment: ${formatPKR(dp)}.`;

  return (
    <section className="rounded-xl border border-mist bg-white p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-caption uppercase tracking-[0.16em] text-copper font-medium">
            Easy installments
          </p>
          <h3 className="mt-1 font-display text-h2 font-semibold text-graphite">
            Pick a plan that fits.
          </h3>
        </div>
        <span className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full bg-porcelain text-copper">
          <CreditCard className="h-4 w-4" />
        </span>
      </div>

      <div
        role="radiogroup"
        aria-label="Installment term"
        className="mt-5 grid grid-cols-4 gap-2"
      >
        {TERMS.map((t) => {
          const selected = t.months === months;
          return (
            <button
              key={t.months}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setMonths(t.months)}
              className={`rounded-lg border px-2 py-3 transition-colors ${
                selected
                  ? "border-copper bg-copper-50 text-graphite"
                  : "border-mist bg-white text-graphite hover:border-graphite-200"
              }`}
            >
              <span className="block font-display text-h3 font-semibold tabular-nums">
                {t.months}
              </span>
              <span className="block text-caption text-graphite-400">
                months
              </span>
            </button>
          );
        })}
      </div>

      <dl className="mt-5 grid gap-2 text-small">
        <Row label="Cash price" value={formatPKR(price)} />
        <Row label="Down payment (20%)" value={formatPKR(dp)} />
        <Row
          label="Markup"
          value={term.markup === 0 ? "0% (bank EMI)" : `${term.markup}%`}
        />
        <div className="mt-1 flex items-baseline justify-between border-t border-mist pt-3">
          <span className="font-medium text-graphite">
            Monthly · {term.months} months
          </span>
          <span className="font-display text-h1 font-semibold text-copper tabular-nums">
            {formatPKR(mo)}
          </span>
        </div>
      </dl>

      <a
        href={whatsappLink(waMessage)}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="wa"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-graphite text-white h-11 text-small font-medium hover:bg-graphite-700 transition-colors"
      >
        Apply for this plan on WhatsApp
        <ArrowRight className="h-4 w-4" />
      </a>

      <p className="mt-3 text-caption text-graphite-400 leading-snug">
        Indicative pricing. Final terms depend on the bank EMI plan (UBL · HBL ·
        Faysal · Alfalah · Meezan) or the in-house plan against your CNIC.
      </p>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-graphite-400">{label}</dt>
      <dd className="text-graphite tabular-nums">{value}</dd>
    </div>
  );
}
