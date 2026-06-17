import Link from "next/link";
import { Star, Check, EyeOff, Trash2 } from "lucide-react";
import { requireAdmin } from "@/lib/admin/guard";
import { listReviews } from "@/lib/admin/queries";
import { setReviewStatus, deleteReview } from "@/lib/admin/actions";

const STATUS_TABS = ["all", "pending", "approved", "hidden"] as const;

const statusStyles: Record<string, string> = {
  pending: "bg-saffron/10 text-saffron border-saffron/30",
  approved: "bg-pine/10 text-pine border-pine/30",
  hidden: "bg-graphite-100 text-graphite-400 border-graphite-200",
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-PK", {
    day: "numeric",
    month: "short",
    year: "2-digit",
  });
}

function productLink(
  rel: { slug: string; title: string } | { slug: string; title: string }[] | null | undefined
) {
  if (!rel) return null;
  const r = Array.isArray(rel) ? rel[0] : rel;
  if (!r) return null;
  return r;
}

export default async function AdminReviewsPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  await requireAdmin();
  const all = await listReviews();
  const status = (searchParams.status as (typeof STATUS_TABS)[number]) ?? "all";
  const filtered =
    status === "all" ? all : all.filter((r) => r.status === status);

  return (
    <div className="space-y-6">
      <header>
        <p className="text-caption uppercase tracking-[0.18em] text-copper font-medium">
          Trust & social
        </p>
        <h1 className="mt-1 font-display text-h1 sm:text-display-lg font-semibold tracking-tight text-graphite">
          Reviews
        </h1>
        <p className="mt-2 max-w-xl text-small text-slate">
          Approve genuine feedback to appear on product pages. Hidden reviews
          stay in the database but are gated by RLS from public reads.
        </p>
      </header>

      <nav className="flex flex-wrap gap-2 border-b border-mist pb-3">
        {STATUS_TABS.map((t) => {
          const active = status === t;
          const count = t === "all" ? all.length : all.filter((r) => r.status === t).length;
          const href = t === "all" ? "/admin/reviews" : `/admin/reviews?status=${t}`;
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
              <span className={active ? "text-white/70" : "text-graphite-400"}>
                {count}
              </span>
            </Link>
          );
        })}
      </nav>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-mist bg-white p-12 text-center text-small text-slate">
          No reviews here yet.
        </div>
      ) : (
        <ul className="space-y-3">
          {filtered.map((r) => {
            const product = productLink(r.products);
            return (
              <li
                key={r.id}
                className="rounded-xl border border-mist bg-white p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-caption text-graphite-400">
                      <span className="flex items-center gap-0.5 text-copper">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-3.5 w-3.5"
                            fill={i < r.rating ? "currentColor" : "transparent"}
                            strokeWidth={1.5}
                          />
                        ))}
                      </span>
                      <span className="font-medium text-graphite">
                        {r.customer_name}
                      </span>
                      {r.city && <span>· {r.city}</span>}
                      <span>· {fmtDate(r.created_at)}</span>
                    </div>
                    {r.title && (
                      <p className="mt-2 font-display text-h3 font-semibold text-graphite">
                        {r.title}
                      </p>
                    )}
                    {r.body && (
                      <p className="mt-2 text-small text-slate text-pretty leading-relaxed">
                        {r.body}
                      </p>
                    )}
                    {product && (
                      <Link
                        href={`/products/${product.slug}`}
                        target="_blank"
                        className="mt-3 inline-flex items-center gap-1 text-caption text-copper hover:text-copper-600"
                      >
                        on “{product.title}”
                      </Link>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-caption font-medium uppercase tracking-[0.08em] ${
                        statusStyles[r.status] ?? ""
                      }`}
                    >
                      {r.status}
                    </span>
                    <div className="flex items-center gap-2">
                      {r.status !== "approved" && (
                        <form action={setReviewStatus}>
                          <input type="hidden" name="id" value={r.id} />
                          <input type="hidden" name="status" value="approved" />
                          <button
                            type="submit"
                            className="inline-flex items-center gap-1 rounded-full bg-pine text-white px-3 h-8 text-caption font-medium hover:bg-pine/90"
                          >
                            <Check className="h-3 w-3" /> Approve
                          </button>
                        </form>
                      )}
                      {r.status !== "hidden" && (
                        <form action={setReviewStatus}>
                          <input type="hidden" name="id" value={r.id} />
                          <input type="hidden" name="status" value="hidden" />
                          <button
                            type="submit"
                            className="inline-flex items-center gap-1 rounded-full border border-mist bg-white text-graphite px-3 h-8 text-caption font-medium hover:bg-porcelain"
                          >
                            <EyeOff className="h-3 w-3" /> Hide
                          </button>
                        </form>
                      )}
                      <form action={deleteReview}>
                        <input type="hidden" name="id" value={r.id} />
                        <button
                          type="submit"
                          aria-label="Delete review"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-mist bg-white text-graphite-400 hover:text-carmine"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
