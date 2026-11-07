# Define · Reference Analysis, Visual Specification & Asset Manifest

## 1. Reference Map & Mode

The supplied folder (`C:\Users\dell\Downloads\New folder (10)`, archived locally under `reference/` excluding the video walkthrough) contained five items:

| Reference file | Type | Role in build |
| --- | --- | --- |
| `original-f276cbb0fccaee6bca3730d9b3920f4d.webp` (1024×768) | Desktop homepage top-of-page presentation mockup | **Primary composition & layout baseline** (header bar, staggered oversized editorial serif title overlapping the right-aligned 3:2 hero image, left-hand byline & intro column, 4-column fine-line icon strip, arched portrait + founder introduction, ginkgo line-and-wash corner botanicals). |
| `original-9ca3ac9eb0af5367e1fc610b5cb26fe9.webp` (1024×768) | Multi-card section moodboard | **Homepage lower-section blueprint**: staggered `CLASSES / SCHEDULE` row list with arrows, tall arch `YO / GA` (`DE / FINE`) oval motif, overlapping-heading `RETREATS` landscape card, 2×2 hairline `MONTHLY PRICES` grid, 5-tile studio mosaic with arched dark-olive feature card, `READ & BE INSPIRED` journal cards with date badges, and rotating circular studio seal. |
| `1.png` (945×709) | Brand & section moodboard | **Secondary section blueprint**: split olive/sand dual-panel showcase straddled by the vertical arch oval, and dark forest-green statement band with inline pill-cropped photographs (`BUILD YOUR [pill] CORE / MOVE [pill] WITH CARE / NURTURE YOUR STRENGTH`). |
| `logo.png.png` (115×98) | Brand logo reference (`Define / — STUDIO —` on cream disc) | **Brand identity reference** for customizing the brand name to **Define** (`Bodoni Moda` high-contrast Didone wordmark + tracked uppercase `STUDIO` flanked by hairlines, plus circular `D` monogram and cream-disc badge). |
| `large-thumbnail20250216-1318312-1af5sx8.mp4` (800×600, 22.7s) | Screen-recorded template scroll | **Supporting flow reference** confirming boutique studio page expectations (interactive weekly timetable with class-type filters, instructor roster, calm hover transitions). |

**Mode:** Faithful structural & typographic reconstruction of the reference layouts re-themed from generic template Yoga copy to **Define Pilates Studio**, paired with warm ivory, dusty rose, natural oak wood, muted khaki/sage, and soft natural studio light across the homepage and all supporting inner pages.

---

## 2. Visual Specification (Observed vs. Inferred)

### Directly observed in references
- **Header (`84px` height):** Three-zone horizontal bar — circular monogram + wordmark left, centered tracked uppercase links (`11px`, `0.2em` letter-spacing) with active bottom hairline, underlined `BOOK CLASS` CTA + minimal two-line drawer toggle right.
- **Hero composition:** Two-column asymmetric grid (`34% / 66%`) where a two-line uppercase display headline (`PILATES STUDIO / DEFINE`) spans across the top and overlaps the top edge of the right-aligned landscape photograph (`~1.57:1`), while the left column carries the tracked khaki byline, concise intro copy, and primary action.
- **Botanical framing:** Delicate dark-ink ginkgo fan leaves with radial veins layered over soft dusty-rose, khaki, and warm-stone watercolor washes tucked into page corners.
- **Section rhythm:** Generous ivory whitespace (`#FAF8F4`) punctuated by warm oat panels (`#F0EBE1`), sand frames (`#D9D4C7`), and deep forest-olive statement bands (`#2F3B2D`, `#232C21`).
- **Recurring geometry:** Full-top arches (`border-radius: 999px 999px 0 0`) for portraits and featured class cards, vertical stadium ovals (`1 : 1.62`), inline stadium image pills inside display text, and `1px` hairline rules (`rgba(47,59,45,0.22)`) for class rows and the 2×2 pricing table.

### Font matching (uncertain proprietary fonts noted honestly)
- **Editorial display serif:** The reference mockup uses a high-contrast modern transitional/editorial display serif with flared capitals (close to *Cormorant* / *Canela* / *Marcellus* display). Self-hosted **Cormorant Garamond** (`400`, `500`, `600`, `500 italic`, OFL) is used for all display titles (`line-height: 0.92–0.95`, lining numerals enabled).
- **Logo wordmark:** `logo.png.png` uses a classic high-contrast Didone serif (`D` with vertical stress, ball terminals on `f` and `e`). Self-hosted **Bodoni Moda** (`500`, OFL) is used for the `Define` wordmark and outlined into standalone SVGs in `public/brand/` so the logo renders identically everywhere without external font dependencies.
- **Body & UI labels:** Self-hosted **Lato** (`300`, `400`, `700`, OFL) handles clean body copy (`16px / 1.7`) and wide-tracked uppercase micro-labels (`10.5–11.5px`, `0.16–0.24em` tracking).

### Inferred multi-page scope & interactive behavior
- **Boutique Pilates information architecture:** Expanded from the homepage reference into a coherent 7-destination studio website (`Home`, `Studio`, `Classes`, `Schedule & Booking`, `Memberships`, `Journal` + 4 articles, `Contact`, plus `Brand & Design System` and `404`).
- **Swipeable space gallery:** Touch-swipe, mouse-drag, button, and `ArrowLeft`/`ArrowRight` keyboard carousel on the homepage (`The space, before you arrive`) with live slide counter and progress hairline, linking directly to the `Brand & Design System` page (`Typography, palette & light`).
- **Interactive timetable & demo booking:** Filterable 7-day class board (collapsing to accessible 7-day tabs on mobile), native `<dialog>` booking modal with validation, local browser persistence (`localStorage`), cancellation, and downloadable `.ics` calendar invites — explicitly labeled as a local demo with no live payment or email backend.

---

## 3. Asset Manifest, Substitutions & Generation Prompts

Because the supplied reference files are low-resolution multi-panel mockups (`945–1024px` wide) containing yoga stock thumbnails rather than high-resolution Pilates studio photography, custom editorial photographs were generated specifically for **Define** in a unified palette (warm ivory lime plaster, natural light oak reformers, dusty-rose/ivory/sage fitted activewear, diffused morning window light).

- **High-resolution originals preserved:** `assets/originals/*.jpg` (`896×1200`, `1200×896`, and `1376×768`)
- **Optimized web copies:** `public/img/*.webp` (full width + `-640.webp` responsive variants, generated automatically by `npm run images` via `ffmpeg`/`libwebp`, tracked in `public/img/manifest.json`)
- **Generated vector brand marks:** `public/brand/define-logo.svg`, `define-logo-light.svg`, `define-logo-disc.svg`, `define-monogram.svg`, `define-oval.svg`, and `public/favicon.svg` (generated by `npm run brand`)

| Asset (`assets/originals/`) | Dimensions | Usage | Generation prompt summary |
| --- | --- | --- | --- |
| `hero-reformer.jpg` | `1200×896` | Homepage hero, Restore & Stretch card | Editorial 4:3 photograph of a woman in a fitted dusty-rose two-piece Pilates set stretching on a natural light-oak reformer, minimal warm ivory studio, generous negative space on left, soft side window light. |
| `studio-interior.jpg` | `1376×768` | Space carousel #1, Studio story, statement pill | Sun-drenched empty boutique Pilates studio, whitewashed warm ivory lime-plaster walls, rounded arches, wide oak planks, three light-oak reformers in a row, potted olive tree by tall arched window. |
| `studio-detail.jpg` | `896×1200` | Space carousel #3, Studio detail, Tower Sculpt, Journal #3, Light study | Macro portrait 4:5 detail of a light-oak Pilates reformer carriage with cream leather strap and solid brass buckle under warm raking morning sunlight. |
| `class-reformer.jpg` | `896×1200` | Reformer Flow, Homepage mosaic arch, Journal #2 | Portrait 4:5 of a woman in a dusty-rose fitted set performing a kneeling lunge with cream straps on a natural oak Pilates reformer, bright ivory studio. |
| `class-mat.jpg` | `896×1200` | Mat Foundations, Homepage split arch, mosaic | Portrait 4:5 of a woman in a sage-green fitted set holding a Pilates teaser (V-sit) on a cream mat over light oak flooring beside an arched window. |
| `class-barre.jpg` | `896×1200` | Barre Line, Space carousel #4, mosaic, Light study | Portrait 4:5 of a woman in an ivory ribbed set at a wooden ballet barre in a side stretch beside a sheer-curtained arched window. |
| `class-prenatal.jpg` | `896×1200` | Prenatal Pilates, mosaic | Portrait 4:5 of a pregnant woman in a soft ivory set seated calmly on a pale stability ball on an oak studio floor. |
| `instructor-1.jpg` | `896×1200` | Founder portrait (Lina Marceau), Studio team | Editorial portrait 4:5, woman in early 30s with sleek low bun in ivory fitted top, warm confident smile, seamless sage-olive backdrop. |
| `instructor-2.jpg` | `896×1200` | Homepage split panel & Studio team (Sofia Reyes) | Editorial portrait 4:5, woman in late 20s with wavy light-brown hair in dusty-rose ribbed top, soft smile, seamless warm oat backdrop. |
| `instructor-3.jpg` | `896×1200` | Studio team (Amara Cole) | Editorial portrait 4:5, woman in late 30s with dark curls in cream knit top, warm smile, seamless soft taupe backdrop. |
| `retreat-cliff.jpg` | `1376×768` | Homepage Workshops & Retreats feature | Landscape 16:9 of a woman in black activewear seated cross-legged on a warm sandstone coastal headland above a misty sea at sunrise. |
| `journal-1.jpg` | `1200×896` | Space carousel #5, Journal #4 | Still life 4:3 of a handmade speckled ceramic cup of herbal tea and folded linen towel on a light oak bench by a bright window. |
| `journal-2.jpg` | `896×1200` | Homepage mosaic, Journal #1 | Portrait 4:5 still life of dried pampas grass, golden ginkgo leaves, and cotton stems in a matte blush-taupe ceramic vase on lime plaster. |
