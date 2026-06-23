import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  className?: string;
};

// Logo PNG is 1500×320 (≈4.7:1). Heights below drive the displayed size;
// width is computed to preserve the aspect ratio so the full wordmark shows.
const ratio = 1500 / 320;
const heights = { sm: 32, md: 44, lg: 56 };

export function Logo({
  href = "/",
  size = "md",
  variant,
  className,
}: Props) {
  void variant;
  const h = heights[size];
  const w = Math.round(h * ratio);

  return (
    <Link
      href={href}
      aria-label="Sb Sy Sasta.com — Home"
      className={cn("inline-flex items-center shrink-0", className)}
    >
      <Image
        src="/logo.png"
        alt="Sb Sy Sasta.com"
        width={w}
        height={h}
        className="object-contain"
        priority
      />
    </Link>
  );
}
