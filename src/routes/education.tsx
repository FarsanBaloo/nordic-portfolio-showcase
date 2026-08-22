import { createFileRoute } from "@tanstack/react-router";

import { NightHero, Page, Section } from "../components/site";
import { Callout, Eyebrow, SectionHeading, TagList } from "../components/ui-bits";
import { capabilityNote, fullCapabilityMap } from "../content/capabilities";
import { bachelor, certifications, earlierFoundation, postgraduate } from "../content/education";

const title = "Education & Capabilities — Rickard Sörlin";
const description =
  "BSc in Computer Science (Intelligent Systems), interaction design, industrial AI and postgraduate studies in product, requirements and innovation management.";

export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/education" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/education" }],
  }),
  component: EducationPage,
});

function EducationPage() {
  return (
    <>
      <NightHero
        eyebrow="Education"
        title="Formal depth built deliberately on top of practice"
        intro={bachelor.summary}
      />
      <Page>
        <Section>
          <SectionHeading eyebrow="Degree" title={bachelor.title} intro={bachelor.specialisation} />
          <p className="mt-3 text-sm text-muted-foreground">{bachelor.institution}</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {bachelor.coursework.map((group) => (
              <div key={group.title} className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-base font-semibold">{group.title}</h3>
                <div className="mt-4">
                  <TagList items={group.items} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm italic text-muted-foreground">{bachelor.note}</p>
        </Section>

        <Section>
          <SectionHeading
            eyebrow="Postgraduate development"
            title={postgraduate.title}
            intro={postgraduate.summary}
          />
          <div className="mt-8 space-y-6">
            {postgraduate.entries.map((entry) => (
              <article key={entry.id} className="rounded-xl border border-border bg-card p-6 sm:p-8">
                <Eyebrow>{entry.period}</Eyebrow>
                <h3 className="mt-2 text-xl font-semibold">{entry.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {entry.institution}
                  {entry.subtitle ? ` · ${entry.subtitle}` : ""}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                  {entry.body}
                </p>
                {entry.topics.length ? (
                  <div className="mt-5">
                    <TagList items={entry.topics} />
                  </div>
                ) : null}
                {"groups" in entry && entry.groups?.length ? (
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    {entry.groups.map((group) => (
                      <div key={group.title}>
                        <h4 className="text-sm font-semibold">{group.title}</h4>
                        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                          {group.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : null}
                {entry.relevance.length ? (
                  <div className="mt-6">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Product relevance
                    </p>
                    <div className="mt-3">
                      <TagList items={entry.relevance} />
                    </div>
                  </div>
                ) : null}
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {postgraduate.otherStudies.map((study) => (
              <div key={study.title} className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-base font-semibold">{study.title}</h3>
                <div className="mt-4">
                  <TagList items={study.tags} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm italic text-muted-foreground">
            {postgraduate.otherStudiesNote}
          </p>
        </Section>

        <Section>
          <SectionHeading eyebrow="Certifications" title="Additional programmes" />
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {certifications.map((cert) => (
              <li key={cert.title} className="rounded-xl border border-border bg-card p-6">
                <p className="text-sm font-semibold">{cert.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{cert.institution}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section>
          <SectionHeading eyebrow="Foundation" title={earlierFoundation.title} />
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {earlierFoundation.items.map((item) => (
              <li key={item.title} className="rounded-xl border border-border bg-card p-6">
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.institution}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section>
          <SectionHeading eyebrow="Capability map" title="Full capability overview" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {fullCapabilityMap.map((group) => (
              <div key={group.title} className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-base font-semibold">{group.title}</h3>
                <div className="mt-4">
                  <TagList items={group.items} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Callout>{capabilityNote}</Callout>
          </div>
        </Section>
      </Page>
    </>
  );
}
