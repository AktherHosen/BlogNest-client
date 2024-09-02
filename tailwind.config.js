const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        suse: "'SUSE', sans-serif",
        sans: "'Open Sans', sans-serif",
      },
      backgroundColor: {
        primary: "#00579a",
      },
      colors: {
        primary: "#00579a",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
