import { PolicyLayout } from "@/components/static/policy-layout";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "The terms you agree to when you order from Sbsysasta.com — pricing, delivery, returns, warranty and liability.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <PolicyLayout
      eyebrow="Legal"
      title="Terms of Service"
      intro={`Last updated: ${new Date().toLocaleDateString("en-PK", { year: "numeric", month: "long" })}. By placing an order with Sbsysasta.com, you agree to the terms below.`}
    >
      <h2>1. Who we are</h2>
      <p>
        Sbsysasta.com is operated by {site.legalName}, a business based in
        Lahore, Pakistan. When we say "we" or "us" we mean {site.legalName}.
      </p>

      <h2>2. Placing an order</h2>
      <p>
        Adding an item to your cart and clicking "Place order" creates an order
        request. We confirm by phone or WhatsApp within a few hours during
        business hours. We reserve the right to decline an order if stock has
        run out, if the price was clearly wrong, or if we cannot verify your
        delivery details.
      </p>

      <h2>3. Pricing and currency</h2>
      <p>
        All prices are in Pakistani Rupees (PKR / ₨) and include applicable
        sales tax. Prices can change at any time — once your order is
        confirmed, the price you paid is the price you owe, even if the price
        on the site drops afterwards.
      </p>

      <h2>4. Payment</h2>
      <p>
        We accept Cash on Delivery, JazzCash, EasyPaisa, bank transfer, and
        Visa / Mastercard via Safepay / PayFast. Card details are never stored
        on our servers.
      </p>

      <h2>5. Delivery</h2>
      <p>
        Estimated delivery times are on the <a href="/shipping">Shipping</a>{" "}
        page. Same-day delivery in Lahore depends on the order being placed
        before 4 PM and the unit being in stock at our warehouse. We are not
        liable for delays caused by force majeure, courier disruptions, or
        incorrect delivery addresses you provided.
      </p>

      <h2>6. Returns and refunds</h2>
      <p>
        7-day no-questions returns apply for damaged, defective, or wrong
        items as described on the <a href="/returns">Returns</a> page. Refunds
        are processed within 48 hours of receiving the returned unit.
      </p>

      <h2>7. Warranty</h2>
      <p>
        Manufacturer warranty is offered on every product as listed on the
        product page and the <a href="/warranty">Warranty</a> page. Warranty
        does not cover physical damage, voltage damage without a stabiliser,
        or unauthorised installation.
      </p>

      <h2>8. Installments</h2>
      <p>
        Bank EMI plans are governed by the terms of your bank, not by us. Our
        in-house installment plan is a separate contract you sign at the time
        of purchase — late payments incur fees, and unpaid balances after 90
        days may result in the unit being repossessed at our cost.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        Our maximum liability for any claim arising from your purchase is the
        amount you paid for the order in question. We are not liable for
        indirect or consequential losses (lost profit, lost data, downtime).
      </p>

      <h2>10. Intellectual property</h2>
      <p>
        All content on Sbsysasta.com — text, images, logos, code — is owned by
        us or our licensors. You may not copy, scrape or republish it without
        written permission.
      </p>

      <h2>11. Contact</h2>
      <p>
        For any question about these terms, email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> or WhatsApp us at{" "}
        {site.whatsappDisplay}.
      </p>
    </PolicyLayout>
  );
}
