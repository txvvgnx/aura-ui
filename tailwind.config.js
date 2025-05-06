/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBMPlexSans-Regular', 'sans-serif'],
        ibm: ['IBMPlexSans-Regular', 'sans-serif'],
        'ibm-thin': ['IBMPlexSans-Thin', 'sans-serif'],
        'ibm-extralight': ['IBMPlexSans-ExtraLight', 'sans-serif'],
        'ibm-light': ['IBMPlexSans-Light', 'sans-serif'],
        'ibm-regular': ['IBMPlexSans-Regular', 'sans-serif'],
        'ibm-medium': ['IBMPlexSans-Medium', 'sans-serif'],
        'ibm-semibold': ['IBMPlexSans-SemiBold', 'sans-serif'],
        'ibm-bold': ['IBMPlexSans-Bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
