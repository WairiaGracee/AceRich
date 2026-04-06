/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",       // main black
        secondary: "#ffffff",// white
        blueMain: "#011627",    //blue dark
        indigoDye: "#00416A", //indigo blue
        aliceBlue:"#F0F8FF", //aliceBlue
        accent: "#c9a27e",        // gold/beige tone
        accentLight: "#e5d3c5",   // softer version
        background: "#f8f8f8",    // light section bg
        textPrimary: "#1a1a1a",   // main text
        textSecondary: "#777777", // muted text
        borderLight: "#e5e5e5",   // subtle borders

        emerald: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#145231',
        },
      },
      fontFamily:{
        sans: ['Inter', 'sans-serif'],
        robotoCondensed: ["Roboto Condensed", 'sans-serif'],
        Charon: ["Iosevka Charon", 'monospace'],
        Boldonse: ["Boldonse", 'system-ui']
      },
       animation: {
      blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
        },
      },
    },
  },
  plugins: [],
}

