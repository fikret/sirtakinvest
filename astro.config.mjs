// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Yayın hedefine göre site adresi ve temel yol (base):
 *
 *  • GitHub Pages (proje sitesi):  SITE = https://<kullanıcı>.github.io , BASE = '/<repo>'
 *  • Cloudflare Pages / kök alan:  SITE = https://<alanadınız>          , BASE = '/'
 *
 * Ortam değişkeniyle (SITE_URL / BASE_PATH) override edilebilir; yoksa aşağıdaki
 * GitHub Pages varsayılanları kullanılır. Cloudflare'e geçerken BASE_PATH='/' verin.
 */
const SITE = process.env.SITE_URL ?? 'https://fikret.github.io';
const BASE = process.env.BASE_PATH ?? '/sirtakinvest';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
});
