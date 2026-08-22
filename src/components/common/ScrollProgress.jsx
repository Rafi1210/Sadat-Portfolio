import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    mass: 0.2,
  });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="scroll-progress"
    />
  );
}
