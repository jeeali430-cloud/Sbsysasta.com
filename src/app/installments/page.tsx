import { PolicyLayout } from "@/components/static/policy-layout";
import { buildMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/data/site";

export const metadata = buildMetadata({
  title: "Easy Monthly Installments",
  description:
    "Buy refrigerators, ACs, TVs and washing machines on installments — 0% markup bank EMI (UBL, HBL, Faysal, Alfalah, Meezan) or in-house CNIC plan with same-day approval.",
  path: "/installments",
});

export default function InstallmentsPage() {
  return (
    <PolicyLayout
      eyebrow="Easy monthly installments"
      title="Take it home today. Pay over 6, 12 or 24 months."
      intro="We offer two installment paths — bank EMI plans through five major banks at 0% markup on select appliances, and an in-house plan that needs only your CNIC and a small down payment. Approval is usually same day."
      crumbLabel="Installments"
    >
      <h2>Bank EMI plans (recommended)</h2>
      <p>
        If you hold a credit card from any of these banks, you can split the
        full price into monthly installments directly from the bank's app —
        often at 0% markup for 3, 6 or 9 months on select appliances.
      </p>
      <ul>
        <li>UBL</li>
        <li>HBL</li>
        <li>Faysal Bank</li>
        <li>Bank Alfalah</li>
        <li>Meezan Bank</li>
      </ul>
      <p>
        On the product page, look for the monthly figure under the price — that
        figure assumes a 12-month bank EMI at 0% markup. Different banks may
        offer different terms; we'll match you to the best one when you place
        the order.
      </p>

      <h2>In-house plan</h2>
      <p>
        No credit card? No problem. Our in-house plan needs only:
      </p>
      <ul>
        <li>Original CNIC (copy front + back)</li>
        <li>20% down payment</li>
        <li>One reference (family or employer)</li>
      </ul>
      <p>
        Plans are available over 6, 12, 18 or 24 months. Markup ranges from 0%
        (6 months on select items) to ~12% (24 months). You can see the live
        figure on every product page's installment calculator.
      </p>

      <h2>How to apply</h2>
      <ol>
        <li>
          On any product page, tap <strong>Buy on Installments</strong> or use
          the installment calculator to pick a term.
        </li>
        <li>
          Tap <strong>Apply on WhatsApp</strong> — we'll respond with the exact
          documents needed and a price quote.
        </li>
        <li>
          Send your CNIC and reference details. We confirm eligibility within a
          few hours during business hours.
        </li>
        <li>
          Pay the down payment by JazzCash, EasyPaisa or bank transfer. We ship
          the same day for Lahore.
        </li>
      </ol>

      <h2>What can be bought on installments?</h2>
      <p>
        All refrigerators, air conditioners, washing machines, microwave ovens,
        and LED TVs above ₨ 40,000. Small kitchen appliances are cash-only.
      </p>

      <div className="not-prose mt-8 rounded-xl border border-mist bg-white p-6">
        <p className="font-display text-h2 font-semibold text-graphite">
          Ready to start?
        </p>
        <p className="mt-1 text-small text-slate">
          Message us with the product you want and we'll send the exact
          installment plan within 30 minutes.
        </p>
        <div className="mt-5">
          <Button
            href={whatsappLink(
              "Salam! I want to buy on installments. Please send me a plan."
            )}
            variant="primary"
            size="lg"
          >
            Apply on WhatsApp
          </Button>
        </div>
      </div>
    </PolicyLayout>
  );
}
