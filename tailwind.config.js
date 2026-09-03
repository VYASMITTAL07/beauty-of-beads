/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Georgia", "Cambria", "ui-serif", "serif"],
        // The brush script of the printed logo, for the wordmark alone.
        script: ['"Kaushan Script"', "Segoe Script", "cursive"],
        sans: ["Segoe UI", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        clay: {
          50: "#FAF3EA",
          100: "#F1E4D3",
          200: "#E4D3BE",
          400: "#C1653A",
          500: "#A34F2B",
          600: "#833E20",
        },
        // Espresso brown, kept under the "olive" name so the ~280 class uses
        // across the app don't all have to be renamed. Each step sits at the
        // lightness of the green it replaces, so every contrast relationship
        // the layout already relied on still holds.
        olive: {
          50: "#FAF3EE",
          100: "#EFE3DB",
          200: "#C9B2A2",
          400: "#6B4C3C",
          500: "#52392E",
          600: "#3E2B23",
        },
        // A deeper shade of the page's own blush, for accents that have to be
        // read. The background pink itself (#FFEAEA) is 1.15:1 on white —
        // invisible as text — so the family needs a readable member.
        rose: {
          500: "#BC4E69",
        },
        gold: {
          300: "#DDBB6E",
          400: "#C79A3E",
          500: "#A87E2C",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
