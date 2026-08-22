const stars =
  "radial-gradient(1px 1px at 7% 18%, white, transparent), radial-gradient(1px 1px at 18% 7%, white, transparent), radial-gradient(1.2px 1.2px at 31% 27%, white, transparent), radial-gradient(0.8px 0.8px at 42% 11%, white, transparent), radial-gradient(1px 1px at 57% 23%, white, transparent), radial-gradient(1.3px 1.3px at 72% 8%, white, transparent), radial-gradient(0.8px 0.8px at 86% 30%, white, transparent), radial-gradient(1px 1px at 96% 13%, white, transparent), radial-gradient(0.8px 0.8px at 12% 49%, white, transparent), radial-gradient(1px 1px at 25% 65%, white, transparent), radial-gradient(0.8px 0.8px at 39% 42%, white, transparent), radial-gradient(1.2px 1.2px at 54% 58%, white, transparent), radial-gradient(0.8px 0.8px at 68% 45%, white, transparent), radial-gradient(1px 1px at 81% 69%, white, transparent), radial-gradient(0.8px 0.8px at 93% 53%, white, transparent), radial-gradient(1px 1px at 5% 83%, white, transparent), radial-gradient(0.8px 0.8px at 34% 89%, white, transparent), radial-gradient(1px 1px at 62% 81%, white, transparent), radial-gradient(0.8px 0.8px at 89% 91%, white, transparent)";

const mainShape = [
  "M-180 205 C100 170 250 345 480 320 C690 298 770 165 985 180 C1220 195 1400 360 1780 300 L1780 515 C1410 560 1230 395 990 382 C750 368 660 505 430 490 C180 474 20 300 -180 330 Z",
  "M-180 235 C70 135 280 320 505 300 C720 282 805 205 1020 214 C1250 224 1440 330 1780 270 L1780 490 C1435 575 1240 430 995 420 C760 410 650 485 425 462 C175 438 20 285 -180 350 Z",
  "M-180 205 C100 170 250 345 480 320 C690 298 770 165 985 180 C1220 195 1400 360 1780 300 L1780 515 C1410 560 1230 395 990 382 C750 368 660 505 430 490 C180 474 20 300 -180 330 Z",
].join(";");

const edgeShape = [
  "M-180 330 C20 300 180 474 430 490 C660 505 750 368 990 382 C1230 395 1410 560 1780 515",
  "M-180 350 C20 285 175 438 425 462 C650 485 760 410 995 420 C1240 430 1435 575 1780 490",
  "M-180 330 C20 300 180 474 430 490 C660 505 750 368 990 382 C1230 395 1410 560 1780 515",
].join(";");

/**
 * A fixed northern sky based on real auroral arcs: a folded lower edge,
 * irregular field-aligned rays, and brightness that travels along the band.
 */
export function AuroraBackdrop() {
  return (
    <div aria-hidden="true" className="aurora-sky pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="aurora-stars absolute inset-0" style={{ backgroundImage: stars }} />
      <div
        className="aurora-stars aurora-stars-far absolute inset-0"
        style={{ backgroundImage: stars, backgroundSize: "71% 59%" }}
      />

      <svg
        className="aurora-field absolute inset-0 h-full w-full"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <defs>
          <linearGradient id="curtain-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--aurora-violet)" stopOpacity="0.1" />
            <stop offset="0.3" stopColor="var(--aurora-violet)" stopOpacity="0.14" />
            <stop offset="0.58" stopColor="var(--aurora-green)" stopOpacity="0.16" />
            <stop offset="0.82" stopColor="var(--aurora-green)" stopOpacity="0.46" />
            <stop offset="0.95" stopColor="var(--aurora-teal)" stopOpacity="0.16" />
            <stop offset="1" stopColor="var(--aurora-green)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="violet-veil" x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0" stopColor="var(--aurora-violet)" stopOpacity="0.26" />
            <stop offset="0.55" stopColor="var(--aurora-violet)" stopOpacity="0.12" />
            <stop offset="1" stopColor="var(--aurora-violet)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ray-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="white" stopOpacity="0" />
            <stop offset="0.35" stopColor="white" stopOpacity="0.03" />
            <stop offset="0.82" stopColor="white" stopOpacity="0.72" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="aurora-color" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--aurora-green)" stopOpacity="0.18" />
            <stop offset="0.2" stopColor="var(--aurora-green)" stopOpacity="0.8" />
            <stop offset="0.43" stopColor="var(--aurora-teal)" stopOpacity="0.38" />
            <stop offset="0.65" stopColor="var(--aurora-green)" stopOpacity="0.72" />
            <stop offset="0.84" stopColor="var(--aurora-violet)" stopOpacity="0.18" />
            <stop offset="1" stopColor="var(--aurora-green)" stopOpacity="0.14" />
            <animate attributeName="x1" values="-0.2;0.18;-0.2" dur="19s" repeatCount="indefinite" />
            <animate attributeName="x2" values="0.8;1.18;0.8" dur="19s" repeatCount="indefinite" />
          </linearGradient>
          <pattern id="aurora-rays" width="113" height="1000" patternUnits="userSpaceOnUse">
            <rect x="3" width="2" height="1000" fill="url(#ray-fade)" opacity="0.25" />
            <rect x="13" width="7" height="1000" fill="url(#ray-fade)" opacity="0.48" />
            <rect x="24" width="2" height="1000" fill="url(#ray-fade)" opacity="0.18" />
            <rect x="41" width="11" height="1000" fill="url(#ray-fade)" opacity="0.3" />
            <rect x="58" width="3" height="1000" fill="url(#ray-fade)" opacity="0.55" />
            <rect x="72" width="1.5" height="1000" fill="url(#ray-fade)" opacity="0.3" />
            <rect x="87" width="8" height="1000" fill="url(#ray-fade)" opacity="0.42" />
            <rect x="104" width="3" height="1000" fill="url(#ray-fade)" opacity="0.2" />
          </pattern>
          <filter id="soft-curtain" x="-20%" y="-20%" width="140%" height="150%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <filter id="ray-ripple" x="-15%" y="-15%" width="130%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.0022 0.011" numOctaves="2" seed="11" result="noise">
              <animate attributeName="baseFrequency" values="0.0022 0.011;0.0035 0.014;0.0018 0.009;0.0022 0.011" dur="17s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" xChannelSelector="R" yChannelSelector="G">
              <animate attributeName="scale" values="13;27;17;13" dur="11s" repeatCount="indefinite" />
            </feDisplacementMap>
          </filter>
          <clipPath id="curtain-clip">
            <path d="M-180 205 C100 170 250 345 480 320 C690 298 770 165 985 180 C1220 195 1400 360 1780 300 L1780 515 C1410 560 1230 395 990 382 C750 368 660 505 430 490 C180 474 20 300 -180 330 Z">
              <animate attributeName="d" values={mainShape} dur="16s" calcMode="spline" keySplines=".42 0 .58 1;.42 0 .58 1" repeatCount="indefinite" />
            </path>
          </clipPath>
        </defs>

        {/* magenta/violet high-altitude veil above the green band, as in real displays */}
        <g className="aurora-veil" opacity="0.5" filter="url(#soft-curtain)">
          <path
            d="M-200 -120 C260 -60 520 120 900 150 C1240 176 1460 90 1800 30 L1800 -160 L-200 -160 Z"
            fill="url(#violet-veil)"
          />
        </g>

        <g className="aurora-band" transform="rotate(-6 800 380)">
          <path fill="url(#curtain-glow)" filter="url(#soft-curtain)" opacity="0.62">
            <animate attributeName="d" values={mainShape} dur="16s" calcMode="spline" keySplines=".42 0 .58 1;.42 0 .58 1" repeatCount="indefinite" />
          </path>
          <g clipPath="url(#curtain-clip)" filter="url(#ray-ripple)" opacity="0.62">
            <rect className="aurora-ray-sheet" x="-250" y="20" width="2200" height="620" fill="url(#aurora-color)" opacity="0.22" />
            <rect className="aurora-ray-sheet aurora-ray-detail" x="-250" y="20" width="2200" height="620" fill="url(#aurora-rays)" />
          </g>
          <path fill="none" stroke="url(#aurora-color)" strokeWidth="9" opacity="0.38" filter="url(#soft-curtain)">
            <animate attributeName="d" values={edgeShape} dur="16s" calcMode="spline" keySplines=".42 0 .58 1;.42 0 .58 1" repeatCount="indefinite" />
          </path>
          <path fill="none" stroke="url(#aurora-color)" strokeWidth="1.8" opacity="0.58">
            <animate attributeName="d" values={edgeShape} dur="16s" calcMode="spline" keySplines=".42 0 .58 1;.42 0 .58 1" repeatCount="indefinite" />
          </path>
        </g>

        <g className="aurora-distant" opacity="0.18" transform="translate(180 470) scale(.72)">
          <path d="M-300 160 C120 40 310 230 620 180 C920 132 1100 10 1900 190 L1900 430 C1200 300 930 390 620 360 C280 330 80 205 -300 355 Z" fill="url(#curtain-glow)" filter="url(#soft-curtain)" />
        </g>
      </svg>

      <div className="aurora-horizon absolute inset-0" />
    </div>
  );
}