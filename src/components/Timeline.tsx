import { useEffect, useRef, useState } from "react";
import { timeline } from "../content/timeline";

const merged = [...timeline].sort((a, b) => a.order - b.order);

function useScrollProgress() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.55;
      const raw = (anchor - rect.top) / Math.max(rect.height, 1);
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, progress };
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
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
      { rootMargin: "0px 0px -18% 0px", threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, shown };
}

function Entry({
  entry,
  side,
}: {
  entry: (typeof merged)[number];
  side: "left" | "right";
}) {
  const { ref, shown } = useReveal<HTMLLIElement>();
  const isPro = entry.track === "professional";
  const accent = isPro ? "var(--aurora-green)" : "var(--aurora-violet)";

  return (
    <li
      ref={ref}
      className={[
        "relative pl-12 transition-all duration-700 ease-out will-change-transform",
        "md:w-1/2 md:pl-0",
        side === "left" ? "md:pr-16 md:text-right" : "md:ml-auto md:pl-16",
        shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
      ].join(" ")}
    >
      {/* node on the spine */}
      <span
        aria-hidden="true"
        className={[
          "absolute top-2.5 h-3.5 w-3.5 rounded-full transition-all duration-700",
          "left-[13px] -translate-x-1/2",
          side === "left"
            ? "md:left-auto md:right-0 md:translate-x-1/2"
            : "md:left-0 md:-translate-x-1/2",
          shown ? "scale-100 opacity-100" : "scale-50 opacity-40",
        ].join(" ")}
        style={{
          backgroundColor: accent,
          boxShadow: shown ? `0 0 18px 2px ${accent}` : "none",
        }}
      />

      <div className="rounded-2xl border border-night-border/70 bg-white/[0.03] p-5 backdrop-blur-sm">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-aurora-teal">
          {entry.period}
          <span className="ml-2 text-night-muted">
            {isPro ? "· Experience" : "· Development"}
          </span>
        </p>
        <h3 className="mt-2 text-lg font-semibold text-night-foreground">{entry.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-night-muted">{entry.detail}</p>
      </div>
    </li>
  );
}

export function Timeline() {
  const { ref, progress } = useScrollProgress();

  return (
    <div ref={ref} className="relative">
      {/* spine */}
      <div
        aria-hidden="true"
        className="absolute left-[13px] top-0 h-full w-px bg-night-border md:left-1/2 md:-translate-x-1/2"
      >
        <div
          className="w-px origin-top"
          style={{
            height: `${progress * 100}%`,
            background:
              "linear-gradient(180deg, var(--aurora-teal), var(--aurora-green) 55%, var(--aurora-violet))",
            boxShadow: "0 0 12px 1px color-mix(in oklab, var(--aurora-green) 55%, transparent)",
          }}
        />
      </div>

      <ol className="relative space-y-10 md:space-y-16">
        {merged.map((entry, i) => (
          <Entry key={entry.title} entry={entry} side={i % 2 === 0 ? "left" : "right"} />
        ))}
      </ol>
    </div>
  );
}
