import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

import type { Project } from "../content/projects";
import { Eyebrow, TagList } from "./ui-bits";

export function ProjectCard({ project }: { project: Project }) {
  const lead = project.images?.slots.find((slot) => slot.lead && slot.src) ??
    project.images?.slots.find((slot) => slot.src);
  const isAi = project.categories.includes("AI & Product");
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
      {lead?.src ? (
        <img
          src={lead.src}
          alt={lead.alt ?? `${project.title} project image`}
          loading="lazy"
          className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      ) : null}
      <div className="flex flex-1 flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <Eyebrow>{project.type}</Eyebrow>
        {isAi ? (
          <span
            className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary"
            title="AI project"
            aria-label="AI project"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            AI
          </span>
        ) : null}
      </div>
      <h3 className="mt-3 text-xl font-semibold">
        <Link
          to="/projects/$slug"
          params={{ slug: project.slug }}
          className="after:absolute after:inset-0 group-hover:text-primary"
        >
          {project.title}
        </Link>
      </h3>
      {project.subtitle ? (
        <p className="mt-1 text-sm text-muted-foreground">{project.subtitle}</p>
      ) : null}
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        {project.org} · {project.meta}
      </p>
      <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted-foreground">
        {project.teaser}
      </p>
      <div className="mt-5">
        <TagList items={project.tags.slice(0, 5)} />
      </div>
      <p className="mt-5 text-sm font-medium text-primary">Read the case study →</p>
      </div>
    </article>
  );
}
