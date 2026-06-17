const styles: Record<string, string> = {
  pending: "bg-saffron/10 text-saffron border-saffron/30",
  confirmed: "bg-copper/10 text-copper border-copper/30",
  shipped: "bg-graphite-100 text-graphite border-graphite-200",
  delivered: "bg-pine/10 text-pine border-pine/30",
  cancelled: "bg-carmine/10 text-carmine border-carmine/30",
};

export function OrderStatusPill({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-caption font-medium uppercase tracking-[0.08em] ${
        styles[status] ?? "bg-porcelain text-graphite border-mist"
      }`}
    >
      {status}
    </span>
  );
}
