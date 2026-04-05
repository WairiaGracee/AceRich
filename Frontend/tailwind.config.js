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
      },
      fontFamily:{
        robotoCondensed: ["Roboto Condensed", 'sans-serif'],
        Charon: ["Iosevka Charon", 'monospace'],
        Boldonse: ["Boldonse", 'system-ui']
      }
    },
  },
  plugins: [],
}

