/** Local, self-hosted image pointers.
 *  The real binaries live in `public/assets/`, so the production build has no
 *  runtime dependency on any external asset CDN. */
const localAsset = (filename: string) => ({ url: `/assets/${filename}` });

export const examenPhoto = localAsset("examen.jpg");
export const rickardPortrait = localAsset("rickard-portrait.png");
export const talkingSystemsTestbed = localAsset("talking-systems-testbed.jpg");
export const talkingSystemsUi = localAsset("talking-systems-ui.png");
export const talkingSystemsConcept = localAsset("talking-systems-concept.png");
export const talkingSystemsDemo = localAsset("talking-systems-demo.jpg");
export const thesisPresentation = localAsset("thesis-presentation.jpg");
export const planetWhiteboard = localAsset("planet-whiteboard.jpg");
export const planetPaperPrototypes = localAsset("planet-paper-prototypes.jpg");
export const planetWorkshop = localAsset("planet-workshop.jpg");
export const hallbarHalsaDashboard = localAsset("hallbar-halsa-dashboard.png");
export const hallbarHalsaOnboarding = localAsset("hallbar-halsa-onboarding.png");
export const hallbarHalsaFlow = localAsset("hallbar-halsa-flow.png");
