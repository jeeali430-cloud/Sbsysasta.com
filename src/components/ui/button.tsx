import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline" | "dark";
type Size = "sm" | "md" | "lg";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-copper text-white hover:bg-copper-600 shadow-soft hover:shadow-lift",
  ghost:
    "bg-transparent text-graphite hover:bg-graphite-50",
  outline:
    "border border-graphite text-graphite bg-transparent hover:bg-graphite hover:text-white",
  dark:
    "bg-graphite text-white hover:bg-graphite-700",
};

const sizeClass: Record<Size, string> = {
  sm: "h-9 px-4 text-small",
  md: "h-11 px-5 text-small",
  lg: "h-[3.25rem] px-7 text-body",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 ease-premium focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-porcelain disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variantClass[variant], sizeClass[size], className);

  if ("href" in props && props.href) {
    const { href, target, rel } = props;
    const isExternal = href.startsWith("http") || href.startsWith("https://wa.me");
    if (isExternal) {
      return (
        <a
          href={href}
          target={target ?? "_blank"}
          rel={rel ?? "noopener noreferrer"}
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
