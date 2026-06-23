"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Phone, MessageCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { site, whatsappLink } from "@/data/site";
import { Logo } from "@/components/ui/logo";
import type { Category } from "@/data/categories";

type Props = {
  categories: Category[];
};

export function MobileMenu({ categories }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="lg:hidden rounded-full p-2.5 text-graphite hover:bg-graphite-50 transition-colors"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-opacity duration-300",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-graphite/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <aside
          className={cn(
            "absolute inset-y-0 right-0 flex w-full max-w-xs flex-col bg-porcelain shadow-lift transition-transform duration-400 ease-premium",
            open ? "translate-x-0" : "translate-x-full"
          )}
          role="dialog"
          aria-label="Main menu"
        >
          <header className="flex items-center justify-between border-b border-mist bg-white px-5 py-4">
            <span onClick={() => setOpen(false)}>
              <Logo size="sm" />
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-mist bg-white text-graphite hover:bg-porcelain"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <nav className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
            <div>
              <p className="mb-2 text-caption uppercase tracking-[0.16em] text-graphite-400">
                Menu
              </p>
              <ul className="space-y-1">
                {[
                  { href: "/", label: "Home" },
                  { href: "/installments", label: "Installments" },
                  { href: "/about", label: "About" },
                  { href: "/contact", label: "Contact" },
                  { href: "/privacy", label: "Privacy Policy" },
                  { href: "/terms", label: "Terms" },
                  { href: "/faq", label: "FAQ" },
                  { href: "/account", label: "My Account" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-lg px-3 py-2.5 text-body font-medium text-graphite hover:bg-white"
                    >
                      <span>{l.label}</span>
                      <ChevronRight className="h-4 w-4 text-graphite-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-2 text-caption uppercase tracking-[0.16em] text-graphite-400">
                Shop by Category
              </p>
              <ul className="space-y-1">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/collections/${c.seoSlug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-lg px-3 py-2.5 text-small text-graphite hover:bg-white"
                    >
                      <span>{c.name}</span>
                      <ChevronRight className="h-4 w-4 text-graphite-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <footer className="border-t border-mist bg-white px-5 py-4 space-y-2">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-pine text-white h-11 text-small font-medium"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp {site.whatsappDisplay}
            </a>
            <a
              href={`tel:${site.supportPhone}`}
              className="flex items-center justify-center gap-2 rounded-full border border-graphite text-graphite h-11 text-small font-medium"
            >
              <Phone className="h-4 w-4" />
              {site.supportPhoneDisplay}
            </a>
          </footer>
        </aside>
      </div>
    </>
  );
}
