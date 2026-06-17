"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { CheckCircle2, Mail } from "lucide-react";

export function LoginForm({ disabled }: { disabled?: boolean }) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      setError("Supabase isn't configured.");
      setSubmitting(false);
      return;
    }

    const supabase = createBrowserClient(url, key);
    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/admin`,
      },
    });

    setSubmitting(false);
    if (authError) {
      setError(authError.message);
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-lg border border-pine/30 bg-pine/5 p-4">
        <CheckCircle2 className="h-5 w-5 text-pine" />
        <p className="mt-2 font-display text-h3 font-semibold text-graphite">
          Check your inbox.
        </p>
        <p className="mt-1 text-small text-slate">
          We sent a sign-in link to{" "}
          <span className="font-medium text-graphite">{email}</span>. The link
          opens this admin and stays valid for 1 hour.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <label className="block">
        <span className="mb-1.5 block text-caption uppercase tracking-[0.12em] text-graphite-400">
          Work email
        </span>
        <span className="flex items-center gap-2 rounded-full border border-mist bg-white px-3.5">
          <Mail className="h-4 w-4 text-graphite-300" />
          <input
            type="email"
            required
            disabled={disabled || submitting}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className="h-11 w-full bg-transparent text-small placeholder:text-graphite-300 focus:outline-none disabled:opacity-50"
          />
        </span>
      </label>

      {error && (
        <p className="text-caption text-carmine" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={disabled || submitting || !email}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-graphite text-white h-12 text-body font-medium hover:bg-graphite-700 transition-colors disabled:opacity-50"
      >
        {submitting ? "Sending link…" : "Send magic link"}
      </button>
    </form>
  );
}
