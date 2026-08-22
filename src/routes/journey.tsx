import { createFileRoute } from "@tanstack/react-router";

import { ExperienceCard } from "../components/ExperienceCard";
import { NightHero, Page } from "../components/site";
import { Timeline } from "../components/Timeline";
import { SectionHeading, TagList } from "../components/ui-bits";
import { offerRelevance, roles } from "../content/experience";
import { journeyIntro } from "../content/profile";

const title = "Journey — Rickard Sörlin";
const description =
  "From customer-facing engineering and national platform expertise to senior technical advisory and AI-enabled product work: the full career timeline.";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/journey" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/journey" }],
  }),
  component: JourneyPage,
});

function JourneyPage() {
  return (
    <>
      <NightHero
        eyebrow="The journey"
        title="A continuous line from industrial reality to product and AI"
        intro={journeyIntro[0] ?? ""}
      />

      <section className="relative overflow-hidden night-panel">
        <div className="relative mx-auto max-w-6xl px-5 py-20">
          <div className="max-w-3xl space-y-4">
            {journeyIntro.slice(1).map((p) => (
              <p key={p} className="text-[15px] leading-relaxed text-night-muted">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-16">
            <Timeline />
          </div>
        </div>
      </section>

      <Page>
        <SectionHeading
          eyebrow="Experience in depth"
          title="Roles, responsibilities and progression"
          intro="Each role expands into responsibilities, environments, stakeholders and lifecycle context."
        />
        <div className="mt-8 space-y-6">
          {roles.map((role) => (
            <ExperienceCard key={role.id} role={role} />
          ))}
        </div>
        <div className="mt-8 rounded-xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-lg font-semibold">{offerRelevance.title}</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
            {offerRelevance.body}
          </p>
          <div className="mt-5">
            <TagList items={offerRelevance.items} />
          </div>
        </div>
      </Page>
    </>
  );
}
