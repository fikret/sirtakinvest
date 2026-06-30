# SIRTAKINVEST — Golden Visa Danışmanlık Web Sitesi

Yunanistan Golden Visa yatırım danışmanlığı için **Astro** ile geliştirilmiş statik web sitesi.

**Canlı (şimdilik GitHub Pages):** https://fikret.github.io/sirtakinvest/
`main`'e her push'ta `.github/workflows/deploy.yml` otomatik build alıp GitHub Pages'e yayınlar.
Kalıcı hedef Cloudflare Pages'tir (aşağıdaki "Cloudflare'e geçiş" bölümüne bakın).

---

## Hızlı Başlangıç

```bash
npm install      # bağımlılıkları yükle
npm run dev      # geliştirme sunucusu → http://localhost:4321
npm run build    # üretim derlemesi → dist/
npm run preview  # dist/ önizlemesi
```

> Node 20+ gereklidir (proje Node 22 ile test edilmiştir — bkz. `.nvmrc`).

---

## Yayına Almadan Önce Güncellenecekler (PLACEHOLDER'lar)

Aşağıdaki yerlerde örnek/placeholder değerler vardır; kendi bilgilerinizle değiştirin:

### 1) İletişim, sosyal medya ve marka — `src/config/site.ts`
- `contact`: telefon, e-posta, **WhatsApp numarası** (uluslararası, yalnızca rakam), adres.
- `social`: Facebook / Instagram / YouTube linkleri.
- `zoomSchedulerEmbed`: **Zoom Scheduler embed kodunuzu** backtick (\`) içine yapıştırın.
  Boşken "Toplantı Planla" sayfasında yer tutucu kutu görünür; kod eklenince otomatik canlı takvim gelir.

### 2) Site adresi ve temel yol (base)
`astro.config.mjs` ortam değişkeniyle yönetilir; varsayılan **GitHub Pages**'tir:
- `SITE_URL` (varsayılan `https://fikret.github.io`)
- `BASE_PATH` (varsayılan `/sirtakinvest`)

Tüm iç linkler `withBase()` (bkz. `src/lib/url.ts`) ile base-duyarlıdır; base değişince otomatik düzelir.
Ayrıca `src/config/site.ts` → `site.url` ve `public/robots.txt` → `Sitemap:` satırı bilgilendirme amaçlıdır.

### 3) Görseller
Tüm görseller şu an marka temalı **yer tutucu (placeholder)**. Gerçek görsel eklemek için
`src/components/PlaceholderImage.astro` kullanımını `<img>` / Astro `<Image>` ile değiştirin
(örn. kart, hero ve proje bileşenlerinde).

---

## İçerik Yönetimi

İçerikler **Markdown** olarak `src/content/` altında tutulur (Astro Content Collections).

### Makale eklemek / düzenlemek — `src/content/articles/<slug>.md`
Frontmatter alanları:

```yaml
---
title: "Tam başlık (yazı sayfasında)"
cardTitle: "Kartta görünen kısa soru"
category: "vize-kolayligi"   # vize-kolayligi | yatirim-firsati | ikinci-ev | adalarda-yazlik | aile-ve-haklar
spot: "Kartta ve girişte görünen 1–2 cümlelik özet"
order: 17                     # sıralama (küçük = önce)
featured: false              # true ise ana sayfa carousel'ine girer
placeholderLabel: "Etiket"   # yer tutucu görseldeki kısa etiket
heroTag: "Vize & Oturum"     # yazı başlığı üstündeki küçük etiket
draft: false                 # true ise yayınlanmaz
---

Yazı içeriği (Markdown)…
```

### Proje eklemek — `src/content/projects/<slug>.md`

```yaml
---
title: "Proje adı"
projectCode: "PROJE 06"
location: "Atina · Semt"
priceFrom: "€250.000"
status: "Aktif"
order: 6
summary: "Kısa özet"
placeholderLabel: "Atina"
draft: false
---
Proje detayları…
```

### Kategoriler
Kategori adları/açıklamaları `src/config/site.ts` → `categories` içinde tanımlıdır.
Ana sayfadaki büyük kategori kartları ve şeritleri `heroFeatureCategories` / `stripCategories` ile yönetilir.

### Kaynak `.docx` → Markdown dönüştürücü
İlk 10 makale `kaynaklar/` altındaki Word dosyalarından üretildi:
```bash
node scripts/convert-articles.mjs
```
> `kaynaklar/` klasörü ve `site-structure.jpeg`, `.gitignore` ile repodan hariç tutulur (yereldeki referans).

---

## Cloudflare Pages'e Geçiş (kalıcı hedef)

Cloudflare Pages siteyi **kök alan adında** servis eder, yani `base` artık `/` olmalı (GitHub Pages'teki `/sirtakinvest` değil).

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → bu depoyu seçin.
2. Build ayarları:
   - **Framework preset:** `Astro`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variables:**
     - `NODE_VERSION = 22`
     - `BASE_PATH = /`  ← **önemli** (base'i köke çeker)
     - `SITE_URL = https://<alanadınız>` (sitemap/canonical/OG için)
3. **Save and Deploy.** Sonraki her `git push` otomatik yeniden yayınlar.
4. **Custom domains** ile alan adınızı bağlayın. Ardından `public/robots.txt` içindeki `Sitemap:`
   satırını yeni adresinizle güncelleyin.

> Not: Kod tarafında değişiklik gerekmez — `withBase()` sayesinde `BASE_PATH=/` verince tüm linkler
> otomatik köke göre üretilir. İsterseniz GitHub Pages workflow'unu (`.github/workflows/deploy.yml`)
> silebilir ya da bırakabilirsiniz.

---

## Sayfa Haritası

| Yol | İçerik |
|-----|--------|
| `/` | Ana sayfa (carousel + kart grid + projeler) |
| `/blog` | Tüm sorular/makaleler |
| `/blog/<slug>` | Makale detayı |
| `/kategori/<kategori>` | Kategoriye göre makaleler |
| `/projeler`, `/projeler/<slug>` | Projeler |
| `/hakkinda` | Hakkımızda |
| `/etkinlikler` | Etkinlikler (boş-durum) |
| `/toplanti-planla` | Zoom randevu (embed) |
| `/iletisim` | İletişim |

Teknoloji: Astro · Content Collections · @astrojs/sitemap · self-host fontlar (Geist + Geist Mono).
Tasarım: tek tasarım sistemi — **(dot)connect** (`src/styles/v2.css` + `src/components/v2/`).
