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
 * aurora page. Two things had to be true before it read as sky.
 *
 * NO EDGE ACROSS THE RAY. Drawn as an SVG path filled with a vertical
 * gradient, a ray has a knife-sharp left and right side, and that is what
 * read as painted stripes. A real ray is brightest along an invisible
 * centre line and falls away to nothing on both sides — so the softness
 * comes from a gradient ACROSS the ray and the shape from a mask along it.
 *
 * NOT STRAIGHT. One skew can only give one straight lean, so fifteen of
 * them read as a comb however the angles are varied. A ray is built from
 * several stacked segments, each NESTED inside the one above it: a CSS
 * transform compounds through the nesting, so each segment adds its own
 * few degrees to the lean and the ray arrives as a curve. Nesting also
 * joins them — a child sits at its parent's foot, so there is no seam to
 * line up. The curvature step has a sign, so the display holds C-bends
 * and S-bends rather than one repeated shape.
 *
 * Neither construction is a filter: only opacity and transform animate,
 * both GPU-composited.
 *
 *   · body  — cool green, faint at the top, strongest low
 *   · foot  — chartreuse, only the bottom fifth, the colour the footage
 *             shows wherever the curtain is bright
 *
 * Each ray also carries its own `--peak`, so the display has faint rays
 * beside bright ones instead of reading as a comb.
 * -------------------------------------------------------------------- */

/** Brightness along the WHOLE ray, 0 at the top to 1 at the foot. */
const BODY_PROFILE: [number, number][] = [
  [0, 0], [0.14, 0.12], [0.36, 0.45], [0.56, 0.86], [0.66, 1], [0.8, 0.62], [0.91, 0.22], [1, 0],
];
const FOOT_PROFILE: [number, number][] = [
  [0, 0], [0.48, 0], [0.62, 0.3], [0.73, 1], [0.86, 0.55], [0.94, 0.18], [1, 0],
];

function alphaAt(profile: [number, number][], t: number) {
  for (let i = 1; i < profile.length; i += 1) {
    const a = profile[i - 1];
    const b = profile[i];
    if (!a || !b) break;
    if (t <= b[0]) {
      const span = b[0] - a[0];
      const k = span === 0 ? 0 : (t - a[0]) / span;
      return a[1] + (b[1] - a[1]) * k;
    }
  }
  return 0;
}

/** The slice of that profile belonging to one segment, as a mask gradient. */
function maskSlice(profile: [number, number][], from: number, to: number) {
  const stops: string[] = [];
  for (let k = 0; k <= 6; k += 1) {
    const u = k / 6;
    const a = alphaAt(profile, from + (to - from) * u);
    stops.push(`rgb(0 0 0 / ${a.toFixed(3)}) ${Math.round(u * 100)}%`);
  }
  return `linear-gradient(to bottom, ${stops.join(", ")})`;
}

type Segment = { skew: number; body: string; foot: string };

type Ray = {
  id: string;
  left: number;
  width: number;
  top: number;
  segHeight: number;
  segments: Segment[];
  peak: number;
  dur: number;
  delay: number;
  drift: number;
  driftDur: number;
};

const SEGMENTS = 4;

function makeRays(): Ray[] {
  const rand = mulberry(4711);
  const out: Ray[] = [];
  for (let i = 0; i < 15; i += 1) {
    // Rays follow the field lines, so they lean the same way; the spread
    // narrows toward the right so the curtain converges rather than combs.
    const t = i / 14;
    const lean = -(9 + t * 13 + rand() * 9);
    // How much the lean changes per segment, and which way it bends.
    const bend = (rand() > 0.45 ? 1 : -1) * (2.5 + rand() * 6);
    const segments: Segment[] = [];
    for (let k = 0; k < SEGMENTS; k += 1) {
      segments.push({
        // The first segment carries the whole lean; the rest add the bend,
        // because the nesting compounds what is already there.
        skew: k === 0 ? lean : bend,
        body: maskSlice(BODY_PROFILE, k / SEGMENTS, (k + 1) / SEGMENTS),
        foot: maskSlice(FOOT_PROFILE, k / SEGMENTS, (k + 1) / SEGMENTS),
      });
    }
    // Uneven spacing and unequal lengths: a curtain has clusters and a wavy
    // lower border, and equal rays on a fixed pitch read as a comb.
    out.push({
      id: `r${i}`,
      left: -16 + i * 7.6 + (rand() - 0.5) * 11,
      width: 80 + rand() * 210,
      top: -30 + rand() * 14,
      segHeight: 26 + rand() * 9,
      segments,
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

/** One segment of a ray, holding the next one at its own foot. */
function RaySegment({ segments, index }: { segments: readonly Segment[]; index: number }) {
  const seg = segments[index];
  if (!seg) return null;
  return (
    <div
      className={index === 0 ? "aurora-seg aurora-seg-root" : "aurora-seg"}
      style={{ transform: `skewX(${seg.skew}deg)` }}
    >
      <span className="aurora-ray-body" style={{ maskImage: seg.body, WebkitMaskImage: seg.body }} />
      <span className="aurora-ray-foot" style={{ maskImage: seg.foot, WebkitMaskImage: seg.foot }} />
      <RaySegment segments={segments} index={index + 1} />
    </div>
  );
}

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
                height: `${ray.segHeight}%`,
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
              <RaySegment segments={ray.segments} index={0} />
            </div>
          </div>
        ))}
      </motion.div>

      {/* keeps content readable: darkens the lower sky and the reading column */}
      <div className="aurora-veil-dark absolute inset-0" />
    </div>
  );
}
