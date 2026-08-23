import { useEffect, useMemo, useRef, useState } from "react";

import { roles } from "../content/experience";
import { getProject } from "../content/projects";
import { ProjectModal } from "./ProjectModal";
import {
  milestones,
  type TimelineBranch,
  type TimelineMilestone,
} from "../content/timeline";

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

type Row = {
  kind: "milestone";
  key: string;
  entry: TimelineMilestone;
  roleId?: string | undefined;
};

const roleIdFor: Record<string, string | undefined> = {
  "project-engineer": "project-engineer",
  "national-expert": "support-engineer",
  "senior-advisor": "senior-technical-advisor",
};

function buildRows(): Row[] {
  return milestones.map((entry) => ({
    kind: "milestone" as const,
    key: entry.id,
    entry,
    roleId: roleIdFor[entry.id],
  }));
}

/** Single continuous rAF loop that, every frame, reads the live rail rect and
 *  node positions. Because it reads on every animation frame (not only on a
 *  throttled scroll event), progress is always fresh — even for jump scrolls,
 *  hash-link jumps, and smooth wheel animations where a scroll-event-driven
 *  rAF would otherwise run before the new scroll position is applied.
 *
 *  Each frame it derives: raw progress (rail centred in viewport), the eased
 *  smoothProgress (rail fill + marker position), the counting year (eased
 *  toward a target interpolated between the two nearest milestone anchors,
 *  measured in pixel space so very tall cards stay in sync), and node
 *  statuses (upcoming/active/completed). */
function useTimelineScroll(count: number, years: number[], reduced: boolean) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<(HTMLElement | null)[]>([]);
  // DOM nodes written directly every frame (no React re-render → no jank)
  const fillRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<HTMLSpanElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const [statuses, setStatuses] = useState<Status[]>(() =>
    Array.from({ length: count }, () => "upcoming" as Status),
  );
  const smoothRef = useRef(0);
  const shownRef = useRef(years[0] ?? 2003);
  const anchorsRef = useRef<{ at: number; year: number }[]>([]);
  const lastLabel = useRef<string>("");

  useEffect(() => {
    if (reduced) {
      anchorsRef.current = years.map((y, i) => ({
        at: count > 1 ? i / (count - 1) : 0,
        year: y,
      }));
      if (fillRef.current) fillRef.current.style.transform = "scaleY(1)";
      if (labelRef.current) labelRef.current.textContent = "NOW";
      setStatuses(Array.from({ length: count }, () => "completed" as Status));
      return;
    }

    let raf = 0;
    let prevStatusKey = "";
    let last = performance.now();
    let frame = 0;

    const targetYearFor = (p: number) => {
      const a = anchorsRef.current;
      if (a.length === 0) return years[0] ?? 2003;
      if (p <= a[0]!.at) return a[0]!.year;
      for (let i = 0; i < a.length - 1; i += 1) {
        if (p <= a[i + 1]!.at) {
          const t = (p - a[i]!.at) / Math.max(a[i + 1]!.at - a[i]!.at, 0.0001);
          return a[i]!.year + (a[i + 1]!.year - a[i]!.year) * t;
        }
      }
      return a[a.length - 1]!.year;
    };

    const tick = (now: number) => {
      // Reschedule FIRST so a transient error can never kill the loop.
      raf = requestAnimationFrame(tick);
      try {
        // frame-rate independent easing (stable on 60Hz and 120Hz displays)
        const dt = Math.min(64, Math.max(1, now - last));
        last = now;
        frame += 1;

        const rail = railRef.current;
        const vh = window.innerHeight || 1;
        let raw = smoothRef.current;
        if (rail) {
          const rect = rail.getBoundingClientRect();
          raw = Math.min(
            1,
            Math.max(0, (vh * 0.5 - rect.top) / Math.max(rect.height, 1)),
          );

          // node measurement is the expensive part — do it every 3rd frame
          if (rect.height > 1 && frame % 3 === 0) {
            const pts: { at: number; year: number }[] = [];
            const next: Status[] = [];
            let sKey = "";
            for (let i = 0; i < nodeRefs.current.length; i += 1) {
              const el = nodeRefs.current[i];
              if (!el) {
                next.push("upcoming");
                sKey += "u";
                continue;
              }
              const r = el.getBoundingClientRect();
              const center = r.top + r.height / 2;
              const at = Math.min(1, Math.max(0, (center - rect.top) / rect.height));
              const y = years[i];
              if (Number.isFinite(at) && y != null) pts.push({ at, year: y });
              const st: Status =
                center < vh * 0.42
                  ? "completed"
                  : center <= vh * 0.6
                    ? "active"
                    : "upcoming";
              next.push(st);
              sKey += st[0];
            }
            if (pts.length) anchorsRef.current = pts;
            if (sKey !== prevStatusKey) {
              prevStatusKey = sKey;
              setStatuses(next);
            }
          }
        }

        // exponential smoothing, normalised to elapsed time
        const kp = 1 - Math.pow(1 - 0.14, dt / 16.67);
        const sp = smoothRef.current + (raw - smoothRef.current) * kp;
        smoothRef.current = Math.abs(raw - sp) < 0.0005 ? raw : sp;

        const ky = 1 - Math.pow(1 - 0.09, dt / 16.67);
        const ty = targetYearFor(raw);
        const sy = shownRef.current + (ty - shownRef.current) * ky;
        shownRef.current = Math.abs(ty - sy) < 0.005 ? ty : sy;

        const p = smoothRef.current;
        if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`;
        if (markerRef.current) {
          const m = markerRef.current;
          m.style.transform = `translate(-50%, -50%) translate3d(0, ${p * (rail?.offsetHeight ?? 0)}px, 0)`;
          m.style.opacity = p > 0.002 && p < 0.998 ? "1" : "0";
        }
        const newLabel = p > 0.97 ? "NOW" : String(Math.round(shownRef.current));
        if (newLabel !== lastLabel.current) {
          lastLabel.current = newLabel;
          if (labelRef.current) labelRef.current.textContent = newLabel;
        }
      } catch {
        // ignore transient measurement errors; rAF already rescheduled above
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [count, years, reduced]);

  return { railRef, nodeRefs, fillRef, markerRef, labelRef, statuses };
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

function BranchCard({
  branch,
  status,
  period,
  roleContext,
}: {
  branch: TimelineBranch;
  status: Status;
  period: string;
  roleContext?: string | undefined;
}) {
  const project = branch.slug ? getProject(branch.slug) : undefined;
  if (!project) return null;
  const active = status === "active";
  return (
    <ProjectModal
      slug={project.slug}
      project={project}
      roleContext={roleContext}
      span={branch.span ?? period}
    >
      <button
        type="button"
        className={[
          "group relative block w-full min-w-0 rounded-2xl border p-4 text-left transition-all duration-500 hover:border-aurora-teal/40 hover:bg-white/[0.05] sm:p-5",
          active
            ? "border-aurora-teal/45 bg-white/[0.06] shadow-[0_0_0_1px_color-mix(in_oklab,var(--aurora-teal)_25%,transparent)]"
            : status === "completed"
              ? "border-night-border/60 bg-white/[0.035]"
              : "border-night-border/40 bg-white/[0.02] opacity-70",
        ].join(" ")}
      >
        <span
          aria-hidden="true"
          className="absolute left-[-29px] top-7 h-1.5 w-1.5 rounded-full transition-colors duration-500 lg:hidden"
          style={{
            backgroundColor:
              status === "upcoming"
                ? "color-mix(in oklab, var(--aurora-teal) 30%, transparent)"
                : "var(--aurora-teal)",
          }}
        />

        <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-aurora-teal sm:text-[11px]">
          {branch.span ?? period}
          <span className="ml-2 block text-night-muted sm:ml-2 sm:inline">
            <span className="hidden sm:inline">· </span>
            {project.type}
          </span>
        </p>
        <h4 className="mt-1 text-sm font-semibold text-night-foreground">{project.title}</h4>
        {project.subtitle ? (
          <p className="mt-1 text-xs text-night-muted">{project.subtitle}</p>
        ) : null}
        {project.teaser ? (
          <p className="mt-2 text-sm leading-relaxed text-night-muted">{project.teaser}</p>
        ) : null}
        {branch.note ? (
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-night-muted">
            {branch.note}
          </p>
        ) : null}
        <span className="mt-3 inline-flex items-center gap-2 text-xs text-aurora-teal transition-opacity group-hover:opacity-80">
          Open case study <span aria-hidden="true">↗</span>
        </span>
      </button>
    </ProjectModal>
  );
}

function MilestoneRow({
  entry,
  roleId,
  status,
  reduced,
  nodeRef,
}: {
  entry: TimelineMilestone;
  roleId?: string | undefined;
  status: Status;
  reduced: boolean;
  nodeRef: (el: HTMLElement | null) => void;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>(reduced);
  const role = roleId ? roles.find((r) => r.id === roleId) : undefined;
  const isPro = entry.track === "professional";
  const accent = entry.now
    ? "var(--aurora-teal)"
    : isPro
      ? "var(--aurora-green)"
      : "var(--aurora-violet)";
  const left = entry.side === "left";
  const active = status === "active";
  const roleContext = role
    ? `${role.title} (${entry.period}) — ${role.summary}`
    : `${entry.title} (${entry.period}) — ${entry.detail}`;

  return (
    <li
      data-status={status}
      className={[
        "relative pl-10 transition-all duration-500 sm:pl-12 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-start md:pl-0",
        status === "upcoming" ? "opacity-80" : "opacity-100",
      ].join(" ")}
    >
      {/* active highlight line: a soft horizontal beam across the row */}
      <span
        aria-hidden="true"
        className={[
          "pointer-events-none absolute left-0 right-0 top-6 h-px transition-opacity duration-500",
          active ? "opacity-100" : "opacity-0",
        ].join(" ")}
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklab, var(--aurora-teal) 55%, transparent), transparent)",
          boxShadow: "0 0 18px 1px color-mix(in oklab, var(--aurora-teal) 30%, transparent)",
        }}
      />
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
          "min-w-0 transition-all will-change-transform",
          shown ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-[0.98] opacity-0",
          left
            ? "md:col-start-1 md:row-start-1 md:pr-14 md:text-right"
            : "md:col-start-3 md:row-start-1 md:pl-14",
        ].join(" ")}
      >
        <div
          className={[
            "rounded-2xl border p-4 backdrop-blur-sm transition-all duration-500 sm:p-5",
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

          {role ? (
            <div className="mt-5 space-y-5 text-left">
              <p className="text-sm leading-relaxed text-night-muted">{role.summary}</p>
              <ul className="space-y-2">
                {role.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm leading-relaxed text-night-muted">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-aurora-teal"
                    />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-5 grid gap-x-6 gap-y-4 border-t border-night-border/60 pt-5 md:grid-cols-2">
                {role.detailGroups.map((g) => (
                  <section key={g.title}>
                    <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-aurora-green">
                      {g.title}
                    </h4>
                    <ul className="mt-1.5 space-y-1">
                      {g.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-1.5 text-xs leading-snug text-night-muted"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-aurora-green"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* projects carried out in this role sit on the opposite side,
          aligned to the top of the role so they read in the role's
          opening period (e.g. 2020–2023 for the Senior Technical Advisor) */}
      {entry.branches?.length ? (
        <div
          className={[
            "mt-5 min-w-0 transition-all duration-500 md:mt-0 md:row-start-1 md:self-start",
            left ? "md:col-start-3 md:pl-14" : "md:col-start-1 md:pr-14",
          ].join(" ")}
        >
          <p
            className={[
              "mb-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-night-muted sm:text-[11px]",
              left ? "md:text-left" : "md:text-right",
            ].join(" ")}
          >
            Projects in this role · {entry.period}
          </p>
          <div className="space-y-3">
            {entry.branches.map((b) =>
              b.slug ? (
                <BranchCard
                  key={b.slug}
                  branch={b}
                  status={status}
                  period={entry.period}
                  roleContext={roleContext}
                />
              ) : null,
            )}
          </div>
        </div>
      ) : null}
    </li>
  );
}


export function Timeline() {
  const reduced = usePrefersReducedMotion();
  const rows = useMemo(buildRows, []);
  // start year per milestone, aligned to rows
  const years = useMemo(
    () =>
      rows.map((row) => {
        const match = row.entry.period.match(/\d{4}/);
        return row.entry.now ? 2026 : match ? Number(match[0]) : 2026;
      }),
    [rows],
  );

  const { railRef, nodeRefs, fillRef, markerRef, labelRef, statuses } =
    useTimelineScroll(rows.length, years, reduced);

  return (
    <div ref={railRef} className="relative">
      {/* background rail */}
      <div
        aria-hidden="true"
        className="absolute left-[13px] top-0 h-full w-px bg-night-border/60 md:left-1/2 md:-translate-x-1/2"
      >
        {/* active progress rail */}
        <div
          ref={fillRef}
          className="w-px origin-top"
          style={{
            height: "100%",
            transform: "scaleY(0)",
            transformOrigin: "top",
            willChange: "transform",
            background:
              "linear-gradient(180deg, var(--aurora-teal), var(--aurora-green) 55%, var(--aurora-violet))",
            boxShadow: "0 0 12px 1px color-mix(in oklab, var(--aurora-green) 40%, transparent)",
          }}
        />
      </div>

      {/* year marker riding the progress head */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[13px] top-0 z-20 h-full w-px md:left-1/2"
      >
        <span
          ref={markerRef}
          className={[
            "absolute left-0 top-0 block whitespace-nowrap rounded-full border border-aurora-teal/50 bg-night-bg/95 px-4 py-1.5",
            "font-mono text-base font-semibold uppercase tracking-[0.18em] text-night-foreground",
            "shadow-[0_0_26px_color-mix(in_oklab,var(--aurora-teal)_30%,transparent)] backdrop-blur",
            "transition-opacity duration-300",
          ].join(" ")}
          style={{
            opacity: 0,
            transform: "translate(-50%, -50%)",
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
          }}
        >
          <span ref={labelRef}>{String(years[0] ?? 2003)}</span>
        </span>
      </div>


      <ol className="relative space-y-6 md:space-y-10">
        {rows.map((row, i) => (
          <MilestoneRow
            key={row.key}
            entry={row.entry}
            roleId={row.roleId}
            reduced={reduced}
            status={statuses[i] ?? "upcoming"}
            nodeRef={(el) => {
              nodeRefs.current[i] = el;
            }}
          />
        ))}
      </ol>
    </div>
  );
}
