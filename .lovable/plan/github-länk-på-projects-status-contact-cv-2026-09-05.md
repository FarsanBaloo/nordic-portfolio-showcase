# GitHub-länk på Projects + status Contact/CV

## Redan klart (inga ändringar behövs)
- **Contact-sidan** har redan LinkedIn- och GitHub-korten med de riktiga logotyperna i kanalrutnätet (Email, Phone, LinkedIn, GitHub).
- **CV-sidan** har redan ikonförsedda LinkedIn- och GitHub-länkar i sidhuvudet.
- Sidfoten, About-hjälten och landningssidan har dem också.

## Nytt: GitHub på Projects-sidan
Studieprojekten (Computer Vision, NLP, Machine Learning m.fl.) lever på GitHub men syns inte från projektsidan. Förslag:

1. **`src/routes/projects.index.tsx`** — lägg till ett "More on GitHub"-kort under projektrutnätet:
   - GitHub-logotyp + kort text som lyfter studieprojekten inom AI/ML (Computer Vision, Natural Language Processing, Machine Learning m.fl.)
   - Tydlig länk till `https://github.com/FarsanBaloo` (öppnas i ny flik)
   - Samma mörka kortstil som övriga kort, med accent-border vid hovring
2. **`src/routes/projects.$slug.tsx`** — inget nytt byggs; det finns redan stöd för per-projekt-länkar. Om specifika repo-URL:er per projekt anges senare kan de läggas till i `src/content/projects.ts` och dyker automatiskt upp i sidokolumnen "Links".

## Contact-sidan — liten förstärkning (valfritt men rekommenderat)
3. **`src/routes/contact.tsx`** — lägg till en kort rad under kanalkorten, t.ex. "Email is the fastest way to reach me — I usually reply within a day." Det gör sidan varmare och sätter förväntningen. (Exakt formulering kan justeras.)

## Tekniskt
- Återanvänder befintliga `GithubIcon` från `src/components/brand-icons.tsx` och `profile.github`/`profile.githubDisplay` — inga nya beroenden eller duplicerade URL:er.
- Verifiering: `npx tsgo --noEmit`, `bun run build`, samt skärmdump av `/projects` (desktop + mobil).
