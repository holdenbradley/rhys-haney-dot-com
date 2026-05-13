# Rhys Haney Photography — rhyshaney.com

Cinematic photography portfolio for **Rhys Haney** (Boulder, CO).
Built with Next.js 16 (App Router), TypeScript, Tailwind v4, Framer Motion, and next-themes.

> Premium photography without the premium price tag.

---

## Quick Start

```bash
cd Rhys-Haney-dot-com
npm install      # already done if you ran create-next-app
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build
npm run start
```

---

## For Rhys — Adding Photos

**You don't have to touch any code to add photos.** Just drag-and-drop JPGs into the right folder under `public/images/`. See [`public/images/README.md`](public/images/README.md) for the full guide.

Quick reference:

| Type | Folder |
|---|---|
| Homepage hero | `public/images/hero/` |
| About-page portrait | `public/images/about/` |
| Wedding photos | `public/images/portfolio/weddings/` |
| Action sports | `public/images/portfolio/action-sports/` |
| Anything else | `public/images/_DROP_PHOTOS_HERE/` |

Every category folder has a `_featured/` subfolder — your top 3–5 picks. Those auto-promote to the homepage.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, RSC, async params)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 + CSS custom properties
- **Theme:** `next-themes` with `prefers-color-scheme` device detection (dark default)
- **Animation:** Framer Motion v12
- **Forms:** React Hook Form + Zod
- **Icons:** lucide-react
- **Image opt:** Next/Image + sharp (WebP/AVIF)
- **SEO:** Next metadata API + JSON-LD (Photographer + LocalBusiness)

---

## Color System (CU Boulder–inspired)

All theme colors live in **CSS custom properties** in `src/app/globals.css`. Tailwind v4 consumes them via `@theme inline`, so utilities like `bg-background`, `text-accent-primary`, `border-border` work everywhere.

**Dark mode (default)**

| Token | Hex | Use |
|---|---|---|
| `--color-bg` | `#0a0e27` | Page background |
| `--color-surface` | `#1a1f3a` | Cards |
| `--color-text-primary` | `#f5f3f0` | Body copy |
| `--color-text-secondary` | `#a9a9a9` | Subdued text |
| `--color-accent-primary` | `#8D7334` | CU Gold (accessible) |
| `--color-accent-secondary` | `#096FAE` | CUB Sky Blue |
| `--color-border` | `#2d3250` | Dividers |
| `--color-success` | `#6eb546` | Form success |

**Light mode (when device prefers it OR user toggles)**

| Token | Hex |
|---|---|
| `--color-bg` | `#f8f7f5` |
| `--color-surface` | `#ffffff` |
| `--color-text-primary` | `#1a1a1a` |
| `--color-text-secondary` | `#666666` |
| `--color-accent-primary` | `#CFB87C` (CU Gold) |
| `--color-accent-secondary` | `#0A3758` (CUB Dark Blue) |
| `--color-border` | `#e0dcd7` |
| `--color-success` | `#2d7a3a` |

Toggle persists via `next-themes` (writes `data-theme` on `<html>`).

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx            Root layout, ThemeProvider, header/footer
│   ├── page.tsx              Homepage
│   ├── portfolio/
│   │   ├── layout.tsx
│   │   ├── page.tsx          Category grid
│   │   └── [slug]/page.tsx   Per-category gallery + lightbox
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── sitemap.ts            /sitemap.xml
│   ├── robots.ts             /robots.txt
│   ├── error.tsx
│   ├── not-found.tsx
│   └── globals.css           CU color tokens + Tailwind v4 theme
├── components/
│   ├── common/               Header, Footer, MobileNav, Logo, ThemeToggle, ThemeProvider
│   ├── hero/                 HeroSection, HeroVideo
│   ├── gallery/              MasonryGrid, GalleryCard, LightboxViewer, ImageWithFallback
│   ├── animations/           ScrollReveal, ParallaxSection, FadeInOnScroll, PageTransition
│   ├── forms/                ContactForm, FormSubmit
│   ├── portfolio/            ProjectCard, ProjectHero, RelatedProjects
│   └── ui/                   Button, Badge, Modal, Spinner
├── lib/
│   ├── utils.ts              cn(), formatPrice(), absoluteUrl(), slugify()
│   ├── constants.ts          SITE, NAV_LINKS, COLORS, BREAKPOINTS
│   ├── get-gallery-images.ts Auto-discovery of public/images/portfolio/*
│   ├── image-loader.ts       Image loader stub (ready for CDN swap)
│   ├── sanity-client.ts      Sanity CMS migration scaffold
│   └── schema.ts             JSON-LD builders
├── data/
│   ├── portfolio.json        Categories + pricing
│   └── testimonials.json     Client quotes
├── hooks/                    useInView, useMobileMenu, useMediaQuery
├── styles/                   animations.css
└── types/                    Shared TS types
```

---

## CMS Migration Path

`src/lib/sanity-client.ts` is a thin abstraction over `src/data/portfolio.json`. When Rhys wants to manage content from a CMS, install `@sanity/client`, replace the stubbed `getCategories` / `getCategoryBySlug` implementations, and pages won't need to change.

---

## Photo Pipeline Recommendation

1. Rhys drops JPGs into the appropriate `public/images/portfolio/<cat>/` folder.
2. Holden runs a one-shot conversion: `npx @squoosh/cli --webp '{"quality":85}' public/images/portfolio/**/*.jpg` (or similar).
3. `git commit` and push — Vercel/Netlify auto-deploys.

The auto-discovery utility (`getGalleryImages`) reads the filesystem at request time, so new photos appear immediately after deploy without any code changes.

---

## SEO

- Per-page metadata via the Next metadata API
- Site-wide JSON-LD `LocalBusiness` schema in the root layout
- Per-category `Service` schema on `[slug]` pages
- `sitemap.xml` and `robots.txt` auto-generated from data
- Open Graph + Twitter card defaults; add a real `/og-image.jpg` in `public/` for production

---

## Accessibility

- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`)
- Visible focus rings (`:focus-visible` styled in `globals.css`)
- ARIA labels on icon buttons, dialogs, and gallery cards
- Keyboard navigation: ESC closes lightbox/modals, ←/→ navigates lightbox
- Lightbox traps body scroll while open

---

## Notes / TODOs Before Shipping

- [ ] Add a real `/og-image.jpg` (1200×630) to `public/`
- [ ] Wire `ContactForm` to a real backend (Resend, Formspree, or `/api/contact`)
- [ ] Replace placeholder testimonials in `src/data/testimonials.json`
- [ ] Confirm `rhyshaney.com` is the live domain or update `SITE.url` in `src/lib/constants.ts`
- [ ] Add favicon set + apple-touch-icon to `public/`
- [ ] Drop in Rhys's real photos
