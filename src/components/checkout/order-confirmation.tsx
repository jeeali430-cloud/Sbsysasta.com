"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Copy, MessageCircle, Sparkles } from "lucide-react";
import { whatsappLink } from "@/data/site";
import { formatPKR } from "@/lib/utils";

type Order = {
  id: string;
  placedAt: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
  };
  region: "lahore" | "nationwide";
  payment: "cod" | "jazzcash" | "easypaisa" | "bank" | "card";
  coupon: string | null;
  items: { id: string; title: string; quantity: number; price: number }[];
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
};

const payInstructions: Record<Order["payment"], { title: string; body: string }> = {
  cod: {
    title: "Cash on Delivery",
    body: "Our rider will call you 30 minutes before arrival. Please keep the exact amount ready — we'll bring an invoice and warranty card.",
  },
  jazzcash: {
    title: "JazzCash payment",
    body: "We'll send a payment request to your JazzCash number within 15 minutes. Approve it from the JazzCash app to confirm your order.",
  },
  easypaisa: {
    title: "EasyPaisa payment",
    body: "Pay through the EasyPaisa app or any retailer to account 03202785197. WhatsApp us the receipt screenshot to confirm.",
  },
  bank: {
    title: "Bank Transfer",
    body: "Bank details have been emailed to you. Transfer to the listed account and WhatsApp the deposit slip to confirm. Order ships once funds clear.",
  },
  card: {
    title: "Card payment",
    body: "You will receive a Safepay / PayFast secure payment link by email and SMS within 5 minutes. Card details are never stored on our servers.",
  },
};

export function OrderConfirmation() {
  const params = useSearchParams();
  const id = params.get("id");
  const [order, setOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;
    try {
      const raw = window.localStorage.getItem(`sbs-order-${id}`);
      if (raw) setOrder(JSON.parse(raw) as Order);
    } catch {
      /* ignore */
    }
  }, [id]);

  if (!id) {
    return (
      <div className="rounded-2xl border border-mist bg-white p-12 text-center">
        <h1 className="font-display text-h1 font-semibold text-graphite">
          No order found.
        </h1>
        <p className="mt-2 text-small text-slate">
          Looks like you landed here directly. Head back to the shop.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center rounded-full bg-copper px-5 h-11 text-small font-medium text-white"
        >
          Back to home
        </Link>
      </div>
    );
  }

  const waMessage = order
    ? `Salam! I've placed order ${order.id} for ${formatPKR(order.total)}. Please confirm.`
    : `Salam! I've just placed order ${id}. Please confirm.`;

  function copyId() {
    if (!id) return;
    navigator.clipboard?.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:gap-12">
      <div className="space-y-6">
        <div className="rounded-2xl border border-mist bg-white p-8">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-pine/10 text-pine">
            <CheckCircle2 className="h-6 w-6" />
          </span>
          <h1 className="mt-5 font-display text-h1 sm:text-display-lg font-semibold tracking-tight text-graphite text-balance">
            Shukria! Your order is in.
          </h1>
          <p className="mt-3 max-w-xl text-body text-slate">
            We've sent a confirmation to your phone. Our team will call you
            within 30 minutes to verify the delivery slot.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-lg border border-mist bg-porcelain px-4 py-3">
            <p className="text-caption uppercase tracking-[0.12em] text-graphite-400">
              Order ID
            </p>
            <p className="font-mono text-small font-semibold text-graphite">
              {id}
            </p>
            <button
              type="button"
              onClick={copyId}
              className="ml-auto inline-flex items-center gap-1.5 text-caption text-copper hover:text-copper-600"
            >
              <Copy className="h-3.5 w-3.5" />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={whatsappLink(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="wa"
              className="inline-flex items-center gap-2 rounded-full bg-pine px-5 h-11 text-small font-medium text-white hover:bg-pine/90"
            >
              <MessageCircle className="h-4 w-4" />
              Confirm via WhatsApp
            </a>
            <Link
              href="/collections/all"
              className="inline-flex items-center gap-2 rounded-full border border-graphite px-5 h-11 text-small font-medium text-graphite hover:bg-graphite hover:text-white transition-colors"
            >
              Continue shopping
            </Link>
          </div>
        </div>

        {order && (
          <div className="rounded-2xl border border-mist bg-white p-8">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-copper" />
              <h2 className="font-display text-h2 font-semibold text-graphite">
                {payInstructions[order.payment].title}
              </h2>
            </div>
            <p className="mt-2 text-small text-slate text-pretty">
              {payInstructions[order.payment].body}
            </p>
          </div>
        )}

        {order && (
          <div className="rounded-2xl border border-mist bg-white p-8">
            <h2 className="font-display text-h2 font-semibold text-graphite">
              Delivery to
            </h2>
            <p className="mt-2 text-small text-graphite">
              {order.customer.name} · {order.customer.phone}
              <br />
              {order.customer.address}, {order.customer.city}
            </p>
            <p className="mt-3 text-caption text-graphite-400">
              {order.region === "lahore"
                ? "Same-day delivery — our rider will reach you within 4 hours."
                : "Nationwide courier — 2–4 working days."}
            </p>
          </div>
        )}
      </div>

      {order && (
        <aside className="rounded-2xl border border-mist bg-white p-6 space-y-4 lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-display text-h2 font-semibold text-graphite">
            Receipt
          </h2>
          <ul className="space-y-3">
            {order.items.map((it) => (
              <li
                key={it.id}
                className="flex items-start justify-between gap-3 text-small"
              >
                <span className="text-graphite leading-snug">
                  {it.title}
                  <br />
                  <span className="text-caption text-graphite-400">
                    Qty: {it.quantity}
                  </span>
                </span>
                <span className="font-medium text-graphite tabular-nums">
                  {formatPKR(it.price * it.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="space-y-2 border-t border-mist pt-4 text-small">
            <SumRow label="Subtotal" value={formatPKR(order.subtotal)} />
            {order.discount > 0 && (
              <SumRow
                label={`Discount${order.coupon ? ` (${order.coupon})` : ""}`}
                value={`− ${formatPKR(order.discount)}`}
                accent="pine"
              />
            )}
            <SumRow
              label="Delivery"
              value={order.delivery === 0 ? "Free" : formatPKR(order.delivery)}
              accent={order.delivery === 0 ? "pine" : undefined}
            />
            <div className="border-t border-mist pt-3 flex items-baseline justify-between">
              <span className="font-medium text-graphite">Total</span>
              <span className="font-display text-h2 font-semibold text-graphite tabular-nums">
                {formatPKR(order.total)}
              </span>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

function SumRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "pine";
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-graphite-400">{label}</span>
      <span
        className={`tabular-nums ${
          accent === "pine" ? "text-pine font-medium" : "text-graphite"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
