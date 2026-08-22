# Rickard Sörlin — Professional Portfolio

A complete, production-quality portfolio site: Nordic aurora (norrsken) night sky in the hero and timeline, calm light content pages below. Built as separate routes so every page is shareable and indexable, and fully static (no backend) so it can be self-hosted anywhere.

## Design direction

- **Hero + timeline band:** deep midnight navy sky with slow, subtle aurora ribbons (soft green/violet, CSS/SVG gradient motion, GPU-cheap, respects `prefers-reduced-motion`). No neon, no glassmorphism excess.
- **Content pages:** light Scandinavian palette — off-white paper, warm grey, deep slate text, one restrained aurora-teal accent.
- **Typography:** a modern grotesque for headings, a highly readable sans for body; generous whitespace, clear grid, strong hierarchy, subtle motion on scroll.
- **Avoid:** skill bars, star ratings, robots/AI-brain clichés, buzzword copy, template startup look.
- All colours and the aurora gradient defined as design tokens in `src/styles.css` (oklch), not hardcoded in components.

## Structure

Home (`/`) with sections:
1. **Hero** — name, "Digital Platforms · Product · Applied AI", primary and supporting copy, the progression strip *Industrial Systems → Digital Platforms → Product → AI*, a clearly labelled **Target / focus roles** block (AI Product Manager, AI Product Owner, Offer Manager), and three CTAs: Explore My Journey, View Selected Projects, Connect on LinkedIn.
2. **Journey intro + interactive timeline** — two coordinated tracks on desktop (Professional Experience / Education · AI · Product Development), merged chronologically on mobile. Nodes for 2003–2013, 2013–2020, 2020–2025 and the education track (Computer Science, 2024 Interaction Design, 2025 Industrial AI + wind thesis, Aug 2025–Jul 2026 Advanced AI · Innovation · Product Management, Now).
3. **Experience** — role cards with the visible high-value bullets, expandable Level-2 detail (responsibilities, lifecycle/QA context, architecture, stakeholders, tags). QA/R&D framed as collaboration, never as an R&D role.
4. **Selected projects** — cards linking to case studies.
5. **Education**, **About**, **Contact** (email, `tel:+46730795308`, LinkedIn — links only, no form).

Dedicated pages: `/journey`, `/projects`, `/education`, `/about`, `/contact`, plus case-study routes:
`/projects/talking-systems`, `/talking-scada`, `/wind-power-forecasting`, `/multi-agent-ai`, `/digital-realty-st06`, `/st-eriks`, `/kth-living-lab`, `/hvac-monitoring`, `/planet-resande`, `/hallbar-halsa`, `/seeing-ai` (+ AstraZeneca as a shorter case).

Each case study follows the Level-3 template: context → problem/opportunity → role & contribution → discovery → solution → architecture/method → validation → results → product/business relevance → images → reflection.

## Images

Neutral, clearly marked placeholder frames with correct aspect ratios and captions, so your photos drop straight in later without layout changes.

## Technical notes

- TanStack Start, one route file per page; all content lives in typed data modules (`src/content/*.ts`) so text and case studies are easy to edit in one place.
- Shared header/footer in `__root.tsx`; per-route `head()` with unique title, description and OG/Twitter tags.
- Timeline and expandable sections are accessible (keyboard, ARIA, focus states); AA contrast in both bands.
- No backend, no database — fully static output.

## GitHub

I can't create the repository myself, but once the site is built you can connect it in one step: **+ menu → GitHub → Connect project → Create repository**. That pushes the whole codebase to a new repo and keeps it two-way synced.

## Build order

1. Design tokens, aurora background component, header/footer shell.
2. Home: hero, journey intro, timeline, experience, projects, education, about, contact.
3. Standalone section routes.
4. All case-study routes.
5. Responsive, accessibility and metadata pass.
