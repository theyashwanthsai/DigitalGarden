/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html  ","./src/**/*.{jsx,js}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter:['inter', 'serif'],
        indie: ['Indie'],
        victor: ['Victormono'],
        lora: ['lora'],
        ostwald: ['ostwald']
      }
    },
    colors: {
      // Configure your color palette here
      // 'pink': '#9E4244',
      'sun': '#FFEA20',
      'moon': '#191825',
      'light': '#E1F0DA',
      'ltext': '#293462',
      // 'dark':'gray-950',
      'dark':'#000000',
      // 'dtext':'stone-300',
      'dtext':'#EEEEEE',

    },
    
  },
  plugins: [],
}

