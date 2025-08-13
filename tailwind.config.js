module.exports = {
  darkMode: "class", // important
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0f172a", // slate-950
      },
    },
  },
  plugins: [],
};
