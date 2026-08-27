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

/* ---------- ribbon geometry: asymmetric arcs in the upper sky ---------- */
type Ribbon = {
  id: string;
  cls: string;
  shapes: string[];
  edges: string[];
  top: number;
  bottom: number;
  opacity: number;
  streaks: number;
};

const ribbons: Ribbon[] = [
  {
    id: "back",
    cls: "aurora-ribbon-back",
    top: 40,
    bottom: 300,
    opacity: 0.5,
    streaks: 0.75,
    shapes: [
      "M-300 210 C160 120 380 250 720 220 C1030 192 1250 90 1900 170 L1900 560 L-300 560 Z",
      "M-300 170 C180 190 400 190 740 250 C1060 306 1260 150 1900 120 L1900 560 L-300 560 Z",
      "M-300 240 C140 100 360 280 700 200 C1010 128 1240 130 1900 200 L1900 560 L-300 560 Z",
      "M-300 210 C160 120 380 250 720 220 C1030 192 1250 90 1900 170 L1900 560 L-300 560 Z",
    ],
    edges: [
      "M-300 210 C160 120 380 250 720 220 C1030 192 1250 90 1900 170",
      "M-300 170 C180 190 400 190 740 250 C1060 306 1260 150 1900 120",
      "M-300 240 C140 100 360 280 700 200 C1010 128 1240 130 1900 200",
      "M-300 210 C160 120 380 250 720 220 C1030 192 1250 90 1900 170",
    ],
  },
  {
    id: "mid",
    cls: "aurora-ribbon-mid",
    top: 90,
    bottom: 360,
    opacity: 0.62,
    streaks: 1,
    shapes: [
      "M-300 330 C220 250 430 400 780 350 C1080 308 1300 210 1900 260 L1900 640 L-300 640 Z",
      "M-300 300 C240 330 470 330 800 400 C1100 464 1320 260 1900 300 L1900 640 L-300 640 Z",
      "M-300 350 C200 230 410 420 760 330 C1060 254 1290 270 1900 230 L1900 640 L-300 640 Z",
      "M-300 330 C220 250 430 400 780 350 C1080 308 1300 210 1900 260 L1900 640 L-300 640 Z",
    ],
    edges: [
      "M-300 330 C220 250 430 400 780 350 C1080 308 1300 210 1900 260",
      "M-300 300 C240 330 470 330 800 400 C1100 464 1320 260 1900 300",
      "M-300 350 C200 230 410 420 760 330 C1060 254 1290 270 1900 230",
      "M-300 330 C220 250 430 400 780 350 C1080 308 1300 210 1900 260",
    ],
  },
  {
    id: "front",
    cls: "aurora-ribbon-front",
    top: 150,
    bottom: 400,
    opacity: 0.5,
    streaks: 1,
    shapes: [
      "M420 300 C620 250 800 330 1060 280 C1290 236 1450 180 1900 210 L1900 560 L420 560 Z",
      "M420 270 C640 310 820 290 1080 330 C1300 366 1470 220 1900 250 L1900 560 L420 560 Z",
      "M420 320 C600 230 790 350 1040 260 C1280 174 1440 230 1900 180 L1900 560 L420 560 Z",
      "M420 300 C620 250 800 330 1060 280 C1290 236 1450 180 1900 210 L1900 560 L420 560 Z",
    ],
    edges: [
      "M420 300 C620 250 800 330 1060 280 C1290 236 1450 180 1900 210",
      "M420 270 C640 310 820 290 1080 330 C1300 366 1470 220 1900 250",
      "M420 320 C600 230 790 350 1040 260 C1280 174 1440 230 1900 180",
      "M420 300 C620 250 800 330 1060 280 C1290 236 1450 180 1900 210",
    ],
  },
];

const morph = (values: string[], dur: string) => (
  <animate
    attributeName="d"
    values={values.join(";")}
    dur={dur}
    calcMode="spline"
    keyTimes="0;0.33;0.66;1"
    keySplines=".45 0 .55 1;.45 0 .55 1;.45 0 .55 1"
    repeatCount="indefinite"
  />
);

const durations: Record<string, string> = { back: "30s", mid: "25s", front: "20s" };

/**
 * Fixed Scandinavian night sky: near-black backdrop, sparse star field and
 * three translucent aurora curtains that drift, fold and breathe independently.
 */
export function AuroraBackdrop() {
  const { scrollY } = useScroll();
  // Scroll-linked fade driven entirely by motion values — no React state per frame.
  const fade = useTransform(scrollY, (v) => {
    const h = typeof window === "undefined" ? 1 : window.innerHeight || 1;
    // Gentle and spread over two screens: fading hard after one viewport made
    // the sky die out partway down the page instead of carrying it.
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
          {/* brightness varies along the curtain, and travels slowly sideways */}
          <linearGradient id="aurora-hue" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--aurora-blue-hex)" stopOpacity="0.12" />
            <stop offset="0.14" stopColor="var(--aurora-teal-hex)" stopOpacity="0.5" />
            <stop offset="0.3" stopColor="var(--aurora-green-hex)" stopOpacity="0.85" />
            <stop offset="0.46" stopColor="var(--aurora-lime-hex)" stopOpacity="0.55" />
            <stop offset="0.62" stopColor="var(--aurora-green-bright)" stopOpacity="0.95" />
            <stop offset="0.78" stopColor="var(--aurora-green-hex)" stopOpacity="0.55" />
            <stop offset="0.9" stopColor="var(--aurora-magenta-hex)" stopOpacity="0.3" />
            <stop offset="1" stopColor="var(--aurora-violet-hex)" stopOpacity="0.12" />
            <animate attributeName="x1" values="-0.2;-0.09;0.02;-0.09;-0.2" dur="44s" repeatCount="indefinite" />
            <animate attributeName="x2" values="0.88;0.98;1.08;0.98;0.88" dur="44s" repeatCount="indefinite" />
          </linearGradient>

          {/* vertical colour column: rose/violet crown, green body, teal foot */}
          {ribbons.map((r) => (
            <linearGradient key={`v${r.id}`} id={`vhue-${r.id}`} gradientUnits="userSpaceOnUse" x1="0" y1={r.top - 60} x2="0" y2={r.bottom}>
              <stop offset="0" stopColor="var(--aurora-rose-hex)" stopOpacity="0.55" />
              <stop offset="0.12" stopColor="var(--aurora-magenta-hex)" stopOpacity="0.5" />
              <stop offset="0.26" stopColor="var(--aurora-violet-hex)" stopOpacity="0.35" />
              <stop offset="0.44" stopColor="var(--aurora-green-bright)" stopOpacity="0.75" />
              <stop offset="0.64" stopColor="var(--aurora-green-hex)" stopOpacity="0.6" />
              <stop offset="0.84" stopColor="var(--aurora-teal-hex)" stopOpacity="0.32" />
              <stop offset="1" stopColor="var(--aurora-blue-hex)" stopOpacity="0.1" />
            </linearGradient>
          ))}

          <linearGradient id="aurora-crown" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--aurora-violet-hex)" stopOpacity="0.32" />
            <stop offset="1" stopColor="var(--aurora-violet-hex)" stopOpacity="0" />
          </linearGradient>

          {/* vertical folds inside the curtain */}
          {/* The rays are the structure, not a texture laid over it, so they
              have to survive four stages of attenuation to reach the screen. */}
          <linearGradient id="streak-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="white" stopOpacity="1" />
            <stop offset="0.42" stopColor="white" stopOpacity="0.78" />
            <stop offset="0.78" stopColor="white" stopOpacity="0.3" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <pattern id="aurora-streaks" width="119" height="1000" patternUnits="userSpaceOnUse">
            <rect x="2" width="1.6" height="1000" fill="url(#streak-fade)" opacity="0.57" />
            <rect x="7" width="2.6" height="1000" fill="url(#streak-fade)" opacity="0.41" />
            <rect x="12" width="1.4" height="1000" fill="url(#streak-fade)" opacity="0.68" />
            <rect x="17" width="3.4" height="1000" fill="url(#streak-fade)" opacity="0.32" />
            <rect x="22.5" width="1.8" height="1000" fill="url(#streak-fade)" opacity="0.59" />
            <rect x="27" width="2.2" height="1000" fill="url(#streak-fade)" opacity="0.46" />
            <rect x="32" width="1.5" height="1000" fill="url(#streak-fade)" opacity="0.70" />
            <rect x="36.5" width="4.0" height="1000" fill="url(#streak-fade)" opacity="0.27" />
            <rect x="43" width="1.7" height="1000" fill="url(#streak-fade)" opacity="0.62" />
            <rect x="47.5" width="2.4" height="1000" fill="url(#streak-fade)" opacity="0.43" />
            <rect x="52" width="1.4" height="1000" fill="url(#streak-fade)" opacity="0.65" />
            <rect x="56" width="3.0" height="1000" fill="url(#streak-fade)" opacity="0.35" />
            <rect x="62" width="1.9" height="1000" fill="url(#streak-fade)" opacity="0.54" />
            <rect x="66.5" width="1.5" height="1000" fill="url(#streak-fade)" opacity="0.68" />
            <rect x="71" width="2.8" height="1000" fill="url(#streak-fade)" opacity="0.38" />
            <rect x="76" width="1.6" height="1000" fill="url(#streak-fade)" opacity="0.59" />
            <rect x="80.5" width="3.6" height="1000" fill="url(#streak-fade)" opacity="0.30" />
            <rect x="86" width="1.4" height="1000" fill="url(#streak-fade)" opacity="0.70" />
            <rect x="90" width="2.2" height="1000" fill="url(#streak-fade)" opacity="0.46" />
            <rect x="95" width="1.8" height="1000" fill="url(#streak-fade)" opacity="0.57" />
            <rect x="99.5" width="2.6" height="1000" fill="url(#streak-fade)" opacity="0.38" />
            <rect x="104" width="1.5" height="1000" fill="url(#streak-fade)" opacity="0.62" />
            <rect x="109" width="3.2" height="1000" fill="url(#streak-fade)" opacity="0.32" />
            <rect x="114" width="1.7" height="1000" fill="url(#streak-fade)" opacity="0.54" />
          </pattern>

          <filter id="aurora-soft" x="-25%" y="-25%" width="150%" height="160%">
            <feGaussianBlur stdDeviation="26" />
          </filter>
          <filter id="aurora-mask-blur" x="-18%" y="-18%" width="136%" height="140%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <filter id="aurora-warp" x="-15%" y="-15%" width="130%" height="140%">
            {/* Static on purpose: animating baseFrequency or scale re-generates the
                noise on the CPU every frame over a 2400x1400 region, which is what
                made the curtains stutter. The folds move via GPU transforms instead. */}
            <feTurbulence type="fractalNoise" baseFrequency="0.0016 0.006" numOctaves="2" seed="7" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          {ribbons.map((r) => (
            <linearGradient key={r.id} id={`fall-${r.id}`} gradientUnits="userSpaceOnUse" x1="0" y1={r.top} x2="0" y2={r.bottom}>
              {/* Short falloff on purpose: spreading it over half the viewBox
                  left the curtain without an edge anywhere, which reads as haze
                  and drowns the rays inside the mask. */}
              <stop offset="0" stopColor="white" stopOpacity="0.98" />
              <stop offset="0.18" stopColor="white" stopOpacity="0.72" />
              <stop offset="0.45" stopColor="white" stopOpacity="0.26" />
              <stop offset="0.75" stopColor="white" stopOpacity="0.06" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          ))}

          {ribbons.map((r) => (
            <mask key={r.id} id={`mask-${r.id}`} maskUnits="userSpaceOnUse" x="-400" y="-200" width="2400" height="1400">
              <path fill={`url(#fall-${r.id})`} filter="url(#aurora-mask-blur)" d={r.shapes[0]}>
                {morph(r.shapes, durations[r.id] ?? "27s")}
              </path>
            </mask>
          ))}
        </defs>

        {/* faint violet crown above the highest curtain */}
        <g className="aurora-crown" opacity="0.5" filter="url(#aurora-soft)">
          <path d="M-300 -60 C240 40 520 160 940 150 C1290 142 1520 60 1900 -10 L1900 -220 L-300 -220 Z" fill="url(#aurora-crown)" />
        </g>

        {ribbons.map((r) => (
          <g key={r.id} className={`aurora-ribbon ${r.cls}`} opacity={r.opacity}>
            <g mask={`url(#mask-${r.id})`}>
              <rect x="-400" y="-200" width="2400" height="1400" fill="url(#aurora-hue)" opacity="0.5" />
              <rect
                className="aurora-colorwash"
                x="-400"
                y="-200"
                width="2400"
                height="1400"
                fill={`url(#vhue-${r.id})`}
                opacity="0.7"
              />
              {/* The transform lives on the wrapper and the filter on the static
                  child: a filtered element that also animates its own transform
                  makes the browser recompute the whole filter every frame. */}
              <g className="aurora-streak-sheet">
                <rect
                  x="-400"
                  y="-200"
                  width="2400"
                  height="1400"
                  fill="url(#aurora-streaks)"
                  opacity={Math.min(1, r.streaks)}
                  filter="url(#aurora-warp)"
                />
              </g>
            </g>
            <path fill="none" stroke="url(#aurora-hue)" strokeWidth="4" opacity="0.3" filter="url(#aurora-mask-blur)" d={r.edges[0]}>
              {morph(r.edges, durations[r.id] ?? "27s")}
            </path>
          </g>
        ))}
      </motion.svg>

      {/* keeps content readable: darkens the lower sky and the reading column */}
      <div className="aurora-veil-dark absolute inset-0" />
    </div>
  );
}
