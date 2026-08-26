# Portfolio — what's recommended and important to add/fix

The site is strong on content and chronology. These are the gaps that matter for a professional positioning toward AI Product Manager / Offer Manager roles, ordered by impact.

## 1. Social sharing — OG images (important)
LinkedIn is the primary channel where this portfolio will be shared (by you, recruiters, peers). Right now **no route sets `og:image` or `twitter:image`**, so shared links render a blank preview card.

- Generate one polished OG card image (1200×630) from the portrait + name + descriptor, stored in `/public/assets/og-card.png`.
- Add `{ property: "og:image", content: "https://<domain>/assets/og-card.png" }` and the matching `twitter:image` to the leaf route heads (`/`, `/journey`, `/projects`, `/education`, `/about`, `/contact`) and to flagship case-study routes.
- Requires a published domain to form absolute URLs; until then, use the stable preview URL.

## 2. Downloadable CV / résumé (important)
Recruiters expect a one-click PDF. There is none today.

- Add a "Download CV" button in the hero and on `/about`.
- Produce a clean, single-column print stylesheet for `/about` (or a dedicated `/cv` route) so "Download CV" can be a print-to-PDF of a page tuned for paper, avoiding a separate hand-maintained document that drifts out of sync.
- Include the print stylesheet (`@media print`) so the aurora, nav, footer and interactive timeline are hidden and the content reads cleanly on paper.

## 3. Sitemap and robots are half-wired (important for indexing)
`public/sitemap.xml` uses **relative URLs** (`<loc>/journey</loc>`), which Google rejects, and `public/robots.txt` does not reference the sitemap.

- Prefix every `<loc>` with the absolute site URL once a domain is set.
- Add `Sitemap: https://<domain>/sitemap.xml` to `robots.txt`.

## 4. Structured data beyond the home page (important for SEO)
Only `/` has JSON-LD (`Person`). Case studies and the journey would benefit:

- Add `Article` JSON-LD on `/projects/$slug` (headline, author, datePublished from `project.year`, image from the project's lead image).
- Add `BreadcrumbList` JSON-LD on case studies (Home → Projects → <title>).

## 5. Performance — image dimensions and lazy loading (important)
Project images in `ProjectEvidenceSheet` and case-study pages load without explicit `width`/`height`, causing layout shift (CLS). The timeline thumbnail images likewise.

- Add explicit `width`/`height` (or `aspect-ratio`) to every `<img>` so the browser reserves space before load.
- Confirm `loading="lazy"` on all below-the-fold images (hero portrait should stay `eager`).

## 6. Accessibility polish (recommended)
The site is largely accessible, but two cheap wins remain:

- Add a visually-hidden **"Skip to content"** link as the first focusable element in `__root.tsx`.
- Ensure every interactive card (ProjectCard, role expand buttons) has a visible focus ring (some `hover`-only styling may not pair with `:focus-visible`).

## 7. Availability / "what I'm looking for" signal (recommended)
The hero has "Target / focus roles" but no availability status. Recruiters scan for this.

- Add a short availability line (e.g. "Open to AI Product Manager / Offer Manager roles — Stockholm or remote") to the hero and `/contact`, ideally as a small status badge so it reads at a glance.

## 8. Social proof (recommended)
The case studies are strong but entirely self-authored. Lightweight, credible third-party signal helps:

- Surface a short pull-quote or two from LinkedIn recommendations (with attribution + link to the source recommendation), on `/about` or the home "About" section.

## 9. Analytics (recommended, optional)
No traffic tracking today. If you want to know which projects/cases recruiters actually open:

- Add a privacy-light analytics beacon (e.g. Plausible/Umami via a script tag, or a simple `/api/public/ingest` server route) — no cookies, GDPR-friendly.

## Not recommended (deliberately omitted)
- **A contact form.** Links-only (email, phone, LinkedIn) is the right call for a static self-hosted personal site — a form needs a backend and is friction recruiters don't need.
- **A blog.** Not part of the positioning; the case studies already do the depth work.
- **Light mode.** The aurora night identity is the brand; a toggle would dilute it.

## Technical notes
- Files touched: `src/routes/{index,about,contact,journey,projects.*,education}.tsx` (head + JSON-LD), `public/{sitemap.xml,robots.txt}`, `src/styles.css` (`@media print`), `src/components/{site,ProjectEvidenceSheet,ProjectCard,Timeline}.tsx` (focus rings, image dimensions, skip link), new `public/assets/og-card.png`.
- OG image and absolute sitemap URLs require a published domain; both can be staged now against the preview URL and flipped to the production domain on publish.
