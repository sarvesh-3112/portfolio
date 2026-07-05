import type { Config } from "tailwindcss";

// In Tailwind v4, theme customisation is done in globals.css via @theme {}.
// This file is kept for the content scanner paths only.
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
