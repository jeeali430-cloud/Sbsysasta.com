import { ImageResponse } from "next/og";
import { getProductBySlug } from "@/lib/repo/products";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function formatPKR(n: number) {
  return `₨ ${new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(n)}`;
}

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return new ImageResponse(<div />, size);
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "60px",
          background:
            "radial-gradient(70% 60% at 0% 100%, rgba(180,83,9,0.16) 0%, rgba(180,83,9,0) 60%), #FAFAF7",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#0B0B0F",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingRight: 40,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                display: "flex",
                fontSize: 28,
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              <span>Sbsysasta</span>
              <span style={{ color: "#B45309" }}>.</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                fontSize: 18,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#5B6068",
                fontWeight: 600,
              }}
            >
              {product.brand}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 56,
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
              }}
            >
              {product.title}
            </div>

            <div
              style={{
                marginTop: 12,
                display: "flex",
                alignItems: "baseline",
                gap: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 64,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                {formatPKR(product.price)}
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <div
                    style={{
                      display: "flex",
                      fontSize: 24,
                      color: "#9A9AA1",
                      textDecoration: "line-through",
                    }}
                  >
                    {formatPKR(product.originalPrice)}
                  </div>
                  {discount > 0 && (
                    <div
                      style={{
                        padding: "6px 14px",
                        borderRadius: 999,
                        backgroundColor: "#0B0B0F",
                        color: "#FFFFFF",
                        fontSize: 22,
                        fontWeight: 600,
                      }}
                    >
                      -{discount}%
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 14,
              fontSize: 18,
              color: "#5B6068",
              paddingTop: 18,
              borderTop: "1px solid #E7E7E2",
            }}
          >
            <span>Same-Day Delivery in Lahore</span>
            <span>·</span>
            <span>Cash on Delivery</span>
            <span>·</span>
            <span>{product.warranty}</span>
          </div>
        </div>

        <div
          style={{
            width: 460,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 24,
            backgroundColor: "#FFFFFF",
            border: "1px solid #E7E7E2",
            overflow: "hidden",
          }}
        >
          <img
            src={product.image}
            alt=""
            width={460}
            height={510}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
