import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { milestones, type TimelineMilestone } from "../content/timeline";

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

/**
 * Scroll-linked progress for the timeline rail, measured against the timeline
 * section itself (first node -> last node), not the whole page.
 */
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
      // keep completed sticky: once passed, never regress to upcoming while scrolling down
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
      { rootMargin: "0px 0px -12% 0px", threshold: 0.2 },
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
  secondary,
}: {
  status: Status;
  isNow: boolean;
  accent: string;
  secondary: boolean;
}) {
  const lit = status !== "upcoming";
  const size = secondary ? "h-3 w-3" : "h-4 w-4";
  return (
    <span
      aria-hidden="true"
      className={[
        "relative block rounded-full border transition-all duration-500 ease-out",
        size,
        lit ? "scale-100" : "scale-90",
      ].join(" ")}
      style={{
        backgroundColor: lit ? accent : "transparent",
        borderColor: lit ? accent : "color-mix(in oklab, var(--aurora-teal) 35%, transparent)",
        boxShadow: lit ? `0 0 14px 1px color-mix(in oklab, ${accent} 60%, transparent)` : "none",
      }}
    >
      {isNow && lit ? (
        <span
          className="absolute inset-0 animate-ping rounded-full opacity-40"
          style={{ backgroundColor: accent, animationDuration: "2.6s" }}
        />
      ) : null}
    </span>
  );
}

function Branches({ items }: { items: NonNullable<TimelineMilestone["branches"]> }) {
  return (
    <ul className="mt-4 space-y-1.5 border-l border-night-border/60 pl-4">
      {items.map((b) =>
        b.slug ? (
          <li key={b.label}>
            <Link
              to="/projects/$slug"
              params={{ slug: b.slug }}
              className="group inline-flex items-center gap-2 text-sm text-night-muted transition-colors hover:text-aurora-teal"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-aurora-teal/60" aria-hidden="true" />
              {b.label}
              <span
                aria-hidden="true"
                className="opacity-0 transition-opacity group-hover:opacity-100"
              >
                →
              </span>
            </Link>
          </li>
        ) : (
          <li key={b.label} className="flex items-center gap-2 text-sm text-night-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-night-border" aria-hidden="true" />
            {b.label}
          </li>
        ),
      )}
    </ul>
  );
}

function Entry({
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
    <li className="relative pl-12 md:grid md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-0 md:pl-0">
      {/* left column (desktop) */}
      <div className={left ? "md:pr-12 md:text-right" : "hidden md:block"} />
      {/* node column */}
      <span
        ref={nodeRef}
        className="absolute left-[13px] top-3 -translate-x-1/2 md:relative md:left-auto md:top-1.5 md:translate-x-0"
      >
        <Node status={status} isNow={!!entry.now} accent={accent} secondary={!isPro} />
      </span>
      {/* card */}
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
            active ? "shadow-[0_0_0_1px_color-mix(in_oklab,var(--aurora-teal)_25%,transparent)]" : "",
            isPro ? "" : "md:max-w-[92%] " + (left ? "md:ml-auto" : ""),
          ].join(" ")}
        >
          <p
            className={[
              "font-mono text-xs uppercase tracking-[0.18em] transition-colors duration-500",
              status === "upcoming" ? "text-night-muted" : "text-aurora-teal",
            ].join(" ")}
          >
            {entry.now ? "Now" : entry.period}
            <span className="ml-2 text-night-muted">
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
            <ul
              className={[
                "mt-4 flex flex-wrap gap-2",
                left ? "md:justify-end" : "",
              ].join(" ")}
            >
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

          {entry.branches ? (
            <div className={left ? "md:flex md:justify-end md:text-left" : ""}>
              <Branches items={entry.branches} />
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
}

export function Timeline() {
  const reduced = usePrefersReducedMotion();
  const { railRef, nodeRefs, progress, statuses } = useTimelineScroll(milestones.length, reduced);

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

      <ol className="relative space-y-12 md:space-y-20">
        {milestones.map((entry, i) => (
          <Entry
            key={entry.id}
            entry={entry}
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
