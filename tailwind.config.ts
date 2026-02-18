import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0b0b0c",
        foreground: "#fafafa",
        card: "#141416",
        muted: "#202024",
        border: "#2e2e33",
        primary: "#ffffff",
        accent: "#c4c4c7"
      },
      boxShadow: {
        premium: "0 10px 35px rgba(0,0,0,0.35)"
      }
    }
  },
  plugins: []
};

export default config;
