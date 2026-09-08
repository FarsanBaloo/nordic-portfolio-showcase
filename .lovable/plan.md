# Targeted Career Journey hierarchy refinement

## Outcome

Make the 2023–2025 academic development read as an additive, parallel track beside an unchanged professional career:

```text
Senior Technical Advisor — 2020–2025
↓
Parallel Professional & Academic Development
↓
Smaller B.Sc. card with its existing image
↓
Wind Power Forecasting with its existing image
↓
Talking Systems with its existing image
↓
Later Product / Business / Strategy development, including Talking SCADA
```

The Senior Technical Advisor role remains the primary visual and factual story. The B.Sc. and its projects remain supporting academic/applied evidence, not replacement employment.

## Exact scope

### 1. Preserve the professional timeline

- Keep Project Engineer, Technical Support Engineer / National Technical Expert, and Senior Technical Advisor in their current positions.
- Keep the Senior Technical Advisor card full-size and visually dominant, with its title, employer, `2020–2025` dates, professional content, role evidence, and three existing professional projects unchanged.
- Do not split or shorten the Senior Technical Advisor period and do not create two equally prominent timeline columns.

### 2. Keep and refine the overlap separator

- Keep the heading `PARALLEL PROFESSIONAL & ACADEMIC DEVELOPMENT`.
- Replace only its body with:

  > The Senior Technical Advisor role began in 2020. From 2023, Computer Science and AI studies developed alongside the professional role, adding formal AI, software and human-centred design capabilities to extensive industrial experience.

- Keep the separator compact and visually secondary; do not turn it into a large card.
- Remove the older duplicate note beneath the Senior Technical Advisor projects that discusses full-time years and leave periods. The separator will explain the overlap once, positively and without workload details.

### 3. Refine the existing B.Sc. card only

- Keep the existing B.Sc. milestone and its existing graduation image; do not create a duplicate card.
- Make it read clearly as:
  - `2023–2025`
  - `B.Sc. Computer Science — Intelligent Systems`
  - `AI / Computer Science focus`
- Avoid repeating the overlap explanation inside the B.Sc. card because the separator already provides that context.
- Give only this milestone a secondary visual treatment: approximately 60–70% of the professional role’s perceived prominence through a narrower desktop width, tighter spacing and typography, and a proportionally smaller image.
- Leave the normal full education information available elsewhere in the portfolio.

### 4. Preserve both applied project cards and images

- Keep Wind Power Forecasting as an actual project card with its existing image and current project content.
- Keep Talking Systems as an actual project card with its existing image and current project content.
- Present them below the B.Sc. card, in this order:
  1. Wind Power Forecasting
  2. Talking Systems
- Keep both visually rich but subordinate to the B.Sc. and clearly below the Senior Technical Advisor hierarchy.
- Do not convert them to chips, enlarge them, add new copy, or add any other B.Sc. project cards.
- Preserve the existing coursework evidence without expanding or rewriting it; this refinement only changes the hierarchy of the named cards.

### 5. Keep later development separate

- Keep the later 2025–2026 Product Management, discovery, requirements, strategy, business-model, innovation, industrial-management, and advanced-AI development unchanged.
- Keep Talking SCADA in that later Product / Business / Strategy phase. Do not place or visually connect it to the B.Sc.

## Implementation details

- Use the existing timeline data and components; add a narrowly scoped presentation flag/variant for the B.Sc. milestone rather than altering all education cards.
- Place the B.Sc. milestone card before its child evidence instead of between child groups.
- Use existing design tokens, animation behaviour, card surfaces, and connectors. Do not redesign the timeline or modify other portfolio sections.
- Desktop preserves the existing professional/development relationship without giving both tracks equal weight.
- Mobile order must be: Senior Technical Advisor → separator → B.Sc. → Wind Power Forecasting → Talking Systems. Stacking must not imply that employment ended in 2023.

## Verification

- Review the Career Journey at desktop and mobile sizes as a five-second recruiter scan.
- Confirm Senior Technical Advisor remains full-size, dominant, unchanged, and clearly dated `2020–2025`.
- Confirm the separator is concise and explains that studies began in 2023 alongside the role.
- Confirm the smaller B.Sc. card retains its image and is followed by Wind Power Forecasting and Talking Systems, each with its existing image.
- Confirm no new academic project cards appear, no employment/study percentages or detailed leave wording remain, and Talking SCADA stays in the later development phase.
- Check for overlap, horizontal overflow, image loading, and console errors on desktop and mobile, then run the focused type check and confirm the preview build is clean.
