import { MapPin, Phone, MessageCircle, Mail, Clock } from "lucide-react";
import { PolicyLayout } from "@/components/static/policy-layout";
import { buildMetadata } from "@/lib/seo";
import { site, whatsappLink } from "@/data/site";

export const metadata = buildMetadata({
  title: "Contact Us",
  description:
    "WhatsApp +92 320 2785197 or call 0320 2785197 to reach Sbsysasta. Lahore warehouse — same-day delivery for orders before 4 PM.",
  path: "/contact",
});

const channels = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    sub: "Usually replies within 5 minutes · 10 AM – 9 PM",
    value: site.whatsappDisplay,
    href: whatsappLink(),
    cta: "Open WhatsApp",
  },
  {
    icon: Phone,
    title: "Call us",
    sub: "Sales & support · Mon–Sat 10 AM – 9 PM",
    value: site.supportPhoneDisplay,
    href: `tel:${site.supportPhone}`,
    cta: "Call now",
  },
  {
    icon: Mail,
    title: "Email",
    sub: "For invoices, returns & corporate orders",
    value: site.email,
    href: `mailto:${site.email}`,
    cta: "Send email",
  },
];

export default function ContactPage() {
  return (
    <PolicyLayout
      eyebrow="Talk to us"
      title="We answer every message — usually within minutes."
      intro="WhatsApp is the fastest way to reach us. For pricing on bulk orders, installment eligibility, or after-sales support, send us a message anytime between 10 AM and 9 PM."
    >
      <div className="not-prose grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        {channels.map((c) => (
          <a
            key={c.title}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group flex flex-col rounded-xl border border-mist bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-porcelain text-copper">
              <c.icon className="h-4 w-4" />
            </span>
            <p className="mt-4 font-display text-h3 font-semibold text-graphite">
              {c.title}
            </p>
            <p className="mt-1 text-caption text-graphite-400">{c.sub}</p>
            <p className="mt-3 text-small font-medium text-graphite">{c.value}</p>
            <p className="mt-auto pt-4 text-caption font-medium text-copper group-hover:text-copper-600">
              {c.cta} →
            </p>
          </a>
        ))}
      </div>

      <h2>Visit us</h2>
      <p>
        Our warehouse and showroom is in Lahore. Walk-in customers welcome
        during business hours — bring your CNIC if you're applying for an
        installment plan.
      </p>

      <div className="not-prose grid gap-3 sm:grid-cols-2 rounded-xl border border-mist bg-white p-6 mt-4">
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-4 w-4 text-copper" />
          <div>
            <p className="text-caption uppercase tracking-[0.12em] text-graphite-400">
              Address
            </p>
            <p className="text-small text-graphite">{site.address}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 h-4 w-4 text-copper" />
          <div>
            <p className="text-caption uppercase tracking-[0.12em] text-graphite-400">
              Hours
            </p>
            <p className="text-small text-graphite">{site.hours}</p>
          </div>
        </div>
      </div>

      <div className="not-prose mt-8 overflow-hidden rounded-xl border border-mist">
        <iframe
          title="Sbsysasta Lahore"
          src="https://www.google.com/maps?q=Lahore,Pakistan&output=embed"
          width="100%"
          height="320"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="border-0"
        />
      </div>

      <h2>Bulk &amp; corporate orders</h2>
      <p>
        For housing societies, builders, hotels and offices: we offer discounted
        bundle pricing on orders of 5+ units, scheduled installation, and
        consolidated invoicing. Email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> with your requirement
        and we'll get back the same day.
      </p>
    </PolicyLayout>
  );
}
