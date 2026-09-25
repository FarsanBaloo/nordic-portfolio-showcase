# Plan: korta University of Skövde-kortet

## Mål
Korta Skövde-kortet genom att ta bort den enda konkreta redundansen (topics-listan upprepar body-meningen) och slå ihop body + body2 till en mening. Ingen redesign, inget innehåll försvinner, ingen publicering.

## Vad som ändras (endast `src/content/education.ts`, entry `his`)

### 1. Ta bort topics-listan
`topics: ["Strategic innovation", "Applied innovation processes", "Implementation", "Innovation leadership"]` är ordagrant samma fyra begrepp som i body-meningen. Ta bort arrayen (sätt till `[]`).

### 2. Slå ihop body + body2 till en mening
Nu:
- body: "Focused on strategic innovation, applied innovation processes, implementation and innovation leadership."
- body2: "Studied in parallel with the advanced AI foundation, this formed the innovation and product bridge developed further at Blekinge Institute of Technology."

Ersätt med en body:
"Focused on strategic innovation, applied innovation processes, implementation and innovation leadership — studied in parallel with the advanced AI foundation as the innovation and product bridge developed further at Blekinge Institute of Technology."

body2 tas bort (tom/undefined).

## Vad som bevaras
- Period, institution, formalTitle, subtitle — oförändrade
- chain (4-stegsflödet) — oförändrad
- projectCase med 3 punkter — oförändrad
- Ingen ändring i `course-applications.ts` (innovation-punkterna)

## Verifiering
- Build OK
- `/education` svarar 200, ingen overflow på desktop/mobil
- Kortet visar fortfarande alla unika element (chain, project case, period)
