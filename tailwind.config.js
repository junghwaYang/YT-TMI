import defaultTheme from 'tailwindcss/defaultTheme';

export const darkMode = 'class';
export const content = [
  './pages/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
];
export const theme = {
  extend: {
    fontFamily: {
      sans: ['var(--font-noto)', ...defaultTheme.fontFamily.sans],
    },
  },
};
export const plugins = [];
