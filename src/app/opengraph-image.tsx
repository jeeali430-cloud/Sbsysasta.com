import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const runtime = "nodejs";
export const alt = `${site.name} — Home appliances in Lahore`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
            "radial-gradient(60% 50% at 80% 20%, rgba(180,83,9,0.20) 0%, rgba(180,83,9,0) 60%), linear-gradient(180deg, #FAFAF7 0%, #FFFFFF 100%)",
          color: "#0B0B0F",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            <span>Sbsysasta</span>
            <span style={{ color: "#B45309" }}>.</span>
          </div>
          <div
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              border: "1px solid #E7E7E2",
              fontSize: 16,
              color: "#5B6068",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Lahore · Pakistan
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              maxWidth: 1000,
            }}
          >
            <div>Premium appliances.</div>
            <div>Honest prices.</div>
            <div style={{ color: "#B45309" }}>Delivered across Lahore.</div>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#5B6068" }}>
            Samsung · LG · Haier · Dawlance · Gree · TCL
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 24,
            borderTop: "1px solid #E7E7E2",
            fontSize: 20,
            color: "#5B6068",
          }}
        >
          <div>Cash on Delivery · Easy installments · Same-day delivery</div>
          <div>sbsysasta.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
