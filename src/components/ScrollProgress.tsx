import { motion, useScroll, useSpring } from "motion/react";

/** Extremely subtle page-progress hairline at the right edge (desktop only). */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-2 top-24 bottom-24 z-40 hidden w-px bg-foreground/10 md:block"
    >
      <motion.div className="h-full w-px origin-top bg-primary/50" style={{ scaleY }} />
    </div>
  );
}
