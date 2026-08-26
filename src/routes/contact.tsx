import { createFileRoute } from "@tanstack/react-router";

import { NightHero, Page } from "../components/site";
import { TagList } from "../components/ui-bits";
import { availability, contactIntro, profile } from "../content/profile";
import { seo } from "../lib/site";

const title = "Contact Rickard Sörlin";
const description =
  "Get in touch about AI product management, product ownership, offer management and industrial B2B digital platform roles.";

export const Route = createFileRoute("/contact")({
  head: () => seo({ title, description, path: "/contact" }),
  component: ContactPage,
});

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Phone", value: profile.phoneDisplay, href: profile.phoneLink },
  { label: "LinkedIn", value: profile.linkedinDisplay, href: profile.linkedin },
];

function ContactPage() {
  return (
    <>
      <NightHero eyebrow="Contact" title="Let's talk" intro={contactIntro}>
        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-aurora-teal/40 bg-aurora-teal/10 px-3.5 py-1.5 text-sm text-night-foreground">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-aurora-teal" />
          {availability}
        </p>
      </NightHero>

      <Page>
        <div className="grid gap-4 sm:grid-cols-3">
          {channels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              {...(channel.label === "LinkedIn"
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {channel.label}
              </p>
              <p className="mt-2 text-[15px] font-medium">{channel.value}</p>
            </a>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-lg font-semibold">Roles of interest</h2>
          <div className="mt-4">
            <TagList items={profile.targetRoles} />
          </div>
          <p className="mt-6 text-sm text-muted-foreground">Based in {profile.location}.</p>
        </div>
      </Page>
    </>
  );
}
