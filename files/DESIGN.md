# Naaz Arts — Website Design System

This document describes the design concept behind the pages already built (Home, Shop, Our Story, Workshops, Contact) so the same look and feel can be extended to any new page. All values below are implemented as CSS custom properties in `assets/style.css` — reference the variable names, don't hardcode hex values on new pages.

---

## 1. Brand concept

Naaz Arts sells handmade concrete home decor (trays, vases, coasters) and runs concrete art workshops. The site should feel:

- **Warm and handmade** — never sterile, corporate, or mass-produced in tone.
- **Editorial, not e-commerce-generic** — more "artist's portfolio that happens to sell things" than "template store."
- **Personal** — the founder's voice and story are part of the product. Storytelling sections (like Our Story) are treated with the same visual weight as product sections, not tucked away.

Every new page should ask: *does this feel like it was made by hand, by one person, with care?* If a layout choice feels too sharp, too corporate, or too "stock template," it's off-brand.

---

## 2. Color palette

Defined in `:root` in `assets/style.css`. Do not introduce new colors outside this palette without deliberate reason.

| Token | Hex | Usage |
|---|---|---|
| `--bone` | `#F5F1EA` | Primary page background |
| `--bone-deep` | `#EFE8DC` | Alternate section background (used to separate sections without hard borders) |
| `--card` | `#FFFFFF` | Card/tile backgrounds, form fields |
| `--ink` | `#2B2622` | Primary text, headings |
| `--ink-soft` | `#5C544B` | Secondary text, descriptions |
| `--ink-faint` | `#8A8072` | Tertiary/meta text (timestamps, fine print) |
| `--clay` | `#C1704E` | Primary accent — CTAs, links, "new/limited" energy |
| `--clay-deep` | `#A85A3B` | Hover state for clay elements |
| `--clay-tint` | `#FAECE7` | Text-on-clay (buttons) |
| `--sage` | `#A8B29A` | Secondary accent — used specifically for **actions/bookings** (workshop banners), never for product/sales CTAs |
| `--sage-deep` | `#233420` | Text-on-sage, dark green accents |
| `--sage-tint` | `#EAF0E4` | Light sage backgrounds (icon chips) |
| `--line` | `rgba(43,38,34,0.12)` | All borders/dividers — never pure black or grey |
| `--tone-1` through `--tone-9` | Range of warm beiges/terracottas (`#E3D5C3` → `#D9C9B4`) | Placeholder/product image swatches. In production, replace these with real photography — these tones exist so placeholder blocks feel cohesive with real photos later. |

**Color rule of thumb:** Clay = "buy / act now." Sage = "join / book / community." Keep this distinction consistent — don't swap them for variety.

---

## 3. Typography

Loaded via Google Fonts in the `<head>` of every page:

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Karla:wght@400;500;600;700&display=swap" rel="stylesheet">
```

- **Display font: Fraunces** (`--font-display`) — serif, slightly editorial, used for all headings (`h1`, `h2`, `h3`, `.display`). This carries the "fine artist" identity — never replace headings with the body sans-serif.
- **Body font: Karla** (`--font-body`) — clean humanist sans, used for paragraphs, nav, buttons, labels.
- **Eyebrow text** (`.eyebrow` class): small, uppercase, letter-spaced, clay-colored — used above headings to label a section (e.g. "OUR STORY", "WORKSHOPS"). Use this pattern on every new page's header/section intros for consistency.

Font sizing uses `clamp()` for responsive headings — see `h1`/`h2` rules in `style.css`. Follow the same pattern rather than fixed pixel headings.

---

## 4. Signature visual element: the "organic frame"

Because the product is hand-poured concrete, image containers should occasionally break from uniform rounded rectangles to suggest a hand-cast, mold-formed edge. This is the brand's one distinctive visual signature — don't overuse it (it should feel intentional, not chaotic).

```css
--radius-organic: 62% 38% 55% 45% / 48% 45% 55% 52%;
```

Applied via `.organic-frame` class. **Where to use it:** hero background blobs, Our Story page imagery, category icon chips. **Where NOT to use it:** product grid thumbnails, buttons, form fields — these stay on `--radius-card` (14px) or `--radius-pill` (999px) for usability and scannability.

---

## 5. Layout system

- Max content width: `1120px` (`.container` class), centered, `32px` side padding on desktop, collapsing gracefully on mobile via existing media queries.
- Sections use generous vertical padding (`.section` = 64px top/bottom) with alternating background (`--bone` / `--bone-deep`) to create rhythm without needing visible dividing lines.
- Grids (`.tile-grid`, `.product-grid`) default to 4 columns on desktop, collapse to 2 columns under 900px. Follow this same breakpoint for new grids.

---

## 6. Core components (already built — reuse, don't reinvent)

| Component | Class | Notes |
|---|---|---|
| Sticky nav | `.nav` | Same nav markup should be copy-pasted onto every new page, with the current page's link given `class="active"` |
| Buttons | `.btn .btn-clay` / `.btn-sage` / `.btn-outline` | Clay = sales action, Sage = booking/community action, Outline = secondary/tertiary action |
| Hero header | `.hero` | Centered text, soft organic blob decoration top-right, used on Home/Shop/Workshops top-of-page |
| Category tiles | `.tile-grid` / `.tile` | Icon + label cards, used for cross-linking between product categories and Workshops |
| Story split | `.story-split` / `.story-split.reverse` | Alternating image-left/image-right rows — this is the primary pattern for narrative/storytelling content (used throughout Our Story) |
| Filter pills | `.filter-pill` | Pill-shaped category filters — see `assets/script.js` for the filtering logic. Any new filterable listing (e.g. a future "Workshops calendar" page) should reuse this exact pattern |
| Product grid/card | `.product-grid` / `.product-card` | Thumbnail + name + category + price. Badges (`.badge-new`, `.badge-limited`) use sage/clay respectively per the color rule above |
| Workshop banner | `.workshop-banner` | Sage background, used to promote bookable events — reuse anywhere you want to drive workshop signups |
| Instagram strip | `.insta-strip` | Simple image grid tied to the brand's social presence — should link out to instagram.com/shop.naazarts |
| Footer | `.site-footer` | Identical across all pages: copyright + Wholesale/FAQ/Instagram/Contact links |

---

## 7. Voice & content pattern

- Headings are short, warm, sometimes poetic ("Every piece tells a small story," "Come make something with your hands") — never generic ecommerce phrasing like "Our Products" or "Shop Now Below."
- Body copy is written in first person where it's the founder speaking (Our Story, About sections) — this should NOT be templated/generic marketing copy.
- Product category labels stay consistent everywhere: **Premium trays, Raw trays — DIY, Vases, Coasters, Candles — seasonal, Starter kits, Wholesale jars.** Do not rename these across pages — the shop filter logic in `script.js` depends on exact string matches.

---

## 8. File structure

```
/
├── index.html          Homepage
├── shop.html            Product listing with category filter
├── our-story.html        Founder story / brand narrative
├── workshops.html        Offline + online workshop listings
├── contact.html          Contact form (wholesale, custom orders, workshop Qs)
├── assets/
│   ├── style.css         All design tokens + component styles — single source of truth
│   └── script.js         Mobile nav toggle, product filter logic, newsletter form
└── DESIGN.md             This file
```

**To add a new page:** copy the `<nav>`, `<footer>`, and `<script>` tags exactly from an existing page, link `assets/style.css` and `assets/script.js`, and build the page body using the components above. Do not create page-specific CSS files — extend `style.css` instead so the whole site stays visually consistent.

**To add products:** edit the `PRODUCTS` array at the top of `assets/script.js` — the shop page renders directly from this array, no HTML editing required.

---

## 9. What's intentionally left as placeholder

- `.ph` divs and `--tone-*` colored blocks stand in for real product/lifestyle photography. Replace with actual photos (product shots, workshop candids, founder portraits) — do not leave solid color blocks in the final production site.
- Workshop dates/locations in `workshops.html` are marked `[Add date]` / `[Add city]` — fill in before launch.
- The contact form action is not yet wired to a backend — connect to a form handler (e.g. Formspree) or email service before going live.
- Newsletter form in `index.html` is front-end only — connect to an email marketing provider (Mailchimp, Klaviyo, etc.) before launch.
