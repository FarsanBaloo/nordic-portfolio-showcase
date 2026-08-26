import { createFileRoute } from "@tanstack/react-router";

import { Page } from "../components/site";
import {
  coreSkills,
  cvCertifications,
  cvEducation,
  cvExperience,
  cvHeader,
  cvProjects,
  cvSummary,
  strengths,
} from "../content/cv";
import { availability, profile } from "../content/profile";
import { seo } from "../lib/site";

const title = "CV — Rickard Sörlin | Product Owner, AI & Industrial Digital Platforms";
const description =
  "Full résumé of Rickard Sörlin: 25+ years in SCADA, BMS, IIoT and energy platforms, combined with applied AI, product management and requirements management. Print or save as PDF.";

export const Route = createFileRoute("/cv")({
  head: () => seo({ title, description, path: "/cv", type: "profile" }),
  component: CvPage,
});

function Heading({ children }: { children: string }) {
  return (
    <h2 className="cv-heading mt-12 border-b border-border pb-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </h2>
  );
}

function CvPage() {
  return (
    <Page>
      <div className="cv-sheet mx-auto max-w-3xl">
        <div className="cv-actions flex justify-end print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Download CV (PDF)
          </button>
        </div>

        <header className="mt-6">
          <h1 className="text-4xl font-semibold tracking-tight">{cvHeader.name}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{cvHeader.title}</p>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            {cvHeader.tagline}
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
            <li>{profile.location}</li>
            <li>
              <a className="text-primary hover:underline" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </li>
            <li>
              <a className="text-primary hover:underline" href={profile.phoneLink}>
                {profile.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                className="text-primary hover:underline"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                {profile.linkedinDisplay}
              </a>
            </li>
          </ul>
          <p className="mt-4 text-sm font-medium text-primary">{availability}</p>
        </header>

        <Heading>Profile</Heading>
        <div className="mt-4 space-y-3">
          {cvSummary.map((p) => (
            <p key={p} className="text-[15px] leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </div>

        <Heading>Key strengths</Heading>
        <ul className="mt-4 space-y-2">
          {strengths.map((s) => (
            <li key={s} className="text-[15px] leading-relaxed text-muted-foreground">
              • {s}
            </li>
          ))}
        </ul>

        <Heading>Core skills</Heading>
        <div className="mt-4 space-y-3">
          {coreSkills.map((group) => (
            <p key={group.title} className="text-[15px] leading-relaxed">
              <span className="font-semibold">{group.title}: </span>
              <span className="text-muted-foreground">{group.items.join(" · ")}</span>
            </p>
          ))}
        </div>

        <Heading>Selected AI projects</Heading>
        <div className="mt-4 space-y-6">
          {cvProjects.map((project) => (
            <section key={project.slug} className="cv-block">
              <h3 className="text-[17px] font-semibold">{project.title}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">{project.org}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                {project.body}
              </p>
              <ul className="mt-2 space-y-1.5">
                {project.bullets.map((b) => (
                  <li key={b} className="text-[15px] leading-relaxed text-muted-foreground">
                    • {b}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <Heading>Professional experience</Heading>
        <div className="mt-4 space-y-8">
          {cvExperience.map((role) => (
            <section key={role.role} className="cv-block">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-[17px] font-semibold">{role.role}</h3>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {role.period}
                </p>
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">{role.org}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                {role.summary}
              </p>
              <ul className="mt-2 space-y-1.5">
                {role.bullets.map((b) => (
                  <li key={b} className="text-[15px] leading-relaxed text-muted-foreground">
                    • {b}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <Heading>Education</Heading>
        <div className="mt-4 space-y-5">
          {cvEducation.map((entry) => (
            <section key={entry.title} className="cv-block">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-[16px] font-semibold">{entry.title}</h3>
                {entry.period ? (
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {entry.period}
                  </p>
                ) : null}
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">{entry.institution}</p>
              {entry.detail ? (
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
                  {entry.detail}
                </p>
              ) : null}
            </section>
          ))}
        </div>

        <Heading>Certifications</Heading>
        <ul className="mt-4 space-y-1.5">
          {cvCertifications.map((cert) => (
            <li key={cert.title} className="text-[15px] text-muted-foreground">
              • {cert.title} — {cert.institution}
            </li>
          ))}
        </ul>

        <Heading>Languages</Heading>
        <ul className="mt-4 space-y-1.5">
          {profile.languages.map((lang) => (
            <li key={lang.language} className="text-[15px] text-muted-foreground">
              • {lang.language} — {lang.level}
            </li>
          ))}
        </ul>
      </div>
    </Page>
  );
}
