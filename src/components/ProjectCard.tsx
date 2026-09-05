import { Link } from "@tanstack/react-router";

import type { Project } from "../content/projects";
import { Eyebrow, TagList } from "./ui-bits";

/* ---------- 3D chip icons ---------- */

type ChipKind = "ai" | "iiot" | "innovation" | "ux";

type TypeChip = {
  label: string;
  kind: ChipKind;
  tone: "ai" | "neutral";
};

function typeChip(project: Project): TypeChip {
  const cats = project.categories;
  if (cats.includes("AI & Product")) {
    return { label: "AI", kind: "ai", tone: "ai" };
  }
  if (cats.includes("Innovation")) {
    return { label: "Open Innovation", kind: "innovation", tone: "neutral" };
  }
  if (cats.includes("Industry")) {
    return { label: "IIoT", kind: "iiot", tone: "neutral" };
  }
  if (cats.includes("UX & Interaction")) {
    return { label: "UX", kind: "ux", tone: "neutral" };
  }
  return { label: "Research", kind: "innovation", tone: "neutral" };
}

/** Dimensional icon — filled gradient body, specular highlight, soft edge. */
function ChipIcon({ kind }: { kind: ChipKind }) {
  if (kind === "ai") {
    return (
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        aria-hidden="true"
        className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
      >
        <defs>
          <linearGradient id="chip-ai-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--aurora-green)" />
            <stop offset="0.5" stopColor="var(--aurora-violet)" />
            <stop offset="1" stopColor="var(--aurora-magenta-hex)" />
          </linearGradient>
        </defs>
        <path
          d="M12 2 14.1 9.9 22 12 14.1 14.1 12 22 9.9 14.1 2 12 9.9 9.9Z"
          fill="url(#chip-ai-grad)"
          stroke="white"
          strokeOpacity="0.55"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        <ellipse cx="9.4" cy="9.2" rx="1.7" ry="1" fill="white" opacity="0.75" />
      </svg>
    );
  }

  // neutral slate gradient, shared by IIoT / Innovation / UX
  const grad = (
    <defs>
      <linearGradient id="chip-neutral-grad" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#e2e8f0" />
        <stop offset="1" stopColor="#64748b" />
      </linearGradient>
    </defs>
  );
  const stroke = { stroke: "white", strokeOpacity: 0.35, strokeWidth: 0.7, strokeLinejoin: "round" as const };

  if (kind === "iiot") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true" className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
        {grad}
        <rect x="6" y="6" width="12" height="12" rx="3" fill="url(#chip-neutral-grad)" {...stroke} />
        <rect x="9.6" y="9.6" width="4.8" height="4.8" rx="1.2" fill="white" fillOpacity="0.5" />
        <ellipse cx="8.6" cy="8.6" rx="1.3" ry="0.8" fill="white" opacity="0.65" />
      </svg>
    );
  }
  if (kind === "innovation") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true" className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
        {grad}
        <path
          d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.8 10.6c.7.6 1.1 1.4 1.3 2.4h5c.2-1 .6-1.8 1.3-2.4A6 6 0 0 0 12 3Z"
          fill="url(#chip-neutral-grad)"
          {...stroke}
        />
        <ellipse cx="9.8" cy="8" rx="1.4" ry="0.9" fill="white" opacity="0.6" />
      </svg>
    );
  }
  // ux — cursor
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true" className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
      {grad}
      <path d="M5 3 18.5 11.8 12 13.8 10 21 5 3Z" fill="url(#chip-neutral-grad)" {...stroke} />
      <ellipse cx="7.4" cy="6" rx="1.3" ry="0.8" fill="white" opacity="0.6" />
    </svg>
  );
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
              className="absolute -inset-2 rounded-full bg-[radial-gradient(closest-side,var(--aurora-green)_0%,transparent_70%)] opacity-30 blur-md"
            />
          ) : null}
          <span
            className={
              isAi
                ? "relative inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/15 px-3 py-1.5 text-[11px] font-semibold text-primary"
                : "relative inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1.5 text-[11px] font-semibold text-muted-foreground"
            }
            title={`${chip.label} project`}
            aria-label={`${chip.label} project`}
          >
            <ChipIcon kind={chip.kind} />
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
