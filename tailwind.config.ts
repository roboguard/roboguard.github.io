import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ['var(--font-ibm)', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
