/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#004ac6",
        "primary-container": "#2563eb",
        "secondary": "#855300",
        "secondary-container": "#fea619",
        "on-secondary-container": "#684000",
        "tertiary": "#943700",
        "surface": "#f7f9fb",
        "on-surface": "#191c1e",
        "on-surface-variant": "#434655",
        "surface-container-low": "#f2f4f6",
        "surface-container-lowest": "#ffffff",
        "surface-container-high": "#e6e8ea",
        "surface-container-highest": "#e0e3e5",
        "outline": "#737686",
        "outline-variant": "#c3c6d7",
        "error": "#ba1a1a",
      },
      fontFamily: {
        "sans": ["Inter", "ui-sans-serif", "system-ui"],
      },
      borderRadius: {
        "xl": "1.5rem",
      },
    },
  },
  plugins: [],
}
