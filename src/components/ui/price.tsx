import { cn, discountPercent, formatPKR } from "@/lib/utils";

export function Price({
  price,
  originalPrice,
  size = "md",
  className,
}: {
  price: number;
  originalPrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const discount = originalPrice ? discountPercent(originalPrice, price) : 0;
  const sizeClass =
    size === "lg"
      ? "text-h1 sm:text-display-lg"
      : size === "sm"
        ? "text-body"
        : "text-h2";

  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-3 gap-y-1", className)}>
      <span className={cn("font-display font-semibold text-graphite", sizeClass)}>
        {formatPKR(price)}
      </span>
      {originalPrice && originalPrice > price && (
        <>
          <span className="text-small line-through text-graphite-300">
            {formatPKR(originalPrice)}
          </span>
          {discount > 0 && (
            <span className="inline-flex items-center rounded-full bg-graphite px-2 py-0.5 text-caption font-medium text-white">
              -{discount}%
            </span>
          )}
        </>
      )}
    </div>
  );
}
