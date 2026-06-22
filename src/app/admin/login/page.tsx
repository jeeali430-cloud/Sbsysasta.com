import Link from "next/link";
import { AlertCircle, Database, Lock } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { LoginForm } from "@/components/admin/login-form";
import { checkAdmin } from "@/lib/admin/guard";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin sign in · Sbsysasta",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string; email?: string };
}) {
  const guard = await checkAdmin();
  if (guard.state === "ok") redirect("/admin");

  const unconfigured = guard.state === "unconfigured";
  const forbidden = searchParams.error === "forbidden";

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="bg-graphite text-porcelain p-10 lg:p-16 flex flex-col justify-between">
        <Logo size="md" variant="light" />
        <div className="max-w-md">
          <p className="text-caption uppercase tracking-[0.18em] text-copper-300 font-medium">
            Sbsysasta Admin
          </p>
          <h1 className="mt-3 font-display text-display-lg font-semibold tracking-tight text-balance">
            Run the store — orders, stock, and pricing in one place.
          </h1>
          <p className="mt-4 text-body text-graphite-200">
            Sign in with the email you use for the Supabase project. Magic link,
            no password.
          </p>
        </div>
        <p className="text-caption text-graphite-300">
          © {new Date().getFullYear()} Sbsysasta Electronics, Lahore.
        </p>
      </div>

      <div className="p-8 lg:p-16 flex items-center justify-center">
        <div className="w-full max-w-sm space-y-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-porcelain px-3 py-1 text-caption font-medium text-copper border border-mist">
              <Lock className="h-3 w-3" /> Authorized access
            </span>
            <h2 className="mt-4 font-display text-h1 font-semibold text-graphite">
              Sign in
            </h2>
            <p className="mt-1 text-small text-slate">
              We&apos;ll email you a magic link valid for 1 hour.
            </p>
          </div>

          {unconfigured && (
            <Banner
              tone="warning"
              icon={Database}
              title="Supabase not connected"
              body="Set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY and ADMIN_EMAILS in .env.local, then restart the dev server."
            />
          )}

          {forbidden && (
            <Banner
              tone="error"
              icon={AlertCircle}
              title={`${searchParams.email ?? "That account"} isn't an admin`}
              body="Ask the store owner to add your email to the ADMIN_EMAILS env var."
            />
          )}

          <LoginForm disabled={unconfigured} />

          <p className="text-caption text-graphite-400">
            Not an admin?{" "}
            <Link
              href="/"
              className="underline-offset-4 hover:underline text-graphite"
            >
              Back to store
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Banner({
  tone,
  icon: Icon,
  title,
  body,
}: {
  tone: "warning" | "error";
  icon: typeof Database;
  title: string;
  body: string;
}) {
  const cls =
    tone === "warning"
      ? "border-saffron/30 bg-saffron/5 text-graphite"
      : "border-carmine/30 bg-carmine/5 text-graphite";
  return (
    <div className={`rounded-lg border ${cls} p-4`}>
      <div className="flex items-start gap-2.5">
        <Icon
          className={`mt-0.5 h-4 w-4 shrink-0 ${
            tone === "warning" ? "text-saffron" : "text-carmine"
          }`}
        />
        <div className="text-small">
          <p className="font-medium">{title}</p>
          <p className="mt-1 text-graphite-400 leading-snug">{body}</p>
        </div>
      </div>
    </div>
  );
}
