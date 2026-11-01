# Nordic role card: always show the five responsibilities, no "Read more"

- In the timeline card, hide the "Read more / Show less" button for roles marked as always open (Nordic Technical Support Expert only).
- The five responsibilities panel stays permanently visible under the card on desktop and mobile; it can no longer be collapsed.
- Other role cards keep their "Read more" exactly as today. No text changes.

## Technical details
- `src/components/Timeline.tsx` (~line 1222): skip rendering the toggle button when `entry.roleEvidenceOpenByDefault` is true.
- Ensure the panel for that role is always considered open (not only initially), so clicking another role's "Read more" does not collapse it.
- Verify in preview on desktop and mobile.
