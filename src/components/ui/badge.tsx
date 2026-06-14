import { cn } from "@/lib/utils";

type Tone = "ink" | "copper" | "pine" | "saffron" | "muted";

const toneClass: Record<Tone, string> = {
  ink: "bg-graphite text-white",
  copper: "bg-copper text-white",
  pine: "bg-pine/10 text-pine border border-pine/20",
  saffron: "bg-saffron/10 text-saffron border border-saffron/20",
  muted: "bg-graphite-50 text-graphite-400 border border-mist",
};

export function Badge({
  tone = "ink",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-caption font-medium uppercase tracking-[0.06em]",
        toneClass[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
