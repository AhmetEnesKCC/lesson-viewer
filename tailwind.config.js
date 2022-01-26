module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-black": "#212121",
        "main-white": "#fafafa",
      },
      fontFamily: {
        poppins: ["Poppins"],
        maven: ["Maven Pro"],
      },
    },
  },
  plugins: [require("tailwindcss-important"), require("tailwindcss-children")],
};
