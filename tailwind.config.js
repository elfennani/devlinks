/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: {
        bold: "#633CFF",
        normal: "#BEADFF",
        light: "#EFEBFF",
      },
      secondary: {
        bolder: "#333333",
        bold: "#737373",
        normal: "#D9D9D9",
        light: "#FAFAFA",
      },
      error: "#FF3939",
    },
    extend: {},
  },
  plugins: [],
};
