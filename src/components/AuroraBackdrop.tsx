/**
 * Vertical striations of a real aurora curtain: irregular ray widths with
 * bright cores and soft shoulders — the structure you actually see in a
 * nordic display, where rays stand up from a sharper lower border.
 */
const rays = (color: string, alpha: number) => {
  const c = (a: number) => `color-mix(in oklab, ${color} ${Math.round(a)}%, transparent)`;
  return [
    "repeating-linear-gradient(92deg,",
    ` transparent 0 9px, ${c(alpha * 0.35)} 12px, ${c(alpha)} 14px, ${c(alpha * 0.3)} 17px,`,
    ` transparent 21px 30px, ${c(alpha * 0.55)} 33px, ${c(alpha * 0.15)} 36px,`,
    ` transparent 40px 47px, ${c(alpha * 0.85)} 50px, ${c(alpha * 0.25)} 53px,`,
    " transparent 58px 74px)",
  ].join("");
};

/**
 * Real curtains are brightest along their lower border and dissolve upward
 * into rays, with soft lateral falloff — never a hard-edged box.
 */
const curtainMask =
  "linear-gradient(to top, black 0%, rgba(0,0,0,0.92) 18%, rgba(0,0,0,0.55) 52%, rgba(0,0,0,0.18) 80%, transparent 100%), radial-gradient(85% 120% at 50% 100%, black 20%, rgba(0,0,0,0.6) 60%, transparent 92%)";


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
          opacity: 0.36,
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
          opacity: 0.26,
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
          opacity: 0.18,
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
              baseFrequency="0.0018 0.006"
              numOctaves={2}
              seed={7}
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="21s"
                values="0.0018 0.006; 0.0032 0.009; 0.0012 0.004; 0.0018 0.006"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={18}
              xChannelSelector="R"
              yChannelSelector="G"
            >
              <animate
                attributeName="scale"
                dur="13s"
                values="12;30;18;12"
                repeatCount="indefinite"
              />
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>

      <div className="absolute inset-0" style={{ filter: "url(#aurora-warp) saturate(1.25) brightness(1.45)" }}>
        {/* main curtain: rays standing up from a bright lower border */}
        <div
          className="aurora-curtain"
          style={{
            top: "2%",
            left: "-10%",
            width: "82%",
            height: "56%",
            opacity: 1,
            backgroundImage: rays("var(--aurora-green)", 95),
            backgroundSize: "260% 100%",
            WebkitMaskImage: curtainMask,
            maskImage: curtainMask,
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
            animationDuration: "26s, 11s",
          }}
        />
        {/* bright lower border of that curtain */}
        <div
          className="aurora-curtain"
          style={{
            top: "34%",
            left: "-10%",
            width: "82%",
            height: "18%",
            opacity: 0.6,
            filter: "blur(26px)",
            background:
              "linear-gradient(to top, transparent 0%, color-mix(in oklab, var(--aurora-green) 55%, transparent) 55%, transparent 100%)",
            animationDuration: "26s, 11s",
          }}
        />

        {/* second, teal curtain drifting out of phase */}
        <div
          className="aurora-curtain"
          style={{
            top: "0%",
            left: "36%",
            width: "66%",
            height: "50%",
            opacity: 0.78,
            backgroundImage: rays("var(--aurora-teal)", 85),
            backgroundSize: "300% 100%",
            WebkitMaskImage: curtainMask,
            maskImage: curtainMask,
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
            animationDuration: "34s, 15s",
            animationDelay: "-13s, -6s",
          }}
        />

        {/* faint distant curtain low in the sky */}
        <div
          className="aurora-curtain"
          style={{
            bottom: "-10%",
            left: "4%",
            width: "74%",
            height: "42%",
            opacity: 0.5,
            backgroundImage: rays("var(--aurora-green)", 70),
            backgroundSize: "280% 100%",
            WebkitMaskImage: curtainMask,
            maskImage: curtainMask,
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
            animationDuration: "46s, 21s",
            animationDelay: "-24s, -9s",
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
          opacity: 0.18,
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
            "linear-gradient(to bottom, transparent 0%, color-mix(in oklab, var(--night) 15%, transparent) 55%, color-mix(in oklab, var(--night) 45%, transparent) 100%)",
        }}
      />
    </div>
  );
}
