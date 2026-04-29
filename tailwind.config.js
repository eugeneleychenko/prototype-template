/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    borderRadius: {
      none: "0px",
      DEFAULT: "0px",
      sm: "0px",
      md: "0px",
      lg: "0px",
      xl: "0px",
      "2xl": "0px",
      "3xl": "0px",
      full: "9999px",
    },
    extend: {
      colors: {
        cream: "#FEFFFA",
        panel: "#1F1F1F",
        lime: "#85ff0a",
        "lime-muted": "rgba(133,255,10,0.05)",
        "pale-accent": "#FAFFEB",
        ink: "#00140a",
        muted: "#888888",
        "border-light": "#E0E0E0",
        "border-dark": "#333333",
        card: "#FFFFFF",
        danger: "#E73B0A",
        input: "#fafaf7",
        stripe: "#f0f0eb",
        "yankees-navy": "#0C2340",
        "yankees-gray": "#828A8F",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ['"Space Mono"', "ui-monospace", "monospace"],
      },
      fontSize: {
        page: ["18px", { lineHeight: "1.25", letterSpacing: "-0.03em", fontWeight: "600" }],
        body: ["13px", { lineHeight: "1.5", fontWeight: "400" }],
        "mono-xs": ["9px", { lineHeight: "1.4", letterSpacing: "0.14em" }],
        "mono-sm": ["10px", { lineHeight: "1.4", letterSpacing: "0.12em" }],
        "nav-item": ["11px", { lineHeight: "1.3", letterSpacing: "0.05em" }],
      },
      backgroundImage: {
        "stripe-pattern":
          "repeating-linear-gradient(45deg, transparent, transparent 2px, #f0f0eb 2px, #f0f0eb 4px)",
      },
    },
  },
  plugins: [],
};
