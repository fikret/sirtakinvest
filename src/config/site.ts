/**
 * ════════════════════════════════════════════════════════════════════
 *  SIRTAKINVEST — Site Yapılandırması (TEK KAYNAK)
 * ════════════════════════════════════════════════════════════════════
 *  İletişim bilgileri, sosyal medya linkleri, randevu (Zoom) embed kodu
 *  ve marka metinleri buradan güncellenir. Şu an PLACEHOLDER değerler var.
 *  Yayına almadan önce ↓ aşağıdaki alanları kendi bilgilerinizle değiştirin.
 */

export const site = {
  name: 'SIRTAKINVEST',
  tagline: 'Yunanistan · Golden Visa Yatırım Danışmanlığı',
  shortDescription:
    'Yunanistan Golden Visa sürecinde 10 yılı aşkın saha tecrübesiyle; doğru mülk, doğru fiyat ve doğru hukuki yapıyla yanınızdayız.',
  // Cloudflare Pages'e bağladıktan sonra astro.config.mjs içindeki `site` ile birlikte güncelleyin.
  url: 'https://sirtakinvest.pages.dev',
  locale: 'tr-TR',
  experienceYears: 10,
};

/** İletişim bilgileri — PLACEHOLDER. Gerçek bilgilerle değiştirin. */
export const contact = {
  phoneDisplay: '+90 (5xx) xxx xx xx',
  phoneHref: 'tel:+905xxxxxxxxx', // tıkla-ara için boşluksuz uluslararası format
  email: 'info@sirtakinvest.com',
  whatsappNumber: '905xxxxxxxxx', // wa.me/ için yalnızca rakamlar (ülke kodu dahil)
  whatsappMessage: 'Merhaba, Golden Visa hakkında bilgi almak istiyorum.',
  addressLine: 'İstanbul, Türkiye',
};

export const whatsappLink = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
  contact.whatsappMessage,
)}`;

/** Sosyal medya — PLACEHOLDER URL'ler. Gerçek hesaplarınızla değiştirin. */
export const social = [
  { name: 'Facebook', href: 'https://facebook.com/', icon: 'facebook' },
  { name: 'Instagram', href: 'https://www.instagram.com/sirtakinvest', icon: 'instagram' },
  { name: 'YouTube', href: 'https://youtube.com/', icon: 'youtube' },
] as const;

/**
 * Ana sayfa "Hakkımızda" bölümündeki Instagram içerik kartları — PLACEHOLDER.
 * Gerçek gönderi bağlantılarınızı ve başlıklarını buraya yazın (3 öğe).
 * `label` yer tutucu görselin desenini belirler; gerçek görsel eklenince SocialCard güncellenir.
 */
export const instagramPosts = [
  {
    title: "Yunanistan'da hem yaşamak hem çalışmak istiyorsanız",
    href: 'https://www.instagram.com/sirtakinvest/p/CnQ2GipKCQT/',
    image: '/instagram/ig1.jpg',
  },
  {
    title: 'Anahtar teslim: 150.000 € iş yatırımı',
    href: 'https://www.instagram.com/sirtakinvest/p/Cn8nn01qbIc/',
    image: '/instagram/ig2.jpg',
  },
  {
    title: '250.000 € alt limitle katılım için hâlâ zaman var',
    href: 'https://www.instagram.com/sirtakinvest/p/C5DdaQ3Lmyn/',
    image: '/instagram/ig3.jpg',
  },
] as const;

/**
 * Ana sayfa "Hakkımızda" bölümündeki YouTube video kartları.
 * Başlık ve açıklamalar videoların içeriğinden (transkript) çıkarıldı.
 * Kapaklar: public/youtube/yt1-3.jpg (YouTube kapak görselleri).
 */
export const youtubeVideos = [
  {
    title: "Schengen'den red aldım, Golden Visa alabilir miyim?",
    href: 'https://www.youtube.com/watch?v=bEfszinH_zI',
    image: '/youtube/yt1.jpg',
    desc: "Schengen reddi Golden Visa'nın önünde engel değil — iki süreç farklı bakanlıklarca yürütülüyor. Vizeniz olmasa bile yatırımı uzaktan başlatabilirsiniz.",
  },
  {
    title: 'Golden Visa ailede kimleri kapsıyor?',
    href: 'https://www.youtube.com/watch?v=UOiQBABaeNg',
    image: '/youtube/yt2.jpg',
    desc: 'Bir üst, bir alt kuşak: eşiniz, çocuklarınız, anne-babanız ve eşinizin anne-babası. Kardeş ve kuzen yok — peki yatırım kimin üzerine yapılmalı?',
  },
  {
    title: 'Doğru mülkü doğru fiyata nasıl alırsınız?',
    href: 'https://www.youtube.com/watch?v=2luIxyWMMng',
    image: '/youtube/yt3.jpg',
    desc: "Golden Visa işin kolay kısmı. Asıl soru şu: Golden Visa'ya ihtiyacı olmayan bir Yunanlı bu mülke ne öderdi? Doğru fiyatın ölçüsü bu.",
  },
] as const;

/** Üst menü */
export const nav = [
  { label: 'Hakkında', href: '/hakkinda' },
  { label: 'Blog', href: '/blog' },
  { label: 'Etkinlikler', href: '/etkinlikler' },
  { label: 'Toplantı Planla', href: '/toplanti-planla' },
  { label: 'İletişim', href: '/iletisim' },
] as const;

/**
 * Zoom Scheduler embed kodu.
 * Ücretli Zoom hesabınızın verdiği <iframe>/script embed kodunu buraya
 * tek tırnak yerine BACKTICK (`) içinde yapıştırın. Boş bırakılırsa
 * "Toplantı Planla" sayfasında yer tutucu (placeholder) kutu gösterilir.
 *
 * Örnek:
 * export const zoomSchedulerEmbed = `<iframe src="https://...zoom.us/..." width="100%" height="700" frameborder="0"></iframe>`;
 */
export const zoomSchedulerEmbed = `<iframe src="https://scheduler.zoom.us/sirtakinvest-dan-manl-k/sirtakinvest-yunanistan-golden-visa-ongorusme?embed=true"
  title="Sirtakinvest — Yunanistan Golden Visa Ön Görüşme"
  loading="lazy"></iframe>`;

/** Kategoriler — ana sayfa banner'ları ve /kategori sayfaları bu sıraya göre üretilir. */
export type CategoryKey =
  | 'vize-kolayligi'
  | 'yatirim-firsati'
  | 'ikinci-ev'
  | 'adalarda-yazlik'
  | 'aile-ve-haklar';

export const categories: Record<
  CategoryKey,
  {
    label: string;
    short: string;
    description: string;
    /** Kategori hero'sunda gösterilecek görsel (public/ altı yol). Yoksa hero tek sütun kalır. */
    image?: string;
    imageAlt?: string;
  }
> = {
  'vize-kolayligi': {
    label: 'Vize Kolaylığı',
    short: 'Vize & Oturum',
    description:
      'Schengen çilesine son. Golden Visa size bir vize değil, Avrupa Birliği topraklarında sarsılmaz bir "ev sahibi" statüsü tanır.',
  },
  'yatirim-firsati': {
    label: 'Yatırım Fırsatı',
    short: 'Yatırım',
    description:
      'Doğru mülk yalnızca oturum izni değil; Euro bazlı kira getirisi ve gerektiğinde değerinde satılabilen gerçek bir varlık kazandırır.',
  },
  'ikinci-ev': {
    label: '2. Evim Yunanistan',
    short: '2. Ev',
    description:
      'Atina’ya İstanbul’dan yaklaşık 1 saat. Golden Visa mülkünüz, kapısını istediğiniz zaman açabileceğiniz gerçek bir ikinci ev olabilir.',
  },
  'adalarda-yazlik': {
    label: 'Yunan Adalarında Yazlık',
    short: 'Yazlık',
    description:
      'Ada mı, anakara mı? Yazlık yatırımını romantik hayallerle değil gerçeklerle planlayın. Akıllı strateji: önce şehir, sonra ada.',
  },
  'aile-ve-haklar': {
    label: 'Aile & Haklar',
    short: 'Aile',
    description:
      'Tek bir yatırımla üç kuşak: eşiniz, çocuklarınız, anne-babanız ve eşinizin anne-babası için Avrupa’da yasal oturum hakkı.',
    image: '/images/aile-haklar.jpg',
    imageAlt: 'Anne, baba ve iki çocuktan oluşan bir aile — Golden Visa üç kuşağı kapsar',
  },
};

/** Ana sayfada büyük "feature" kartlarında gösterilecek kategoriler (wireframe sırası). */
export const heroFeatureCategories: CategoryKey[] = [
  'vize-kolayligi',
  'yatirim-firsati',
  'adalarda-yazlik',
];

/** Ana sayfa orta bölümündeki kategori şeritleri (wireframe sırası). */
export const stripCategories: CategoryKey[] = [
  'vize-kolayligi',
  'yatirim-firsati',
  'ikinci-ev',
];
