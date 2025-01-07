import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--Primary-color)",
        secondary: "var(--Secondary-color)",
        light: "var(--Light-color)",
        dark: "var(--Dark-color)",
        lightBg: "var(--Light-Bg)",
        darkBg: "var(--Dark-Bg)",
        lightBgLighter: "var(--Light-Bg-Lighter)",
        darkBgLighter: "var(--Dark-Bg-Lighter)",
        warning: "var(--warrning)",
      },
    },
  },
  plugins: [],
};

export default config;
