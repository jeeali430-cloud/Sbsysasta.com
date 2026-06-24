import { cn } from "@/lib/utils";
import { Container } from "./container";

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  className,
  bg,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  bg?: "porcelain" | "white" | "graphite";
  children: React.ReactNode;
}) {
  const bgClass =
    bg === "white"
      ? "bg-white"
      : bg === "graphite"
        ? "bg-graphite text-porcelain"
        : "bg-porcelain";

  return (
    <section id={id} className={cn("py-8 sm:py-10 lg:py-14", bgClass, className)}>
      <Container>
        {(eyebrow || title || subtitle) && (
          <div className="mb-6 sm:mb-8 max-w-2xl">
            {eyebrow && (
              <p className="text-caption uppercase tracking-[0.18em] text-copper font-medium mb-3">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-h1 sm:text-display-lg font-display font-semibold text-balance">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-body text-slate text-pretty">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
