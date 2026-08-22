import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsCoarsePointer } from '@/hooks/useIsCoarsePointer';

/**
 * MagneticButton — desktop only; on coarse pointers it behaves as a normal link.
 * Implements a subtle cursor-following "magnetic" pull (within ~28% of bounds).
 */
export default function Button({
  as = 'button',
  to,
  href,
  children,
  variant = 'primary',
  className = '',
  ...rest
}) {
  const isCoarse = useIsCoarsePointer();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 22, mass: 0.4 });

  const onMove = (e) => {
    if (isCoarse || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const rel = (e.clientX - (r.left + r.width / 2)) / r.width;
    const relY = (e.clientY - (r.top + r.height / 2)) / r.height;
    x.set(rel * 16);
    y.set(relY * 16);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    'group inline-flex items-center gap-2 rounded-full px-5 py-3 text-[0.86rem] font-semibold tracking-[-0.005em] transition-[transform,background,color,border-color,box-shadow] duration-300 ease-soft-out will-change-transform';
  const variants = {
    primary:
      'bg-ink text-bg hover:bg-[#222831] shadow-soft hover:shadow-lift',
    ghost:
      'border border-line bg-surface/80 backdrop-blur-md text-ink hover:bg-surface hover:border-[rgba(17,19,24,0.25)]',
    accent:
      'bg-accent text-white hover:bg-[#5850E8] shadow-soft hover:shadow-lift',
    soft: 'bg-surface-soft text-ink hover:bg-[#E6E8EC]',
  };

  const classNames = cn(base, variants[variant], className);

  const content = (
    <motion.span
      ref={ref}
      className={cn('inline-flex items-center gap-2', classNames)}
      style={isCoarse ? undefined : { x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={isCoarse ? { scale: 0.97 } : { scale: 0.98 }}
      {...rest}
    >
      {children}
    </motion.span>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block">
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="inline-block"
      >
        {content}
      </a>
    );
  }
  return (
    <button type="button" className="inline-block">
      {content}
    </button>
  );
}
