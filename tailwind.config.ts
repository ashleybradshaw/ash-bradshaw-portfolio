import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-red": "#FF0E00",
        "brand-blue": "#13014C",
        "cream-1": "#FFF9E6",
        "cream-2": "#FFFFF0",
        "cream-3": "#E1DBC8",
        "text-dark": "#0A0127",
        taupe: "#A59F8A",
        "badge-current": "#78FC00",
        "badge-current-ink": "#1B3500",
        "calm-light": "#FFF9E6",
      },
      fontFamily: {
        display: ["var(--font-palanquin-dark)", "sans-serif"],
        sans: ["var(--font-plus-jakarta)", "sans-serif"],
      },
    },
  },
};

export default config;
