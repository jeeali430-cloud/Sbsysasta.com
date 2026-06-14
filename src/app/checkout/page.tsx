import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { CheckoutForm } from "@/components/checkout/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Secure guest checkout. Pay Cash on Delivery, JazzCash, EasyPaisa, bank transfer or card. Same-day delivery in Lahore.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="bg-porcelain min-h-screen pb-20">
        <Container className="pt-10 pb-6">
          <p className="text-caption uppercase tracking-[0.18em] text-copper font-medium">
            Final step
          </p>
          <h1 className="mt-2 font-display text-h1 sm:text-display-lg font-semibold tracking-tight text-graphite">
            Secure checkout
          </h1>
          <p className="mt-2 max-w-xl text-small text-slate">
            No account required. Cash on Delivery available across Pakistan,
            with brand warranty and 7-day easy returns.
          </p>
        </Container>
        <Container>
          <CheckoutForm />
        </Container>
      </main>
      <Footer />
    </>
  );
}
