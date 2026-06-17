import Link from "next/link";
import { requireAdmin } from "@/lib/admin/guard";
import { listOrders } from "@/lib/admin/queries";
import { OrderStatusPill } from "@/components/admin/order-status-pill";
import { formatPKR } from "@/lib/utils";

function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-PK", {
    day: "numeric",
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  await requireAdmin();
  const all = await listOrders(200);

  const status = searchParams.status;
  const filtered = status ? all.filter((o) => o.status === status) : all;

  const tabs = ["all", "pending", "confirmed", "shipped", "delivered", "cancelled"];

  return (
    <div className="space-y-6">
      <header>
        <p className="text-caption uppercase tracking-[0.18em] text-copper font-medium">
          Manage
        </p>
        <h1 className="mt-1 font-display text-h1 sm:text-display-lg font-semibold tracking-tight text-graphite">
          Orders
        </h1>
      </header>

      <nav className="flex flex-wrap gap-2 border-b border-mist pb-3">
        {tabs.map((t) => {
          const active = (status ?? "all") === t;
          const count =
            t === "all" ? all.length : all.filter((o) => o.status === t).length;
          const href = t === "all" ? "/admin/orders" : `/admin/orders?status=${t}`;
          return (
            <Link
              key={t}
              href={href}
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-caption font-medium border transition-colors ${
                active
                  ? "border-graphite bg-graphite text-white"
                  : "border-mist bg-white text-graphite hover:bg-porcelain"
              }`}
            >
              <span className="capitalize">{t}</span>
              <span
                className={`tabular-nums ${
                  active ? "text-white/70" : "text-graphite-400"
                }`}
              >
                {count}
              </span>
            </Link>
          );
        })}
      </nav>

      <section className="rounded-xl border border-mist bg-white overflow-hidden">
        {filtered.length === 0 ? (
          <p className="p-10 text-center text-small text-slate">
            No orders here.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-small">
              <thead className="text-left text-caption uppercase tracking-[0.12em] text-graphite-400 bg-porcelain/50">
                <tr>
                  <th className="px-5 py-3 font-medium">Order</th>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">City</th>
                  <th className="px-5 py-3 font-medium">Payment</th>
                  <th className="px-5 py-3 font-medium">Placed</th>
                  <th className="px-5 py-3 font-medium">Total</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-mist">
                {filtered.map((o) => (
                  <tr key={o.id} className="hover:bg-porcelain/40">
                    <td className="px-5 py-3 font-mono text-small font-medium text-graphite">
                      {o.id}
                    </td>
                    <td className="px-5 py-3">
                      <p className="font-medium text-graphite">
                        {o.customer_name}
                      </p>
                      <p className="text-caption text-graphite-400">
                        {o.customer_phone}
                      </p>
                    </td>
                    <td className="px-5 py-3 text-graphite-400">{o.city}</td>
                    <td className="px-5 py-3 uppercase tracking-wide text-caption text-graphite-400">
                      {o.payment_method}
                    </td>
                    <td className="px-5 py-3 text-graphite-400 tabular-nums">
                      {fmtDateTime(o.placed_at)}
                    </td>
                    <td className="px-5 py-3 font-display font-semibold tabular-nums">
                      {formatPKR(o.total)}
                    </td>
                    <td className="px-5 py-3">
                      <OrderStatusPill status={o.status} />
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        href={`/admin/orders/${o.id}`}
                        className="text-caption font-medium text-copper hover:text-copper-600"
                      >
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
