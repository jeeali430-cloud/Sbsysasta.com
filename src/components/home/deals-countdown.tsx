"use client";

import { useEffect, useState } from "react";

function msUntilMidnightPKT(): number {
  const now = new Date();
  // PKT = UTC+5. Compute Lahore midnight by adjusting the offset.
  const utc = now.getTime() + now.getTimezoneOffset() * 60_000;
  const lahore = new Date(utc + 5 * 60 * 60_000);
  const tomorrow = new Date(lahore);
  tomorrow.setHours(24, 0, 0, 0);
  return tomorrow.getTime() - lahore.getTime();
}

function format(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return {
    h: String(h).padStart(2, "0"),
    m: String(m).padStart(2, "0"),
    s: String(s).padStart(2, "0"),
  };
}

export function DealsCountdown() {
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    setMs(msUntilMidnightPKT());
    const t = setInterval(() => setMs(msUntilMidnightPKT()), 1000);
    return () => clearInterval(t);
  }, []);

  if (ms === null) {
    return (
      <div
        aria-hidden
        className="inline-flex items-center gap-1.5 rounded-full border border-copper-300/40 bg-copper-50/5 px-3 py-1.5 text-caption text-copper-200 font-mono tabular-nums"
      >
        <span>--</span>
        <span>:</span>
        <span>--</span>
        <span>:</span>
        <span>--</span>
      </div>
    );
  }

  const { h, m, s } = format(ms);

  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-copper-300/40 bg-copper-50/5 px-3 py-1.5 text-caption font-medium text-copper-200">
      <span className="uppercase tracking-[0.14em] text-copper-200/80">
        Resets in
      </span>
      <span className="inline-flex items-center gap-0.5 font-mono tabular-nums text-white">
        <Cell value={h} />
        <span>:</span>
        <Cell value={m} />
        <span>:</span>
        <Cell value={s} />
      </span>
    </div>
  );
}

function Cell({ value }: { value: string }) {
  return (
    <span className="rounded bg-graphite-700 px-1 py-0.5">{value}</span>
  );
}
