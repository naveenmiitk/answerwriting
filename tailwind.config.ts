const { fontFamily } = require("tailwindcss/defaultTheme");
const { withUt } = require("uploadthing/tw");

/** @type {import('tailwindcss').Config} */
module.exports = withUt({
  darkMode: ["class"],
  content: ["src/app/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}"],
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
        brandPrimary: {
          DEFAULT: "#242424",
          "50": "#f0f3fe",
          "100": "#dee3fb",
          "200": "#c4cff9",
          "300": "#9baff5",
          "400": "#6c86ee",
          "500": "#3d53e6",
          "600": "#343fdc",
          "700": "#2b2dca",
          "800": "#2b29a4",
          "900": "#262782",
          "950": "#1d1c4f",
        },
        brandBackground: {
          DEFAULT: "#202225",
        },
        wewak: {
          "50": "#fdf3f4",
          "100": "#fbe8eb",
          "200": "#f6d5da",
          "300": "#ea9daa",
          "400": "#e58799",
          "500": "#d75c77",
          "600": "#c13d60",
          "700": "#a22e4f",
          "800": "#882947",
          "900": "#752642",
          "950": "#411020",
        },
        tangerine: {
          "50": "#fef8ee",
          "100": "#fef0d6",
          "200": "#fbdead",
          "300": "#f8c579",
          "400": "#f5a242",
          "500": "#f28c28",
          "600": "#e36c13",
          "700": "#bc5312",
          "800": "#954117",
          "900": "#783716",
          "950": "#411a09",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
});
