# Plan: GitHub- och LinkedIn-ikoner med riktiga logotyper

## Rekommendation
Ja — för en AI Product Manager-profil är GitHub starkt bevismaterial: dina studieprojekt (Computer Vision, NLP, ML m.m.) visar att du faktiskt byggt det du pratar om. Profilen https://github.com/FarsanBaloo svarar 200 och är live. GitHub bör synas överallt där LinkedIn redan visas, och båda bör använda de riktiga varumärkeslogotyperna (GitHub-marken och LinkedIn "in"-emblemet) — det är direkt igenkännbart för rekryterare och ser mer professionellt ut än textlänkar.

## Ändringar

### 1. `src/content/profile.ts`
- Lägg till `github: "https://github.com/FarsanBaloo"` och `githubDisplay: "github.com/FarsanBaloo"`.

### 2. Varumärkesikoner
- Nya inline-SVG-komponenter i `src/components/site.tsx` (eller liten ny komponentfil): `GithubIcon` (officiell GitHub-mark) och `LinkedinIcon` (officiellt "in"-emblem).
- Stil: currentColor så de ärver temat (night/aurora), konsekvent storlek, `aria-hidden` + `aria-label` på länkarna för tillgänglighet. Inga nya npm-paket.

### 3. Placeringar (samma som LinkedIn i dag)
- **About-hero** (`src/routes/about.tsx`): GitHub-knapp bredvid LinkedIn-knappen; båda får respektive brand-ikon.
- **Kontaktsidan** (`src/routes/contact.tsx`): GitHub-rad i kanal-listan med ikon; LinkedIn-raden får sin logotyp.
- **Landningssidan** (`src/routes/index.tsx`): GitHub-kort/länk bredvid LinkedIn i kontaktsektionen, båda med ikon; GitHub tillagt i JSON-LD `sameAs` (SEO/kunskapsgraf).
- **CV-sidan** (`src/routes/cv.tsx`): GitHub-länk med ikon i sidhuvudet; LinkedIn får ikon.
- **Sidfoten** (`src/components/site.tsx`): GitHub och LinkedIn med brand-ikoner.

### 4. Verifiering
- `npx tsgo --noEmit`, `bun run build`, Playwright-screenshots av `/about` och `/contact` (desktop + mobil) för att kontrollera ikonernas utseende och att inga fel uppstår.
