import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  className?: string;
  showText?: boolean;
};

const sizes = {
  sm: { box: 32, text: "text-h3" },
  md: { box: 40, text: "text-h2" },
  lg: { box: 56, text: "text-display-lg" },
};

export function Logo({
  href = "/",
  size = "md",
  variant = "dark",
  className,
  showText = false,
}: Props) {
  const s = sizes[size];
  const accent = variant === "light" ? "text-copper-300" : "text-copper";
  const ink = variant === "light" ? "text-white" : "text-graphite";

  return (
    <Link
      href={href}
      aria-label="Sbsysasta — Home"
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <span
        className="relative inline-block shrink-0"
        style={{ width: s.box, height: s.box }}
      >
        <Image
          src="/logo.png"
          alt="Sbsysasta logo"
          fill
          sizes={`${s.box}px`}
          className="object-contain"
          priority
        />
      </span>
      {showText && (
        <span
          className={cn(
            "font-display font-semibold tracking-tight",
            s.text,
            ink
          )}
        >
          Sbsysasta<span className={accent}>.</span>
        </span>
      )}
    </Link>
  );
}
