import { NextResponse } from "next/server";
import { createCookieClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { origin } = new URL(request.url);
  const supabase = createCookieClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  return NextResponse.redirect(`${origin}/admin/login`, { status: 303 });
}
