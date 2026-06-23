import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1400px",
        "2xl": "1600px",
      },
    },
    extend: {
      colors: {
        porcelain: "#FAFAF7",
        graphite: {
          DEFAULT: "#0B0B0F",
          50: "#F4F4F5",
          100: "#E4E4E7",
          200: "#C8C8CD",
          300: "#9A9AA1",
          400: "#5B6068",
          500: "#3F434A",
          600: "#262930",
          700: "#16181D",
          900: "#0B0B0F",
        },
        slate: {
          DEFAULT: "#5B6068",
        },
        mist: "#E7E7E2",
        copper: {
          DEFAULT: "#B45309",
          50: "#FDF6EC",
          100: "#FAE8CD",
          200: "#F3CB91",
          300: "#E6A654",
          400: "#CE8423",
          500: "#B45309",
          600: "#92400E",
          700: "#7C2D12",
        },
        pine: "#0F766E",
        saffron: "#D97706",
        carmine: "#9F1239",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "Geist",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "Geist Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      fontSize: {
        caption: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.04em" }],
        small: ["0.875rem", { lineHeight: "1.25rem" }],
        body: ["1rem", { lineHeight: "1.55rem" }],
        h3: ["1.125rem", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
        h2: ["1.5rem", { lineHeight: "1.25", letterSpacing: "-0.015em" }],
        h1: ["2rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-lg": [
          "2.5rem",
          { lineHeight: "1.05", letterSpacing: "-0.025em" },
        ],
        "display-xl": [
          "3.5rem",
          { lineHeight: "1.02", letterSpacing: "-0.03em" },
        ],
      },
      borderRadius: {
        sm: "6px",
        DEFAULT: "10px",
        md: "12px",
        lg: "18px",
        xl: "24px",
        "2xl": "32px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(11,11,15,0.04), 0 8px 24px rgba(11,11,15,0.06)",
        lift: "0 2px 4px rgba(11,11,15,0.05), 0 20px 40px rgba(11,11,15,0.10)",
        glow: "0 30px 80px -20px rgba(180,83,9,0.25)",
      },
      backgroundImage: {
        "hero-mesh":
          "radial-gradient(60% 50% at 80% 20%, rgba(180,83,9,0.10) 0%, rgba(180,83,9,0) 60%), radial-gradient(40% 40% at 10% 90%, rgba(11,11,15,0.04) 0%, rgba(11,11,15,0) 60%)",
        "grid-faint":
          "linear-gradient(rgba(11,11,15,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(11,11,15,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
