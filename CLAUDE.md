# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

SIRTAKINVEST — a static marketing site (in Turkish) for Greece Golden Visa investment consulting, built with **Astro**. No backend, no client framework — Astro components rendered to static HTML.

The site uses a single design system, **(dot)connect ("v2")**: bone canvas (`#fcfbf8`), charcoal ink (`#001011`), single ember accent (`#fd5321`), Geist + Geist Mono fonts, border-driven (no shadows). It is defined in `src/styles/v2.css` and the reusable components under `src/components/v2/`. (Earlier alternative redesigns v3/v4 and the original navy/gold design were removed when v2 was adopted as the canonical design — no parallel design trees remain.)

## Commands

```bash
npm install      # install dependencies
npm run dev      # dev server → http://localhost:4321
npm run build    # production build → dist/
npm run preview  # preview the built dist/
```

Node 20+ required (`.nvmrc` pins 22). There is no test suite, linter, or formatter configured — `npm run build` (which runs `astro check`-level type validation via the content schema and TS strict config) is the main correctness gate.

## Deployment & the `base` path (critical)

The site is served from **two different URL roots**, controlled entirely by env vars read in `astro.config.mjs`:

- **GitHub Pages** (current live, auto-deploys on push to `main` via `.github/workflows/deploy.yml`): `BASE_PATH=/sirtakinvest`.
- **Cloudflare Pages** (intended permanent home): set `BASE_PATH=/`, `SITE_URL=https://<domain>`, `NODE_VERSION=22`.

Because the base path is not fixed, **never hardcode internal links**. Always wrap internal paths in `withBase()` from `src/lib/url.ts` (or the `articleHref`/`projectHref`/`categoryHref` helpers in `src/lib/content.ts`). External links (`http`, `mailto:`, `tel:`, `#`) pass through unchanged. Getting this wrong silently breaks all navigation on GitHub Pages.

## Architecture

**Single source of config — `src/config/site.ts`.** Contact info, social links, nav, brand copy, Zoom embed code, and the `categories` map all live here. Most of these are still PLACEHOLDER values (phone, WhatsApp, emails, social URLs). The `categories` keys are the canonical category list and **must stay in sync** with the `CATEGORIES` enum in `src/content.config.ts` and the `CategoryKey` union in `site.ts`.

**Content is Markdown via Astro Content Collections** (`src/content.config.ts` defines schemas; `src/lib/content.ts` provides typed access):
- `src/content/articles/<slug>.md` — blog articles/questions. Key frontmatter: `category` (must be one of the 5 enum values), `order` (sort, lower first), `featured` (true → homepage carousel), `draft` (true → excluded everywhere). The Markdown filename becomes the slug/route.
- `src/content/projects/<slug>.md` — real-estate projects.
- `getArticles()` / `getProjects()` filter out drafts and sort by `order` — use these rather than calling `getCollection` directly.

**Routes** (`src/pages/`): `/` (rich single-scroll landing page), `/blog` + `/blog/[slug]`, `/kategori/[category]`, `/projeler` + `/projeler/[slug]`, plus static pages `hakkinda`, `etkinlikler`, `toplanti-planla` (Zoom embed), `iletisim`, and `404`. Every page renders through `V2Layout`. The homepage summarizes sections (services, questions, projects, philosophy) that also have dedicated pages — this duplication is intentional landing-page structure.

**Layout & shell.** `src/layouts/V2Layout.astro` is the single site layout (loads Geist fonts + `v2.css`, renders `V2Nav` + `V2Footer` around the page slot, indexable by default). `src/layouts/ArticleLayout.astro` wraps V2Layout for blog article detail pages. Shared building blocks live in `src/components/v2/`: `PageHero` (inner-page title block), `CtaBanner` (bottom call-to-action), `Breadcrumbs`, `CategoryChips`, `QuestionCard` (article cards), `StoryCard` (project cards), `OfferCard`, `SectionHeader`, `ArrowPill`, and `V2Placeholder` (the SVG "node network" placeholder used wherever a real image will go). Markdown article content is styled by the `.prose` rules in `v2.css`.

**Images are all placeholders.** `V2Placeholder.astro` renders the brand SVG placeholder; replace its usages with `<img>` / Astro `<Image>` when real images exist.

**Path alias:** `@/*` → `src/*` (see `tsconfig.json`).

## Conventions

- UI copy, comments, and content are in **Turkish** — match this.
- TypeScript is in `strict` mode (extends `astro/tsconfigs/strict`).
- `kaynaklar/` (source `.docx` files) and `site-structure.jpeg` are gitignored local references. `scripts/convert-articles.mjs` was a one-time `.docx`→Markdown converter for the first 10 articles.
