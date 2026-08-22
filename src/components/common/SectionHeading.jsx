import { motion } from 'framer-motion';
import { letterRise, staggerContainer } from '@/lib/motion';

/**
 * SectionHeading — title with character-rise animation, label reveals first.
 * Splits the title into words so each word rises independently.
 */
export default function SectionHeading({
  label,
  title,
  description,
  align = 'left',
  className = '',
}) {
  const alignment =
    align === 'center' ? 'items-center text-center' : 'items-start text-left';

  const words = title ? title.split(' ') : [];

  return (
    <div className={`flex flex-col gap-3 ${alignment} ${className}`}>
      {label && (
        <motion.p
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="label-mono inline-flex items-center gap-2"
        >
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: 24 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="inline-block h-px bg-accent"
          />
          <span>{label}</span>
        </motion.p>
      )}
      {title && (
        <motion.h2
          variants={staggerContainer(0.045, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="heading-display flex flex-wrap text-balance text-[clamp(2rem,3.8vw,3rem)] leading-[1.05] tracking-[-0.03em]"
        >
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              variants={letterRise}
              className="inline-block"
            >
              {word}
              {i < words.length - 1 && '\u00A0'}
            </motion.span>
          ))}
        </motion.h2>
      )}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="max-w-2xl text-pretty text-[1rem] leading-[1.65] text-ink-secondary"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}