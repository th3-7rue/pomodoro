/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,svg}"],
  theme: {
    container: {
      center: true,
    },

    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        'verde': '#6E8C03',
        'rosso-scuro': '#731702',
        'rosso-chiaro': '#B31003',
        'verde-chiaro': '#E1F2BB',
        'verde-scuro': '#465902',
      },
    },
  },
  plugins: [],
}

/** npx tailwindcss -i ./src/input.css -o ./src/app.css --watch */