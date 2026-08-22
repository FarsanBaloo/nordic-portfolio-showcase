import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { roles } from "../content/experience";
import { getProject } from "../content/projects";
import { milestones, type TimelineBranch, type TimelineMilestone } from "../content/timeline";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  return reduced;
}

type Status = "upcoming" | "active" | "completed";

/** What the floating window shows. */
type Panel =
  | { kind: "project"; slug: string }
  | { kind: "role"; roleId: string }
  | { kind: "group"; roleId: string; group: string };

type Row =
  | { kind: "milestone"; key: string; entry: TimelineMilestone; roleId?: string | undefined }
  | {
      kind: "point";
      key: string;
      label: string;
      side: "left" | "right";
      panel: Panel;
      variant: "role" | "project";
    };

const roleIdFor: Record<string, string | undefined> = {
  "project-engineer": "project-engineer",
  "national-expert": "support-engineer",
  "senior-advisor": "senior-technical-advisor",
};

function buildRows(): Row[] {
  const rows: Row[] = [];
  for (const entry of milestones) {
    const roleId = roleIdFor[entry.id];
    rows.push({ kind: "milestone", key: entry.id, entry, roleId });


    for (const branch of entry.branches ?? []) {
      rows.push({
        kind: "point",
        key: `${entry.id}-${branch.label}`,
        label: branch.label,
        side: entry.side,
        panel: branch.slug
          ? { kind: "project", slug: branch.slug }
          : { kind: "project", slug: "" },
        variant: "project",
      });
    }
  }
  return rows;
}

/** Scroll-linked progress measured against the timeline section itself. */
function useTimelineScroll(count: number, reduced: boolean) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<(HTMLElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [statuses, setStatuses] = useState<Status[]>(() =>
    Array.from({ length: count }, () => "upcoming" as Status),
  );

  useEffect(() => {
    if (reduced) {
      setProgress(1);
      setStatuses(Array.from({ length: count }, () => "completed" as Status));
      return;
    }

    let frame = 0;
    let prev: Status[] = [];

    const measure = () => {
      frame = 0;
      const rail = railRef.current;
      if (!rail) return;

      const rect = rail.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const anchor = vh * 0.5;
      const raw = (anchor - rect.top) / Math.max(rect.height, 1);
      setProgress(Math.min(1, Math.max(0, raw)));

      const next: Status[] = nodeRefs.current.map((el) => {
        if (!el) return "upcoming";
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        if (center < vh * 0.42) return "completed";
        if (center <= vh * 0.6) return "active";
        return "upcoming";
      });
      if (next.length !== prev.length || next.some((s, i) => s !== prev[i])) {
        prev = next;
        setStatuses(next);
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [count, reduced]);

  return { railRef, nodeRefs, progress, statuses };
}

function useReveal<T extends HTMLElement>(reduced: boolean) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reduced) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  return { ref, shown };
}

function Node({
  status,
  isNow,
  accent,
  size,
}: {
  status: Status;
  isNow: boolean;
  accent: string;
  size: "major" | "minor";
}) {
  const lit = status !== "upcoming";
  const major = size === "major";
  return (
    <span
      aria-hidden="true"
      className={[
        "relative block rounded-full border transition-[transform,background-color,border-color,box-shadow] duration-500 ease-out",
        major ? "h-4 w-4 border-2" : "h-2 w-2",
        lit ? "scale-100" : major ? "scale-75" : "scale-90",
      ].join(" ")}
      style={{
        backgroundColor: lit ? accent : "var(--color-night-bg, #070d18)",
        borderColor: lit
          ? accent
          : "color-mix(in oklab, var(--aurora-teal) 28%, transparent)",
        boxShadow: lit
          ? `0 0 ${major ? 14 : 6}px 0 color-mix(in oklab, ${accent} ${major ? 55 : 40}%, transparent)`
          : "none",
      }}
    >
      {isNow && lit ? (
        <span
          className="absolute -inset-1.5 animate-ping rounded-full opacity-30"
          style={{ backgroundColor: accent, animationDuration: "2.8s" }}
        />
      ) : null}
    </span>
  );
}

/** Floating window used for projects, roles and role focus areas. */
function FloatingPanel({ panel, onClose }: { panel: Panel; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  let eyebrow = "";
  let title = "";
  let subtitle: string | undefined;
  let body: string | undefined;
  let items: string[] = [];
  let chips: string[] = [];
  let href: { slug: string } | null = null;
  let groups: { title: string; items: string[] }[] = [];


  if (panel.kind === "project") {
    const project = getProject(panel.slug);
    if (!project) return null;
    eyebrow = `${project.meta} · ${project.type}`;
    title = project.title;
    subtitle = project.subtitle;
    body = project.teaser;
    chips = project.tags.slice(0, 6);
    href = { slug: project.slug };
  } else {
    const role = roles.find((r) => r.id === panel.roleId);
    if (!role) return null;
    if (panel.kind === "role") {
      eyebrow = `${role.period} · ${role.company}`;
      title = role.title;
      subtitle = role.subtitle ?? role.stage;
      body = role.summary;
      items = role.bullets;
      chips = role.tags.slice(0, 6);
      groups = role.detailGroups;
    } else {
      const group = role.detailGroups.find((g) => g.title === panel.group);
      if (!group) return null;
      eyebrow = `${role.period} · ${role.title}`;
      title = group.title;
      items = group.items;
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 animate-fade-in cursor-default bg-black/65 backdrop-blur-sm"
      />
      <div className="relative max-h-[85vh] w-full max-w-lg animate-scale-in overflow-y-auto rounded-3xl border border-night-border bg-night-bg/95 p-6 shadow-2xl">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-night-border px-2 py-0.5 text-sm text-night-muted transition-colors hover:text-night-foreground"
        >
          ✕
        </button>
        <p className="pr-10 font-mono text-xs uppercase tracking-[0.18em] text-aurora-teal">
          {eyebrow}
        </p>
        <h3 className="mt-2 pr-8 text-xl font-semibold text-night-foreground">{title}</h3>
        {subtitle ? <p className="mt-1 text-sm text-night-muted">{subtitle}</p> : null}
        {body ? (
          <p className="mt-4 text-sm leading-relaxed text-night-muted">{body}</p>
        ) : null}

        {items.length ? (
          <ul className="mt-4 space-y-2">
            {items.map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-relaxed text-night-muted">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-aurora-teal" />
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        {chips.length ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {chips.map((t) => (
              <li
                key={t}
                className="rounded-full border border-night-border px-2.5 py-0.5 text-xs text-night-muted"
              >
                {t}
              </li>
            ))}
          </ul>
        ) : null}

        {href ? (
          <Link
            to="/projects/$slug"
            params={{ slug: href.slug }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-aurora-teal/50 px-4 py-2 text-sm text-night-foreground transition-colors hover:bg-aurora-teal/10"
          >
            Explore full case <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

function MilestoneRow({
  entry,
  roleId,
  status,
  reduced,
  nodeRef,
  onOpen,
}: {
  entry: TimelineMilestone;
  roleId?: string | undefined;
  status: Status;
  reduced: boolean;
  nodeRef: (el: HTMLElement | null) => void;
  onOpen: (panel: Panel) => void;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>(reduced);
  const isPro = entry.track === "professional";
  const accent = entry.now
    ? "var(--aurora-teal)"
    : isPro
      ? "var(--aurora-green)"
      : "var(--aurora-violet)";
  const left = entry.side === "left";
  const active = status === "active";

  return (
    <li className="relative pl-12 md:grid md:grid-cols-[1fr_auto_1fr] md:items-start md:pl-0">
      <div className="hidden md:block" />
      <span
        ref={nodeRef}
        className="absolute left-[13px] top-6 z-10 -translate-x-1/2 md:relative md:left-auto md:top-6 md:translate-x-0"
      >
        <Node status={status} isNow={!!entry.now} accent={accent} size="major" />
      </span>
      <div
        ref={ref}
        style={{
          transitionDuration: reduced ? "0ms" : "600ms",
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className={[
          "transition-all will-change-transform",
          shown ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-[0.98] opacity-0",
          left
            ? "md:col-start-1 md:row-start-1 md:pr-14 md:text-right"
            : "md:col-start-3 md:row-start-1 md:pl-14",
        ].join(" ")}
      >
        <div
          className={[
            "rounded-2xl border p-5 backdrop-blur-sm transition-all duration-500",
            active || status === "completed"
              ? "border-night-border bg-white/[0.055]"
              : "border-night-border/50 bg-white/[0.02]",
            active
              ? "shadow-[0_0_0_1px_color-mix(in_oklab,var(--aurora-teal)_25%,transparent)]"
              : "",
          ].join(" ")}
        >
          <p
            className={[
              "font-mono text-sm font-medium uppercase tracking-[0.16em] transition-colors duration-500",
              status === "upcoming" ? "text-night-muted" : "text-aurora-teal",
            ].join(" ")}
          >
            {entry.now ? "Now" : entry.period}
            <span className="ml-2 text-xs text-night-muted">
              {isPro ? "· Experience" : "· Development"}
            </span>
          </p>
          <h3
            className={[
              "mt-2 font-semibold text-night-foreground transition-all duration-500",
              active ? "text-xl" : "text-lg",
            ].join(" ")}
          >
            {entry.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-night-muted">{entry.detail}</p>

          {entry.roles ? (
            <ul className={["mt-4 flex flex-wrap gap-2", left ? "md:justify-end" : ""].join(" ")}>
              {entry.roles.map((role) => (
                <li
                  key={role}
                  className="rounded-full border border-aurora-teal/40 px-3 py-1 text-xs text-night-foreground"
                >
                  {role}
                </li>
              ))}
            </ul>
          ) : null}

          {roleId ? (
            <button
              type="button"
              onClick={() => onOpen({ kind: "role", roleId })}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-aurora-teal/40 px-3.5 py-1.5 text-xs text-night-foreground transition-colors hover:bg-aurora-teal/10"
            >
              Open role <span aria-hidden="true">↗</span>
            </button>
          ) : null}
        </div>
      </div>
    </li>
  );
}

function PointRow({
  label,
  side,
  variant,
  panel,
  status,
  reduced,
  nodeRef,
  onOpen,
}: {
  label: string;
  side: "left" | "right";
  variant: "role" | "project";
  panel: Panel;
  status: Status;
  reduced: boolean;
  nodeRef: (el: HTMLElement | null) => void;
  onOpen: (panel: Panel) => void;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>(reduced);
  const left = side === "left";
  const lit = status !== "upcoming";
  const project = variant === "project";
  const accent = project ? "var(--aurora-teal)" : "var(--aurora-green)";

  return (
    <li className="relative pl-12 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:pl-0">
      <div className="hidden md:block" />
      {/* connector from rail to label */}
      <span
        aria-hidden="true"
        className={[
          "absolute left-[13px] top-1/2 h-px w-6 transition-opacity duration-500 md:w-10",
          lit ? "opacity-80" : "opacity-40",
          left ? "md:left-auto md:right-1/2" : "md:left-1/2",
        ].join(" ")}
        style={{
          background: `linear-gradient(${left ? "270deg" : "90deg"}, color-mix(in oklab, ${accent} 55%, transparent), transparent)`,
        }}
      />
      <span
        ref={nodeRef}
        className="absolute left-[13px] top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 md:relative md:left-auto md:top-auto md:translate-x-0 md:translate-y-0"
      >
        <Node status={status} isNow={false} accent={accent} size="minor" />
      </span>
      <div
        ref={ref}
        style={{
          transitionDuration: reduced ? "0ms" : "480ms",
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className={[
          "transition-all will-change-transform",
          shown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
          left
            ? "md:col-start-1 md:row-start-1 md:flex md:justify-end md:pr-14"
            : "md:col-start-3 md:row-start-1 md:pl-14",
        ].join(" ")}
      >
        <button
          type="button"
          onClick={() => onOpen(panel)}
          className={[
            "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition-all duration-500",
            lit
              ? "border-night-border bg-white/[0.035] text-night-foreground"
              : "border-night-border/40 text-night-muted",
            "hover:border-aurora-teal/60 hover:bg-aurora-teal/10",
          ].join(" ")}
        >
          {label}
          <span aria-hidden="true" className="text-aurora-teal/80">
            ↗
          </span>
        </button>
      </div>
    </li>
  );
}

export function Timeline() {
  const reduced = usePrefersReducedMotion();
  const rows = useMemo(buildRows, []);
  const { railRef, nodeRefs, progress, statuses } = useTimelineScroll(rows.length, reduced);
  const [panel, setPanel] = useState<Panel | null>(null);
  const onOpen = useCallback((next: Panel) => setPanel(next), []);

  // year shown in the sticky marker = most recent milestone reached
  const currentLabel = useMemo(() => {
    let label = milestones[0]?.period ?? "";
    rows.forEach((row, i) => {
      if (row.kind === "milestone" && statuses[i] !== "upcoming") {
        label = row.entry.now ? "NOW" : row.entry.period;
      }
    });
    return label;
  }, [rows, statuses]);

  return (
    <div ref={railRef} className="relative">
      {/* background rail */}
      <div
        aria-hidden="true"
        className="absolute left-[13px] top-0 h-full w-px bg-night-border/60 md:left-1/2 md:-translate-x-1/2"
      >
        {/* active progress rail */}
        <div
          className="w-px origin-top will-change-[height]"
          style={{
            height: `${progress * 100}%`,
            transition: reduced ? "none" : "height 90ms linear",
            background:
              "linear-gradient(180deg, var(--aurora-teal), var(--aurora-green) 55%, var(--aurora-violet))",
            boxShadow: "0 0 12px 1px color-mix(in oklab, var(--aurora-green) 40%, transparent)",
          }}
        />
      </div>

      {/* year marker riding the progress head */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[13px] z-20 -translate-y-1/2 md:left-1/2"
        style={{
          top: `${progress * 100}%`,
          transition: reduced ? "none" : "top 90ms linear",
        }}
      >
        <span
          className={[
            "block -translate-x-1/2 whitespace-nowrap rounded-full border border-aurora-teal/50 bg-night-bg/95 px-4 py-1.5",
            "font-mono text-base font-semibold uppercase tracking-[0.18em] text-aurora-teal",
            "shadow-[0_0_26px_color-mix(in_oklab,var(--aurora-teal)_30%,transparent)] backdrop-blur",
            "transition-opacity duration-500",
            progress > 0.002 && progress < 0.998 ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          {currentLabel}
        </span>
      </div>


      <ol className="relative space-y-6 md:space-y-10">
        {rows.map((row, i) =>
          row.kind === "milestone" ? (
            <MilestoneRow
              key={row.key}
              entry={row.entry}
              roleId={row.roleId}
              reduced={reduced}
              status={statuses[i] ?? "upcoming"}
              nodeRef={(el) => {
                nodeRefs.current[i] = el;
              }}
              onOpen={onOpen}
            />
          ) : (
            <PointRow
              key={row.key}
              label={row.label}
              side={row.side}
              variant={row.variant}
              panel={row.panel}
              reduced={reduced}
              status={statuses[i] ?? "upcoming"}
              nodeRef={(el) => {
                nodeRefs.current[i] = el;
              }}
              onOpen={onOpen}
            />
          ),
        )}
      </ol>

      {panel ? <FloatingPanel panel={panel} onClose={() => setPanel(null)} /> : null}
    </div>
  );
}
