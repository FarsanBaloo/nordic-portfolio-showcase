import { createFileRoute } from "@tanstack/react-router";

import { NightHero, Page, Section } from "../components/site";
import { BulletList, SectionHeading, TagList } from "../components/ui-bits";
import { mainCapabilities } from "../content/capabilities";
import {
  aboutParagraphs,
  availability,
  productPhilosophy,
  profile,
  whatIBring,
} from "../content/profile";

import { seo } from "../lib/site";

const title = "About Rickard Sörlin — Industrial Platforms, Product & AI";
const description =
  "25+ years close to customers, industrial systems and digital platforms — now focused on AI-enabled products, offer management and product ownership.";

export const Route = createFileRoute("/about")({
  head: () => seo({ title, description, path: "/about", type: "profile" }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <NightHero eyebrow="About" title="Profile summary" intro={profile.positioning}>
        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-aurora-teal/40 bg-aurora-teal/10 px-3.5 py-1.5 text-sm text-night-foreground">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-aurora-teal" />
          {availability}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-md bg-aurora-teal px-5 py-2.5 text-sm font-medium text-night transition-opacity hover:opacity-90"
          >
            Get in touch
          </a>
          <a
            href="/assets/rickard-sorlin-cv.pdf"
            download
            className="rounded-md border border-night-border px-5 py-2.5 text-sm font-medium text-night-foreground transition-colors hover:bg-white/10"
          >
            Download CV (PDF)
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
      </NightHero>
      <Page>
        <Section>
          <div className="max-w-3xl">
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
