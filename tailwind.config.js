/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#03A9F4",
      },
      maxWidth: {
        wide: "1800px",
      },
    },
  },
  plugins: [],
};
