# Portfolio hardening: sharing, CV, SEO, performance, accessibility

Site URL is now fixed: `https://petersbergsstigen.asuscomm.com`. All absolute URLs below use it.

## 1. Social sharing card
- Generate a 1200x630 OG card (`public/assets/og-card.png`) built from the existing portrait, name, and descriptor "Product Owner – AI & Industrial Digital Platforms", in the site's night/aurora style.
- Add `og:image` + `twitter:image` (absolute URL) to every leaf route head: `/`, `/journey`, `/projects`, `/projects/$slug`, `/education`, `/about`, `/contact`. Case studies use their own lead image when they have one, otherwise the OG card.
- Make all `canonical` and `og:url` values absolute against the domain (currently relative).

## 2. Downloadable CV
- New `/cv` route rendering a clean, single-column résumé from the attached CV: header/contact, strengths, core skills (Product & Strategy / Domain & Platforms / AI & Data), summary, selected AI projects (wind power forecasting, Talking Systems), experience (Senior Technical Advisor 2020–2025, Technical Support Engineer 2013–2020, Project Engineer 2003–2013), education (BTH, Skövde, AI specialisation at Umeå/LiU/MDU, BSc MDU, Sjödals Gymnasium), certifications, languages.
- CV content lives in a new `src/content/cv.ts` so it stays in one place.
- "Download CV" button in the home hero and on `/about`, linking to `/cv`; the `/cv` page has a "Print / Save as PDF" button calling `window.print()`.
- `@media print` rules in `src/styles.css`: hide aurora backdrop, scroll progress, header, footer, buttons; force white background/black text, single column, sensible page breaks.

## 3. Sitemap and robots
- Rewrite `public/sitemap.xml` with absolute `<loc>` URLs, add `/cv`, and include the remaining project slugs.
- Add `Sitemap: https://petersbergsstigen.asuscomm.com/sitemap.xml` to `public/robots.txt`.

## 4. Structured data
- `Article` JSON-LD on `/projects/$slug`: headline, author (Person: Rickard Sörlin), `datePublished` from `project.year`, image from lead image.
- `BreadcrumbList` JSON-LD on case studies: Home → Projects → title.

## 5. Performance / layout stability
- Add explicit `width`/`height` (or a CSS `aspect-ratio` wrapper) to every `<img>` in `ProjectEvidenceSheet`, `projects.$slug`, `Timeline`, and `education`.
- `loading="lazy"` + `decoding="async"` on all below-the-fold images; hero portrait stays eager with `fetchpriority="high"`.

## 6. Accessibility
- Visually-hidden "Skip to content" link as the first focusable element in `__root.tsx`, targeting a `#main` landmark on the content wrapper.
- Visible `focus-visible` rings on `ProjectCard`, timeline role/project buttons, and evidence-sheet triggers, using the existing aurora-teal token.

## 7. Availability signal
- Small status badge (pulsing dot + text) in the home hero and on `/contact`: "Open to AI Product Manager / Product Owner / Offer Manager roles — Stockholm or remote". Text stored in `src/content/profile.ts`.

## 8. Social proof
- Add a `recommendations` array in `src/content/profile.ts` and a quote block on `/about` plus the home About section, with attribution and a link to the LinkedIn recommendations section.
- Placeholder note: I need the actual quote text and attributions from you; until you provide them the section stays out of the build rather than shipping invented quotes.

## 9. Analytics
- Skipped for now unless you want it — a self-hosted setup on your NAS (Umami/Plausible) is the natural fit and needs a container of its own. Say the word and I'll add the script tag.

## Technical notes
- Files touched: `src/routes/{index,about,contact,journey,education,projects.index,projects.$slug,__root}.tsx`, new `src/routes/cv.tsx`, new `src/content/cv.ts`, `src/content/profile.ts`, `src/components/{site,ProjectCard,ProjectEvidenceSheet,Timeline}.tsx`, `src/styles.css`, `public/{robots.txt,sitemap.xml}`, new `public/assets/og-card.png`.
- A single `SITE_URL` constant (`src/lib/site.ts`) builds all absolute URLs, so a future domain change is one edit.
- LinkedIn caches previews; after publishing, refresh via LinkedIn's Post Inspector to see the new card.
