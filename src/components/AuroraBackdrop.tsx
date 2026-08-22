/** Vertical striations of a real aurora curtain: thin, irregular, mostly transparent. */
const rays = (color: string, alpha: number) =>
  [
    `repeating-linear-gradient(94deg,`,
    ` transparent 0 11px,`,
    ` color-mix(in oklab, ${color} ${alpha}%, transparent) 13px,`,
    ` transparent 16px 27px,`,
    ` color-mix(in oklab, ${color} ${Math.round(alpha * 0.5)}%, transparent) 29px,`,
    ` transparent 33px 52px)`,
  ].join("");

const curtainMask =
  "radial-gradient(120% 100% at 50% 0%, black 0%, rgba(0,0,0,0.75) 45%, transparent 88%), linear-gradient(to bottom, transparent 0%, black 20%, rgba(0,0,0,0.5) 65%, transparent 100%)";

const stars =
  "radial-gradient(1px 1px at 12% 22%, white, transparent), radial-gradient(1px 1px at 28% 8%, white, transparent), radial-gradient(1.4px 1.4px at 46% 30%, white, transparent), radial-gradient(1px 1px at 63% 12%, white, transparent), radial-gradient(1px 1px at 78% 26%, white, transparent), radial-gradient(1.2px 1.2px at 88% 6%, white, transparent), radial-gradient(1px 1px at 8% 52%, white, transparent), radial-gradient(1px 1px at 36% 62%, white, transparent), radial-gradient(1px 1px at 70% 55%, white, transparent), radial-gradient(1.3px 1.3px at 94% 44%, white, transparent), radial-gradient(1px 1px at 20% 38%, white, transparent), radial-gradient(1px 1px at 55% 45%, white, transparent), radial-gradient(0.8px 0.8px at 33% 18%, white, transparent), radial-gradient(0.8px 0.8px at 5% 14%, white, transparent), radial-gradient(0.8px 0.8px at 84% 60%, white, transparent), radial-gradient(0.9px 0.9px at 41% 74%, white, transparent), radial-gradient(0.8px 0.8px at 66% 68%, white, transparent), radial-gradient(1px 1px at 98% 18%, white, transparent), radial-gradient(0.9px 0.9px at 16% 86%, white, transparent), radial-gradient(0.8px 0.8px at 52% 92%, white, transparent), radial-gradient(1px 1px at 74% 84%, white, transparent), radial-gradient(0.8px 0.8px at 90% 76%, white, transparent)";

/**
 * Global night sky: fixed behind the entire site.
 * Near-black nordic sky, starfield, and a discreet animated aurora
 * that drifts across the whole viewport. Pure CSS, GPU-friendly.
 */
export function AuroraBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "var(--night)" }}
    >
      {/* faint airglow near the top */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 70% at 50% 0%, color-mix(in oklab, var(--night-soft) 60%, transparent) 0%, transparent 72%)",
        }}
      />

      {/* starfield (two layers, different densities/breathing) */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.9,
          backgroundImage: stars,
          animation: "star-breathe 9s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.5,
          backgroundImage: stars,
          backgroundSize: "63% 47%",
          animation: "star-breathe 14s ease-in-out infinite reverse",
        }}
      />

      {/* diffuse aurora glows drifting across the sky */}
      <div
        className="aurora-ribbon"
        style={{
          top: "-14%",
          left: "-12%",
          width: "85%",
          height: "58%",
          opacity: 0.28,
          background:
            "radial-gradient(58% 52% at 50% 55%, color-mix(in oklab, var(--aurora-green) 60%, transparent) 0%, transparent 72%)",
          animationDuration: "42s",
        }}
      />
      <div
        className="aurora-ribbon"
        style={{
          top: "6%",
          left: "32%",
          width: "70%",
          height: "48%",
          opacity: 0.18,
          background:
            "radial-gradient(58% 52% at 50% 55%, color-mix(in oklab, var(--aurora-teal) 55%, transparent) 0%, transparent 74%)",
          animationDuration: "58s",
          animationDelay: "-16s",
        }}
      />
      <div
        className="aurora-ribbon"
        style={{
          bottom: "-6%",
          left: "-6%",
          width: "78%",
          height: "42%",
          opacity: 0.12,
          background:
            "radial-gradient(60% 55% at 50% 45%, color-mix(in oklab, var(--aurora-green) 50%, transparent) 0%, transparent 76%)",
          animationDuration: "70s",
          animationDelay: "-31s",
        }}
      />

      {/* animated turbulence warp: makes the curtains ripple and fold */}
      <svg aria-hidden="true" className="absolute h-0 w-0">
        <defs>
          <filter id="aurora-warp" x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.006 0.02"
              numOctaves={2}
              seed={7}
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="21s"
                values="0.006 0.02; 0.013 0.031; 0.004 0.016; 0.006 0.02"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={90}
              xChannelSelector="R"
              yChannelSelector="G"
            >
              <animate
                attributeName="scale"
                dur="13s"
                values="70;130;85;70"
                repeatCount="indefinite"
              />
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>

      <div className="absolute inset-0" style={{ filter: "url(#aurora-warp)" }}>
        {/* curtain rays — thin vertical striations, top and lower band */}
        <div
          className="aurora-curtain"
          style={{
            top: "-10%",
            left: "-8%",
            width: "78%",
            height: "62%",
            opacity: 0.26,
            backgroundImage: rays("var(--aurora-green)", 46),
            backgroundSize: "200% 100%",
            WebkitMaskImage: curtainMask,
            maskImage: curtainMask,
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
            animationDuration: "44s, 34s",
          }}
        />
        <div
          className="aurora-curtain"
          style={{
            top: "2%",
            left: "34%",
            width: "62%",
            height: "54%",
            opacity: 0.16,
            backgroundImage: rays("var(--aurora-teal)", 40),
            backgroundSize: "230% 100%",
            WebkitMaskImage: curtainMask,
            maskImage: curtainMask,
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
            animationDuration: "60s, 45s",
            animationDelay: "-21s, -9s",
          }}
        />
        <div
          className="aurora-curtain"
          style={{
            bottom: "-14%",
            left: "6%",
            width: "70%",
            height: "46%",
            opacity: 0.1,
            backgroundImage: rays("var(--aurora-green)", 38),
            backgroundSize: "210% 100%",
            WebkitMaskImage: curtainMask,
            maskImage: curtainMask,
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
            animationDuration: "76s, 52s",
            animationDelay: "-37s, -14s",
          }}
        />
      </div>

      {/* faint violet fringe */}
      <div
        className="aurora-ribbon"
        style={{
          top: "-20%",
          left: "4%",
          width: "72%",
          height: "34%",
          opacity: 0.12,
          background:
            "radial-gradient(60% 60% at 50% 70%, color-mix(in oklab, var(--aurora-violet) 60%, transparent) 0%, transparent 75%)",
          animationDuration: "66s",
          animationDelay: "-25s",
        }}
      />

      {/* horizon darkening so text stays readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, color-mix(in oklab, var(--night) 55%, transparent) 45%, color-mix(in oklab, var(--night) 80%, transparent) 100%)",
        }}
      />
    </div>
  );
}
