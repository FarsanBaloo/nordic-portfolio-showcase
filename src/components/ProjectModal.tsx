import { type ReactNode } from "react";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { BulletList, Callout, Eyebrow, FlowSteps, TagList } from "./ui-bits";
import type { Project } from "../content/projects";

/** A compact, self-contained render of a full case study, reused by the
 *  timeline's in-place modal so clicking a project never leaves the
 *  timeline view. */
function CaseStudyBody({ project }: { project: Project }) {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-aurora-teal">
          {project.meta} · {project.type}
        </p>
        <h3 className="text-2xl font-semibold text-night-foreground">{project.title}</h3>
        {project.subtitle ? (
          <p className="text-sm text-night-muted">{project.subtitle}</p>
        ) : null}
        <p className="text-xs text-night-muted">{project.org}</p>
        {project.highlight ? (
          <p className="border-l-2 border-aurora-teal pl-4 text-base italic leading-relaxed text-night-foreground">
            {project.highlight}
          </p>
        ) : null}
        <div className="pt-1">
          <TagList items={project.tags} night />
        </div>
      </header>

      {project.sections.map((section) => (
        <section key={section.heading} className="space-y-3">
          <h4 className="text-lg font-semibold text-night-foreground">{section.heading}</h4>
          {section.body?.map((p) => (
            <p key={p} className="text-[15px] leading-relaxed text-night-muted">
              {p}
            </p>
          ))}
          {section.items?.length ? <BulletList items={section.items} /> : null}
          {section.quote ? (
            <blockquote className="border-l-2 border-aurora-teal pl-4 text-[15px] italic leading-relaxed text-night-foreground">
              {section.quote}
            </blockquote>
          ) : null}
        </section>
      ))}

      {project.flow ? <FlowSteps steps={project.flow.steps} label={project.flow.label} /> : null}

      {project.metrics?.length ? (
        <div className="rounded-xl border border-night-border/60 bg-white/[0.03] p-5">
          <Eyebrow>Results</Eyebrow>
          <dl className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <dt className="text-[11px] uppercase tracking-wide text-night-muted">{m.label}</dt>
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

/** Renders `children` as the visible card; clicking it opens a scrollable
 *  overlay with the full case study — no route change, the timeline stays
 *  mounted and scroll position is preserved. */
export function ProjectModal({
  slug,
  project,
  children,
}: {
  slug: string;
  project: Project;
  children: ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="night-surface max-h-[88vh] w-[calc(100vw-2rem)] max-w-2xl overflow-y-auto border-night-border/60 p-6 sm:p-8"
      >
        <DialogTitle className="sr-only">{project.title}</DialogTitle>
        <CaseStudyBody project={project} />
        <p className="border-t border-night-border/50 pt-4 text-[11px] text-night-muted">
          Showing case study for <span className="text-aurora-teal">{slug}</span> — press Esc or
          click outside to return to the timeline.
        </p>
      </DialogContent>
    </Dialog>
  );
}
