import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * MeshBackground - multi-color animated gradient blobs.
 * Mount once at app root. Pure decoration; sits behind all content.
 */
export default function MeshBackground() {
  const reduced = useReducedMotion();

  const blobs = [
    {
      color: 'rgba(108, 99, 255, 0.45)',
      size: 520,
      x: '8%',
      y: '6%',
      animate: { x: ['8%', '18%', '6%'], y: ['6%', '14%', '4%'] },
      duration: 22,
    },
    {
      color: 'rgba(255, 122, 198, 0.40)',
      size: 480,
      x: '70%',
      y: '14%',
      animate: { x: ['70%', '60%', '74%'], y: ['14%', '22%', '10%'] },
      duration: 26,
    },
    {
      color: 'rgba(34, 211, 238, 0.38)',
      size: 560,
      x: '14%',
      y: '60%',
      animate: { x: ['14%', '22%', '10%'], y: ['60%', '52%', '66%'] },
      duration: 30,
    },
    {
      color: 'rgba(163, 255, 108, 0.28)',
      size: 500,
      x: '66%',
      y: '70%',
      animate: { x: ['66%', '58%', '72%'], y: ['70%', '78%', '64%'] },
      duration: 28,
    },
    {
      color: 'rgba(255, 184, 107, 0.28)',
      size: 420,
      x: '40%',
      y: '88%',
      animate: { x: ['40%', '48%', '34%'], y: ['88%', '80%', '92%'] },
      duration: 24,
    },
  ];

  return (
    <div className="mesh-bg" aria-hidden>
      {!reduced &&
        blobs.map((b, i) => (
          <motion.div
            key={i}
            className="mesh-blob"
            style={{
              width: b.size,
              height: b.size,
              background: b.color,
              left: b.x,
              top: b.y,
            }}
            animate={b.animate}
            transition={{
              duration: b.duration,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'mirror',
            }}
          />
        ))}
      {/* Static fallback (also used when reduced motion) */}
      {reduced && (
        <>
          <div
            className="mesh-blob"
            style={{
              width: 520,
              height: 520,
              background: 'rgba(108, 99, 255, 0.30)',
              left: '8%',
              top: '6%',
            }}
          />
          <div
            className="mesh-blob"
            style={{
              width: 480,
              height: 480,
              background: 'rgba(255, 122, 198, 0.28)',
              right: '8%',
              top: '14%',
            }}
          />
          <div
            className="mesh-blob"
            style={{
              width: 560,
              height: 560,
              background: 'rgba(34, 211, 238, 0.24)',
              left: '14%',
              bottom: '8%',
            }}
          />
          <div
            className="mesh-blob"
            style={{
              width: 500,
              height: 500,
              background: 'rgba(163, 255, 108, 0.18)',
              right: '12%',
              bottom: '12%',
            }}
          />
        </>
      )}
      {/* Subtle noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}
