/**
 * İç linkleri Astro `base` yoluna göre üretir.
 * GitHub Pages (base='/sirtakinvest') ve Cloudflare/kök alan (base='/') için
 * aynı kod doğru çalışır. Dış linkler (http, mailto, tel, #) olduğu gibi döner.
 */
const BASE = import.meta.env.BASE_URL || '/';

export function withBase(path = '/'): string {
  if (/^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(path)) return path; // protokol / // / anchor
  const base = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE; // '/sirtakinvest' | ''
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}` || '/';
}
