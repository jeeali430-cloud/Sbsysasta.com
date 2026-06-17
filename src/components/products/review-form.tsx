"use client";

import { useState } from "react";
import { CheckCircle2, Star } from "lucide-react";

export function ReviewForm({
  productId,
  productTitle,
}: {
  productId: string;
  productTitle: string;
}) {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (rating === 0) {
      setError("Please pick a rating.");
      return;
    }
    setSubmitting(true);
    setError(null);

    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          customer_name: data.get("name"),
          city: data.get("city"),
          title: data.get("title"),
          body: data.get("body"),
          rating,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError((body as { error?: string }).error ?? "Couldn't submit.");
        return;
      }
      setSent(true);
    } catch {
      setError("Couldn't reach the server. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <section className="rounded-xl border border-pine/30 bg-pine/5 p-6">
        <CheckCircle2 className="h-6 w-6 text-pine" />
        <h3 className="mt-3 font-display text-h2 font-semibold text-graphite">
          Shukria for the feedback!
        </h3>
        <p className="mt-2 text-small text-slate">
          Your review is in our moderation queue and will appear on this page
          once we've checked it. We read every review and use it to improve our
          service.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-mist bg-white p-6">
      <div>
        <p className="text-caption uppercase tracking-[0.16em] text-copper font-medium">
          Leave a review
        </p>
        <h3 className="mt-1 font-display text-h2 font-semibold text-graphite">
          Already bought this product?
        </h3>
        <p className="mt-2 text-small text-slate">
          Help other Lahore households decide. Your review goes through a
          quick moderation check before it appears on this page.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <fieldset>
          <legend className="mb-2 block text-caption uppercase tracking-[0.12em] text-graphite-400">
            Your rating
          </legend>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => {
              const active = (hover || rating) >= n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  onMouseEnter={() => setHover(n)}
                  onMouseLeave={() => setHover(0)}
                  aria-label={`${n} star${n === 1 ? "" : "s"}`}
                  className="p-1 rounded transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-7 w-7 transition-colors ${
                      active ? "text-copper" : "text-graphite-200"
                    }`}
                    fill={active ? "currentColor" : "transparent"}
                    strokeWidth={1.5}
                  />
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Your name" name="name" required autoComplete="name" />
          <Field
            label="City"
            name="city"
            placeholder="Lahore"
            autoComplete="address-level2"
          />
        </div>
        <Field
          label="Headline (optional)"
          name="title"
          placeholder="e.g. Cools the whole drawing room in 90 seconds"
        />
        <label className="block">
          <span className="mb-1.5 block text-caption uppercase tracking-[0.12em] text-graphite-400">
            Tell us more (optional)
          </span>
          <textarea
            name="body"
            rows={4}
            maxLength={2000}
            placeholder={`What did you like or dislike about the ${productTitle}? Real notes help everyone.`}
            className="block w-full rounded-lg border border-mist bg-white p-3 text-small placeholder:text-graphite-300 focus:border-graphite-200 focus:outline-none"
          />
        </label>

        {error && (
          <p className="text-caption text-carmine" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-full bg-copper text-white px-6 h-11 text-small font-medium hover:bg-copper-600 transition-colors disabled:opacity-60"
        >
          {submitting ? "Submitting…" : "Submit review"}
        </button>
      </form>
    </section>
  );
}

function Field({
  label,
  name,
  placeholder,
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-caption uppercase tracking-[0.12em] text-graphite-400">
        {label}
      </span>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className="block w-full h-11 rounded-lg border border-mist bg-white px-3.5 text-small placeholder:text-graphite-300 focus:border-graphite-200 focus:outline-none"
      />
    </label>
  );
}
