# Scent Garden — Kelsie Nguyễn portfolio

A static one-page site built with [Astro](https://astro.build), recreated from the design handoff
(`design_handoff_scent_garden_landing/design/Scent Garden.dc.html`).

## Run locally

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve the built dist/
```

Requires Node 22.12+ (24 LTS recommended).

## Where things live

| What | File |
| --- | --- |
| Page markup & copy | `src/pages/index.astro` |
| All styles (tokens, breakpoints, animations) | `src/styles/global.css` |
| Interactions (reveal, count-up, drift, carousel, menu) | `src/scripts/main.ts` |
| External links (LinkedIn, Instagram, email, website…) | `src/data/links.ts` |
| Section background paintings | `src/assets/backgrounds/` |
| Photos for image slots | `src/assets/images/` |

## Adding photos

Every image placeholder from the design has a **slot id**. To fill one, save a file named
`<slot-id>.jpg` (or `.png`, `.webp`, `.avif`) into `src/assets/images/`, e.g.
`src/assets/images/wild-1.jpg`. Astro resizes it and converts it to WebP at build time;
empty slots keep their frame and placeholder colour.

Already filled: `gardener-portrait`, `int-stamp-1`, `int-stamp-2`.

| Section | Slot ids | Frame |
| --- | --- | --- |
| The Gardener | `gardener-portrait` · `gardener-bg` (optional background) | 3:4 |
| What Has Bloomed — Cavaillès | `bloom-photo-1` … `bloom-photo-4` · `bloomed-bg` | 3:4 |
| What Has Bloomed — VEC | `vec-photo-1` … `vec-photo-4` · `vec-bg` | 3:4 |
| The Blooms carousel | `blooms-carousel-cav`, `-int`, `-web`, `-kit`, `-ven`, `-social` · `blooms-bg` | 4:3 |
| Cavaillès case study | `cav-photo-1` … `cav-photo-5` · stamps `cav-stamp-1`, `cav-stamp-2` | 1:1 |
| C-Level Interview Series | `int-still-1` … `int-still-14` · stamps `int-stamp-1`, `int-stamp-2` | 1:1 |
| VEC Website | `web-photo-1` … `web-photo-6` · stamps `web-stamp-1`, `web-stamp-2` | 4:3 |
| VEC Sales Kit | `kit-photo-1` … `kit-photo-6` · stamps `kit-stamp-1`, `kit-stamp-2` | 4:3 |
| Media Vendor Management | `vendor-photo-1` … `vendor-photo-5` · stamps `media-stamp-1`, `media-stamp-2` | 1:1 |
| Daily Social | `social-photo-1` … `social-photo-5` · stamps `social-stamp-1`, `social-stamp-2` | 1:1 |
| Wildflowers | `wild-1` … `wild-12` | 1:1 |
| Come Visit My Garden | `visit-bg` · `visit-ghost-flower` (shown at 8% opacity) | — |
| Case-study backgrounds (optional) | `bloom-cavailles-bg`, `bloom-vec-interviews-bg`, `bloom-vec-website-bg`, `bloom-vec-sales-kit-bg`, `bloom-vec-media-bg`, `bloom-vec-daily-social-bg` | full-bleed |

Stamps are tiny (~30–60px); a small botanical illustration works best.
Photos are cropped to fill (`object-fit: cover`) from the centre. To change the crop for one
image, pass `position="50% 20%"` to its `<Slot>` in `index.astro` (see `int-stamp-1`).

The hero uses `src/assets/backgrounds/bg-meadow-pastel.png` full-bleed — replace that file to change it.

## Before deploying

1. Fill in `src/data/links.ts` (LinkedIn, Instagram, email, VEC website/landing page,
   Wildflowers "See more", and the 14 "Watch →" links). Empty links stay inert placeholders.
2. Once the domain is known, set `site` in `astro.config.mjs` so the Open Graph image URL is absolute.

## Deploy to Vercel

Import the repo in Vercel — it detects Astro automatically (build `npm run build`, output `dist`).
Or from the terminal: `npx vercel` then `npx vercel --prod`.
