/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#2d6a4f',
          hover: '#1b4332',
        },
        surface: {
          light: '#ffffff',
          dark: '#1e293b',
        },
        bg: {
          light: '#f8fafc',
          dark: '#0f172a',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', 'Georgia', 'serif'],
        sans: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#475569',
            '--tw-prose-headings': '#0f172a',
            '--tw-prose-links': '#2d6a4f',
            '--tw-prose-bold': '#0f172a',
            maxWidth: '72ch',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
