// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'apsmc-primary': '#04AA6D',   // Your new primary green color
        'apsmc-light': '#FFFFFF',     // Pure white for backgrounds and elements
      },
    },
  },
  plugins: [],
}