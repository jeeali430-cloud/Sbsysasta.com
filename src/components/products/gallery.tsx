"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="grid gap-4 lg:grid-cols-[88px_1fr] lg:gap-5">
      <ul className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:flex-col lg:overflow-visible">
        {images.map((src, i) => (
          <li key={src + i} className="shrink-0">
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              data-cursor="view"
              className={cn(
                "relative block h-20 w-20 overflow-hidden rounded-md border-2 bg-porcelain transition-all duration-300 ease-premium",
                i === active
                  ? "border-copper shadow-soft"
                  : "border-mist hover:border-graphite-200"
              )}
            >
              <Image
                src={src}
                alt={`${alt} thumbnail ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      <div
        className="relative order-1 aspect-square w-full overflow-hidden rounded-xl border border-mist bg-white lg:order-2"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
        data-cursor="view"
      >
        <Image
          src={images[active]}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 540px, 100vw"
          className={cn(
            "object-cover transition-transform duration-700 ease-premium",
            zoomed ? "scale-105" : "scale-100"
          )}
        />
      </div>
    </div>
  );
}
