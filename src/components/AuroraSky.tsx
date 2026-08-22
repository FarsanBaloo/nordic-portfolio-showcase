type Props = {
  /** Softer, lower-contrast variant used behind long content bands. */
  subtle?: boolean;
};

const rays = (color: string, alpha: number) =>
  `repeating-linear-gradient(96deg, transparent 0 6px, color-mix(in oklab, ${color} ${alpha}%, transparent) 8px, transparent 14px, color-mix(in oklab, ${color} ${Math.round(alpha * 0.55)}%, transparent) 20px, transparent 30px)`;

const fade = "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, black 22%, transparent 96%)";

/**
 * Decorative northern-lights (norrsken) backdrop over a near-black sky.
 * Pure CSS — no canvas, no images, respects prefers-reduced-motion.
 */
export function AuroraSky({ subtle = false }: Props) {
  const k = subtle ? 0.45 : 1;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* near-black sky with faint high-atmosphere glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 85% at 50% -15%, color-mix(in oklab, var(--night-soft) 70%, transparent) 0%, var(--night) 58%, black 100%)",
        }}
      />

      {/* stars */}
      <div
        className="absolute inset-0"
        style={{
          opacity: subtle ? 0.35 : 0.65,
          backgroundImage:
            "radial-gradient(1px 1px at 12% 22%, white, transparent), radial-gradient(1px 1px at 28% 8%, white, transparent), radial-gradient(1.4px 1.4px at 46% 30%, white, transparent), radial-gradient(1px 1px at 63% 12%, white, transparent), radial-gradient(1px 1px at 78% 26%, white, transparent), radial-gradient(1.2px 1.2px at 88% 6%, white, transparent), radial-gradient(1px 1px at 8% 52%, white, transparent), radial-gradient(1px 1px at 36% 62%, white, transparent), radial-gradient(1px 1px at 70% 55%, white, transparent), radial-gradient(1.3px 1.3px at 94% 44%, white, transparent), radial-gradient(1px 1px at 20% 38%, white, transparent), radial-gradient(1px 1px at 55% 45%, white, transparent)",
          animation: "star-breathe 9s ease-in-out infinite",
        }}
      />

      {/* curtain 1 — main green band */}
      <div
        className="aurora-curtain"
        style={{
          top: "-8%",
          left: "-12%",
          width: "80%",
          height: subtle ? "52%" : "68%",
          opacity: 0.85 * k,
          backgroundImage: rays("var(--aurora-green)", 70),
          backgroundSize: "200% 100%",
          WebkitMaskImage: fade,
          maskImage: fade,
          animationDuration: "26s, 20s",
        }}
      />

      {/* curtain 2 — teal, offset */}
      <div
        className="aurora-curtain"
        style={{
          top: "-4%",
          left: "26%",
          width: "70%",
          height: subtle ? "46%" : "60%",
          opacity: 0.7 * k,
          backgroundImage: rays("var(--aurora-teal)", 58),
          backgroundSize: "220% 100%",
          WebkitMaskImage: fade,
          maskImage: fade,
          animationDuration: "34s, 27s",
          animationDelay: "-9s, -5s",
        }}
      />

      {/* curtain 3 — violet edge */}
      <div
        className="aurora-curtain"
        style={{
          top: "2%",
          left: "6%",
          width: "60%",
          height: subtle ? "38%" : "48%",
          opacity: 0.45 * k,
          backgroundImage: rays("var(--aurora-violet)", 50),
          backgroundSize: "180% 100%",
          WebkitMaskImage: fade,
          maskImage: fade,
          animationDuration: "42s, 33s",
          animationDelay: "-17s, -11s",
        }}
      />

      {/* soft glow bloom behind the curtains */}
      <div
        className="aurora-ribbon"
        style={{
          top: "-10%",
          left: "-10%",
          width: "85%",
          height: subtle ? "40%" : "55%",
          opacity: subtle ? 0.22 : 0.4,
          background:
            "linear-gradient(100deg, transparent 0%, color-mix(in oklab, var(--aurora-green) 45%, transparent) 40%, color-mix(in oklab, var(--aurora-teal) 35%, transparent) 70%, transparent 100%)",
          borderRadius: "50%",
          animationDuration: "30s",
        }}
      />

      {/* horizon fade to black */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3"
        style={{
          background: "linear-gradient(to bottom, transparent, black 88%)",
        }}
      />
    </div>
  );
}
