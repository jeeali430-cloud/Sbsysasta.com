import { PolicyLayout } from "@/components/static/policy-layout";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Shipping & Delivery",
  description:
    "Same-day delivery in Lahore for orders before 4 PM. Nationwide cash on delivery in 2–4 days. Free delivery on orders over ₨ 50,000 in Lahore.",
  path: "/shipping",
});

export default function ShippingPage() {
  return (
    <PolicyLayout
      eyebrow="Delivery"
      title="Shipping & Delivery"
      intro="Where you are decides how fast we reach you. Here's exactly what to expect after you place an order."
    >
      <h2>Lahore — same-day delivery</h2>
      <p>
        Orders placed inside Lahore before <strong>4 PM</strong> are dispatched
        the same day. Our own rider delivers between 3 PM and 9 PM — you'll get
        a WhatsApp message 30 minutes before arrival with the rider's number.
        Orders after 4 PM go out the next morning.
      </p>

      <h3>Delivery charges (Lahore)</h3>
      <ul>
        <li>Orders under ₨ 50,000 → <strong>₨ 500</strong> delivery fee</li>
        <li>Orders ₨ 50,000 and above → <strong>Free delivery</strong></li>
        <li>
          Installation of ACs, fridges, washing machines → handled by brand
          installer (call us within 24 hours of delivery)
        </li>
      </ul>

      <h2>Nationwide — 2–4 working days</h2>
      <p>
        For Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar,
        Gujranwala, Sialkot, Hyderabad and other major cities, we ship via
        Leopards, M&amp;P or TCS — usually 2–4 working days. You'll get a
        tracking number on WhatsApp.
      </p>

      <h3>Delivery charges (other cities)</h3>
      <ul>
        <li>Orders under ₨ 50,000 → <strong>₨ 1,500</strong> delivery fee</li>
        <li>
          Orders ₨ 50,000 and above → Free delivery to all major cities
        </li>
        <li>
          Remote areas may incur an additional courier fee — we'll quote it on
          WhatsApp before dispatch
        </li>
      </ul>

      <h2>Cash on Delivery</h2>
      <p>
        Available everywhere we ship. Please keep the exact amount ready — our
        rider or the courier collects payment in cash on arrival. The invoice
        and warranty card are inside the box.
      </p>

      <h2>Big-item handling</h2>
      <p>
        Refrigerators above 14 cu ft, side-by-side fridges, and floor-standing
        ACs need at least one adult to receive at the door. For 4th-floor
        walk-ups without a lift, please mention it in the order notes so we can
        send a 2-person rider crew.
      </p>

      <h2>Order tracking</h2>
      <p>
        You'll get one WhatsApp update when the order is confirmed, one when
        it ships, and one when the rider is 30 minutes out. For nationwide
        orders, the tracking link goes straight to the courier's portal.
      </p>
    </PolicyLayout>
  );
}
