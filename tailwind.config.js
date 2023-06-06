/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#22E788",
        textDark: "#222",
        textLight: "#fff",
      },
    },
  },
  plugins: [require("daisyui")],
};
