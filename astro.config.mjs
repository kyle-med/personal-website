import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://hoikei-chan.vercel.app',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
