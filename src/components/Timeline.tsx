import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

type Row =
  | { kind: "milestone"; key: string; entry: TimelineMilestone }
  | { kind: "branch"; key: string; branch: TimelineBranch; side: "left" | "right"; period: string };

function buildRows(): Row[] {
  const rows: Row[] = [];
  for (const entry of milestones) {
    rows.push({ kind: "milestone", key: entry.id, entry });
    for (const branch of entry.branches ?? []) {
      rows.push({
        kind: "branch",
        key: `${entry.id}-${branch.label}`,
        branch,
        side: entry.side,
        period: entry.period,
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
      const anchor = vh * 0.52;
      const raw = (anchor - rect.top) / Math.max(rect.height, 1);
      setProgress(Math.min(1, Math.max(0, raw)));

      const next: Status[] = nodeRefs.current.map((el) => {
        if (!el) return "upcoming";
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        if (center < vh * 0.4) return "completed";
        if (center <= vh * 0.62) return "active";
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
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
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
        "relative block rounded-full border transition-all duration-500 ease-out",
        major ? "h-5 w-5 border-2" : "h-2.5 w-2.5",
        lit ? "scale-100" : "scale-90",
      ].join(" ")}
      style={{
        backgroundColor: lit ? (major ? accent : `color-mix(in oklab, ${accent} 70%, transparent)`) : "var(--night-bg, #0b1120)",
        borderColor: lit ? accent : "color-mix(in oklab, var(--aurora-teal) 30%, transparent)",
        boxShadow: lit
          ? `0 0 ${major ? 18 : 8}px 1px color-mix(in oklab, ${accent} ${major ? 70 : 45}%, transparent)`
          : "none",
      }}
    >
      {isNow && lit ? (
        <span
          className="absolute -inset-1 animate-ping rounded-full opacity-40"
          style={{ backgroundColor: accent, animationDuration: "2.6s" }}
        />
      ) : null}
    </span>
  );
}

/** Floating quick-view window for a project branch. */
function ProjectDialog({ slug, onClose }: { slug: string; onClose: () => void }) {
  const project = getProject(slug);
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

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm animate-fade-in"
      />
      <div className="relative w-full max-w-lg animate-scale-in rounded-3xl border border-night-border bg-night-bg/95 p-6 shadow-2xl">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-night-border px-2 py-0.5 text-sm text-night-muted transition-colors hover:text-night-foreground"
        >
          ✕
        </button>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-aurora-teal">
          {project.meta} · {project.type}
        </p>
        <h3 className="mt-2 pr-8 text-xl font-semibold text-night-foreground">{project.title}</h3>
        {project.subtitle ? (
          <p className="mt-1 text-sm text-night-muted">{project.subtitle}</p>
        ) : null}
        <p className="mt-4 text-sm leading-relaxed text-night-muted">{project.teaser}</p>

        {project.metrics?.length ? (
          <ul className="mt-4 grid grid-cols-2 gap-3">
            {project.metrics.slice(0, 4).map((m) => (
              <li key={m.label} className="rounded-xl border border-night-border/70 p-3">
                <p className="text-sm font-semibold text-night-foreground">{m.value}</p>
                <p className="text-xs text-night-muted">{m.label}</p>
              </li>
            ))}
          </ul>
        ) : null}

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 6).map((t) => (
            <li
              key={t}
              className="rounded-full border border-night-border px-2.5 py-0.5 text-xs text-night-muted"
            >
              {t}
            </li>
          ))}
        </ul>

        <Link
          to="/projects/$slug"
          params={{ slug: project.slug }}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-aurora-teal/50 px-4 py-2 text-sm text-night-foreground transition-colors hover:bg-aurora-teal/10"
        >
          Explore full case <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}

function MilestoneRow({
  entry,
  status,
  reduced,
  nodeRef,
}: {
  entry: TimelineMilestone;
  status: Status;
  reduced: boolean;
  nodeRef: (el: HTMLElement | null) => void;
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
        className="absolute left-[13px] top-3 z-10 -translate-x-1/2 md:relative md:left-auto md:top-1.5 md:translate-x-0"
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
            ? "md:col-start-1 md:row-start-1 md:pr-12 md:text-right"
            : "md:col-start-3 md:row-start-1 md:pl-12",
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
              "font-mono text-xs uppercase tracking-[0.18em] transition-colors duration-500",
              status === "upcoming" ? "text-night-muted" : "text-aurora-teal",
            ].join(" ")}
          >
            {entry.now ? "Now" : entry.period}
            <span className="ml-2 text-night-muted">{isPro ? "· Experience" : "· Development"}</span>
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
        </div>
      </div>
    </li>
  );
}

function BranchRow({
  branch,
  side,
  status,
  reduced,
  nodeRef,
  onOpen,
}: {
  branch: TimelineBranch;
  side: "left" | "right";
  status: Status;
  reduced: boolean;
  nodeRef: (el: HTMLElement | null) => void;
  onOpen: (slug: string) => void;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>(reduced);
  const left = side === "left";
  const lit = status !== "upcoming";

  const inner = (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-all duration-500",
        lit
          ? "border-night-border bg-white/[0.04] text-night-foreground"
          : "border-night-border/50 text-night-muted",
        branch.slug ? "hover:border-aurora-teal/60 hover:bg-aurora-teal/10" : "",
      ].join(" ")}
    >
      {branch.label}
      {branch.slug ? (
        <span aria-hidden="true" className="text-aurora-teal">
          ↗
        </span>
      ) : null}
    </span>
  );

  return (
    <li className="relative pl-12 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:pl-0">
      <div className="hidden md:block" />
      {/* connector */}
      <span
        aria-hidden="true"
        className={[
          "absolute left-[13px] top-1/2 hidden h-px bg-night-border/60 md:block",
          left ? "md:left-auto md:right-1/2 md:w-10" : "md:left-1/2 md:w-10",
        ].join(" ")}
      />
      <span
        ref={nodeRef}
        className="absolute left-[13px] top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 md:relative md:left-auto md:top-auto md:translate-x-0 md:translate-y-0"
      >
        <Node status={status} isNow={false} accent="var(--aurora-teal)" size="minor" />
      </span>
      <div
        ref={ref}
        style={{
          transitionDuration: reduced ? "0ms" : "500ms",
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className={[
          "transition-all will-change-transform",
          shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          left
            ? "md:col-start-1 md:row-start-1 md:pr-16 md:text-right"
            : "md:col-start-3 md:row-start-1 md:pl-16",
        ].join(" ")}
      >
        {branch.slug ? (
          <button type="button" onClick={() => onOpen(branch.slug!)} className="text-left">
            {inner}
          </button>
        ) : (
          inner
        )}
      </div>
    </li>
  );
}

export function Timeline() {
  const reduced = usePrefersReducedMotion();
  const rows = useMemo(buildRows, []);
  const { railRef, nodeRefs, progress, statuses } = useTimelineScroll(rows.length, reduced);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const onOpen = useCallback((slug: string) => setOpenSlug(slug), []);

  // the label shown in the travelling year marker = last reached milestone
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
        className="absolute left-[13px] top-0 h-full w-px bg-night-border/70 md:left-1/2 md:-translate-x-1/2"
      >
        {/* active progress rail */}
        <div
          className="w-px origin-top will-change-[height]"
          style={{
            height: `${progress * 100}%`,
            transition: reduced ? "none" : "height 120ms linear",
            background:
              "linear-gradient(180deg, var(--aurora-teal), var(--aurora-green) 55%, var(--aurora-violet))",
            boxShadow: "0 0 10px 1px color-mix(in oklab, var(--aurora-green) 45%, transparent)",
          }}
        />
      </div>

      {/* travelling year marker riding the progress head */}
      {progress > 0.001 && progress < 0.999 ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[13px] z-20 -translate-x-1/2 -translate-y-1/2 md:left-1/2"
          style={{
            top: `${progress * 100}%`,
            transition: reduced ? "none" : "top 120ms linear",
          }}
        >
          <span className="whitespace-nowrap rounded-full border border-aurora-teal/50 bg-night-bg/90 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-aurora-teal shadow-[0_0_18px_color-mix(in_oklab,var(--aurora-teal)_35%,transparent)] backdrop-blur">
            {currentLabel}
          </span>
        </div>
      ) : null}

      <ol className="relative space-y-8 md:space-y-14">
        {rows.map((row, i) =>
          row.kind === "milestone" ? (
            <MilestoneRow
              key={row.key}
              entry={row.entry}
              reduced={reduced}
              status={statuses[i] ?? "upcoming"}
              nodeRef={(el) => {
                nodeRefs.current[i] = el;
              }}
            />
          ) : (
            <BranchRow
              key={row.key}
              branch={row.branch}
              side={row.side}
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

      {openSlug ? <ProjectDialog slug={openSlug} onClose={() => setOpenSlug(null)} /> : null}
    </div>
  );
}
