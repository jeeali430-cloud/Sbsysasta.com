import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Returns a Supabase client wired for **server-side reads** (uses the anon key,
 * so it respects RLS — fine for the public catalog).
 *
 * Returns `null` if env vars aren't set, so the repo layer can transparently
 * fall back to the in-memory seed data during local development.
 */
export function getServerClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

/**
 * Returns a Supabase client wired with the **service role key** — bypasses RLS.
 * Use ONLY in server-side code (route handlers, server actions). Never imported
 * by a client component.
 */
export function getAdminClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
