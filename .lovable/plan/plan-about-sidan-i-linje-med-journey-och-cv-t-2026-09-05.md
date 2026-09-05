# Plan: About-sidan i linje med Journey och CV:t

## Analys (nuvarande läge)

About-sidan (`/about`) är i dag tunn och CV-lik:
- Den visar bara `profile.summary` (två täta CV-stycken), target roles, capability-taggar och språk.
- Tre rikare texter finns redan i `src/content/profile.ts` men **används inte alls på sidan**: `aboutParagraphs` (personlig berättelse i samma ton som Journey), `productPhilosophy` (din produktfilosofi) och `whatIBring` (fem "vad jag bidrar med"-kort).
- Journey-sidan berättar numera en stark, personlig historia (kund → plattform → discovery → AI). About känns därmed som ett steg tillbaka: densamma information som CV:t, utan värme, och utan att förklara *vem du är som person och AI Product Manager*.

## Förslag — vad som ändras

### 1. Uppdatera hero-intro
- Hero visar i dag bara `profile.positioning`. Lägg till `profile.bridge` som stödtext så bro-kopplingen engineering ↔ business syns direkt.

### 2. Ersätt/utöka sammanfattningen med personlig berättelse
- Under sammanfattningsstyckena: ny sektion "My journey in short" som renderar `aboutParagraphs` (fyra stycken som speglar Journey-berättelsen men komprimerat: Project Engineer → national expert → Senior Technical Advisor → medveten studieinriktning mot AI-produktroller).
- Tonen harmoniserar då med `journeyNarrative` utan att duplicera den — About blir "vem jag är och vad jag tar med mig", Journey förblir den fördjupade historien.

### 3. Ny sektion: Product philosophy
- Rendera `productPhilosophy` som ett framhävt citatblock (accent-kant, större text) — det är den mest AI-PM-präglade texten på hela sajten och förtjänar en plats.

### 4. Ny sektion: What I bring
- Rendera `whatIBring` som fem kort (Customer & Stakeholder Focus, Industrial & Platform Depth, Product Thinking, Technical Credibility, Applied AI & Human-Centred Design) — direkt kopplat till Journey- och CV-erfarenheterna (discovery i operations-sal, informellt tekniskt ledarskap, R&D QA, release readiness).

### 5. Smärre textjusteringar (om innehållet behöver synkas)
- Säkerställ att `aboutParagraphs` nämner informellt tekniskt ledarskap/mentorskap i Senior Technical Advisor-stycket (matchar den uppdaterade Journey/CV-beskrivningen).
- Behåll befintliga sektioner (Target roles, capabilities, languages) oförändrade i slutet.

## Tekniskt
- Ändringar i `src/routes/about.tsx` (nya sektioner, rendera befintligt innehåll) och punktjustering i `src/content/profile.ts` (`aboutParagraphs`, ev. ordalydelse).
- Återanvänder befintliga `Section`, `SectionHeading`, kort- och night-card-stilar — inga nya komponenter.
- Verifiering: `npx tsgo --noEmit`, `bun run build`, samt Playwright-screenshot av `/about` för att kontrollera layout desktop + mobil.
