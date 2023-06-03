const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontSize: {
      "2xs": ["0.75rem", { lineHeight: "1.25rem" }],
      xs: ["0.8125rem", { lineHeight: "1.5rem" }],
      sm: ["0.875rem", { lineHeight: "1.5rem" }],
      base: ["1rem", { lineHeight: "1.75rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      "5xl": ["3rem", { lineHeight: "1" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }],
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        display: ["var(--font-dm-sans)", ...fontFamily.sans],
      },
      colors: {
        slate: {
          1: "hsl(200, 7.0%, 8.8%)",
          2: "hsl(195, 7.1%, 11.0%)",
          3: "hsl(197, 6.8%, 13.6%)",
          4: "hsl(198, 6.6%, 15.8%)",
          5: "hsl(199, 6.4%, 17.9%)",
          6: "hsl(201, 6.2%, 20.5%)",
          7: "hsl(203, 6.0%, 24.3%)",
          8: "hsl(207, 5.6%, 31.6%)",
          9: "hsl(206, 6.0%, 43.9%)",
          10: "hsl(206, 5.2%, 49.5%)",
          11: "hsl(206, 6.0%, 63.0%)",
          12: "hsl(210, 6.0%, 93.0%)",
        },
        crimson: {
          1: "hsl(335, 20.0%, 9.6%)",
          2: "hsl(335, 32.2%, 11.6%)",
          3: "hsl(335, 42.5%, 16.5%)",
          4: "hsl(335, 47.2%, 19.3%)",
          5: "hsl(335, 50.9%, 21.8%)",
          6: "hsl(335, 55.7%, 25.3%)",
          7: "hsl(336, 62.9%, 30.8%)",
          8: "hsl(336, 74.9%, 39.0%)",
          9: "hsl(336, 80.0%, 57.8%)",
          10: "hsl(339, 84.1%, 62.6%)",
          11: "hsl(341, 90.0%, 67.3%)",
          12: "hsl(332, 87.0%, 96.0%)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/forms")],
};
