import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#06040A",
        surface: "#0d0d14",
        card: "#110D16",
        "card-border": "rgba(255,255,255,0.07)",
        accent: "#FF0070",
        "accent-light": "#FF5FA3",
        bull: "#00E676",
        bear: "#FF1744",
        base: "#FFD600",
        muted: "#B8B4CC",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Syne", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
