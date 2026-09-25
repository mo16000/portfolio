# Mohammad Mahmoodi — Portfolio

Personal portfolio for Product Designer and AI Product Designer roles.

Production: https://mo16000.github.io/portfolio/

## Running locally

No build step or production dependencies. From the parent directory, run `python3 -m http.server 4173` and open `http://localhost:4173/portfolio/`.

GitHub Pages publishes the `main` branch, repository root. `.nojekyll` preserves the static files. All local asset references are relative so the `/portfolio/` project path works correctly.

## Editing

- `index.html`: content, links, metadata, and Person structured data.
- `styles.css`: reusable palette and interaction tokens, layout, responsive rules, reduced motion.
- `script.js`: upcoming case study countdown, current year, section navigation state.
- `assets/`: optimized WebP project imagery, original resume PDF, self-hosted font and license, favicon, social preview.
- `docs/content-sources.md`: factual source map and editorial decisions.

## AI evaluator release

The countdown targets **October 5, 2026, 00:00 America/Toronto** (`2026-10-05T00:00:00-04:00`). It uses ceiling days, displays 10 days on September 25, and updates once per minute. At the deadline it changes to “Coming soon / In preparation.” It does not invent a published case study or enable a nonexistent link.

When the case study is ready, replace the upcoming entry with its actual title, summary, and published URL. Update the sitemap date. No thumbnail is included for this entry.

## Design

The supplied gradient is the brand foundation, balanced with neutral surfaces and a dark about section. The original image is optimized to WebP. Plus Jakarta Sans provides clean geometric forms; it is self-hosted under the included SIL Open Font License. Project images are taken from the existing case studies. Only the social sharing image uses generated artwork.

## Accessibility and performance

Semantic landmarks and headings, keyboard skip link, visible focus, native anchor navigation, descriptive image alternatives, reduced-motion support, 44px or larger navigation/link targets, and static content without JavaScript. Only the countdown and active navigation are enhanced with JavaScript. Project previews are lazy-loaded with width variants and explicit dimensions. The Latin font and small gradient are preloaded. No tracking scripts, external runtime font requests, or JavaScript framework.

## Social preview

`assets/og.png` is a 1200 × 630 sharing card, linked with absolute GitHub Pages URLs in Open Graph and Twitter metadata. Generated once using the built-in ImageGen tool, with the supplied gradient as a color reference. Exact text: “Mohammad Mahmoodi” and “Product Designer · AI & B2B SaaS”.
