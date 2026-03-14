import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        base: "#F6F8FB",
        "base-2": "#FFFFFF",
        secondary: "#111111",
        accent: "#FFD814",
        soft: "#F0F2F2"
      },
      fontFamily: {
        display: ["var(--font-sans)", "Arial", "Helvetica", "sans-serif"],
        sans: ["var(--font-sans)", "Arial", "Helvetica", "sans-serif"]
      },
      boxShadow: {
        luxe: "0 20px 50px rgba(0,0,0,0.08)"
      }
    }
  },
  plugins: []
};

export default config;
