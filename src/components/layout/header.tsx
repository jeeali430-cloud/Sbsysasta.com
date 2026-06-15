import Link from "next/link";
import { Phone, Search, User, Menu } from "lucide-react";
import { Container } from "@/components/ui/container";
import { site, whatsappLink } from "@/data/site";
import { listCategories } from "@/lib/repo/categories";
import { CartButton } from "@/components/cart/cart-button";

export async function Header() {
  const categories = await listCategories();
  return (
    <header className="sticky top-0 z-40 border-b border-mist bg-porcelain/85 backdrop-blur-md">
      <div className="bg-graphite text-porcelain">
        <Container>
          <div className="flex items-center justify-between py-1.5 text-caption">
            <p className="hidden sm:block tracking-wide">
              Same-Day Delivery in Lahore · Cash on Delivery Nationwide · Easy
              Monthly Installments
            </p>
            <p className="sm:hidden tracking-wide">
              Lahore Same-Day Delivery · COD Available
            </p>
            <div className="flex items-center gap-4">
              <a
                href={whatsappLink("Hi, I have a question about your products.")}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 hover:text-copper-200"
              >
                WhatsApp {site.whatsappDisplay}
              </a>
              <a
                href={`tel:${site.supportPhone}`}
                className="inline-flex items-center gap-1.5 hover:text-copper-200"
              >
                <Phone className="h-3 w-3" />
                <span className="hidden sm:inline">{site.supportPhoneDisplay}</span>
                <span className="sm:hidden">Call</span>
              </a>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="font-display text-h2 font-semibold tracking-tight text-graphite"
            >
              Sbsysasta<span className="text-copper">.</span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-7 text-small font-medium text-graphite">
            {categories.slice(0, 5).map((c) => (
              <Link
                key={c.slug}
                href={`/collections/${c.seoSlug}`}
                className="hover:text-copper transition-colors duration-300"
              >
                {c.name}
              </Link>
            ))}
            <Link
              href="/installments"
              className="text-copper hover:text-copper-600 transition-colors duration-300"
            >
              Installments
            </Link>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <button
              aria-label="Search"
              className="rounded-full p-2.5 text-graphite hover:bg-graphite-50 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/account"
              aria-label="Account"
              className="hidden sm:inline-flex rounded-full p-2.5 text-graphite hover:bg-graphite-50 transition-colors"
            >
              <User className="h-5 w-5" />
            </Link>
            <CartButton />
            <button
              aria-label="Menu"
              className="lg:hidden rounded-full p-2.5 text-graphite hover:bg-graphite-50 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
