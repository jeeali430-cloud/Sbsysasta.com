"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const LABEL_MAP: Record<string, string> = {
  view: "View",
  cart: "Add to Cart",
  wa: "WhatsApp",
  buy: "Buy now",
  read: "Read more",
};

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<string | null>(null);

  useEffect(() => {
    const supportsPrecisePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (!supportsPrecisePointer) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const target = e.target as Element | null;
      const labelEl = target?.closest?.("[data-cursor]") as HTMLElement | null;
      const next = labelEl?.dataset.cursor ?? null;
      if (next !== labelRef.current) {
        labelRef.current = next;
        setLabel(next);
      }
    };

    const onLeave = () => {
      if (labelRef.current !== null) {
        labelRef.current = null;
        setLabel(null);
      }
    };

    const tick = () => {
      dot.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`;
      if (reduced) {
        rx = mx;
        ry = my;
      } else {
        rx += (mx - rx) * 0.2;
        ry += (my - ry) * 0.2;
      }
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  const text = label ? LABEL_MAP[label] ?? label : null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-graphite mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full border mix-blend-difference",
          "transition-[width,height,padding,background-color,border-color,color] duration-300 ease-out",
          text
            ? "h-auto w-auto min-h-8 px-3.5 py-1.5 bg-copper border-copper text-white text-caption font-medium tracking-wide"
            : "h-8 w-8 border-graphite/70 bg-transparent"
        )}
        style={{ willChange: "transform" }}
      >
        {text && <span className="whitespace-nowrap">{text}</span>}
      </div>
    </>
  );
}
