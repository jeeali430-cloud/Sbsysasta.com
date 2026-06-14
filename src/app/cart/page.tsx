import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { Container } from "@/components/ui/container";
import { CartPageInner } from "@/components/cart/cart-page-inner";

export const metadata: Metadata = {
  title: "Your Cart",
  description:
    "Review your selected items. Cash on Delivery, easy monthly installments, same-day delivery in Lahore.",
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="bg-porcelain min-h-screen pb-20">
        <Container className="pt-10 pb-6">
          <p className="text-caption uppercase tracking-[0.18em] text-copper font-medium">
            Your selection
          </p>
          <h1 className="mt-2 font-display text-h1 sm:text-display-lg font-semibold tracking-tight text-graphite">
            Your cart
          </h1>
        </Container>
        <Container>
          <CartPageInner />
        </Container>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
