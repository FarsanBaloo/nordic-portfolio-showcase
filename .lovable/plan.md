# Plan: GitHub-länk med ikon vid sidan av LinkedIn

## Rekommendation
Ja — för en AI Product Manager-profil är GitHub starkt bevismaterial: dina studieprojekt (Computer Vision, NLP, ML m.m.) visar att du faktiskt byggt det du pratar om. Profilen https://github.com/FarsanBaloo svarar 200 och är live. Den bör synas överallt där LinkedIn redan visas, med en riktig GitHub-ikon (GitHub-marken, inte en generisk länktext).

## Ändringar

### 1. `src/content/profile.ts`
- Lägg till `github: "https://github.com/FarsanBaloo"` och `githubDisplay: "github.com/FarsanBaloo"`.

### 2. GitHub-ikon
- Återanvändbar inline-SVG GitHub-mark-komponent (`GithubIcon`) i `src/components/site.tsx` (eller ny liten komponent), anpassad till befintlig design (night/aurora-tema, aria-label för tillgänglighet).

### 3. Placeringar (samma som LinkedIn i dag)
- **About-hero** (`src/routes/about.tsx`): "GitHub"-knapp bredvid LinkedIn-knappen, med ikon.
- **Kontaktsidan** (`src/routes/contact.tsx`): GitHub-kanalrad i samma kanal-lista som LinkedIn, med ikon.
- **Landningssidan** (`src/routes/index.tsx`): GitHub-kort/länk bredvid LinkedIn i kontaktsektionen + lägg till i JSON-LD `sameAs` (bra för SEO/kunskapsgraf).
- **CV-sidan** (`src/routes/cv.tsx`): GitHub-länk i sidhuvudet vid LinkedIn.
- **Sidfoten** (`src/components/site.tsx`): GitHub med ikon bredvid LinkedIn.

### 4. Verifiering
- `npx tsgo --noEmit`, `bun run build`, Playwright-screenshot av `/about` och `/contact` (desktop + mobil) för att kontrollera ikonens utseende och att inga fel uppstår.
