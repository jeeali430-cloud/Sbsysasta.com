import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  className?: string;
};

// Logo image is 600×200 (3:1). Heights below drive the displayed size.
const sizes = {
  sm: { h: 36, w: 108 },
  md: { h: 44, w: 132 },
  lg: { h: 56, w: 168 },
};

export function Logo({
  href = "/",
  size = "md",
  variant = "dark",
  className,
}: Props) {
  const s = sizes[size];
  // On dark backgrounds the logo already has an orange palette that reads well.
  // On light backgrounds same — transparent PNG works for both.
  void variant;

  return (
    <Link
      href={href}
      aria-label="Sbsysasta — Home"
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src="/logo.png"
        alt="Sb Sy Sasta.com"
        width={s.w}
        height={s.h}
        className="object-contain"
        priority
      />
    </Link>
  );
}
