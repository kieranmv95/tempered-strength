import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
  theme: {
    extend: {
      colors: {
        // Primary
        rand: {
          400: '#3C3C41',
          500: '#2B2B30',
        },
        egwene: {
          500: '#FFFC41',
        },
        thom: '#FFF',
        // Helpers
        success: {
          500: '#16FF01',
        },
        danger: {
          500: '#FF5959',
        },
      },
    },
  },
};
export default config;
