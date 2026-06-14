import Image from "next/image";
import { ArrowRight, ShieldCheck, Truck, Award } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { formatPKR } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-porcelain">
      <div
        className="absolute inset-0 bg-hero-mesh pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-grid-faint bg-grid opacity-[0.35] [mask-image:radial-gradient(60%_50%_at_50%_40%,black,transparent)] pointer-events-none"
        aria-hidden
      />

      <Container className="relative">
        <div className="grid gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:gap-8 lg:py-32">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-mist bg-white/70 px-3 py-1.5 text-caption font-medium text-graphite backdrop-blur-sm">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-copper animate-pulse" />
              Featured this week — save up to {formatPKR(25500)}
            </span>

            <h1 className="mt-6 font-display text-display-lg sm:text-[3.25rem] lg:text-display-xl font-semibold tracking-tight text-graphite text-balance">
              Premium appliances.
              <br />
              Honest prices.
              <br />
              <span className="text-copper">Delivered across Lahore.</span>
            </h1>

            <p className="mt-6 max-w-xl text-body text-slate text-pretty">
              Genuine Samsung, LG, Haier, Dawlance, Gree, TCL and more — with
              cash on delivery, easy monthly installments, and same-day delivery
              inside Lahore.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button
                href="/collections/refrigerators-price-in-pakistan"
                variant="primary"
                size="lg"
              >
                Shop Refrigerators
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/installments" variant="outline" size="lg">
                Buy on Installments
              </Button>
            </div>

            <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-small text-graphite-400">
              <li className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-copper" />
                Same-Day Delivery in Lahore
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-copper" />
                1-Year Brand Warranty
              </li>
              <li className="flex items-center gap-2">
                <Award className="h-4 w-4 text-copper" />
                100% Genuine Products
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-[460px] aspect-square">
              <div
                className="absolute inset-0 rounded-full bg-copper/15 blur-3xl"
                aria-hidden
              />
              <div
                className="absolute inset-x-8 bottom-0 h-6 rounded-[50%] bg-graphite/10 blur-2xl"
                aria-hidden
              />
              <div className="relative h-full w-full rounded-2xl border border-mist bg-white/40 backdrop-blur-sm shadow-glow overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1631545806609-e1cb04b7d908?w=900&q=85&auto=format&fit=crop"
                  alt="Haier 1.5 Ton Inverter AC — featured at Sbsysasta Lahore"
                  fill
                  priority
                  sizes="(min-width: 1024px) 460px, 80vw"
                  className="object-cover"
                />
              </div>

              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[88%] rounded-xl border border-mist bg-white px-5 py-4 shadow-lift">
                <p className="text-caption uppercase tracking-[0.14em] text-copper">
                  Editor's pick
                </p>
                <p className="mt-1 font-display text-h3 font-medium text-graphite">
                  Haier 1.5 Ton Inverter AC
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-display text-h2 font-semibold text-graphite">
                    {formatPKR(189500)}
                  </span>
                  <span className="text-caption line-through text-graphite-300">
                    {formatPKR(215000)}
                  </span>
                  <span className="rounded-full bg-graphite px-2 py-0.5 text-caption font-medium text-white">
                    -12%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
