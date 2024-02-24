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
        'verde': '#e1f2bb',
        'rosso-scuro': '#731702',
        'rosso-chiaro': '#d91604',
      },
    },
  },
  plugins: [],
}

/** npx tailwindcss -i ./src/input.css -o ./src/output.css --watch */