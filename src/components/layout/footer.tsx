import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { site, whatsappLink } from "@/data/site";
import { listCategories } from "@/lib/repo/categories";
import { PaymentRow } from "@/components/icons/payment";

export async function Footer() {
  const categories = await listCategories();
  return (
    <footer className="bg-graphite text-porcelain">
      <Container>
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="font-display text-h2 font-semibold tracking-tight text-white"
            >
              Sbsysasta<span className="text-copper-300">.</span>
            </Link>
            <p className="mt-4 text-small text-graphite-200">
              Premium home appliances and electronics, delivered across Lahore
              and shipped nationwide. Genuine brands, honest prices, real
              after-sales service.
            </p>
            <div className="mt-6 space-y-2 text-small text-graphite-200">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-copper-300" />
                {site.address}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-copper-300" />
                <a href={`tel:${site.supportPhone}`} className="hover:text-white">
                  {site.supportPhoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-copper-300" />
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-copper-300" />
                {site.hours}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-display text-h3 text-white">Shop by Category</h3>
            <ul className="mt-4 space-y-2 text-small text-graphite-200">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/collections/${c.seoSlug}`}
                    className="hover:text-copper-300 transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-h3 text-white">Customer Care</h3>
            <ul className="mt-4 space-y-2 text-small text-graphite-200">
              <li>
                <Link href="/installments" className="hover:text-copper-300">
                  Easy Monthly Installments
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-copper-300">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-copper-300">
                  7-Day Easy Returns
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="hover:text-copper-300">
                  Brand Warranty
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-copper-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-copper-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-h3 text-white">Talk to us</h3>
            <p className="mt-4 text-small text-graphite-200">
              Need help choosing the right fridge, AC or TV? Message us on
              WhatsApp and a real human will reply.
            </p>
            <a
              href={whatsappLink(
                "Salam! I need a recommendation for an appliance."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center justify-center rounded-full bg-copper px-5 h-11 text-small font-medium text-white hover:bg-copper-600 transition-colors"
            >
              WhatsApp us
            </a>
            <p className="mt-6 text-caption uppercase tracking-[0.18em] text-graphite-300">
              We accept
            </p>
            <PaymentRow className="mt-3" />
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-graphite-600 py-6 text-caption text-graphite-300 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p className="space-x-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
