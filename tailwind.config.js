/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      "heading-m": [
        "2rem",
        {
          fontWeight: "700",
          lineHeight: "3rem",
        },
      ],
      "heading-s": [
        "1rem",
        {
          fontWeight: "600",
          lineHeight: "2rem",
        },
      ],
      "base-m": ["1rem", "1.5rem"],
      "base-s": ["0.75rem", "1.125rem"],
    },
    extend: {
      boxShadow: {
        focused: "0px 0px 32px 0px rgba(99, 60, 255, 0.25)",
      },
      colors: {
        primary: {
          bold: "#633CFF",
          normal: "#BEADFF",
          light: "#EFEBFF",
        },
        graphite: {
          bolder: "#333333",
          bold: "#737373",
          normal: "#D9D9D9",
          light: "#FAFAFA",
        },
        error: "#FF3939",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
