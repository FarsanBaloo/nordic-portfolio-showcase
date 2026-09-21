# Tydligare Talking SCADA genom hela portfolion

## Mål

Vem som helst — rekryterare, HR, produktchef utan fastighetsbakgrund — ska på tio sekunder förstå:

1. Vad SCADA är: de centrala systemen som övervakar och styr ventilation, värme, kyla, larm och mätvärden i stora fastigheter.
2. Varför konceptet heter *Talking* SCADA: byggnaden förklarar på klarspråk vad som händer.
3. Vilket värde det ger: hitta dolda energitjuvar, förstå orsaken och veta vilken åtgärd som är rimlig — med människans omdöme kvar i beslutet.

Detta är en textuppdatering, inte en redesign. Inga nya komponenter, ingen ny design, ingen publicering.

## Ändringar per plats

### 1. Startsidans story (The Journey) — `src/content/profile.ts`

Ersätt Talking SCADA-stycket så det förklarar SCADA i en bisats och landar i klarspråksidén:

> Talking SCADA became the case where these perspectives came together. SCADA systems are the control systems that monitor and steer ventilation, heating, cooling and alarms in large buildings — rich in data, but hard to interpret. Starting in Innovation in Practice, I refined a multi-agent AI decision-support concept through product, requirements, strategy and business-model coursework: letting the building explain, in plain language, where energy is being wasted, what is likely causing it and what to look at next. Combined with 20+ years of domain experience, the case connected customer and business value while keeping human judgement in the decision.

### 2. About — `src/content/profile.ts`

Sista About-stycket får en avslutande mening i samma anda: Talking SCADA som det återkommande caset där domänkunskap, tillämpad AI och produktarbete möts kring att göra byggnadens data begriplig.

### 3. Projektets undertitel och kortsammanfattning — `src/content/projects.ts`

- Undertitel: "Letting buildings explain their hidden energy waste in plain language" (ersätter "Understanding hidden energy problems in buildings").
- Teaser (projektkortet) inleds med en mening som förklarar SCADA, därefter behålls den befintliga beskrivningen av mitt produktarbete från användarbehov till MVP, krav, prioritering, positionering och affärsmodell.

### 4. Tidslinjens fokuserade case — `src/content/projects.ts` (`timelineContent`)

- `intro`: lägg till SCADA-förklaringen först, behåll resten.
- `Why`: behåll EU-källan och orsakerna, men avsluta med klarspråksformuleringen (energitjuvar → orsak → åtgärd).
- `What the concept is` (samma text används på projektsidan): inled med vad produkten gör för användaren i vardagsspråk innan multi-agent-strukturen beskrivs.

### 5. "My focus" i tidslinjen — `src/content/timeline.ts`

Formulera om `projectRoleContext["talking-scada"]` så den nämner användarvärdet, inte bara artefakterna.

## Faktagränser som bevaras

- Akademiskt koncept, inte en byggd eller kommersiell produkt; intended gains förblir avsedda, inte uppmätta.
- 40 % gäller EU-byggnader; källänken behålls.
- Projektsidan behåller exakt åtta huvudsektioner och alla underrubriker.
- Inga påståenden om Schneider-ägande, IP eller godkännande.

## Teknisk omfattning

Endast innehållsfiler: `src/content/profile.ts`, `src/content/projects.ts`, `src/content/timeline.ts`. Inga komponent-, layout- eller beroendeändringar.

## Kontroll

Typkontroll, byggloggen, samt genomgång av startsidan, /about, /projects och /projects/talking-scada i 1280 px och 390 px — ingen dubblerad text, ingen sidledsskroll. Ingen publicering.
