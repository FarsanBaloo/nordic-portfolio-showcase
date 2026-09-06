import { createFileRoute, redirect } from "@tanstack/react-router";

/** The journey is now the landing page. Old links and shares keep working. */
export const Route = createFileRoute("/journey")({
  beforeLoad: () => {
    throw redirect({ to: "/", replace: true });
  },
});
