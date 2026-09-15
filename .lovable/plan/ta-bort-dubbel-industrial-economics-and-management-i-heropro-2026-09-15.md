# Ta bort dubbel "Industrial Economics and Management" i heroProof

## Vad som ändras
- `src/content/profile.ts`, `heroProof[3].body` (rad 36): ta bort inledningen "Industrial Economics and Management, " så bodyn börjar direkt med "Product Management, Product & Requirements Management, value-driven design, Strategy & Business Models, Innovation Management, Agile Process & Project Management, Product & Portfolio Strategy and Leadership."
- Etiketten "Postgraduate Industrial Economics & Management" bevaras oförändrad.
- Inga andra fält, vyer eller komponenter rörs.

## Kontroll
- `npx tsgo --noEmit`
- Build-loggen (`/tmp/observability/build-errors.log`)
- Playwright på `/` (desktop 1280px + mobil 390px): bekräfta att den fjärde evidenspunkten läses naturligt utan upprepad inledning.
- Publicera inte.
