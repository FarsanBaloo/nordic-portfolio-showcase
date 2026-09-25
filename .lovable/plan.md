# Fix small gaps found in the trimmed texts

Review after the trimming steps found four small issues. No redesign, no new sections — only targeted text fixes.

## Changes

1. **Homepage helper text (profile.ts, `heroSupporting`)**
   - Change "SCADA software that monitors and controls technical systems" to "SCADA software that monitors technical systems" — keeps the earlier decision that SCADA does not steer HVAC.

2. **CV education (cv.ts)**
   - Fix typo: "Innovation in Practise" → "Innovation in Practice".

3. **Nordic role — international environment (timeline.ts + experience.ts + cv.ts)**
   - Add a short mention of the international, English-speaking working environment to the Nordic Technical Support Expert role, in the same wording across all three files (e.g. "in an international, English-speaking environment" appended to the summary or the mentoring bullet).

4. **CV education — Scrum keyword (cv.ts)**
   - BTH course list: "Agile Process & Project Management" → "Agile Process & Project Management (Scrum)" so the keyword matches the education page.

## Verification

- Confirm build passes and `/`, `/cv` respond 200.
- Regenerate the PDF CV after the text changes.

## Not included

- No publishing, no layout changes, no new content beyond the four fixes above.
