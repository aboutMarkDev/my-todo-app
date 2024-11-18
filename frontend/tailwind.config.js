/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#526D82",
        secondary: "#9DB2BF",
        black: {
          DEFAULT: "#000000",
          100: "#202020",
        },
        white: {
          DEFAULT: "#ffffff",
          100: "#f1f1f1",
        },
      },
    },
  },
  plugins: [],
};
