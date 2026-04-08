/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0460D9', // Azul Calasanz
          dark: '#002855',    // Azul Institucional
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc8fb',
          400: '#38acf7',
          500: '#0460D9',
          600: '#0352ba',
          700: '#034399',
          800: '#002855',
          900: '#0c416e',
        },
        accent: '#f2c144',   // Amarillo Acero
        app: {
          bg: '#F1F3F5',     // Gris Fondo
          border: '#E2E8F0', // Gris Borde
          text: '#1E293B',   // Slate 800
          muted: '#94A3B8',  // Gris Texto Muted
        },
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'elevated': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'none': '0px',
        'sm': '2px',
        'DEFAULT': '5px',
        'md': '5px',
        'lg': '5px',
      },
    },
  },
  plugins: [],
}
