import { createFileRoute } from "@tanstack/react-router";

import { examenPhoto } from "../assets/local-images";

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
          <SectionHeading eyebrow="Degree" title={bachelor.institution} />
          <h3 className="mt-3 text-xl font-semibold">{bachelor.formalTitle}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{bachelor.descriptor}</p>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
            {bachelor.summary}
          </p>
          <figure className="mt-8 max-w-3xl">
            <div className="overflow-hidden rounded-xl border border-border">
              <img
                src={examenPhoto.url}
                alt="Rickard Sörlin with thesis colleagues and examiners at Mälardalen University"
                loading="lazy"
                decoding="async"
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
            <figcaption className="mt-2 text-sm text-muted-foreground">
              Degree project completed — Mälardalen University
            </figcaption>
          </figure>

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
            intro={postgraduate.intro}
          />
          <div className="mt-8 space-y-6">
            {postgraduate.entries.map((entry, index) => (
              <div key={entry.id}>
                {entry.phase && entry.phase !== postgraduate.entries[index - 1]?.phase ? (
                  <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {entry.phase}
                  </p>
                ) : null}
                <article className="rounded-xl border border-border bg-card p-6 sm:p-8">
                  <Eyebrow>{entry.period}</Eyebrow>
                  <h3 className="mt-2 text-lg font-semibold">{entry.institution}</h3>
                  <p className="mt-1 text-base font-medium">
                    {entry.formalTitle ?? entry.title}
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                    {entry.body}
                  </p>
                  {"body2" in entry && entry.body2 ? (
                    <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                      {entry.body2}
                    </p>
                  ) : null}
                  {"chain" in entry && entry.chain?.length ? (
                    <ol className="mt-4 space-y-1 text-sm text-muted-foreground">
                      {entry.chain.map((step, i) => (
                        <li key={step}>
                          {i > 0 ? <span aria-hidden="true">↓ </span> : null}
                          {step}
                        </li>
                      ))}
                    </ol>
                  ) : null}

                {"projectCase" in entry && entry.projectCase ? (
                  <div className="mt-5 rounded-lg border border-border bg-secondary/40 p-5">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {entry.projectCase.period}
                    </p>
                    <h4 className="mt-1 text-sm font-semibold">{entry.projectCase.title}</h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                      {entry.projectCase.body}
                    </p>
                  </div>
                ) : null}
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
