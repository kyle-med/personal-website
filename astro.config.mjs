import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://personal-website-five-cyan-49.vercel.app',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
