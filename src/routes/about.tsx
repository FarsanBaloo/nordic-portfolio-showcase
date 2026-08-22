import { createFileRoute } from "@tanstack/react-router";

import { NightHero, Page, PortraitFrame, Section } from "../components/site";
import { BulletList, Callout, SectionHeading, TagList } from "../components/ui-bits";
import { mainCapabilities } from "../content/capabilities";
import { aboutParagraphs, productPhilosophy, profile, whatIBring } from "../content/profile";

const title = "About Rickard Sörlin — Industrial Platforms, Product & AI";
const description =
  "25+ years close to customers, industrial systems and digital platforms — now focused on AI-enabled products, offer management and product ownership.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <NightHero eyebrow="About" title="Understanding the real problem" intro={profile.positioning}>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-md bg-aurora-teal px-5 py-2.5 text-sm font-medium text-night transition-opacity hover:opacity-90"
            >
              Get in touch
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-night-border px-5 py-2.5 text-sm font-medium text-night-foreground transition-colors hover:bg-white/10"
            >
              LinkedIn
            </a>
          </div>
          <PortraitFrame className="w-28 sm:w-32" />
        </div>
      </NightHero>
      <Page>
        <Section>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div className="space-y-4">
              {aboutParagraphs.map((p) => (
                <p key={p} className="text-[15px] leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
              <Callout label="Product philosophy">{productPhilosophy}</Callout>
            </div>
            <div className="space-y-4">
              {whatIBring.map((item) => (
                <div key={item.title} className="rounded-lg border border-border bg-card p-5">
                  <h2 className="text-sm font-semibold">{item.title}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section>
          <SectionHeading eyebrow="In short" title="Profile summary" />
          <div className="mt-6 max-w-3xl">
            <BulletList items={profile.summary} />
          </div>
        </Section>

        <Section>
          <SectionHeading eyebrow="Focus" title="Target roles and core areas" />
          <div className="mt-6">
            <TagList items={profile.targetRoles} />
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {mainCapabilities.map((group) => (
              <div key={group.title} className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-base font-semibold">{group.title}</h2>
                <div className="mt-4">
                  <TagList items={group.items} />
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <SectionHeading eyebrow="Languages" title="Working languages" />
          <ul className="mt-6 flex flex-wrap gap-4">
            {profile.languages.map((lang) => (
              <li key={lang.language} className="rounded-xl border border-border bg-card px-6 py-4">
                <p className="text-sm font-semibold">{lang.language}</p>
                <p className="text-sm text-muted-foreground">{lang.level}</p>
              </li>
            ))}
          </ul>
        </Section>
      </Page>
    </>
  );
}
