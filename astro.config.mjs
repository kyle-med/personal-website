import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://your-site.vercel.app',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
