import { PolicyLayout } from "@/components/static/policy-layout";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "7-Day Easy Returns",
  description:
    "Damaged on arrival, wrong item, or defective unit? Sbsysasta replaces or refunds within 7 days — no restocking fee, no hassle. Brand warranty handles defects beyond 7 days.",
  path: "/returns",
});

export default function ReturnsPage() {
  return (
    <PolicyLayout
      eyebrow="Returns"
      title="7-day easy returns"
      intro="If something is wrong with your order, we make it right within 7 days — no restocking fee, no arguing, no forms to fill in 12 different places."
    >
      <h2>What's covered</h2>
      <ul>
        <li>
          <strong>Damaged on arrival.</strong> Box looks fine but the unit is
          dented, scratched or cracked inside — we replace it.
        </li>
        <li>
          <strong>Wrong product.</strong> The item you ordered isn't what
          arrived (wrong model, wrong size, wrong color) — we swap it.
        </li>
        <li>
          <strong>Defective unit.</strong> Doesn't turn on, fault out of the
          box, missing accessories listed in the box manifest — we replace or
          refund.
        </li>
        <li>
          <strong>Doesn't match the description.</strong> Specs on our page
          differ from what you actually received — refund in full, including
          delivery.
        </li>
      </ul>

      <h2>What's not covered (after 7 days)</h2>
      <ul>
        <li>
          Physical damage from drops, water, voltage spikes, or installation
          errors — claim through the brand warranty.
        </li>
        <li>
          Change of mind on opened appliances. (Unopened, sealed boxes are
          accepted up to 7 days.)
        </li>
        <li>
          Wear-and-tear consumables: filters, bulbs, blades, gaskets after the
          first use.
        </li>
      </ul>

      <h2>How to request a return</h2>
      <ol>
        <li>
          Message us on WhatsApp at <strong>+92 320 2785197</strong> within 7
          days of delivery.
        </li>
        <li>
          Send a short video (under 30 seconds) showing the issue, plus your
          order ID (starts with <strong>SBS-…</strong>).
        </li>
        <li>
          We confirm within a few hours and schedule a pickup — same-day inside
          Lahore, 2–3 days for other cities. No charge to you.
        </li>
        <li>
          Once we receive the unit and verify the issue, we either replace it
          or refund the full amount including delivery — typically within 48
          hours.
        </li>
      </ol>

      <h2>Refund timing</h2>
      <ul>
        <li>Cash on Delivery orders → refund via JazzCash, EasyPaisa or bank transfer</li>
        <li>JazzCash / EasyPaisa orders → refunded back to the same wallet</li>
        <li>Card / Safepay orders → reversed on the card within 5–10 working days</li>
      </ul>

      <h2>Beyond 7 days — brand warranty</h2>
      <p>
        Most issues you'll face after 7 days (compressor faults, motor problems,
        panel issues on TVs) are covered by the brand warranty — typically 1
        year on the unit and 10–12 years on the compressor / motor for
        refrigerators and ACs. We help you raise the claim with the brand and
        coordinate the service call.
      </p>
    </PolicyLayout>
  );
}
