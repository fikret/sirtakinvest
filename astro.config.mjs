// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// NOT: Cloudflare Pages'e bağladıktan sonra burayı kendi alan adınızla güncelleyin.
// Doğru `site` değeri sitemap.xml ve canonical/OG etiketleri için gereklidir.
const SITE = 'https://sirtakinvest.pages.dev';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
});
