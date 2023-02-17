/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bybb: '#13242f',
        bybg: '#80b217'
      },
      backgroundImage: {
        banner: "url('/src/images/backdrop.png')"
      },
      dropShadow: {
        dark: '5px 5px 5px rgb(0 0 0 / 0.80)'
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#13242f",
          "secondary": "#80b217",
          "accent": "#c3fa4d",
          "neutral": "#80b217",
          "base-100": "#80b217",
          "info": "#80b217",
          "success": "#80b217",
          "warning": "#80b217",
          "error": "#F72F1D",
        }
      }
    ]
  },
  plugins: [require("daisyui")],
}