# Plan: Omformulera lektion-meningen i journey paragraf 1

## Analys av nuvarande mening

Nuvarande (inbakad i leverans-meningen via em-dash):
> "learning the lesson everything else builds on: a product is only as good as the day-to-day reality of the people who depend on it."

### Är det viktig PM-kunskap?
Ja — kärninsikten är giltig och stark: ett produkts värde avgörs av verklig daglig användning, inte av kravspecifikationen. Det är en central PM-princip (användarcentrerat, adoption, real-world fit). Problemet är **ordvalen**, inte insikten:

- "day-to-day reality of the people who depend on it" är poetiskt/mjukt — det låter mer som en livsvisdom än ett PM-perspektiv en rekryterare letar efter.
- "a product is only as good as" är vardagligt; PM-språk pratar om värde, användning, adoption.
- Den saknar den kontrasterande PM-spänningen ("use vs requirements") som gör insikten skarp.

### Borde den vara kvar?
Ja, men omformulerad så den uttrycker samma insikt med skarpare PM-språk och bevarar den mänskliga vinkeln (folk som använder produkten varje dag).

## Förslag — ny formulering

> "learning the lesson everything else builds on: a product's real value is decided by the people who use it every day — not by the requirements that define it."

Varför bättre:
- "real value" — PM-språk (värde, inte bara "as good as")
- "decided by the people who use it every day" — bevarar mänsklig vinkel, konkretare än "day-to-day reality"
- "not by the requirements that define it" — skarp PM-kontrast (användning vs krav) som en rekryterare känner igen

Full paragraf blir då:
> "I began as a Project Engineer, working alongside customers on discovery — understanding the job to be done and what would break if we got it wrong. From requirements and solution design through to delivery of digital solutions for building operation and energy optimisation, I stood next to the customer when it went live — learning the lesson everything else builds on: a product's real value is decided by the people who use it every day, not by the requirements that define it. Later, as Sweden's national technical expert for a digital building platform and its ecosystem of edge controllers, I saw the faults that kept coming back and the workarounds customers relied on. Owning a reusable capability for detecting and visualising HVAC deviations, I turned operational data into actionable insight, working close to product lifecycle, release validation and deployment readiness. With Product Owners and R&D I turned recurring field issues into structured product feedback and enhancement proposals, prioritised critical defects and validated releases."

## Alternativ (om du hellre vill stryka helt)
Meningen kan strykas om du tycker insikten redan framgår av "job to be done" och discovery. Jag rekommenderar att behålla i omformulerad form — det är den enda explicita "use-vs-requirements"-insikten i journey.

## Tekniska detaljer
- En fil: `src/content/profile.ts`, `journeyNarrative.paragraphs[0]`
- Ingen redesign, ingen publicering; verifiera med build + Playwright desktop/mobil
