import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      colors: {
        black: "#000000",
        white: "#ffffff",
        cream: "#F5F0EB",
        "gray-dim": "#888888",
        "gray-light": "#CCCCCC",
        accent: "#FF3D00",
      },
      fontSize: {
        "2xs": "0.625rem",
        "hero": "clamp(3.5rem, 9vw, 9rem)",
        "display": "clamp(2.5rem, 6vw, 6rem)",
        "section": "clamp(1.8rem, 4vw, 4rem)",
      },
      letterSpacing: {
        tightest: "-0.04em",
        tight: "-0.02em",
        widest: "0.2em",
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "expo-in-out": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
