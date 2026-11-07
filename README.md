# Define · Boutique Pilates Studio Website

A custom-coded, multi-page website for **Define Pilates Studio** — built around warm ivory, dusty rose, natural oak wood, deep forest olive, and quiet editorial typography (`Cormorant Garamond`, `Bodoni Moda`, and `Lato`).

Zero runtime framework overhead: clean semantic HTML5, modern responsive CSS custom properties, self-hosted OFL fonts, inline vector botanicals, responsive `.webp` photography, and a lightweight vanilla ES module (`public/js/main.js`).

---

## Quick Start (Local Preview)

Requirements: **Node.js 18+** (and `ffmpeg`/`ffprobe` on `PATH` only if you add or re-encode source photographs in `assets/originals/`).

```powershell
# 1. Install dev/font packages (already installed in this workspace)
npm install

# 2. Build static site into dist/ (optimizes images, generates brand SVGs, renders all HTML pages)
npm run build

# 3. Start the local preview server at http://localhost:4173/
npm start
```

While the preview server is running, you can run the automated multi-viewport Playwright browser verification suite:

```powershell
npm run verify
```

The production-ready static output lives entirely in `dist/` and can be deployed to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, S3) with zero server requirements.

---

## Pages Included

| Route | Source file | Purpose |
| --- | --- | --- |
| `/index.html` | `src/pages/index.mjs` | Editorial hero, 4-icon class strip, swipeable studio space carousel, founder intro, forest statement band with inline photo pills, dual-panel `DE / FINE` showcase, 3 method principles, class schedule rows, 2×2 monthly pricing grid, 5-tile class mosaic, workshops & retreats feature, journal preview, First Steps CTA. |
| `/studio.html` | `src/pages/studio.mjs` | Studio architecture & philosophy, room gallery carousel, instructor bios, "What to bring" guide, and FAQs. |
| `/classes.html` | `src/pages/classes.mjs` | Detailed breakdown of all 6 classes (level, duration, intensity dots, equipment, room, days, expectations) + "Which class is right for me?" comparison table. |
| `/schedule.html` | `src/pages/schedule.mjs` | Interactive 7-day timetable with class-type filter chips, responsive mobile day tabs, native `<dialog>` booking flow, `.ics` calendar export, and local browser booking management. |
| `/memberships.html` | `src/pages/memberships.mjs` | 4 monthly membership tiers, flexible drop-in & class packs, First Steps intro offer, studio policies, and FAQs. |
| `/journal.html` & `/journal/*.html` | `src/pages/journal.mjs`, `src/pages/_article.mjs` | Editorial journal index and 4 full article pages with drop-cap typography and related reading. |
| `/contact.html` | `src/pages/contact.mjs` | Address, stylized studio map + Google Maps link, opening hours, contact details, and inquiry form (with automatic `?plan=` pre-selection from Memberships). |
| `/design-system.html` | `src/pages/design-system.mjs` | Brand & Design System showcase ("Typography, palette & light"): all 6 logo/monogram/seal variants, 10 color tokens, type specimens & scale, lighting study, arch/oval/pill/ginkgo motifs, and live UI components. |
| `/404.html` | `src/pages/404.mjs` | Custom 404 fallback page served automatically for unknown routes. |

---

## Where to Edit Everything

All business copy, classes, timetable slots, instructors, prices, and articles are centralized in **one file** (`src/data/site.mjs`). After editing any source file, run `npm run build` (or `npm run dev` to rebuild and serve).

1. **Brand name, tagline, contact details, address & opening hours**
   - Edit `brand` at the top of `src/data/site.mjs`.
   - To regenerate the outlined vector logos (`public/brand/*.svg` and `public/favicon.svg`), edit `scripts/make-brand.mjs` and run `npm run brand`.
2. **Currency, memberships, class packs & intro offer prices**
   - Edit `currency`, `memberships`, `packs`, and `introOffer` in `src/data/site.mjs`. Every price across the homepage and memberships page updates automatically.
3. **Classes, instructors, weekly schedule, FAQs & journal posts**
   - Edit `classes`, `instructors`, `slots` (`schedule`), `faqs`, `posts`, `spaceSlides`, and `retreat` in `src/data/site.mjs`.
4. **Colors, typography & layout spacing**
   - Edit the `:root` CSS custom properties at the top of `public/css/main.css` (`--ivory`, `--oat`, `--sand`, `--khaki`, `--rose`, `--blush`, `--wood`, `--olive`, `--forest`, `--font-display`, `--font-body`, `--font-logo`, `--max`, `--gutter`).
5. **Images & photography**
   - Place high-resolution `.jpg`/`.png` originals in `assets/originals/` and run `npm run images` to generate responsive `.webp` + `-640.webp` pairs and update `public/img/manifest.json`.
6. **Reference analysis & asset provenance**
   - See `docs/REFERENCE_ANALYSIS_AND_ASSETS.md` for the visual specification, font matching notes, preserved `reference/` files, and image generation prompts.

> **Demo notice:** Booking confirmations (`localStorage` + `.ics` download), newsletter signups, and contact form submissions are client-side demos with no payment processor or email service connected.
