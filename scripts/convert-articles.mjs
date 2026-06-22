// .docx kaynaklarını Astro content collection için Markdown'a çevirir.
// macOS `textutil` ile düz metin çıkarır, sezgisel olarak başlık/liste/alıntı yapısı kurar.
// Çalıştırma:  node scripts/convert-articles.mjs
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'kaynaklar');
const OUT = join(ROOT, 'src', 'content', 'articles');
mkdirSync(OUT, { recursive: true });

// slug, kaynak dosya, kart başlığı, kategori, özet (spot), sıra, öne çıkan, görsel etiketi
const ARTICLES = [
  { slug: 'daha-once-vizede-red-aldim', file: 'Daha Önce Vizede Red Aldım.docx',
    cardTitle: 'Daha Önce Vizede Red Aldım.', category: 'vize-kolayligi', order: 1, featured: true,
    label: 'Vize Reddi', heroTag: 'Vize & Oturum',
    spot: 'Geçmişteki bir Schengen vize reddi Golden Visa sürecini otomatik engellemez; dosyanın doğru kurgulanması yeterlidir.' },

  { slug: 'golden-visa-almak-ne-kadar-suruyor', file: 'Golden Visa Almak Ne Kadar Sürüyor.docx',
    cardTitle: 'Golden Visa Almak Ne Kadar Sürüyor?', category: 'vize-kolayligi', order: 2, featured: true,
    label: 'Süreç', heroTag: 'Vize & Oturum',
    spot: 'Doğru hazırlanmış bir dosyada Golden Visa yolculuğu ortalama 2–4 ay sürer. Bu süre bir gecikme değil, güvenli zemindir.' },

  { slug: 'ailem-de-yararlanabilir-mi', file: 'Ailem de Golden Visadan Yararlanabilir mi?.docx',
    cardTitle: "Ailem de Golden Visa'dan Yararlanabilir mi?", category: 'aile-ve-haklar', order: 3, featured: true,
    label: 'Aile', heroTag: 'Aile & Haklar',
    spot: 'Eşiniz, 21 yaş altı çocuklarınız, sizin ve eşinizin anne-babası tek bir yatırımla oturum hakkı kazanabilir.' },

  { slug: 'bosanirsak-bozuluyor-mu', file: 'Boşanırsak Golden Visa.docx',
    cardTitle: "Boşanırsak Golden Visa'mız Bozuluyor mu?", category: 'aile-ve-haklar', order: 4, featured: false,
    label: 'Mülkiyet', heroTag: 'Aile & Haklar',
    spot: 'Boşanma hakkı otomatik bozmaz; asıl belirleyici, yatırımın kimin adına ve hangi mülkiyet yapısıyla kurulduğudur.' },

  { slug: 'kiraya-verebilir-miyim', file: 'Golden Visa ile Aldığım Konutu Kiraya Verebilir miyim.docx',
    cardTitle: 'Kiraya Verebiliyor muyum?', category: 'yatirim-firsati', order: 5, featured: true,
    label: 'Kira Geliri', heroTag: 'Yatırım Fırsatı',
    spot: 'Evet — ancak kısa dönem (Airbnb) değil, uzun dönem ve yasal kiralama Golden Visa için güvenli yoldur.' },

  { slug: 'almanyada-yasayabilir-miyim', file: 'Golden Visa ile Almanyada Yaşayabilir miyim?.docx',
    cardTitle: "Almanya'da Yaşabilir miyim?", category: 'vize-kolayligi', order: 6, featured: false,
    label: 'Schengen', heroTag: 'Vize & Oturum',
    spot: 'Golden Visa Almanya’ya vizesiz seyahat sağlar; kalıcı yaşam için Almanya’nın kendi oturum prosedürü gerekir.' },

  { slug: 'golden-visa-suresi-ne-kadar', file: 'Golden Visa Süresi Ne Kadar?.docx',
    cardTitle: "Golden Visa'nın Süresi Ne Kadar?", category: 'vize-kolayligi', order: 7, featured: false,
    label: 'Süre', heroTag: 'Vize & Oturum',
    spot: 'İlk kart 5 yıl geçerlidir; gayrimenkul yatırımınız devam ettiği sürece 5’er yıllık dönemlerle yenilenir.' },

  { slug: 'sevgilim-de-yararlanabiliyor-mu', file: 'Sevgilim de Golden Visadan Yararlanabiliyor mu?.docx',
    cardTitle: "Sevgilim de Golden Visa'dan Yararlanabiliyor mu?", category: 'aile-ve-haklar', order: 8, featured: false,
    label: 'Partner', heroTag: 'Aile & Haklar',
    spot: 'Resmi nikâh olmadan da, Yunanistan’da yapılacak Civil Partnership ile partneriniz oturum hakkına dahil edilebilir.' },

  { slug: 'nereden-ev-almaliyiz', file: 'Yunanistanda Nereden Ev Almalıyız?.docx',
    cardTitle: "Yunanistan'da Nereden Ev Almalıyız?", category: 'yatirim-firsati', order: 9, featured: true,
    label: 'Lokasyon', heroTag: 'Yatırım Fırsatı',
    spot: 'Tek bir doğru lokasyon yoktur. Doğru yer; amacınıza, bütçenize, aile yapınıza ve gelecek planınıza göre değişir.' },

  { slug: 'yunanistanda-ikamet-sart-mi', file: 'Yunanistanda Yaşamamız Şart mı?.docx',
    cardTitle: 'Yunanistanda İkamet Etmemiz Şart mı?', category: 'ikinci-ev', order: 10, featured: false,
    label: 'İkamet', heroTag: '2. Evim Yunanistan',
    spot: 'Hayır. Golden Visa için Yunanistan’a taşınmanız gerekmez; size zorunluluk değil, esneklik ve seçenek sunar.' },
];

const BULLET_RE = /^\s*[•·▪‣]\s*/;
// soft hyphen, zero-width karakterler ve form-feed
const CLEAN_RE = /[­​‌‍﻿\f]/g;

function isHeading(line) {
  if (BULLET_RE.test(line)) return false;
  const words = line.split(/\s+/).filter(Boolean).length;
  if (words === 0 || words > 11) return false;
  if (line.length > 85) return false;
  if (/^["'“”‘’]/.test(line)) return false; // alıntı cümlesi
  if (/[.:!…]$/.test(line)) return false; // gövde cümlesi
  return true;
}

function toMarkdown(raw) {
  const lines = raw
    .replace(/\r/g, '')
    .replace(/ /g, ' ') // NBSP -> normal boşluk
    .replace(CLEAN_RE, '')
    .split('\n')
    .map((l) => l.replace(/\t/g, ' ').trimEnd());

  // başlık = ilk dolu satır
  let i = 0;
  while (i < lines.length && lines[i].trim() === '') i++;
  const title = lines[i].trim();
  i++;

  const out = [];
  let lastBullet = false;
  for (; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '') { lastBullet = false; continue; }

    if (BULLET_RE.test(line)) {
      const text = line.replace(BULLET_RE, '').trim();
      if (lastBullet && out[out.length - 1] === '') out.pop();
      out.push(`- ${text}`);
      out.push('');
      lastBullet = true;
      continue;
    }
    lastBullet = false;

    let m;
    if ((m = line.match(/^Spot\s*[:：]\s*(.+)/i))) {
      out.push(`> ${m[1].trim()}`, '');
    } else if ((m = line.match(/^Ara spot\s*[:：]\s*(.+)/i))) {
      out.push(`> ${m[1].trim()}`, '');
    } else if (isHeading(line)) {
      out.push(`## ${line}`, '');
    } else {
      out.push(line, '');
    }
  }

  while (out.length && out[out.length - 1] === '') out.pop();
  return { title, body: out.join('\n') };
}

function yamlEscape(s) {
  return s.replace(/"/g, '\\"');
}

let count = 0;
for (const a of ARTICLES) {
  const raw = execFileSync('textutil', ['-convert', 'txt', '-stdout', join(SRC, a.file)], {
    encoding: 'utf8',
  });
  const { title, body } = toMarkdown(raw);
  const fm = [
    '---',
    `title: "${yamlEscape(title)}"`,
    `cardTitle: "${yamlEscape(a.cardTitle)}"`,
    `category: "${a.category}"`,
    `spot: "${yamlEscape(a.spot)}"`,
    `order: ${a.order}`,
    `featured: ${a.featured}`,
    `placeholderLabel: "${yamlEscape(a.label)}"`,
    `heroTag: "${yamlEscape(a.heroTag)}"`,
    'draft: false',
    '---',
    '',
  ].join('\n');
  writeFileSync(join(OUT, `${a.slug}.md`), fm + body + '\n', 'utf8');
  count++;
  console.log(`✓ ${a.slug}.md  (${body.length} char)`);
}
console.log(`\n${count} makale yazildi -> ${OUT}`);
