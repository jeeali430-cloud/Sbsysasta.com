import Link from "next/link";
import { redirect } from "next/navigation";
import { AlertCircle, Database, Mail } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { CustomerLoginForm } from "@/components/account/customer-login-form";
import { createCookieClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Sign In",
  robots: { index: false, follow: false },
};

export default async function CustomerLoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const supabase = createCookieClient();
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) redirect("/account");
  }
  const unconfigured = !supabase || searchParams.error === "unconfigured";

  return (
    <>
      <Header />
      <main id="main-content" className="bg-porcelain min-h-screen pb-20">
        <Container className="pt-10">
          <div className="mx-auto max-w-md">
            <div className="rounded-2xl border border-mist bg-white p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-porcelain px-3 py-1 text-caption font-medium text-copper border border-mist">
                <Mail className="h-3 w-3" /> Magic-link sign-in
              </span>
              <h1 className="mt-4 font-display text-h1 font-semibold text-graphite">
                Track your orders.
              </h1>
              <p className="mt-2 text-small text-slate">
                Enter the email you used at checkout — we'll send a one-tap
                sign-in link.
              </p>

              {unconfigured && (
                <Banner
                  tone="warning"
                  icon={Database}
                  title="Supabase not connected"
                  body="Customer login uses Supabase Auth. Set the env vars in Vercel to enable it."
                  className="mt-6"
                />
              )}
              {searchParams.error === "callback" && (
                <Banner
                  tone="error"
                  icon={AlertCircle}
                  title="Sign-in link expired"
                  body="Magic links are valid for 1 hour. Request a new one below."
                  className="mt-6"
                />
              )}

              <div className="mt-6">
                <CustomerLoginForm disabled={unconfigured} />
              </div>
            </div>

            <p className="mt-6 text-center text-caption text-graphite-400">
              No account yet? Just place an order — we'll email you the link
              automatically.{" "}
              <Link
                href="/collections/all"
                className="text-copper hover:text-copper-600 underline-offset-4 hover:underline"
              >
                Start shopping
              </Link>
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

function Banner({
  tone,
  icon: Icon,
  title,
  body,
  className,
}: {
  tone: "warning" | "error";
  icon: typeof Database;
  title: string;
  body: string;
  className?: string;
}) {
  const cls =
    tone === "warning"
      ? "border-saffron/30 bg-saffron/5"
      : "border-carmine/30 bg-carmine/5";
  return (
    <div className={`rounded-lg border ${cls} p-4 ${className ?? ""}`}>
      <div className="flex items-start gap-2.5">
        <Icon
          className={`mt-0.5 h-4 w-4 shrink-0 ${
            tone === "warning" ? "text-saffron" : "text-carmine"
          }`}
        />
        <div className="text-small">
          <p className="font-medium text-graphite">{title}</p>
          <p className="mt-1 text-graphite-400 leading-snug">{body}</p>
        </div>
      </div>
    </div>
  );
}
