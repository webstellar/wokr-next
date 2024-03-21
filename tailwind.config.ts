import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "wokr-red-50": "#FFECF0",
        "wokr-red-100": "#D03D5A",
        "wokr-red-200": "#AE0A2B",
        "wokr-green-100": "#55C1AC",
      },
      fontFamily: {
        san: ["var(--font-pangram)"],
      },
      gridTemplateColumns: {
        sidebar: "200px auto", //for sidebar layout
        "sidebar-collapsed": "64px auto",
        "sidebar-collapsed-mobile": "0px auto",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
