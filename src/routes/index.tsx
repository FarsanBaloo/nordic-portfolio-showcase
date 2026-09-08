import { createFileRoute, Link } from "@tanstack/react-router";

import { LinkedinIcon } from "../components/brand-icons";
import { PortraitFrame } from "../components/site";
import { Timeline } from "../components/Timeline";
import {
  availability,
  careerLens,
  journeyNarrative,
  profile,
} from "../content/profile";
import { sortedProjects } from "../content/projects";
import { seo } from "../lib/site";


const title = "Rickard Sörlin — AI Product Manager, from Control Cabinets to AI Products";
const description =
  "The story of 25 years next to the customers who run SCADA, IoT and mission-critical operations — and how it became a career in AI-enabled products.";


export const Route = createFileRoute("/")({
  head: () => ({
    ...seo({ title, description, path: "/", type: "profile" }),
    scripts: [

      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: profile.descriptor,
          email: `mailto:${profile.email}`,
          telephone: "+46730795308",
          address: { "@type": "PostalAddress", addressLocality: "Stockholm", addressCountry: "SE" },
          sameAs: [profile.linkedin, profile.github],
          description: profile.positioning,
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="relative overflow-hidden night-panel">
        {/* soft local readability veil so hero copy stays legible over the aurora */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 lg:hidden"
          style={{
            background:
              "radial-gradient(120% 70% at 30% 40%, rgba(2,4,7,0.82) 0%, rgba(2,4,7,0.55) 45%, transparent 80%)",
          }}
        />
        <div className="relative mx-auto max-w-[1280px] px-5 py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[1.7fr_0.9fr] lg:items-start">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-aurora-teal">
            {profile.location}
          </p>
          <h1 className="mt-4 text-balance-tight text-5xl font-semibold text-night-foreground sm:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-3 text-lg text-night-foreground/90">{profile.descriptor}</p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-aurora-teal/40 bg-aurora-teal/10 px-3.5 py-1.5 text-sm text-night-foreground">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-aurora-teal" />
            {availability}
          </p>

          <p className="mt-8 max-w-3xl rounded-lg border border-aurora-teal/30 bg-aurora-teal/5 px-4 py-3 text-[15px] leading-relaxed text-night-foreground">
            {profile.bridge}
          </p>

          <ul className="mt-8 max-w-3xl space-y-2.5">
            {profile.heroProof.map((item) => (
              <li key={item.label} className="flex gap-3 text-[15px] leading-relaxed text-night-body">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-aurora-teal" />
                <span>
                  <span className="font-semibold text-night-foreground">{item.label}</span>
                  {" — "}
                  {item.body}
                </span>
              </li>
            ))}
          </ul>


          <ol className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-2">
            {profile.progression.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span className="rounded-md border border-night-border bg-white/5 px-3 py-1.5 text-sm text-night-foreground">
                  {step}
                </span>
                {i < profile.progression.length - 1 ? (
                  <span aria-hidden="true" className="text-aurora-teal">
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="rounded-md bg-aurora-teal px-5 py-2.5 text-sm font-medium text-night transition-opacity hover:opacity-90"
            >
              View selected projects
            </Link>
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
              className="inline-flex items-center gap-2 rounded-md border border-night-border px-5 py-2.5 text-sm font-medium text-night-foreground transition-colors hover:bg-white/10"
            >
              <LinkedinIcon />
              Connect on LinkedIn
            </a>
          </div>
        </div>
        <PortraitFrame className="mx-auto w-full max-w-[300px] lg:sticky lg:top-24" />
        </div>
        </div>
      </section>

      <section className="relative overflow-hidden night-panel">
        <div className="relative mx-auto max-w-[1280px] px-5 py-20 sm:py-24">
          <div className="mx-auto max-w-[880px]">
            <p className="text-center font-mono text-[12px] uppercase tracking-[0.11em] text-aurora-teal">
              The journey
            </p>
            <h2 className="mx-auto mt-4 max-w-3xl text-balance-tight text-center text-4xl font-semibold text-night-foreground sm:text-[44px]">
              From control cabinets to AI products
            </h2>

            <div className="mt-12 space-y-5">
              <p className="text-[17.5px] font-semibold leading-[1.7] text-night-foreground">
                {journeyNarrative.lead}
              </p>
              {journeyNarrative.paragraphs.map((p) => (
                <p key={p} className="text-[17px] leading-[1.7] text-night-body">
                  {p}
                </p>
              ))}
              <p className="text-[17.5px] font-semibold leading-[1.7] text-night-foreground">
                {journeyNarrative.emphasis}
              </p>
            </div>

            <div className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {careerLens.map((group) => (
                <section key={group.title}>
                  <h3 className="font-mono text-[12px] uppercase tracking-[0.11em] text-aurora-teal">
                    {group.title}
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-night-border px-3 py-1 text-[13px] text-night-body"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-[1560px] px-5 py-16 sm:py-20 min-[1100px]:px-[clamp(24px,4vw,72px)]">
          <Timeline />
        </div>
      </section>

      <section className="relative overflow-hidden night-panel">
        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <h2 className="text-3xl font-semibold text-night-foreground">
            Where the story continues
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-night-muted">
            Each chapter has its own case study — discovery, decisions and what it changed for
            the people who use the result.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="rounded-md bg-aurora-teal px-5 py-2.5 text-sm font-medium text-night transition-opacity hover:opacity-90"
            >
              See all {sortedProjects.length} projects
            </Link>
            <Link
              to="/contact"
              className="rounded-md border border-night-border px-5 py-2.5 text-sm font-medium text-night-foreground transition-colors hover:bg-white/10"
            >
              Get in touch
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <li>
              <a className="text-aurora-teal hover:underline" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </li>
            <li>
              <a className="text-aurora-teal hover:underline" href={profile.phoneLink}>
                {profile.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
