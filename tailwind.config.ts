import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
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
        brand: {
          red: "#FF0E00",
          blue: "#13014C",
        },
        cream: {
          1: "#FFF9E6",
          2: "#FFFFF0",
          3: "#E1DBC8",
        },
        calm: {
          light: "#FFF9E6",
          gray: "#E1DBC8",
        },
        dark: "#0A0127",
        "accent-cream": "#FFF9E6",
        "electric-red": "#D40B00",
        "deep-blue": "#20086B",
        light: "#FFFFFF",
      },
      fontFamily: {
        display: ["var(--font-palanquin-dark)", "sans-serif"],
        body: ["var(--font-plus-jakarta)", "sans-serif"],
        sans: ["var(--font-plus-jakarta)", "sans-serif"],
      },
    },
  },
};

export default config;
