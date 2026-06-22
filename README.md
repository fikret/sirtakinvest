# SIRTAKINVEST — Golden Visa Danışmanlık Web Sitesi

Yunanistan Golden Visa yatırım danışmanlığı için **Astro** ile geliştirilmiş statik web sitesi.
GitHub'a push edildiğinde **Cloudflare Pages** üzerinden otomatik yayınlanacak şekilde hazırlanmıştır.

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

### 2) Site adresi — iki yerde
- `astro.config.mjs` → `SITE` sabiti
- `src/config/site.ts` → `site.url`
- `public/robots.txt` → `Sitemap:` satırı

Cloudflare Pages alan adınızı (örn. `https://sirtakinvest.com`) bağladıktan sonra bu üç yeri güncelleyin.
Doğru adres; sitemap, canonical ve sosyal paylaşım (OG) etiketleri için gereklidir.

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

## Cloudflare Pages'e Yayınlama

1. Bu projeyi bir GitHub deposuna push edin.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Depoyu seçin ve şu ayarları kullanın:
   - **Framework preset:** `Astro`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variable (gerekirse):** `NODE_VERSION = 22`
4. **Save and Deploy.** Sonraki her `git push` otomatik yeniden yayınlar.
5. (Opsiyonel) **Custom domains** ile kendi alan adınızı bağlayın, ardından yukarıdaki
   "Site adresi" bölümündeki üç yeri güncelleyip tekrar push edin.

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

Teknoloji: Astro · Content Collections · @astrojs/sitemap · self-host fontlar (Fraunces + Figtree).
