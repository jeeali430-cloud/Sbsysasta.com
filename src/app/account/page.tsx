import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LogOut, Receipt, Heart, UserCircle2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { Container } from "@/components/ui/container";
import { createCookieClient } from "@/lib/supabase/server";
import { getAdminClient } from "@/lib/supabase/client";
import { formatPKR } from "@/lib/utils";

export const metadata: Metadata = {
  title: "My Account",
  robots: { index: false, follow: false },
};

type Order = {
  id: string;
  placed_at: string;
  total: number;
  status: string;
  payment_method: string;
};

async function listMyOrders(email: string): Promise<Order[]> {
  const supabase = getAdminClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("orders")
    .select("id, placed_at, total, status, payment_method")
    .eq("customer_email", email)
    .order("placed_at", { ascending: false })
    .limit(20);
  return (data as Order[] | null) ?? [];
}

const statusStyles: Record<string, string> = {
  pending: "bg-saffron/10 text-saffron border-saffron/30",
  confirmed: "bg-copper/10 text-copper border-copper/30",
  shipped: "bg-graphite-100 text-graphite border-graphite-200",
  delivered: "bg-pine/10 text-pine border-pine/30",
  cancelled: "bg-carmine/10 text-carmine border-carmine/30",
};

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-PK", {
    day: "numeric",
    month: "short",
    year: "2-digit",
  });
}

export default async function AccountPage() {
  const supabase = createCookieClient();
  if (!supabase) {
    redirect("/account/login?error=unconfigured");
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) {
    redirect("/account/login");
  }

  const orders = await listMyOrders(user.email);

  return (
    <>
      <Header />
      <main id="main-content" className="bg-porcelain min-h-screen pb-20">
        <Container className="pt-10 pb-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-caption uppercase tracking-[0.18em] text-copper font-medium">
                Welcome back
              </p>
              <h1 className="mt-2 font-display text-h1 sm:text-display-lg font-semibold tracking-tight text-graphite">
                {user.email}
              </h1>
              <p className="mt-2 text-small text-slate">
                Signed in with your Supabase Auth magic link.
              </p>
            </div>
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full border border-graphite text-graphite h-11 px-5 text-small font-medium hover:bg-graphite hover:text-white transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </form>
          </div>
        </Container>

        <Container>
          <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
            <aside className="rounded-xl border border-mist bg-white p-5 self-start space-y-1">
              <SideLink icon={UserCircle2} label="Profile" active />
              <SideLink icon={Receipt} label="Orders" />
              <SideLink icon={Heart} label="Wishlist" disabled />
            </aside>

            <section className="space-y-6">
              <div className="rounded-xl border border-mist bg-white p-6">
                <h2 className="font-display text-h2 font-semibold text-graphite">
                  Recent orders
                </h2>
                <p className="mt-1 text-small text-slate">
                  Orders linked to{" "}
                  <span className="font-medium text-graphite">
                    {user.email}
                  </span>{" "}
                  at checkout.
                </p>

                {orders.length === 0 ? (
                  <div className="mt-6 rounded-lg border border-dashed border-mist p-8 text-center">
                    <p className="font-display text-h3 text-graphite">
                      No orders yet.
                    </p>
                    <p className="mt-1 text-small text-slate">
                      Browse our catalog and place your first order — we'll keep
                      a copy here so you can track it later.
                    </p>
                    <Link
                      href="/collections/all"
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-copper text-white px-5 h-10 text-small font-medium hover:bg-copper-600"
                    >
                      Start shopping
                    </Link>
                  </div>
                ) : (
                  <ul className="mt-5 divide-y divide-mist">
                    {orders.map((o) => (
                      <li
                        key={o.id}
                        className="flex items-center justify-between gap-3 py-4 first:pt-0"
                      >
                        <div className="min-w-0">
                          <p className="font-mono text-small font-medium text-graphite">
                            {o.id}
                          </p>
                          <p className="text-caption text-graphite-400">
                            {fmt(o.placed_at)} · {o.payment_method.toUpperCase()}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-caption font-medium uppercase tracking-[0.08em] ${
                              statusStyles[o.status] ??
                              "bg-porcelain text-graphite border-mist"
                            }`}
                          >
                            {o.status}
                          </span>
                          <span className="font-display text-small font-semibold tabular-nums">
                            {formatPKR(o.total)}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function SideLink({
  icon: Icon,
  label,
  active,
  disabled,
}: {
  icon: typeof Receipt;
  label: string;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-2.5 rounded-lg px-3 py-2.5 text-small font-medium ${
        active
          ? "bg-graphite text-white"
          : disabled
            ? "text-graphite-300"
            : "text-graphite"
      }`}
    >
      <span className="flex items-center gap-2.5">
        <Icon className="h-4 w-4" />
        {label}
      </span>
      {disabled && (
        <span className="text-[10px] uppercase tracking-[0.12em] text-graphite-300">
          Soon
        </span>
      )}
    </div>
  );
}
