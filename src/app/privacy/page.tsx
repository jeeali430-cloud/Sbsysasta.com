import { PolicyLayout } from "@/components/static/policy-layout";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Sbsysasta.com collects, uses and protects your personal information when you shop with us.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <PolicyLayout
      eyebrow="Legal"
      title="Privacy Policy"
      intro={`Last updated: ${new Date().toLocaleDateString("en-PK", { year: "numeric", month: "long" })}. This policy explains what we collect, why we collect it, and how we keep it safe.`}
    >
      <h2>What we collect</h2>
      <p>
        When you place an order or sign up for an account, we collect:
      </p>
      <ul>
        <li>Your name, phone number, delivery address and (optional) email.</li>
        <li>Order details — items, prices, payment method and order notes.</li>
        <li>
          Communication you send us on WhatsApp, email or phone — kept for
          customer service history.
        </li>
        <li>
          Basic device information (browser, IP, page paths) via standard web
          server logs.
        </li>
      </ul>

      <h2>What we don't collect</h2>
      <p>
        <strong>We never store your card details.</strong> Card payments are
        processed by Safepay / PayFast — those companies handle PCI-compliant
        card storage, not us. We never see the full card number.
      </p>

      <h2>How we use your data</h2>
      <ul>
        <li>To process and deliver your order.</li>
        <li>To call or message you about an order or a warranty issue.</li>
        <li>
          To follow up on returns, refunds and post-purchase support.
        </li>
        <li>
          To send occasional WhatsApp messages about deals — only if you
          haven't asked us to stop.
        </li>
      </ul>

      <h2>Who we share it with</h2>
      <p>
        We share the minimum needed with:
      </p>
      <ul>
        <li>
          Couriers (Leopards, M&amp;P, TCS) — name, phone, address — to deliver
          your order.
        </li>
        <li>
          Banks — only for installment applications, with your written
          permission.
        </li>
        <li>
          Brand service centres (Samsung, LG, Haier, etc.) — only for warranty
          claims you raise.
        </li>
      </ul>
      <p>
        We do not sell, rent or share your data with marketers or any third
        party not directly involved in fulfilling your order.
      </p>

      <h2>Data retention</h2>
      <p>
        Order records are kept for 7 years for tax and warranty purposes (as
        required by Pakistani law). Marketing preferences are honoured forever
        — once you opt out, we won't contact you for promotions again.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us to:
      </p>
      <ul>
        <li>Show you what we've stored about you.</li>
        <li>Correct anything that's wrong.</li>
        <li>Delete your account (we'll keep only what tax law requires).</li>
        <li>Stop sending you marketing messages.</li>
      </ul>
      <p>
        Email <a href={`mailto:${site.email}`}>{site.email}</a> or WhatsApp us
        at {site.whatsappDisplay}.
      </p>

      <h2>Security</h2>
      <p>
        Customer data is stored in Supabase (database hosted in South Asia),
        encrypted in transit and at rest. Admin access is gated by email
        allowlist + magic-link authentication — no shared passwords.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this page from time to time. The date at the top reflects
        the last change. We won't make material changes without telling you.
      </p>
    </PolicyLayout>
  );
}
