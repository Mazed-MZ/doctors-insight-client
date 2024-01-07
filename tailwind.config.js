/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#ab00ff",

          "secondary": "#00b4d5",

          "accent": "#004cff",

          "neutral": "#070a07",

          "base-100": "#e8ffff",

          "info": "#0079ff",

          "success": "#00e5bf",

          "warning": "#a25400",

          "error": "#ff2558",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

