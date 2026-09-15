# Byta "technology" → "solution" i positioneringen

## Ändring
I `src/content/profile.ts` (rad 18), byt `"I start with the customer problem, not the technology."` till `"I start with the customer problem, not the solution."` Resten av meningen (Schneider Electric, B2B, applied AI, product management, offer strategy) berörs inte.

## Berörda platser
- Endast positioneringstexten i `homepageDescriptor` (rad 18). Story-raden (rad 149) säger "customer's problem" och berörs ej.

## Verifiering
- `npx tsgo --noEmit`
- Build-loggen visar `build OK`
- Playwright på localhost:8080 (desktop 1280px + mobil 390px) — startsidekortet visar "not the solution".

## Ej berört
- Ingen redesign, inga nya beroenden, ingen publicering.
