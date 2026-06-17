import { redirect } from "next/navigation";
import { createCookieClient } from "@/lib/supabase/server";

export type AdminSession = {
  email: string;
  configured: true;
};

export type GuardResult =
  | { state: "ok"; session: AdminSession }
  | { state: "unconfigured" }
  | { state: "unauthenticated" }
  | { state: "forbidden"; email: string };

function adminEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS;
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export async function checkAdmin(): Promise<GuardResult> {
  const supabase = createCookieClient();
  if (!supabase) return { state: "unconfigured" };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return { state: "unauthenticated" };

  const allowlist = adminEmails();
  const email = user.email.toLowerCase();
  if (allowlist.length > 0 && !allowlist.includes(email)) {
    return { state: "forbidden", email };
  }

  return { state: "ok", session: { email, configured: true } };
}

/**
 * Use inside admin pages — redirects to login or shows an error when not allowed.
 */
export async function requireAdmin(): Promise<AdminSession> {
  const result = await checkAdmin();
  if (result.state === "ok") return result.session;
  if (result.state === "unauthenticated") redirect("/admin/login");
  if (result.state === "forbidden")
    redirect(`/admin/login?error=forbidden&email=${encodeURIComponent(result.email)}`);
  redirect("/admin/login?error=unconfigured");
}
