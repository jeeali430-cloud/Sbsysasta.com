import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  className?: string;
};

const sizes = { sm: 80, md: 128, lg: 180 };

export function Logo({
  href = "/",
  size = "md",
  variant,
  className,
}: Props) {
  void variant;
  const px = sizes[size];

  return (
    <Link
      href={href}
      aria-label="Sb Sy Sasta — Home"
      className={cn("inline-flex items-center shrink-0", className)}
    >
      <Image
        src="/logo.png"
        alt="Sb Sy Sasta.com"
        width={px}
        height={px}
        className="object-contain"
        priority
      />
    </Link>
  );
}
