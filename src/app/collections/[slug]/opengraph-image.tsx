import { ImageResponse } from "next/og";
import { listCategories } from "@/lib/repo/categories";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const VIRTUAL: Record<string, { name: string; sub: string }> = {
  all: {
    name: "All Home Appliances",
    sub: "Every brand, every category — in stock in Lahore",
  },
  deals: {
    name: "Today's Deals",
    sub: "Hand-picked appliance discounts refreshed every 24 hours",
  },
};

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  const categories = await listCategories();
  const cat = categories.find(
    (c) => c.slug === params.slug || c.seoSlug === params.slug
  );

  const virtual = VIRTUAL[params.slug];
  const name = virtual?.name ?? cat?.name ?? "Shop";
  const sub =
    virtual?.sub ?? `Price in Lahore, Pakistan · ${cat?.brands.slice(0, 5).join(" · ") ?? ""}`;
  const brands = cat?.brands.slice(0, 6) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(70% 60% at 100% 0%, rgba(180,83,9,0.18) 0%, rgba(180,83,9,0) 60%), #FAFAF7",
          color: "#0B0B0F",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            <span>Sbsysasta</span>
            <span style={{ color: "#B45309" }}>.</span>
          </div>
          <div
            style={{
              padding: "4px 12px",
              borderRadius: 999,
              backgroundColor: "#0B0B0F",
              color: "#FFFFFF",
              fontSize: 14,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Lahore
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#B45309",
              fontWeight: 600,
            }}
          >
            Shop
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              maxWidth: 1040,
            }}
          >
            {name}.
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#5B6068",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            {sub}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 24,
            borderTop: "1px solid #E7E7E2",
          }}
        >
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {brands.map((b) => (
              <span
                key={b}
                style={{
                  padding: "6px 14px",
                  borderRadius: 999,
                  border: "1px solid #E7E7E2",
                  backgroundColor: "#FFFFFF",
                  fontSize: 18,
                  color: "#0B0B0F",
                }}
              >
                {b}
              </span>
            ))}
          </div>
          <div style={{ fontSize: 18, color: "#5B6068" }}>sbsysasta.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
