import { Link } from "@tanstack/react-router";

import type { Project } from "../content/projects";
import { Eyebrow, TagList } from "./ui-bits";

import chipAi from "../assets/chip-ai.png";
import chipIiot from "../assets/chip-iiot.png";
import chipInnovation from "../assets/chip-innovation.png";
import chipUx from "../assets/chip-ux.png";

/* ---------- 3D chip icons (ray-traced PNGs) ---------- */

type ChipKind = "ai" | "iiot" | "innovation" | "ux";

type TypeChip = {
  label: string;
  kind: ChipKind;
  src: string;
  tone: "ai" | "neutral";
};

function typeChip(project: Project): TypeChip {
  const cats = project.categories;
  if (cats.includes("AI & Product")) {
    return { label: "AI", kind: "ai", src: chipAi, tone: "ai" };
  }
  if (cats.includes("Innovation")) {
    return { label: "Open Innovation", kind: "innovation", src: chipInnovation, tone: "neutral" };
  }
  if (cats.includes("Industry")) {
    return { label: "IIoT", kind: "iiot", src: chipIiot, tone: "neutral" };
  }
  if (cats.includes("UX & Interaction")) {
    return { label: "UX", kind: "ux", src: chipUx, tone: "neutral" };
  }
  return { label: "Research", kind: "innovation", src: chipInnovation, tone: "neutral" };
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
        <span className="relative inline-flex shrink-0 items-center">
          {/* aurora bloom behind AI chip */}
          {isAi ? (
            <span
              aria-hidden="true"
              className="absolute -inset-3 rounded-full bg-[radial-gradient(closest-side,var(--aurora-green)_0%,var(--aurora-violet)_45%,transparent_75%)] opacity-40 blur-lg"
            />
          ) : null}
          <span
            className={
              isAi
                ? "relative inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/15 px-2.5 py-1.5 text-[11px] font-semibold text-primary"
                : "relative inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1.5 text-[11px] font-semibold text-muted-foreground"
            }
            title={`${chip.label} project`}
            aria-label={`${chip.label} project`}
          >
            <img
              src={chip.src}
              alt=""
              aria-hidden="true"
              width={816}
              height={816}
              className="h-6 w-6 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.55)]"
            />
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
