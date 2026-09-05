import { Link } from "@tanstack/react-router";

import type { Project } from "../content/projects";
import { Eyebrow, TagList } from "./ui-bits";

/* ---------- type chips (text-only, 3D metallic lettering) ---------- */

type TypeChip = {
  label: string;
  tone: "ai" | "neutral";
};

function typeChip(project: Project): TypeChip {
  const cats = project.categories;
  if (cats.includes("AI & Product")) return { label: "AI", tone: "ai" };
  if (cats.includes("Innovation")) return { label: "Open Innovation", tone: "neutral" };
  if (cats.includes("Industry")) return { label: "IIoT", tone: "neutral" };
  if (cats.includes("UX & Interaction")) return { label: "UX", tone: "neutral" };
  return { label: "Research", tone: "neutral" };
}

/* ---------- card ---------- */

export function ProjectCard({ project }: { project: Project }) {
  const lead = project.images?.slots.find((slot) => slot.lead && slot.src) ??
    project.images?.slots.find((slot) => slot.src);
  const chip = typeChip(project);
  const isAi = chip.tone === "ai";
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
          className="relative inline-flex shrink-0 items-center rounded-full border px-3 py-1.5"
          style={
            isAi
              ? {
                  borderColor: "color-mix(in oklab, var(--aurora-violet) 55%, transparent)",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.02) 45%, rgba(0,0,0,0.25))",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 2px rgba(0,0,0,0.4), 0 0 18px color-mix(in oklab, var(--aurora-green) 35%, transparent), 0 2px 10px rgba(0,0,0,0.45)",
                }
              : {
                  borderColor: "color-mix(in oklab, var(--foreground) 18%, transparent)",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.03) 45%, rgba(0,0,0,0.28))",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 2px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.35)",
                }
          }
          title={`${chip.label} project`}
          aria-label={`${chip.label} project`}
        >
          <span
            className="text-[11px] font-extrabold uppercase tracking-[0.14em]"
            style={
              isAi
                ? {
                    backgroundImage:
                      "linear-gradient(105deg, var(--aurora-green) 0%, #9ff5d2 22%, var(--aurora-violet) 48%, #e9d5ff 62%, var(--aurora-magenta, #f0a) 82%, #ffffff 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    filter:
                      "drop-shadow(0 1px 0 rgba(255,255,255,0.45)) drop-shadow(0 2px 3px rgba(0,0,0,0.6)) drop-shadow(0 0 8px color-mix(in oklab, var(--aurora-green) 45%, transparent))",
                  }
                : {
                    backgroundImage:
                      "linear-gradient(180deg, #f4f6f8 0%, #cdd3da 28%, #8f99a6 50%, #e7ecf1 62%, #6b7480 82%, #b8c0ca 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    filter:
                      "drop-shadow(0 1px 0 rgba(255,255,255,0.4)) drop-shadow(0 2px 3px rgba(0,0,0,0.65))",
                  }
            }
          >
            {chip.label}
          </span>
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
