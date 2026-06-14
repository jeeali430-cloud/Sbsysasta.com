import { Check } from "lucide-react";

export function Highlights({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {items.map((h) => (
        <li key={h} className="flex items-start gap-2.5 text-small text-graphite">
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-copper-50 text-copper">
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
          <span>{h}</span>
        </li>
      ))}
    </ul>
  );
}
