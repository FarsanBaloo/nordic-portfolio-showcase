# Completion pass — Home, About, Talking SCADA wording

Most of the requested items are already in place after the previous pass. Verified as already correct and left untouched:

- Home career journey closing paragraph — matches the requested wording exactly.
- Home capability grid — already the four groups (Customer & Business, Product & Strategy, Lifecycle & Collaboration, Technology & Human-Centred AI) with "Roadmap Input".
- Home Product Philosophy — already the exact new wording.
- About — no "Team Spirit & People" section exists; "Collaboration & Influence" is present with the exact copy.
- About Product skills — all 13 requested items present, none of the forbidden ownership items.
- About "How I Work" — present with all five principles, rendered right after "What I bring", no bars/ratings/icons.
- Talking SCADA — structure preserved; energy statement stays generic, no "40%" figure.

## Two changes to make

1. Home — "Product & AI Direction" (the NOW entry in the timeline content). Replace its summary sentence with exactly:

"Bringing together 25 years of customer and industrial-platform experience with product discovery, requirements, prioritisation, strategy, lifecycle judgement and applied AI — working across customer, engineering and business perspectives to shape useful, feasible and scalable products."

2. Talking SCADA — soften the categorical phrase in the PAIN text from "deep diagnostic expertise is scarce" to "deep diagnostic expertise may be limited or concentrated among a small number of specialists". Adjust the immediate sentence so it does not repeat the specialist point twice. Related short bullets currently say "scarce specialist domain knowledge" / "scarce specialist knowledge" — reword to "limited specialist domain knowledge" / "limited specialist knowledge" for consistency; no other case content changes.

## Technical

- Files: `src/content/timeline.ts` (NOW entry summary), `src/content/projects.ts` (Talking SCADA pain/bullets).
- No layout, navigation, structure or design changes.
- Verify with typecheck, build, and 200 responses for `/`, `/about`, `/projects/talking-scada`.
