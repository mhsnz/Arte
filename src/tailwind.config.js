/** @type {import('tailwindcss').Config} */
export default {
  // Specify files for Tailwind to scan
  content: ['./src/**/*.{svelte,js,ts}'],
  theme: {
    extend: {
      // Add custom primary color
      colors: {
        primary: '#d49f4c',
      },
    },
  },
  // No additional plugins
  plugins: [],
};