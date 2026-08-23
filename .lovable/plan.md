# Real photos in the timeline and project cases

Six uploaded photos become real images in the site, replacing the current "Image to be added" placeholders where they belong.

## Where each photo goes

| File | Placement |
| --- | --- |
| `Talking_systems.jpg` | Talking Systems — lead image (testbed screen with the assistant running at MITC) |
| `TALKING_SYSTEMS_BILD3.PNG` | Talking Systems — assistant interface / alarm-guide answer |
| `TALKING_SYSTEMS_BILD_4.png` | Talking Systems — concept and scenario framing slide |
| `TALKING_SYSTEMS_BILD2.jpg` | Talking Systems — demo at the smart-factory testbed |
| `tHESIS.jpg` | 48-Hour Wind Power Forecasting — thesis presentation (future work slide) |
| `Examen.jpg` | BSc / Computer Science — Intelligent Systems milestone: graduation photo, also shown on the Education page |
| `IMG_1487.jpg` | PLANE(ra)T Resande — whiteboard concept sketch of the travel-alternatives UI |
| `IMG_1491.jpg` | PLANE(ra)T Resande — paper prototypes of the booking and recommendation screens |
| `IMG_1489.jpg` | PLANE(ra)T Resande — design workshop session with the project team |

## Presentation

- Images are hosted on the CDN (no binaries added to the repo) and referenced from the existing project content model.
- A slot with a real image renders the photo inside the same framed card style used today: rounded corners, hairline night border, soft shadow, correct aspect ratio, `object-cover`, lazy loading, and a written caption underneath. Slots without a photo keep today's dashed placeholder.
- Project detail pages show the photo grid as now; the flagship Talking Systems case gets a wider lead image with the three supporting shots below it.
- The evidence drawer opened from the timeline gets the same image block, so photos are visible without leaving the Journey scroll.
- Timeline cards for Talking Systems, the thesis and the BSc milestone get a small wide thumbnail (its lead photo) above the title, tuned so it stays subtle against the aurora background and hidden on very narrow screens.
- Every image gets descriptive alt text; captions stay factual (no invented claims about what is shown).

## Technical notes

- `lovable-assets create` for each uploaded file, pointers written to `src/assets/*.asset.json`.
- `src/content/projects.ts`: extend `ImageSlot` with optional `src` and `alt`; fill the slots for `talking-systems` and `wind-power-forecasting`, drop the "images will be added" intro text where real photos now exist.
- `src/content/timeline.ts` / `src/content/education.ts`: add an optional `image` field for the BSc milestone and lead thumbnails.
- `src/components/ui-bits.tsx`: `ImageFrame` renders a real `<img>` when `src` is present, placeholder otherwise.
- `src/components/ProjectEvidenceSheet.tsx` and `src/components/Timeline.tsx`: render the image block / thumbnail.
- Verify at ~390px, ~900px and ~1440px.
