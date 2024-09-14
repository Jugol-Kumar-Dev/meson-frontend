import colors from "tailwindcss/colors.js";

/** @type {import('tailwindcss').Config} */
export default {
  content:  [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
    "./node_modules/flowbite/**/*.js",
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#f4f4fe',
          '100': '#eceafd',
          '200': '#dad8fc',
          '300': '#bfb9f9',
          '400': '#9f91f4',
          '500': '#7f64ee',
          '600': '#6c43e4',
          '700': '#5e31d0',
          '800': '#4d28ac',
          '900': '#41238f',
          '950': '#271461',
        },
        secondary:colors.slate
      }
    },
  },
  plugins: [],
}

