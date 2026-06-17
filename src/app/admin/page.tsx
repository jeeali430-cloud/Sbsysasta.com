import Link from "next/link";
import {
  Receipt,
  Wallet,
  AlertCircle,
  Clock,
  PackageX,
  ArrowRight,
} from "lucide-react";
import { requireAdmin } from "@/lib/admin/guard";
import { dashboardStats, listOrders } from "@/lib/admin/queries";
import { formatPKR } from "@/lib/utils";
import { OrderStatusPill } from "@/components/admin/order-status-pill";

function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-PK", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminDashboard() {
  await requireAdmin();

  const [stats, recent] = await Promise.all([
    dashboardStats(),
    listOrders(8),
  ]);

  return (
    <div className="space-y-8">
      <header>
        <p className="text-caption uppercase tracking-[0.18em] text-copper font-medium">
          Today
        </p>
        <h1 className="mt-1 font-display text-h1 sm:text-display-lg font-semibold tracking-tight text-graphite">
          Dashboard
        </h1>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          icon={Wallet}
          label="Revenue · 30 days"
          value={formatPKR(stats.revenue30d)}
          sub="Confirmed, shipped & delivered orders"
        />
        <Stat
          icon={Receipt}
          label="Orders · today"
          value={String(stats.ordersToday)}
          sub="Placed since midnight"
        />
        <Stat
          icon={Clock}
          label="Pending review"
          value={String(stats.pendingOrders)}
          sub="Need confirmation or rider dispatch"
          tone="warning"
        />
        <Stat
          icon={PackageX}
          label="Out of stock"
          value={String(stats.lowStock)}
          sub="Products marked unavailable"
          tone={stats.lowStock > 0 ? "warning" : "neutral"}
        />
      </section>

      <section className="rounded-xl border border-mist bg-white">
        <header className="flex items-center justify-between border-b border-mist px-6 py-4">
          <h2 className="font-display text-h2 font-semibold text-graphite">
            Recent orders
          </h2>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-1 text-caption font-medium text-copper hover:text-copper-600"
          >
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </header>

        {recent.length === 0 ? (
          <EmptyOrders />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-small">
              <thead className="text-left text-caption uppercase tracking-[0.12em] text-graphite-400">
                <tr>
                  <th className="px-6 py-3 font-medium">Order</th>
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Placed</th>
                  <th className="px-6 py-3 font-medium">Total</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-mist">
                {recent.map((o) => (
                  <tr key={o.id} className="hover:bg-porcelain/50">
                    <td className="px-6 py-4">
                      <p className="font-mono text-small font-medium text-graphite">
                        {o.id}
                      </p>
                      <p className="text-caption text-graphite-400">
                        {o.items.length} item{o.items.length === 1 ? "" : "s"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-graphite">
                        {o.customer_name}
                      </p>
                      <p className="text-caption text-graphite-400">
                        {o.city}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-graphite-400 tabular-nums">
                      {fmtDateTime(o.placed_at)}
                    </td>
                    <td className="px-6 py-4 font-display font-semibold tabular-nums">
                      {formatPKR(o.total)}
                    </td>
                    <td className="px-6 py-4">
                      <OrderStatusPill status={o.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
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

function Stat({
  icon: Icon,
  label,
  value,
  sub,
  tone = "neutral",
}: {
  icon: typeof Receipt;
  label: string;
  value: string;
  sub: string;
  tone?: "neutral" | "warning";
}) {
  return (
    <div className="rounded-xl border border-mist bg-white p-5">
      <div className="flex items-center justify-between">
        <span
          className={`grid h-9 w-9 place-items-center rounded-full ${
            tone === "warning"
              ? "bg-saffron/10 text-saffron"
              : "bg-porcelain text-copper"
          }`}
        >
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-4 text-caption uppercase tracking-[0.12em] text-graphite-400">
        {label}
      </p>
      <p className="mt-1 font-display text-display-lg font-semibold text-graphite tabular-nums">
        {value}
      </p>
      <p className="mt-1 text-caption text-graphite-400">{sub}</p>
    </div>
  );
}

function EmptyOrders() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-porcelain text-graphite-300">
        <AlertCircle className="h-5 w-5" />
      </span>
      <h3 className="mt-5 font-display text-h2 font-semibold text-graphite">
        No orders yet.
      </h3>
      <p className="mt-2 max-w-sm text-small text-slate">
        Place a test order from the store, or connect Supabase to start
        receiving real ones.
      </p>
    </div>
  );
}
