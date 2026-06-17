type Method = "cod" | "jazzcash" | "easypaisa" | "bank" | "visa" | "mastercard";

const tokens: Record<
  Method,
  { label: string; bg: string; fg: string; border?: string; mono?: boolean }
> = {
  cod: { label: "COD", bg: "#0B0B0F", fg: "#FFFFFF" },
  jazzcash: { label: "JazzCash", bg: "#E11D2A", fg: "#FFFFFF" },
  easypaisa: { label: "easypaisa", bg: "#00A651", fg: "#FFFFFF" },
  bank: { label: "Bank", bg: "#1E3A8A", fg: "#FFFFFF" },
  visa: { label: "VISA", bg: "#1A1F71", fg: "#F7B600", mono: true },
  mastercard: {
    label: "MASTER",
    bg: "#FFFFFF",
    fg: "#0B0B0F",
    border: "#0B0B0F",
    mono: true,
  },
};

export function PaymentBadge({
  method,
  size = "sm",
}: {
  method: Method;
  size?: "sm" | "md";
}) {
  const t = tokens[method];
  const cls =
    size === "md"
      ? "h-7 px-2.5 text-[11px]"
      : "h-5 px-1.5 text-[9px] sm:h-6 sm:px-2 sm:text-[10px]";
  return (
    <span
      className={`inline-flex items-center justify-center rounded ${cls} font-bold uppercase tracking-[0.04em] whitespace-nowrap ${
        t.mono ? "font-mono" : ""
      }`}
      style={{
        backgroundColor: t.bg,
        color: t.fg,
        ...(t.border && { boxShadow: `inset 0 0 0 1px ${t.border}` }),
      }}
    >
      {t.label}
    </span>
  );
}

export function PaymentRow({ className }: { className?: string }) {
  const methods: Method[] = [
    "cod",
    "jazzcash",
    "easypaisa",
    "bank",
    "visa",
    "mastercard",
  ];
  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className ?? ""}`}>
      {methods.map((m) => (
        <PaymentBadge key={m} method={m} />
      ))}
    </div>
  );
}
