import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Printer } from "lucide-react";
import { requireAdmin } from "@/lib/admin/guard";
import { getOrder } from "@/lib/admin/queries";
import { updateOrderStatus } from "@/lib/admin/actions";
import { OrderStatusPill } from "@/components/admin/order-status-pill";
import { formatPKR } from "@/lib/utils";

const STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"] as const;

const paymentLabels: Record<string, string> = {
  cod: "Cash on Delivery",
  jazzcash: "JazzCash",
  easypaisa: "EasyPaisa",
  bank: "Bank Transfer",
  card: "Card",
};

export default async function AdminOrderDetail({
  params,
}: {
  params: { id: string };
}) {
  await requireAdmin();
  const order = await getOrder(params.id);
  if (!order) notFound();

  const placed = new Date(order.placed_at).toLocaleString("en-PK", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-1.5 text-caption text-graphite-400 hover:text-graphite"
          >
            <ArrowLeft className="h-3 w-3" /> Back to orders
          </Link>
          <h1 className="mt-3 flex flex-wrap items-center gap-3 font-display text-h1 sm:text-display-lg font-semibold tracking-tight text-graphite">
            <span className="font-mono">{order.id}</span>
            <OrderStatusPill status={order.status} />
          </h1>
          <p className="mt-1 text-small text-graphite-400">
            Placed {placed}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card title="Items">
            <ul className="divide-y divide-mist">
              {order.items.map((it) => (
                <li
                  key={it.id}
                  className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-graphite leading-snug">
                      {it.title}
                    </p>
                    <p className="text-caption text-graphite-400">
                      Qty: {it.quantity} · Unit: {formatPKR(it.price)}
                    </p>
                  </div>
                  <p className="font-display text-small font-semibold text-graphite tabular-nums">
                    {formatPKR(it.price * it.quantity)}
                  </p>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Customer">
            <dl className="grid gap-2 text-small sm:grid-cols-2">
              <Field label="Name" value={order.customer_name} />
              <Field label="Phone" value={order.customer_phone} />
              <Field label="Email" value={order.customer_email ?? "—"} />
              <Field
                label="Region"
                value={order.region === "lahore" ? "Lahore (same-day)" : "Other city"}
              />
              <Field
                label="Address"
                value={`${order.address}, ${order.city}`}
                className="sm:col-span-2"
              />
              {order.notes && (
                <Field
                  label="Notes"
                  value={order.notes}
                  className="sm:col-span-2"
                />
              )}
            </dl>
          </Card>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-8 lg:self-start">
          <Card title="Status">
            <form action={updateOrderStatus} className="space-y-2">
              <input type="hidden" name="id" value={order.id} />
              <div className="grid grid-cols-1 gap-1.5">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    name="status"
                    value={s}
                    type="submit"
                    disabled={s === order.status}
                    className={`flex items-center justify-between rounded-md border px-3 py-2 text-small transition-colors ${
                      s === order.status
                        ? "border-graphite bg-graphite text-white cursor-default"
                        : "border-mist bg-white text-graphite hover:bg-porcelain"
                    }`}
                  >
                    <span className="capitalize">{s}</span>
                    {s === order.status && (
                      <span className="text-caption">current</span>
                    )}
                  </button>
                ))}
              </div>
            </form>
          </Card>

          <Card title="Totals">
            <dl className="space-y-2 text-small">
              <Row label="Subtotal" value={formatPKR(order.subtotal)} />
              {order.discount > 0 && (
                <Row
                  label={`Discount${order.coupon_code ? ` (${order.coupon_code})` : ""}`}
                  value={`− ${formatPKR(order.discount)}`}
                  accent="pine"
                />
              )}
              <Row
                label="Delivery"
                value={order.delivery === 0 ? "Free" : formatPKR(order.delivery)}
              />
              <div className="flex items-baseline justify-between border-t border-mist pt-3">
                <span className="font-medium">Total</span>
                <span className="font-display text-h2 font-semibold tabular-nums">
                  {formatPKR(order.total)}
                </span>
              </div>
              <div className="border-t border-mist pt-3 flex items-baseline justify-between">
                <span className="text-graphite-400">Payment</span>
                <span className="font-medium uppercase tracking-wide text-caption">
                  {paymentLabels[order.payment_method] ?? order.payment_method}
                </span>
              </div>
            </dl>
            <a
              href={`https://wa.me/${order.customer_phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                `Salam ${order.customer_name}, your Sbsysasta order ${order.id} is being processed. Total ${formatPKR(order.total)}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-pine text-white h-10 text-small font-medium hover:bg-pine/90"
            >
              <Printer className="h-3.5 w-3.5" />
              WhatsApp customer
            </a>
          </Card>
        </aside>
      </div>
    </div>
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
      <h2 className="font-display text-h3 font-semibold text-graphite mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="text-caption uppercase tracking-[0.12em] text-graphite-400">
        {label}
      </dt>
      <dd className="text-small text-graphite">{value}</dd>
    </div>
  );
}

function Row({
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
