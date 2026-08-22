type Props = {
  /** Softer, lower-contrast variant used behind long content bands. */
  subtle?: boolean;
};

/**
 * Decorative northern-lights (norrsken) backdrop.
 * Pure CSS gradients — no canvas, no images, respects prefers-reduced-motion.
 */
export function AuroraSky({ subtle = false }: Props) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% -10%, color-mix(in oklab, var(--night-soft) 90%, transparent) 0%, var(--night) 62%)",
        }}
      />

      {/* stars */}
      <div
        className="absolute inset-0"
        style={{
          opacity: subtle ? 0.3 : 0.5,
          backgroundImage:
            "radial-gradient(1px 1px at 12% 22%, white, transparent), radial-gradient(1px 1px at 28% 8%, white, transparent), radial-gradient(1.4px 1.4px at 46% 30%, white, transparent), radial-gradient(1px 1px at 63% 12%, white, transparent), radial-gradient(1px 1px at 78% 26%, white, transparent), radial-gradient(1.2px 1.2px at 88% 6%, white, transparent), radial-gradient(1px 1px at 8% 52%, white, transparent), radial-gradient(1px 1px at 36% 62%, white, transparent), radial-gradient(1px 1px at 70% 55%, white, transparent), radial-gradient(1.3px 1.3px at 94% 44%, white, transparent)",
          animation: "star-breathe 9s ease-in-out infinite",
        }}
      />

      <div
        className="aurora-ribbon"
        style={{
          top: "-14%",
          left: "-18%",
          width: "88%",
          height: subtle ? "48%" : "62%",
          opacity: subtle ? 0.4 : 1,
          background:
            "linear-gradient(103deg, transparent 0%, color-mix(in oklab, var(--aurora-green) 62%, transparent) 38%, color-mix(in oklab, var(--aurora-teal) 52%, transparent) 68%, transparent 100%)",
          borderRadius: "50%",
          animationDuration: "28s",
        }}
      />
      <div
        className="aurora-ribbon"
        style={{
          top: "4%",
          left: "22%",
          width: "78%",
          height: subtle ? "42%" : "54%",
          opacity: subtle ? 0.32 : 0.82,
          background:
            "linear-gradient(78deg, transparent 0%, color-mix(in oklab, var(--aurora-violet) 48%, transparent) 42%, color-mix(in oklab, var(--aurora-green) 40%, transparent) 76%, transparent 100%)",
          borderRadius: "50%",
          animationDuration: "36s",
          animationDelay: "-8s",
        }}
      />
      <div
        className="aurora-ribbon"
        style={{
          top: "26%",
          left: "-6%",
          width: "70%",
          height: "34%",
          opacity: subtle ? 0.22 : 0.5,
          background:
            "linear-gradient(96deg, transparent 0%, color-mix(in oklab, var(--aurora-teal) 42%, transparent) 50%, transparent 100%)",
          borderRadius: "50%",
          animationDuration: "44s",
          animationDelay: "-16s",
        }}
      />

      {/* horizon fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--night) 92%, black))",
        }}
      />
    </div>
  );
}
