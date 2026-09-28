import type { Config } from "tailwindcss";

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.ts"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        bg: token("bg"),
        surface: token("surface"),
        ink: token("ink"),
        muted: token("muted"),
        line: token("line"),
        accent: token("accent"),
        "accent-soft": token("accent-soft"),
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // 1.25 scale around a 17px body
        xs: ["0.8125rem", { lineHeight: "1.25rem" }],
        sm: ["0.90625rem", { lineHeight: "1.4rem" }],
        base: ["1.0625rem", { lineHeight: "1.7rem" }],
        lg: ["1.25rem", { lineHeight: "1.85rem" }],
        xl: ["1.5625rem", { lineHeight: "2rem" }],
      },
      borderRadius: {
        control: "6px",
        panel: "12px",
      },
      maxWidth: {
        shell: "1200px",
        prose: "68ch",
      },
    },
  },
  plugins: [],
};
export default config;
