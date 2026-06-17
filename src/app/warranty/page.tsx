import { PolicyLayout } from "@/components/static/policy-layout";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Brand Warranty",
  description:
    "Every product at Sbsysasta is brand-sealed with the official manufacturer warranty card — 1 year on the unit, 10–12 years on compressors and motors.",
  path: "/warranty",
});

export default function WarrantyPage() {
  return (
    <PolicyLayout
      eyebrow="Warranty"
      title="Full brand warranty on every unit."
      intro="We don't sell unbranded, refurbished, or grey-market stock. Every refrigerator, AC, washing machine and TV ships with the official manufacturer warranty card inside the box."
    >
      <h2>Standard warranty by category</h2>
      <ul>
        <li>
          <strong>Refrigerators:</strong> 1 year on the unit, 10–12 years on
          the compressor (varies by brand).
        </li>
        <li>
          <strong>Air conditioners:</strong> 1 year on the unit, 10 years on
          the compressor.
        </li>
        <li>
          <strong>Washing machines:</strong> 1 year on the unit, 10 years on
          the inverter motor.
        </li>
        <li>
          <strong>LED &amp; smart TVs:</strong> 1–2 years on the panel,
          1 year on parts. Samsung Pakistan offers 2 years on the CU series.
        </li>
        <li>
          <strong>Microwaves &amp; small appliances:</strong> 1 year
          replacement warranty.
        </li>
      </ul>
      <p>
        The exact figure for any specific product is on its product page under
        "Warranty" and on the inside of the box.
      </p>

      <h2>How to claim warranty</h2>
      <ol>
        <li>
          Find your warranty card (inside the original product box) — it has
          your purchase date and serial number.
        </li>
        <li>
          WhatsApp us with the serial number and a short description of the
          issue. We'll route you to the right brand service centre or, for
          smaller issues, our own team handles it.
        </li>
        <li>
          For major brands (Samsung, LG, Haier, Dawlance, Gree, PEL), the
          service engineer typically visits within 48 hours in Lahore, 3–5 days
          elsewhere.
        </li>
      </ol>

      <h2>What voids the warranty</h2>
      <ul>
        <li>
          Physical damage — drops, water exposure, broken external panels.
        </li>
        <li>
          Installation by an unauthorised technician (always use the brand's
          installation crew for ACs and front-load washing machines).
        </li>
        <li>
          Voltage spikes if the appliance was used without a stabiliser where
          one is required (refrigerators above 14 cu ft, inverter ACs).
        </li>
        <li>
          Tampered or removed serial number stickers.
        </li>
      </ul>

      <h2>Sbsysasta extended support</h2>
      <p>
        On top of brand warranty, we extend a 7-day no-questions return window
        and a free 1-year support line where our team helps you escalate any
        warranty claim. WhatsApp us anytime — we don't make you fight the brand
        alone.
      </p>
    </PolicyLayout>
  );
}
