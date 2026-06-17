import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { OrderConfirmation } from "@/components/checkout/order-confirmation";

export const metadata: Metadata = {
  title: "Order placed",
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-porcelain min-h-screen pb-20">
        <Container className="pt-10 pb-6">
          <Suspense
            fallback={
              <div className="rounded-2xl border border-mist bg-white p-12 text-center text-small text-slate">
                Loading your order…
              </div>
            }
          >
            <OrderConfirmation />
          </Suspense>
        </Container>
      </main>
      <Footer />
    </>
  );
}
