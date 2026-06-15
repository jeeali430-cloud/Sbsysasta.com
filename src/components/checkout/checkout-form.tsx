"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Banknote,
  CreditCard,
  Smartphone,
  Building2,
  ShieldCheck,
  Truck,
  RefreshCcw,
  Lock,
} from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { CouponField } from "@/components/cart/coupon-field";
import {
  couponDiscount,
  deliveryFee,
  totalDue,
} from "@/lib/cart";
import { formatPKR } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Region = "lahore" | "nationwide";
type Pay = "cod" | "jazzcash" | "easypaisa" | "bank" | "card";

const payMethods: { id: Pay; label: string; sub: string; icon: typeof Banknote }[] = [
  {
    id: "cod",
    label: "Cash on Delivery",
    sub: "Pay the rider in cash — across Pakistan",
    icon: Banknote,
  },
  {
    id: "jazzcash",
    label: "JazzCash",
    sub: "We'll send a payment request to your number",
    icon: Smartphone,
  },
  {
    id: "easypaisa",
    label: "EasyPaisa",
    sub: "Pay via the EasyPaisa app or shop",
    icon: Smartphone,
  },
  {
    id: "bank",
    label: "Bank Transfer",
    sub: "Bank details emailed after order",
    icon: Building2,
  },
  {
    id: "card",
    label: "Debit / Credit Card",
    sub: "Visa, Master — processed by Safepay / PayFast",
    icon: CreditCard,
  },
];

export function CheckoutForm() {
  const router = useRouter();
  const { items, coupon, subtotal, clear } = useCart();
  const [region, setRegion] = useState<Region>("lahore");
  const [pay, setPay] = useState<Pay>("cod");
  const [submitting, setSubmitting] = useState(false);

  const discount = couponDiscount(subtotal, coupon);
  const delivery = deliveryFee(subtotal, coupon, region);
  const total = totalDue(subtotal, coupon, region);

  const summary = useMemo(
    () => ({ subtotal, discount, delivery, total }),
    [subtotal, discount, delivery, total]
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);

    const data = new FormData(e.currentTarget);
    const id = `SBS-${Date.now().toString(36).toUpperCase()}`;
    const lineItems = items.map((i) => ({
      id: i.id,
      title: i.title,
      quantity: i.quantity,
      price: i.price,
    }));

    const customer = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      address: String(data.get("address") ?? ""),
      city: String(data.get("city") ?? ""),
    };
    const notes = String(data.get("notes") ?? "") || null;

    const order = {
      id,
      placedAt: new Date().toISOString(),
      customer,
      region,
      payment: pay,
      coupon: coupon?.code ?? null,
      items: lineItems,
      ...summary,
    };

    try {
      window.localStorage.setItem(`sbs-order-${id}`, JSON.stringify(order));
      window.localStorage.setItem("sbs-last-order", id);
    } catch {
      /* ignore */
    }

    void fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        customer_name: customer.name,
        customer_phone: customer.phone,
        customer_email: customer.email || null,
        address: customer.address,
        city: customer.city,
        region,
        payment_method: pay,
        coupon_code: coupon?.code ?? null,
        subtotal: summary.subtotal,
        discount: summary.discount,
        delivery: summary.delivery,
        total: summary.total,
        notes,
        items: lineItems,
      }),
    }).catch(() => {
      /* server persistence is best-effort — receipt lives in localStorage */
    });

    clear();
    router.push(`/checkout/success?id=${id}`);
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-mist bg-white p-12 text-center">
        <h2 className="font-display text-h2 font-semibold text-graphite">
          Your cart is empty.
        </h2>
        <p className="mx-auto mt-2 max-w-md text-small text-slate">
          Add a product first, then come back to checkout.
        </p>
        <Link
          href="/collections/all"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-copper px-6 h-11 text-small font-medium text-white"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-10">
      <div className="space-y-8">
        <Card title="Delivery details">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" name="name" required autoComplete="name" />
            <Field
              label="Phone number"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="03xx xxxxxxx"
            />
            <Field
              label="Email (for invoice)"
              name="email"
              type="email"
              autoComplete="email"
              className="sm:col-span-2"
            />
            <Field
              label="Address"
              name="address"
              required
              autoComplete="street-address"
              placeholder="House #, street, area"
              className="sm:col-span-2"
            />
            <Field label="City" name="city" required defaultValue="Lahore" />
            <div>
              <Label>Delivery region</Label>
              <div className="flex gap-2">
                <RegionPill
                  active={region === "lahore"}
                  onClick={() => setRegion("lahore")}
                  label="Lahore"
                  sub="Same-day"
                />
                <RegionPill
                  active={region === "nationwide"}
                  onClick={() => setRegion("nationwide")}
                  label="Other city"
                  sub="2–4 days"
                />
              </div>
            </div>
          </div>
        </Card>

        <Card title="Payment method">
          <ul className="space-y-2.5">
            {payMethods.map((m) => (
              <li key={m.id}>
                <label
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all duration-300",
                    pay === m.id
                      ? "border-copper bg-copper-50/50"
                      : "border-mist bg-white hover:border-graphite-200"
                  )}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={m.id}
                    checked={pay === m.id}
                    onChange={() => setPay(m.id)}
                    className="sr-only"
                  />
                  <span
                    className={cn(
                      "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition-colors",
                      pay === m.id
                        ? "border-copper bg-copper"
                        : "border-graphite-200 bg-white"
                    )}
                  >
                    {pay === m.id && (
                      <span className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-porcelain text-graphite">
                    <m.icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-small font-medium text-graphite">
                      {m.label}
                    </span>
                    <span className="block text-caption text-graphite-400">
                      {m.sub}
                    </span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Order notes (optional)">
          <textarea
            name="notes"
            rows={3}
            className="w-full rounded-lg border border-mist bg-white p-3 text-small focus:border-graphite-200 focus:outline-none"
            placeholder="Installation address different? Building gate code? Tell us anything that helps the delivery."
          />
        </Card>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-xl border border-mist bg-white p-6 space-y-4">
          <h2 className="font-display text-h2 font-semibold text-graphite">
            Order summary
          </h2>

          <ul className="space-y-3">
            {items.map((it) => (
              <li key={it.id} className="flex gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-porcelain">
                  <Image
                    src={it.image}
                    alt={it.title}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                  <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-graphite px-1 text-[10px] font-medium text-white">
                    {it.quantity}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-caption uppercase tracking-[0.12em] text-graphite-400">
                    {it.brand}
                  </p>
                  <p className="text-caption font-medium text-graphite line-clamp-2">
                    {it.title}
                  </p>
                </div>
                <p className="text-caption font-medium text-graphite tabular-nums">
                  {formatPKR(it.price * it.quantity)}
                </p>
              </li>
            ))}
          </ul>

          <div className="border-t border-mist pt-4">
            <CouponField />
          </div>

          <div className="space-y-2 text-small border-t border-mist pt-4">
            <SumRow label="Subtotal" value={formatPKR(summary.subtotal)} />
            {summary.discount > 0 && (
              <SumRow
                label={`Discount (${coupon?.code})`}
                value={`− ${formatPKR(summary.discount)}`}
                accent="pine"
              />
            )}
            <SumRow
              label={`Delivery (${region === "lahore" ? "Lahore" : "Other city"})`}
              value={summary.delivery === 0 ? "Free" : formatPKR(summary.delivery)}
              accent={summary.delivery === 0 ? "pine" : undefined}
            />
            <div className="border-t border-mist pt-3 flex items-baseline justify-between">
              <span className="font-medium text-graphite">Total due</span>
              <span className="font-display text-h1 font-semibold text-graphite tabular-nums">
                {formatPKR(summary.total)}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            data-cursor="cart"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-copper text-white h-12 text-body font-medium hover:bg-copper-600 transition-colors disabled:opacity-60"
          >
            <Lock className="h-4 w-4" />
            {submitting ? "Placing order…" : "Place order"}
          </button>

          <ul className="space-y-2 border-t border-mist pt-4 text-caption text-graphite-400">
            <li className="flex items-center gap-2">
              <Truck className="h-3.5 w-3.5 text-copper" /> Same-day delivery in
              Lahore on orders before 4 PM
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-copper" /> Full brand
              warranty included
            </li>
            <li className="flex items-center gap-2">
              <RefreshCcw className="h-3.5 w-3.5 text-copper" /> 7-day easy
              returns
            </li>
          </ul>
        </div>
      </aside>
    </form>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-mist bg-white p-6">
      <h2 className="font-display text-h2 font-semibold text-graphite mb-5">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-1.5 block text-caption uppercase tracking-[0.12em] text-graphite-400">
      {children}
    </span>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  placeholder,
  defaultValue,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <Label>{label}</Label>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="block w-full h-11 rounded-lg border border-mist bg-white px-3.5 text-small placeholder:text-graphite-300 focus:border-graphite-200 focus:outline-none"
      />
    </label>
  );
}

function RegionPill({
  active,
  onClick,
  label,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  sub: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex-1 rounded-lg border px-3 py-2 text-left transition-all duration-300",
        active
          ? "border-copper bg-copper-50 text-graphite"
          : "border-mist bg-white text-graphite hover:border-graphite-200"
      )}
    >
      <span className="block text-small font-medium">{label}</span>
      <span className="block text-caption text-graphite-400">{sub}</span>
    </button>
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
