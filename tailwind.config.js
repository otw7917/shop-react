/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#03A9F4",
        accent: "#0276aa",
      },
      maxWidth: {
        wide: "1800px",
      },
    },
  },
  plugins: [],
};
