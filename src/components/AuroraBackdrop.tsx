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
 * aurora page. What it shows, and what the previous horizontal-ribbon
 * construction could not express:
 *
 *   · the rays ARE the curtain — there is no band behind them
 *   · they run steeply diagonal and converge toward the horizon
 *   · each one is brightest in its foot, in chartreuse, over a cooler body
 *   · they brighten and fade out of step, so the display restructures
 *   · dark sky shows between them
 *
 * Softness is built from three nested widths per ray rather than a blur:
 * a filter would have to be recomputed every frame against the opacity
 * animation, which is what made the previous version stutter.
 * -------------------------------------------------------------------- */

type Ray = {
  id: string;
  layers: { d: string; o: number }[];
  dur: number;
  delay: number;
  drift: number;
};

/** One tapered, leaning band. Width is given at the top and the foot. */
function rayPath(xTop: number, xFoot: number, wTop: number, wFoot: number, yTop: number, yFoot: number) {
  const bend = (xTop + xFoot) / 2 + (xFoot - xTop) * 0.35;
  const l = `M ${xTop - wTop / 2} ${yTop}`;
  const rTop = `L ${xTop + wTop / 2} ${yTop}`;
  const down = `Q ${bend + wFoot / 2} ${(yTop + yFoot) / 2} ${xFoot + wFoot / 2} ${yFoot}`;
  const foot = `L ${xFoot - wFoot / 2} ${yFoot}`;
  const up = `Q ${bend - wTop / 2} ${(yTop + yFoot) / 2} ${xTop - wTop / 2} ${yTop}`;
  return `${l} ${rTop} ${down} ${foot} ${up} Z`;
}

function makeRays(): Ray[] {
  const rand = mulberry(4711);
  const out: Ray[] = [];
  for (let i = 0; i < 11; i += 1) {
    const xTop = -260 + i * 190 + rand() * 90;
    const lean = 190 + rand() * 260; // steep diagonal, all leaning the same way
    const wTop = 54 + rand() * 130;
    const yFoot = 470 + rand() * 250;
    const widths: [number, number][] = [
      [1, 0.2],
      [0.6, 0.42],
      [0.28, 0.9],
    ];
    out.push({
      id: `r${i}`,
      layers: widths.map(([k, o]) => ({
        d: rayPath(xTop, xTop + lean, wTop * k, wTop * k * 0.66, -180, yFoot),
        o,
      })),
      dur: 21 + rand() * 16,
      delay: -rand() * 30,
      drift: rand() > 0.5 ? 1 : -1,
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
      <motion.svg
        className="aurora-field absolute inset-0 h-full w-full"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: fade }}
        focusable="false"
      >
        <defs>
          {/* Altitude down a ray: nothing high up, a cool green body, and the
              chartreuse foot the footage shows at every bright moment. */}
          <linearGradient id="ray-column" gradientUnits="userSpaceOnUse" x1="0" y1="-140" x2="0" y2="740">
            <stop offset="0" stopColor="var(--aurora-teal-hex)" stopOpacity="0" />
            <stop offset="0.22" stopColor="var(--aurora-green-hex)" stopOpacity="0.28" />
            <stop offset="0.48" stopColor="var(--aurora-green-hex)" stopOpacity="0.6" />
            <stop offset="0.7" stopColor="var(--aurora-green-bright)" stopOpacity="0.82" />
            <stop offset="0.86" stopColor="var(--aurora-green-soft)" stopOpacity="0.95" />
            <stop offset="0.95" stopColor="var(--aurora-lime-hex)" stopOpacity="1" />
            <stop offset="1" stopColor="var(--aurora-lime-hex)" stopOpacity="0" />
          </linearGradient>

          {/* A faint wash so the sky between rays is not pure black. */}
          <linearGradient id="ray-haze" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="820">
            <stop offset="0" stopColor="var(--aurora-teal-hex)" stopOpacity="0" />
            <stop offset="0.55" stopColor="var(--aurora-green-hex)" stopOpacity="0.1" />
            <stop offset="1" stopColor="var(--aurora-green-hex)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect x="-200" y="0" width="2000" height="820" fill="url(#ray-haze)" />

        {rays.map((ray) => (
          <g
            key={ray.id}
            className="aurora-ray"
            style={{ animationDuration: `${ray.dur}s`, animationDelay: `${ray.delay}s` }}
          >
            <g
              className={ray.drift > 0 ? "aurora-ray-drift" : "aurora-ray-drift aurora-ray-drift-rev"}
              style={{ animationDuration: `${ray.dur * 1.7}s` }}
            >
              {ray.layers.map((layer, i) => (
                <path key={i} d={layer.d} fill="url(#ray-column)" opacity={layer.o} />
              ))}
            </g>
          </g>
        ))}
      </motion.svg>

      {/* keeps content readable: darkens the lower sky and the reading column */}
      <div className="aurora-veil-dark absolute inset-0" />
    </div>
  );
}
