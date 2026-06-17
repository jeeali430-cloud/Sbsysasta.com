import { NextResponse } from "next/server";
import { createCookieClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { origin } = new URL(request.url);
  const supabase = createCookieClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  const referer = request.headers.get("referer") ?? "";
  const next = referer.includes("/admin") ? "/admin/login" : "/";
  return NextResponse.redirect(`${origin}${next}`, { status: 303 });
}
