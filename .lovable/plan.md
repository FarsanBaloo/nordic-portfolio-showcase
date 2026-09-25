# Plan: skärpa Blekinge-kortets intro

## Mål
Lyft product strategy och business models i Blekinge-kortets intro, utan att göra det längre. Ta bort body2 (upprepar de fem kursgruppstitlarna som redan visas nedanför). Ingen redesign, ingen publicering.

## Vad som ändras (endast `src/content/education.ts`, entry `bth`)

### Nuvarande
- body: "Building on the technical AI and innovation foundation, this phase focused on how customer needs and technology opportunities become viable products, requirements, business models and sustainable value."
- body2: "Advanced-level specialisation spanning Product Management, Requirements Management, Strategy & Business Models, Agile Process & Project Management and Leadership."

### Ersätt med en body (body2 tas bort)
"Building on the technical AI and innovation foundation, this specialisation covers product strategy, business models, requirements, commercialisation and leadership — how customer needs and technology opportunities become viable products and sustainable value."

## Varför
- "Product strategy" och "business models" nämns nu explicit i introt — inte bara i course-group-korten nedanför.
- "Commercialisation" läggs till som PM/Offer-relevant signal.
- body2 togs bort: den fem kursgruppstitlarna visas redan som fem kort nedanför, så listan är ren redundans.
- Netto: kortare och skarpare, inte längre.

## Vad som bevaras
- Period, institution, formalTitle, subtitle — oförändrade
- projectCase (Talking SCADA course case) — oförändrad
- Alla 5 course groups med items och applicationItems — oförändrade
- Ingen ändring i `course-applications.ts`

## Verifiering
- Build OK
- `/education` svarar 200, ingen overflow på desktop/mobil
- Introt visar "product strategy" och "business models" explicit
