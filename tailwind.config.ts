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
        brand: {
          red: "var(--wild-bg)",
          blue: "var(--wild-text)",
        },
        calm: {
          light: "var(--calm-bg)",
          gray: "#E8E6F0",
        },
        dark: "var(--calm-text)",
        "electric-red": "#D40B00",
        "deep-blue": "#20086B",
        light: "#FFFFFF",
        "accent-cream": "#FFF9E6",
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
