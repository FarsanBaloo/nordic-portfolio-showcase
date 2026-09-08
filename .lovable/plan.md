# Senior Technical Advisor — solution-proposal & stakeholder-presentation refinement

One targeted content change across three existing files. No redesign, no layout changes, no role title/employer/date changes.

## What changes

Add the capability of **developing and presenting technical solution proposals** to the Senior Technical Advisor role — currently only discovery, architecture ownership, mission-critical delivery, KTH and informal leadership are visible. The new content shows the intersection of customer/operational needs → requirements → solution options → feasibility → trade-offs → stakeholder presentation → alignment.

### 1. Timeline card — `src/content/timeline.ts` (lines 305–311, `overviewBullets`)

Insert one concise bullet as **#2** (after discovery, before end-to-end ownership), using the shorter visual-balance wording:

> "Developed and presented complex technical solution proposals to management, sales and customer stakeholders — translating operational requirements and technical constraints into clear options and trade-offs."

Result: 6 bullets (was 5). No cross-functional or UI line in the card — those go in the detailed content only. Optionally add `"Stakeholder Alignment"` to `relevanceSignals` (line 312).

### 2. CV — `src/content/cv.ts` (lines 127–137, `bullets`)

**Replace** existing bullet #2 (the generic "Worked across customers, sales, engineering, and management…" line) with the full solution-proposal bullet:

> "Developed and presented technical solution proposals for complex healthcare, pharmaceutical and other mission-critical environments to internal management, sales and customer stakeholders, translating operational requirements and technical constraints into clear solution options and trade-offs."

**Replace** existing bullet #3 ("Translated customer, operational, and project needs into structured technical requirements…") with the cross-functional bullet:

> "Worked cross-functionally with engineering, sales, management, customers and external stakeholders to align requirements, technical feasibility, delivery constraints and solution direction."

**Add** the secondary UI/web-interface bullet lower in the list (after the mission-critical delivery bullet, position ~8):

> "Translated operational workflows into user-facing digital control concepts, integrating HVAC, lighting, video and other building systems into coherent web-based interfaces."

Net: 10 bullets (was 9) — two replaced, one added. The solution-proposal bullet sits at #2 as the user requested.

### 3. Experience detail — `src/content/experience.ts` (lines 229–239, `bullets`)

**Replace** existing bullet #2 ("Worked across customers, sales, engineering and management to evaluate product and solution options…") with the solution-proposal bullet (full version).

**Replace** existing bullet #3 ("Translated customer, operational and project needs into structured technical requirements…") with the cross-functional bullet.

**Add** the UI/web-interface bullet after the mission-critical delivery bullet (position ~8).

Add a new `detailGroups` entry "Solution development & stakeholder presentation" with items:
- Solution proposals for healthcare, pharmaceutical and mission-critical environments
- Technical presentations to management, sales and customer stakeholders
- Requirements translation into solution options and trade-offs
- Cross-functional alignment across engineering, sales, management, customers and external stakeholders

Add a `notes` entry:
- Label: "Solution development & presentation"
- Body: "Developed and presented technical solution proposals for complex customer environments — translating operational requirements and technical constraints into clear options and trade-offs, and aligning internal management, sales and customer stakeholders around a shared direction."

## What stays unchanged

- Role title, employer, dates, stage line, summary
- All other role cards (Support Engineer, Project Engineer, education, etc.)
- Visual design, layout, components, navigation
- All project cards and case studies
- The timeline expanded-evidence panel mechanism (it reads from experience.ts, which is being updated)

## Guardrails honoured

- No "executive leadership" — says "internal management"
- No Product Manager / product ownership / roadmap / P&L / people management claims
- No UX Designer claim — UI point says "digital control concepts", not UX ownership
- No Finance stakeholder unless already supported
- No invented dates, metrics or results

## Verification

`npx tsgo --noEmit`, `bun run build`, and check `/` (timeline renders) and `/cv` (CV renders) return 200 with the new bullets visible.
