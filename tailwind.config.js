module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Rubik", "sans-serif"],
      button: ["Raleway", "sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
