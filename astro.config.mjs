// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  devToolbar: { enabled: false },
  // Set this to the production URL once the Vercel domain is known (used for absolute OG image URLs).
  // site: 'https://your-domain.vercel.app',
});
