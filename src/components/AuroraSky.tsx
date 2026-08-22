type Props = {
  /** Softer, lower-contrast variant used behind long content bands. */
  subtle?: boolean;
};

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

/** Fade the curtain out at the top, sides and bottom so it never looks like a box. */
const curtainMask =
  "radial-gradient(120% 100% at 50% 0%, black 0%, rgba(0,0,0,0.75) 45%, transparent 88%), linear-gradient(to bottom, transparent 0%, black 18%, rgba(0,0,0,0.55) 62%, transparent 100%)";

/**
 * Northern-lights (norrsken) backdrop.
 * Deep near-black nordic night sky, dense starfield, and a discreet
 * green aurora arc with faint vertical rays and a violet upper fringe.
 * Pure CSS — respects prefers-reduced-motion.
 */
export function AuroraSky({ subtle = false }: Props) {
  const k = subtle ? 0.5 : 1;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* near-black night sky, faintest airglow at the horizon line */}
      <div className="absolute inset-0" style={{ background: "var(--night)" }} />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(100% 60% at 50% 0%, color-mix(in oklab, var(--night-soft) 55%, transparent) 0%, transparent 70%)",
        }}
      />

      {/* starfield */}
      <div
        className="absolute inset-0"
        style={{
          opacity: subtle ? 0.5 : 0.85,
          backgroundImage:
            "radial-gradient(1px 1px at 12% 22%, white, transparent), radial-gradient(1px 1px at 28% 8%, white, transparent), radial-gradient(1.4px 1.4px at 46% 30%, white, transparent), radial-gradient(1px 1px at 63% 12%, white, transparent), radial-gradient(1px 1px at 78% 26%, white, transparent), radial-gradient(1.2px 1.2px at 88% 6%, white, transparent), radial-gradient(1px 1px at 8% 52%, white, transparent), radial-gradient(1px 1px at 36% 62%, white, transparent), radial-gradient(1px 1px at 70% 55%, white, transparent), radial-gradient(1.3px 1.3px at 94% 44%, white, transparent), radial-gradient(1px 1px at 20% 38%, white, transparent), radial-gradient(1px 1px at 55% 45%, white, transparent), radial-gradient(0.8px 0.8px at 33% 18%, white, transparent), radial-gradient(0.8px 0.8px at 5% 14%, white, transparent), radial-gradient(0.8px 0.8px at 84% 60%, white, transparent), radial-gradient(0.9px 0.9px at 41% 74%, white, transparent), radial-gradient(0.8px 0.8px at 66% 68%, white, transparent), radial-gradient(1px 1px at 98% 18%, white, transparent)",
          animation: "star-breathe 9s ease-in-out infinite",
        }}
      />

      {/* main green arc — soft diffuse glow, low opacity */}
      <div
        className="aurora-ribbon"
        style={{
          top: "-18%",
          left: "-10%",
          width: "80%",
          height: "42%",
          opacity: 0.32 * k,
          background:
            "radial-gradient(60% 55% at 50% 60%, color-mix(in oklab, var(--aurora-green) 60%, transparent) 0%, transparent 72%)",
          animationDuration: "38s",
        }}
      />
      <div
        className="aurora-ribbon"
        style={{
          top: "-10%",
          left: "34%",
          width: "62%",
          height: "34%",
          opacity: 0.2 * k,
          background:
            "radial-gradient(60% 55% at 50% 60%, color-mix(in oklab, var(--aurora-teal) 55%, transparent) 0%, transparent 74%)",
          animationDuration: "52s",
          animationDelay: "-14s",
        }}
      />

      {/* curtain rays — thin vertical striations inside the arc */}
      <div
        className="aurora-curtain"
        style={{
          top: "-12%",
          left: "-8%",
          width: "72%",
          height: "44%",
          opacity: 0.3 * k,
          backgroundImage: rays("var(--aurora-green)", 48),
          backgroundSize: "200% 100%",
          WebkitMaskImage: curtainMask,
          maskImage: curtainMask,
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
          animationDuration: "40s, 30s",
        }}
      />
      <div
        className="aurora-curtain"
        style={{
          top: "-16%",
          left: "30%",
          width: "58%",
          height: "36%",
          opacity: 0.18 * k,
          backgroundImage: rays("var(--aurora-teal)", 42),
          backgroundSize: "230% 100%",
          WebkitMaskImage: curtainMask,
          maskImage: curtainMask,
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
          animationDuration: "56s, 41s",
          animationDelay: "-19s, -8s",
        }}
      />

      {/* faint violet/magenta fringe at the top of the curtain, as in real displays */}
      <div
        className="aurora-ribbon"
        style={{
          top: "-24%",
          left: "0%",
          width: "70%",
          height: "26%",
          opacity: 0.14 * k,
          background:
            "radial-gradient(60% 60% at 50% 70%, color-mix(in oklab, var(--aurora-violet) 60%, transparent) 0%, transparent 75%)",
          animationDuration: "64s",
          animationDelay: "-25s",
        }}
      />

      {/* deep dark toward the horizon */}
      <div
        className="absolute inset-x-0 bottom-0 h-3/4"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--night) 55%, black 100%)",
        }}
      />
    </div>
  );
}
