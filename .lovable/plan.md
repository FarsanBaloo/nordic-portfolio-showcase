# KTH Live-In Lab — reframe as an open innovation platform

The case currently reads as a generic "applied research collaboration". Public information about the centre confirms it is an open innovation platform: a research centre at KTH with five centre members — KTH, Einar Mattsson, Akademiska Hus, Schneider Electric and Bengt Dahlgren — plus multiple project partners in cross-disciplinary R&D projects with KTH researchers and other universities [1](https://www.liveinlab.kth.se/en/om-kth-live-in-lab/centrum-och-projektpartners-1.965775). It offers full-scale testbeds (apartments and adaptable, scalable infrastructure) in a real residential environment, a user/property database and a datapool, and runs projects through a defined initiation-to-evaluation process [2](https://www.liveinlab.kth.se/en/samverkan/projektprocess-pa-kth-live-in-lab-1.1064763) [4](https://www.liveinlab.kth.se/en/om-kth-live-in-lab/vara-vardeerbjudanden-1.894654).

## Changes

1. Name and framing
   - Use the correct name "KTH Live-In Lab" as the project title; subtitle becomes "Open innovation platform for smart buildings and energy".
   - Type changes from "Applied Research Collaboration" to "Open Innovation Collaboration"; keep the existing categories so the Projects-page type chip still resolves (Innovation stays).

2. Context section — rewrite to describe what the platform actually is: a KTH research centre and open innovation platform where industry partners, KTH researchers and other universities collaborate around full-scale testbeds in real residential buildings, with shared data and a structured project process. Keep the existing fact that testbed environments were connected to Schneider Electric's EcoStruxure IoT / digital-building platform.

3. Contribution — keep every existing bullet (all factual), and make the open-innovation nature explicit: represented Schneider Electric as one of the centre's industry members, acted as subject matter expert for Schneider Electric's digital building-management platform and its ecosystem, supported KTH researchers with technical questions and with the engineering parts needed for their research on sustainable buildings and energy efficiency, and worked in cross-disciplinary constellations with KTH researchers and other partner companies.

4. Product / innovation perspective — keep the existing two paragraphs, and add one sentence on what open innovation meant in practice: value came from combining several organisations' capabilities around a shared testbed, so ideas were assessed against both research ambition and what deployed industrial platforms can actually support.

5. Teaser and tags — teaser mentions the open innovation platform; add tags "Open Innovation" and "Industry-Academia Collaboration".

6. Links — keep the start-page link and add the centre/project partners page.

Not changed: employer, job title, dates, the contribution note about the formal Senior Technical Advisor role, images, flow diagram, timeline entry structure. No new claims about my personal ownership or outcomes.

## Technical

- Single file: `src/content/projects.ts` (the `kth-living-lab` entry). Slug stays the same so existing links and the sitemap keep working.
- Check the timeline card text in `src/content/timeline.ts` mentions the same framing; adjust only wording if it conflicts.
- Verify: typecheck, build, and 200 responses for `/projects` and `/projects/kth-living-lab`.
