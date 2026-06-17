import { requireAdmin } from "@/lib/admin/guard";
import { listCustomers } from "@/lib/admin/queries";
import { formatPKR } from "@/lib/utils";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-PK", {
    day: "numeric",
    month: "short",
    year: "2-digit",
  });
}

export default async function AdminCustomersPage() {
  await requireAdmin();
  const customers = await listCustomers();

  return (
    <div className="space-y-6">
      <header>
        <p className="text-caption uppercase tracking-[0.18em] text-copper font-medium">
          People
        </p>
        <h1 className="mt-1 font-display text-h1 sm:text-display-lg font-semibold tracking-tight text-graphite">
          Customers
        </h1>
        <p className="mt-2 max-w-xl text-small text-slate">
          Aggregated from order history. Tap a phone number to message on
          WhatsApp directly.
        </p>
      </header>

      <section className="rounded-xl border border-mist bg-white overflow-hidden">
        {customers.length === 0 ? (
          <p className="p-10 text-center text-small text-slate">
            No customers yet — they show up here after their first order.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-small">
              <thead className="text-left text-caption uppercase tracking-[0.12em] text-graphite-400 bg-porcelain/50">
                <tr>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Phone</th>
                  <th className="px-5 py-3 font-medium">City</th>
                  <th className="px-5 py-3 font-medium">Orders</th>
                  <th className="px-5 py-3 font-medium">Total spent</th>
                  <th className="px-5 py-3 font-medium">Last order</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mist">
                {customers.map((c) => {
                  const waNumber = c.phone.replace(/\D/g, "");
                  const localFromIntl = waNumber.startsWith("92")
                    ? `0${waNumber.slice(2)}`
                    : waNumber;
                  return (
                    <tr key={c.phone + c.name} className="hover:bg-porcelain/40">
                      <td className="px-5 py-3">
                        <p className="font-medium text-graphite">{c.name}</p>
                        {c.email && (
                          <a
                            href={`mailto:${c.email}`}
                            className="text-caption text-graphite-400 hover:text-copper"
                          >
                            {c.email}
                          </a>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        <a
                          href={`https://wa.me/${waNumber.startsWith("92") ? waNumber : `92${localFromIntl.replace(/^0/, "")}`}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-graphite hover:text-copper"
                        >
                          {c.phone}
                        </a>
                      </td>
                      <td className="px-5 py-3 text-graphite-400">{c.city}</td>
                      <td className="px-5 py-3 tabular-nums">{c.orderCount}</td>
                      <td className="px-5 py-3 font-display font-semibold tabular-nums">
                        {formatPKR(c.totalSpent)}
                      </td>
                      <td className="px-5 py-3 text-graphite-400 tabular-nums">
                        {fmtDate(c.lastOrderAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
