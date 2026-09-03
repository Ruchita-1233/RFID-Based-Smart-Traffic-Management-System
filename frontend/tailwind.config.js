/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0B1220",
        panel: "#111A2B",
        panel2: "#17213A",
        border: "#243252",
        muted: "#8792AC",
        signalred: "#E4483A",
        signalamber: "#F2A93B",
        signalgreen: "#2ECC71",
        accent: "#3EC9DC",
      },
      fontFamily: {
        display: ["Rajdhani", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
