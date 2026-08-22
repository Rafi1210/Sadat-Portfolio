import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

/**
 * Reveal — wraps children with a viewport-triggered fade-up.
 * Use for sections and individual blocks that should animate in.
 */
export default function Reveal({
  children,
  variants = fadeUp,
  className,
  as: Component = 'div',
  delay = 0,
  once = true,
  amount = 0.15,
  ...rest
}) {
  const MotionComp = motion[Component] || motion.div;
  return (
    <MotionComp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </MotionComp>
  );
}
