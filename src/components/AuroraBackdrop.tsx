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
    const bright = rand() > 0.9;
    out.push({
      x: Math.round(rand() * 1600 * 100) / 100,
      y: Math.round(rand() * 1000 * 100) / 100,
      r: bright ? 0.9 + rand() * 0.5 : 0.4 + rand() * 0.25,
      o: bright ? 0.55 + rand() * 0.25 : 0.22 + rand() * 0.34,
      d: 14 + Math.round(rand() * 30),
      bright,
    });
  }
  return out;
}

const starsFar = makeStars(96);
const starsNear = makeStars(38).map((s) => ({ ...s, x: (s.x + 640) % 1600, y: (s.y + 310) % 1000 }));

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
    bottom: 560,
    opacity: 0.5,
    streaks: 0.4,
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
    bottom: 620,
    opacity: 0.62,
    streaks: 0.8,
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
    bottom: 600,
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

const durations: Record<string, string> = { back: "92s", mid: "76s", front: "63s" };

/**
 * Fixed Scandinavian night sky: near-black backdrop, sparse star field and
 * three translucent aurora curtains that drift, fold and breathe independently.
 */
export function AuroraBackdrop() {
  const { scrollY } = useScroll();
  // Scroll-linked fade driven entirely by motion values — no React state per frame.
  const fade = useTransform(scrollY, (v) => {
    const h = typeof window === "undefined" ? 1 : window.innerHeight || 1;
    return 1 - Math.min(1, Math.max(0, v / h)) * 0.68;
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
            <animate attributeName="x1" values="-0.2;-0.09;0.02;-0.09;-0.2" dur="96s" repeatCount="indefinite" />
            <animate attributeName="x2" values="0.88;0.98;1.08;0.98;0.88" dur="96s" repeatCount="indefinite" />
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
          <linearGradient id="streak-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="white" stopOpacity="0.85" />
            <stop offset="0.55" stopColor="white" stopOpacity="0.35" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <pattern id="aurora-streaks" width="167" height="1000" patternUnits="userSpaceOnUse">
            <rect x="2" width="1.4" height="1000" fill="url(#streak-fade)" opacity="0.34" />
            <rect x="9" width="3" height="1000" fill="url(#streak-fade)" opacity="0.4" />
            <rect x="19" width="9" height="1000" fill="url(#streak-fade)" opacity="0.2" />
            <rect x="33" width="1.6" height="1000" fill="url(#streak-fade)" opacity="0.46" />
            <rect x="40" width="2" height="1000" fill="url(#streak-fade)" opacity="0.5" />
            <rect x="52" width="14" height="1000" fill="url(#streak-fade)" opacity="0.13" />
            <rect x="72" width="1.4" height="1000" fill="url(#streak-fade)" opacity="0.3" />
            <rect x="84" width="4" height="1000" fill="url(#streak-fade)" opacity="0.42" />
            <rect x="95" width="1.6" height="1000" fill="url(#streak-fade)" opacity="0.26" />
            <rect x="103" width="2" height="1000" fill="url(#streak-fade)" opacity="0.3" />
            <rect x="118" width="11" height="1000" fill="url(#streak-fade)" opacity="0.16" />
            <rect x="136" width="1.4" height="1000" fill="url(#streak-fade)" opacity="0.32" />
            <rect x="147" width="3" height="1000" fill="url(#streak-fade)" opacity="0.36" />
            <rect x="158" width="1.8" height="1000" fill="url(#streak-fade)" opacity="0.24" />
          </pattern>

          <filter id="aurora-soft" x="-25%" y="-25%" width="150%" height="160%">
            <feGaussianBlur stdDeviation="26" />
          </filter>
          <filter id="aurora-mask-blur" x="-25%" y="-25%" width="150%" height="160%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <filter id="aurora-warp" x="-15%" y="-15%" width="130%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.0016 0.006" numOctaves="2" seed="7" result="n">
              <animate attributeName="baseFrequency" values="0.0016 0.006;0.0021 0.0072;0.0014 0.0055;0.0016 0.006" dur="52s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="14" xChannelSelector="R" yChannelSelector="G">
              <animate attributeName="scale" values="10;14;11;10" dur="44s" repeatCount="indefinite" />
            </feDisplacementMap>
          </filter>

          {ribbons.map((r) => (
            <linearGradient key={r.id} id={`fall-${r.id}`} gradientUnits="userSpaceOnUse" x1="0" y1={r.top} x2="0" y2={r.bottom}>
              <stop offset="0" stopColor="white" stopOpacity="0.95" />
              <stop offset="0.32" stopColor="white" stopOpacity="0.5" />
              <stop offset="0.72" stopColor="white" stopOpacity="0.16" />
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
              <rect
                className="aurora-streak-sheet"
                x="-400"
                y="-200"
                width="2400"
                height="1400"
                fill="url(#aurora-streaks)"
                opacity={r.streaks * 0.7}
                filter="url(#aurora-warp)"
              />
            </g>
            <path fill="none" stroke="url(#aurora-hue)" strokeWidth="4" opacity="0.3" filter="url(#aurora-mask-blur)" d={r.edges[0]}>
              {morph(r.edges, durations[r.id] ?? "27s")}
            </path>
          </g>
        ))}
      </svg>

      {/* keeps content readable: darkens the lower sky and the reading column */}
      <div className="aurora-veil-dark absolute inset-0" />
    </div>
  );
}
