import { PolicyLayout } from "@/components/static/policy-layout";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Sbsysasta.com is a Lahore-based home appliances and electronics store delivering genuine Samsung, LG, Haier, Dawlance and more across Pakistan since 2014.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <PolicyLayout
      eyebrow="Our story"
      title="A small Lahore team selling appliances the right way."
      intro="Sbsysasta has been quietly running since 2014. We started as a single shop in Lahore and grew into the online store you're looking at — without losing the part that matters: real after-sales service from the same people who took your order."
    >
      <h2>Why we exist</h2>
      <p>
        Buying a fridge or an AC in Pakistan should not feel like a gamble. We
        watched too many friends pay full price for a "new" appliance only to
        find scratches under the plastic film, a refurbished compressor inside,
        or an installation crew that disappeared with the warranty card. So we
        built Sbsysasta around a simple promise:
      </p>
      <ul>
        <li>
          <strong>Genuine units only.</strong> Every product is brand-sealed with
          the official manufacturer warranty card. We don't sell open-box,
          B-stock, or "China-grade" copies dressed as originals.
        </li>
        <li>
          <strong>Honest pricing.</strong> Our prices match the Hall Road and
          Hafeez Centre rates, refreshed daily. We make our margin on volume,
          not on overcharging a single buyer.
        </li>
        <li>
          <strong>Real after-sales.</strong> Same WhatsApp number you use to
          place the order is the one we use to follow up. No call-center
          handoffs.
        </li>
      </ul>

      <h2>Where we are</h2>
      <p>
        Our warehouse and main showroom are in Lahore. Same-day delivery covers
        the whole city — orders before 4 PM reach you the same day. Outside
        Lahore, we ship via courier within 2–4 working days, with cash on
        delivery available across Pakistan.
      </p>

      <h2>Who runs Sbsysasta</h2>
      <p>
        We're a team of 8 people: 3 on sales and customer support, 2 in
        the warehouse handling QC and dispatch, 2 riders, and one founder who
        still reads every order before it goes out. If you have a complaint or
        a great idea, message us on WhatsApp at +92 320 2785197 — we read every
        message.
      </p>

      <h2>What we sell</h2>
      <p>
        Refrigerators, LED &amp; smart TVs, inverter air conditioners, front
        and top-load washing machines, microwaves &amp; ovens, and the small
        kitchen appliances that every Pakistani household needs. Brand list:
        Samsung, LG, Haier, Dawlance, Gree, PEL, Orient, TCL, EcoStar,
        Westpoint, National, Anex, Black &amp; Decker.
      </p>
    </PolicyLayout>
  );
}
