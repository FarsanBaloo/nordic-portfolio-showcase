# Make the whole portfolio sharper and shorter

The portfolio has about 20 500 words of text. The biggest parts are the project pages (about 8 200 words, mostly Talking SCADA), the timeline (3 300), experience (2 400) and the About/Journey text (2 400). A recruiter skims for 30–60 seconds, so the goal is less text with the same message. No redesign, no new facts, no publishing.

## Principles
- Every sentence must say something new: your domain, your product thinking, AI with its limits, business value, or cross-functional work.
- Say it once. If the start page says it, other pages link to it instead of repeating it.
- Short, active sentences. Cut soft filler words ("really", "in different ways", "close to").
- Keep all your key terms: structured product feedback and enhancement proposals, edge IoT ecosystem, EcoStruxure Building Operation, SCADA "monitor", Predictive Data Analytics, the one mention of Job to be done.
- Don't overstate anything. Keep the honest wording ("align", no formal PM title before now).

## Work per page (in this order)
1. **Start page (top section + evidence points):** keep the structure. Aim for about 20% fewer words and remove overlap between the intro and the four points.
2. **Timeline cards:** at most 3 bullets per role, each 1–2 lines. Cut chips that repeat the bullets. Talking SCADA's open case stays open but gets about 30% shorter.
3. **Journey/About:** remove sentences that repeat the start page. Target about 400 words (now about 500).
4. **Project pages (Talking SCADA, KTH, Wind Power):** keep all sections, but cut each section down to its main point. Target about 40% fewer words. The course reports stay.
5. **Education/course cards:** keep 3–5 short bullets per course. Remove repeated phrases across courses ("Used Talking SCADA to…").
6. **CV + PDF:** sync with the new timeline wording, then rebuild the PDF.

## How we work
I trim one page at a time. For each page you get a short before/after with word counts, so you can stop me if something important is lost. After each step: build check and a desktop + mobile check.

## Technical details
Files: `src/content/{profile,timeline,experience,cv,projects,education,course-applications}.ts`. Keep `timeline`, `experience` and `cv` in sync. Rebuild the PDF CV with Playwright after step 6.
