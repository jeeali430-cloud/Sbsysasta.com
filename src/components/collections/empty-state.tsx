import { PackageOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/data/site";

export function EmptyState({ categoryName }: { categoryName: string }) {
  const message = `Salam! I'm looking for ${categoryName} but couldn't find what I need on your site. Can you help?`;
  return (
    <div className="rounded-2xl border border-mist bg-white p-12 text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-porcelain text-graphite-400">
        <PackageOpen className="h-6 w-6" />
      </span>
      <h3 className="mt-6 font-display text-h2 font-semibold text-graphite">
        No products match these filters.
      </h3>
      <p className="mx-auto mt-2 max-w-md text-small text-slate">
        Try removing a filter, or message us on WhatsApp — we restock weekly
        and may have what you need on the way.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button href={whatsappLink(message)} variant="primary" data-cursor="wa">
          Ask on WhatsApp
        </Button>
        <Link
          href="/collections/all"
          className="text-small font-medium text-graphite underline-offset-4 hover:underline"
        >
          See all products
        </Link>
      </div>
    </div>
  );
}
