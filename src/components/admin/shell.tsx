import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Receipt,
  Tag,
  LogOut,
  Database,
} from "lucide-react";
import type { GuardResult } from "@/lib/admin/guard";

const navItems = [
  { href: "/admin",          label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders",   label: "Orders",    icon: Receipt },
  { href: "/admin/products", label: "Products",  icon: Package },
  { href: "/admin/coupons",  label: "Coupons",   icon: Tag },
];

export function AdminShell({
  guard,
  children,
}: {
  guard: GuardResult;
  children: React.ReactNode;
}) {
  // /admin/login renders without the shell — but we always provide it so the
  // pages themselves can decide. Login is a child route too; its page checks
  // guard separately and renders inline.
  return (
    <div className="min-h-screen bg-porcelain">
      <div className="flex min-h-screen">
        <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-mist bg-white">
          <div className="p-6 border-b border-mist">
            <Link
              href="/"
              className="font-display text-h2 font-semibold tracking-tight text-graphite"
            >
              Sbsysasta<span className="text-copper">.</span>
            </Link>
            <p className="mt-1 text-caption uppercase tracking-[0.16em] text-graphite-400">
              Admin
            </p>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-small font-medium text-graphite hover:bg-porcelain"
              >
                <it.icon className="h-4 w-4 text-graphite-400" />
                {it.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-mist p-4 space-y-3">
            {guard.state === "ok" && (
              <div className="text-caption">
                <p className="text-graphite-400">Signed in as</p>
                <p className="font-medium text-graphite truncate">
                  {guard.session.email}
                </p>
              </div>
            )}
            {guard.state === "ok" ? (
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-mist bg-white h-10 text-caption font-medium text-graphite hover:bg-porcelain"
                >
                  <LogOut className="h-3.5 w-3.5" /> Sign out
                </button>
              </form>
            ) : guard.state === "unconfigured" ? (
              <div className="rounded-lg border border-mist bg-porcelain p-3 text-caption text-graphite-400 leading-snug">
                <Database className="h-3.5 w-3.5 text-copper inline mr-1" />
                Connect Supabase in <code>.env.local</code> to enable admin.
              </div>
            ) : null}
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <nav className="lg:hidden flex items-center justify-between border-b border-mist bg-white px-5 py-3">
            <Link
              href="/admin"
              className="font-display text-h3 font-semibold text-graphite"
            >
              Admin
            </Link>
            <ul className="flex items-center gap-1 text-caption font-medium">
              {navItems.map((it) => (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    className="rounded-full px-2.5 py-1.5 text-graphite hover:bg-porcelain"
                  >
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <main className="px-5 lg:px-8 py-8 max-w-6xl">{children}</main>
        </div>
      </div>
    </div>
  );
}
