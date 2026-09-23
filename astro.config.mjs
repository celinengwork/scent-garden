// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  devToolbar: { enabled: false },
  // Production URL (used for absolute Open Graph image URLs).
  site: 'https://scent-garden.vercel.app',
});
