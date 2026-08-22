import { useEffect, useState } from "react";

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
    opacity: 0.3,
    streaks: 0.22,
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
    opacity: 0.42,
    streaks: 0.55,
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
    opacity: 0.34,
    streaks: 0.85,
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

const durations: Record<string, string> = { back: "34s", mid: "27s", front: "21s" };

/**
 * Fixed Scandinavian night sky: near-black backdrop, sparse star field and
 * three translucent aurora curtains that drift, fold and breathe independently.
 */
export function AuroraBackdrop() {
  const [fade, setFade] = useState(1);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const h = window.innerHeight || 1;
      const p = Math.min(1, Math.max(0, window.scrollY / h));
      setFade(1 - p * 0.68);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

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
      <svg
        className="aurora-field absolute inset-0 h-full w-full"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: fade }}
        focusable="false"
      >
        <defs>
          {/* brightness varies along the curtain, and travels slowly sideways */}
          <linearGradient id="aurora-hue" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--aurora-teal-hex)" stopOpacity="0.15" />
            <stop offset="0.22" stopColor="var(--aurora-green-hex)" stopOpacity="0.85" />
            <stop offset="0.44" stopColor="var(--aurora-green-soft)" stopOpacity="0.4" />
            <stop offset="0.63" stopColor="var(--aurora-green-bright)" stopOpacity="0.95" />
            <stop offset="0.83" stopColor="var(--aurora-teal-hex)" stopOpacity="0.35" />
            <stop offset="1" stopColor="var(--aurora-green-hex)" stopOpacity="0.12" />
            <animate attributeName="x1" values="-0.25;0.1;-0.25" dur="31s" repeatCount="indefinite" />
            <animate attributeName="x2" values="0.85;1.2;0.85" dur="31s" repeatCount="indefinite" />
          </linearGradient>

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
            <rect x="4" width="3" height="1000" fill="url(#streak-fade)" opacity="0.4" />
            <rect x="19" width="9" height="1000" fill="url(#streak-fade)" opacity="0.24" />
            <rect x="38" width="2" height="1000" fill="url(#streak-fade)" opacity="0.5" />
            <rect x="57" width="14" height="1000" fill="url(#streak-fade)" opacity="0.16" />
            <rect x="84" width="4" height="1000" fill="url(#streak-fade)" opacity="0.42" />
            <rect x="101" width="2" height="1000" fill="url(#streak-fade)" opacity="0.3" />
            <rect x="121" width="11" height="1000" fill="url(#streak-fade)" opacity="0.2" />
            <rect x="146" width="3" height="1000" fill="url(#streak-fade)" opacity="0.36" />
          </pattern>

          <filter id="aurora-soft" x="-25%" y="-25%" width="150%" height="160%">
            <feGaussianBlur stdDeviation="26" />
          </filter>
          <filter id="aurora-mask-blur" x="-25%" y="-25%" width="150%" height="160%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <filter id="aurora-warp" x="-15%" y="-15%" width="130%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.0016 0.006" numOctaves="2" seed="7" result="n">
              <animate attributeName="baseFrequency" values="0.0016 0.006;0.0026 0.009;0.0013 0.005;0.0016 0.006" dur="29s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="14" xChannelSelector="R" yChannelSelector="G">
              <animate attributeName="scale" values="9;18;11;9" dur="23s" repeatCount="indefinite" />
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
              <rect x="-400" y="-200" width="2400" height="1400" fill="url(#aurora-hue)" opacity="0.55" />
              <rect
                className="aurora-streak-sheet"
                x="-400"
                y="-200"
                width="2400"
                height="1400"
                fill="url(#aurora-streaks)"
                opacity={r.streaks * 0.55}
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
