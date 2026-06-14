import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { href: string; label: string };

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-caption text-graphite-400">
      <ol className="flex flex-wrap items-center gap-1.5">
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1.5">
              {isLast ? (
                <span className="text-graphite font-medium" aria-current="page">
                  {c.label}
                </span>
              ) : (
                <Link
                  href={c.href}
                  className="hover:text-copper transition-colors"
                >
                  {c.label}
                </Link>
              )}
              {!isLast && (
                <ChevronRight className="h-3 w-3 text-graphite-200" aria-hidden />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
