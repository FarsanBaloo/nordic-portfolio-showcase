import { type ReactNode } from "react";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { BulletList, Callout, Eyebrow, FlowSteps, TagList } from "./ui-bits";
import type { Project } from "../content/projects";
import { projectRoleContext } from "../content/timeline";

/** A compact, self-contained render of a full case study, reused by the
 *  timeline's side sheet so opening a project never leaves the story. */
export function CaseStudyBody({
  project,
  period,
}: {
  project: Project;
  period?: string | undefined;
}) {
  const role = projectRoleContext[project.slug];

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="font-mono text-[12px] uppercase leading-relaxed tracking-[0.11em] text-aurora-teal">
          {project.type}
          {period ? (
            <span className="mt-1 block text-night-muted">{period}</span>
          ) : null}
        </p>
        <h3 className="font-display text-2xl font-semibold text-night-foreground">
          {project.title}
        </h3>
        {project.subtitle ? (
          <p className="text-[15px] text-night-body">{project.subtitle}</p>
        ) : null}
        <p className="text-[13px] text-night-muted">{project.org}</p>
        {project.highlight ? (
          <p className="border-l-2 border-aurora-teal pl-4 text-base italic leading-relaxed text-night-foreground">
            {project.highlight}
          </p>
        ) : null}
      </header>

      {role ? (
        <section className="rounded-xl border border-night-border/60 bg-white/[0.04] p-5">
          <Eyebrow>{role.label}</Eyebrow>
          <p className="mt-2 text-[15.5px] leading-relaxed text-night-body">{role.body}</p>
        </section>
      ) : null}

      <section>
        <Eyebrow>Key technologies &amp; methods</Eyebrow>
        <div className="mt-3">
          <TagList items={project.tags} night />
        </div>
      </section>

      {project.sections.map((section) => (
        <section key={section.heading} className="space-y-3">
          <h4 className="text-lg font-semibold text-night-foreground">{section.heading}</h4>
          {section.body?.map((p) => (
            <p key={p} className="text-[15.5px] leading-relaxed text-night-body">
              {p}
            </p>
          ))}
          {section.items?.length ? <BulletList items={section.items} /> : null}
          {section.quote ? (
            <blockquote className="border-l-2 border-aurora-teal pl-4 text-[15.5px] italic leading-relaxed text-night-foreground">
              {section.quote}
            </blockquote>
          ) : null}
        </section>
      ))}

      {project.flow ? <FlowSteps steps={project.flow.steps} label={project.flow.label} /> : null}

      {project.metrics?.length ? (
        <div className="rounded-xl border border-night-border/60 bg-white/[0.04] p-5">
          <Eyebrow>Results</Eyebrow>
          <dl className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <dt className="text-[11px] uppercase tracking-[0.1em] text-night-muted">
                  {m.label}
                </dt>
                <dd className="text-xl font-semibold text-night-foreground">{m.value}</dd>
                {m.note ? <dd className="text-xs text-night-muted">{m.note}</dd> : null}
              </div>
            ))}
          </dl>
        </div>
      ) : null}

      {project.reflection ? <Callout label="Reflection">{project.reflection}</Callout> : null}
      {project.contributionNote ? (
        <Callout label="My contribution">{project.contributionNote}</Callout>
      ) : null}

      {project.links?.length ? (
        <div className="space-y-2">
          <Eyebrow>Links</Eyebrow>
          <ul className="space-y-1.5 text-sm">
            {project.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-aurora-teal hover:underline"
                >
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

/** Renders `children` as the visible trigger; opening slides a right-side
 *  evidence sheet with the full case study — no route change, the timeline
 *  stays mounted and scroll position is preserved. */
export function ProjectEvidenceSheet({
  project,
  children,
  period,
}: {
  project: Project;
  children: ReactNode;
  period?: string | undefined;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        aria-describedby={undefined}
        closeLabel="Close case study"
        className="w-full overflow-y-auto border-night-border/60 p-6 sm:max-w-xl sm:p-8 lg:max-w-2xl"
        style={{ backgroundColor: "oklch(0.155 0.02 255)" }}
      >
        <SheetTitle className="sr-only">{project.title}</SheetTitle>
        <CaseStudyBody project={project} period={period} />
      </SheetContent>
    </Sheet>
  );
}
