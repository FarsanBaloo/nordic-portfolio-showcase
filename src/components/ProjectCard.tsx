import { Link } from "@tanstack/react-router";
import {
  Sparkles,
  Cpu,
  Lightbulb,
  MousePointerClick,
  BookOpen,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { Project } from "../content/projects";
import { Eyebrow, TagList } from "./ui-bits";

type TypeChip = {
  label: string;
  icon: LucideIcon;
  tone: "ai" | "neutral";
};

/**
 * Pick one short, recruiter-readable type label per project.
 * AI work is highlighted with the accent tone; everything else uses a
 * muted neutral chip so the AI projects still stand out.
 */
function typeChip(project: Project): TypeChip {
  const cats = project.categories;
  if (cats.includes("AI & Product")) {
    return { label: "AI", icon: Sparkles, tone: "ai" };
  }
  if (cats.includes("Innovation")) {
    return { label: "Open Innovation", icon: Lightbulb, tone: "neutral" };
  }
  if (cats.includes("Industry")) {
    return { label: "IIoT", icon: Cpu, tone: "neutral" };
  }
  if (cats.includes("UX & Interaction")) {
    return { label: "UX", icon: MousePointerClick, tone: "neutral" };
  }
  return { label: "Research", icon: BookOpen, tone: "neutral" };
}

export function ProjectCard({ project }: { project: Project }) {
  const lead = project.images?.slots.find((slot) => slot.lead && slot.src) ??
    project.images?.slots.find((slot) => slot.src);
  const chip = typeChip(project);
  const Icon = chip.icon;
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
        <span
          className={
            chip.tone === "ai"
              ? "inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary"
              : "inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground"
          }
          title={`${chip.label} project`}
          aria-label={`${chip.label} project`}
        >
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          {chip.label}
        </span>
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
