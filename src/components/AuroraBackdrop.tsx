import type { CSSProperties } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/* ---------- stars: deterministic sparse field, mostly 1px ---------- */
function mulberry(seed: number) {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

type Star = { x: number; y: number; r: number; o: number; d: number; bright: boolean };

function makeStars(count: number): Star[] {
  const rand = mulberry(20260822);
  const out: Star[] = [];
  for (let i = 0; i < count; i += 1) {
    const bright = rand() > 0.8;
    out.push({
      x: Math.round(rand() * 1600 * 100) / 100,
      y: Math.round(rand() * 1000 * 100) / 100,
      r: bright ? 1.1 + rand() * 0.7 : 0.5 + rand() * 0.35,
      o: bright ? 0.75 + rand() * 0.25 : 0.34 + rand() * 0.4,
      d: 14 + Math.round(rand() * 30),
      bright,
    });
  }
  return out;
}

const starsFar = makeStars(230);
const starsNear = makeStars(95).map((s) => ({ ...s, x: (s.x + 640) % 1600, y: (s.y + 310) % 1000 }));

/* ---------- rays ------------------------------------------------------
 * Reference: the Mawson footage on the Australian Antarctic Program's
 * aurora page. The previous construction drew each ray as an SVG path
 * filled with a vertical gradient — which gives a knife-sharp left and
 * right edge, and that is what read as painted stripes rather than sky.
 *
 * A real ray has no edge across its width at all: it is brightest along
 * an invisible centre line and falls away to nothing on both sides. So
 * the softness has to come from a gradient ACROSS the ray, and the shape
 * from a mask along it. Neither is a filter, so nothing is recomputed per
 * frame — only opacity and transform animate, both GPU-composited.
 *
 *   · body  — cool green, faint at the top, strongest low
 *   · foot  — chartreuse, only the bottom fifth, the colour the footage
 *             shows wherever the curtain is bright
 *
 * Each ray also carries its own `--peak`, so the display has faint rays
 * beside bright ones instead of reading as a comb.
 * -------------------------------------------------------------------- */

type Ray = {
  id: string;
  left: number;
  width: number;
  top: number;
  height: number;
  skew: number;
  peak: number;
  dur: number;
  delay: number;
  drift: number;
  driftDur: number;
};

function makeRays(): Ray[] {
  const rand = mulberry(4711);
  const out: Ray[] = [];
  for (let i = 0; i < 15; i += 1) {
    // Rays follow the field lines, so they lean the same way; the spread
    // narrows toward the right so the curtain converges rather than combs.
    const t = i / 14;
    // Uneven spacing and unequal lengths: a curtain has clusters and a wavy
    // lower border, and equal rays on a fixed pitch read as a comb.
    out.push({
      id: `r${i}`,
      left: -16 + i * 7.6 + (rand() - 0.5) * 11,
      width: 80 + rand() * 210,
      top: -34 + rand() * 16,
      height: 96 + rand() * 42,
      skew: -(13 + t * 15 + rand() * 7),
      peak: 0.45 + rand() * 0.55,
      dur: 19 + rand() * 17,
      delay: -rand() * 34,
      drift: rand() > 0.5 ? 1 : -1,
      driftDur: 34 + rand() * 26,
    });
  }
  return out;
}

const rays = makeRays();

/**
 * Fixed Scandinavian night sky: near-black backdrop, a sparse star field and
 * a curtain built from individual rays that brighten and fade out of step.
 */
export function AuroraBackdrop() {
  const { scrollY } = useScroll();
  // Scroll-linked fade driven entirely by motion values — no React state per frame.
  const fade = useTransform(scrollY, (v) => {
    const h = typeof window === "undefined" ? 1 : window.innerHeight || 1;
    // Gentle and spread over two screens, so the sky carries the whole page.
    return 1 - Math.min(1, Math.max(0, v / (h * 2))) * 0.24;
  });

  return (
    <div aria-hidden="true" className="aurora-sky pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* stars */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" focusable="false">
        <g className="aurora-starfield aurora-starfield-far">
          {starsFar.map((s, i) => (
            <circle key={`f${i}`} cx={s.x} cy={s.y} r={s.r} fill="var(--star)" opacity={s.o}>
              {s.bright ? <animate attributeName="opacity" values={`${s.o};${s.o * 0.55};${s.o}`} dur={`${s.d}s`} repeatCount="indefinite" /> : null}
            </circle>
          ))}
        </g>
        <g className="aurora-starfield aurora-starfield-near">
          {starsNear.map((s, i) => (
            <circle key={`n${i}`} cx={s.x} cy={s.y} r={s.r} fill="var(--star)" opacity={s.o} />
          ))}
        </g>
      </svg>

      {/* aurora */}
      <motion.div className="aurora-field absolute inset-0" style={{ opacity: fade }}>
        {/* a faint wash, so the sky between the rays is not pure black */}
        <div className="aurora-haze absolute inset-0" />

        {rays.map((ray) => (
          <div
            key={ray.id}
            className="aurora-ray"
            style={
              {
                left: `${ray.left}%`,
                width: `${ray.width}px`,
                top: `${ray.top}%`,
                height: `${ray.height}%`,
                "--skew": `${ray.skew}deg`,
                "--peak": `${ray.peak}`,
                animationDuration: `${ray.dur}s`,
                animationDelay: `${ray.delay}s`,
              } as CSSProperties
            }
          >
            <div
              className={ray.drift > 0 ? "aurora-ray-drift" : "aurora-ray-drift aurora-ray-drift-rev"}
              style={{ animationDuration: `${ray.driftDur}s` }}
            >
              <span className="aurora-ray-body" />
              <span className="aurora-ray-foot" />
            </div>
          </div>
        ))}
      </motion.div>

      {/* keeps content readable: darkens the lower sky and the reading column */}
      <div className="aurora-veil-dark absolute inset-0" />
    </div>
  );
}
