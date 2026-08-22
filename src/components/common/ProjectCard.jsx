import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, GraduationCap } from 'lucide-react';
import { fadeUp, rotateIn } from '@/lib/motion';
import TechStack from './TechStack';
import { cn } from '@/lib/utils';
import { useIsCoarsePointer } from '@/hooks/useIsCoarsePointer';

/**
 * ProjectCard - editorial-style card used on the home page and projects index.
 * Pass `featured` for a larger asymmetric look; `compact` for a simple list row.
 * Includes a subtle pointer tilt on hover (max 2deg).
 */
export default function ProjectCard({
  project,
  index = 0,
  variant = 'featured',
  className = '',
  ...rest
}) {
  if (variant === 'compact') {
    return (
      <motion.div variants={fadeUp} className={className} {...rest}>
        <Link
          to={`/projects/${project.slug}`}
          className="group flex items-center justify-between gap-6 border-b border-line py-6 transition-colors hover:bg-surface-soft"
        >
          <div className="flex items-center gap-6">
            <span className="font-mono text-xs text-ink-muted">
              {project.number}
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold tracking-tight text-ink group-hover:text-accent">
                {project.title}
              </h3>
              <p className="text-sm text-ink-secondary">{project.category}</p>
            </div>
          </div>
          <ArrowUpRight
            size={18}
            className="text-ink-muted transition-transform duration-300 ease-soft-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink"
            strokeWidth={1.6}
          />
        </Link>
      </motion.div>
    );
  }

  const isFeatured = variant === 'featured';
  const coarse = useIsCoarsePointer();
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 22, mass: 0.4 });
  const sry = useSpring(ry, { stiffness: 220, damping: 22, mass: 0.4 });

  const onMove = (e) => {
    if (coarse || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 3); // max ~3deg
    rx.set(-((e.clientY - (r.top + r.height / 2)) / r.height) * 3);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.article
      ref={ref}
      variants={rotateIn}
      style={{
        rotateX: coarse ? 0 : srx,
        rotateY: coarse ? 0 : sry,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-white/60 bg-white/55 p-6 backdrop-blur-xl shadow-glass transition-all duration-500 ease-soft-out hover:-translate-y-1 hover:border-white/80 hover:shadow-glass-lift sm:p-8',
        className
      )}
      data-hover
      {...rest}
    >
      {/* gradient border on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(135deg, rgba(108,99,255,0.18), rgba(255,122,198,0.14) 50%, rgba(34,211,238,0.14))',
          padding: 1,
          WebkitMask:
            'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink-muted">
            {project.number}
            <span className="mx-1.5 text-ink-muted/50">/</span>
            {project.category}
          </span>
          {project.capstone && (
            <span
              className="inline-flex items-center gap-1 rounded-full border border-line bg-surface-soft px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink"
              title="Undergrad capstone project"
            >
              <GraduationCap size={10} strokeWidth={2} />
              Capstone
            </span>
          )}
        </div>
        <Link
          to={`/projects/${project.slug}`}
          aria-label={`View case study: ${project.title}`}
          className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-ink-secondary transition-all duration-300 ease-soft-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-ink group-hover:text-ink"
        >
          <ArrowUpRight size={15} strokeWidth={1.8} />
        </Link>
      </div>

      <Link to={`/projects/${project.slug}`} className="block">
        <h3
          className={cn(
            'mt-5 font-display font-bold tracking-tighter text-ink',
            isFeatured ? 'text-3xl sm:text-4xl' : 'text-2xl'
          )}
        >
          {project.title}
        </h3>
        <p className="mt-2 max-w-prose text-balance text-[0.96rem] leading-relaxed text-ink-secondary">
          {project.tagline || project.summary}
        </p>
      </Link>

      <a
        href={`/assets/projects/${project.image}.svg`}
        target="_blank"
        rel="noopener noreferrer"
        className="group/img shine-sweep mt-6 block overflow-hidden rounded-2xl border border-line bg-surface-soft"
        aria-label={`Open ${project.title} preview in a new tab`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <motion.img
            src={`/assets/projects/${project.image}.svg`}
            alt={`${project.title} preview`}
            loading="lazy"
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="pointer-events-none absolute inset-0 flex items-end justify-end bg-gradient-to-tl from-black/0 via-black/0 to-black/0 p-3 opacity-0 transition-opacity duration-300 group-hover/img:opacity-100">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 font-mono text-[0.7rem] font-semibold text-ink shadow-lg">
              <ExternalLink size={11} strokeWidth={2} />
              View image
            </span>
          </div>
        </div>
      </a>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <TechStack items={project.stack || project.technologies} />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
          }}
          className="flex flex-wrap items-center gap-3"
        >
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              variants={{
                hidden: { opacity: 0, y: 6 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
              }}
              whileHover={{ y: -2 }}
              className="link-underline inline-flex items-center gap-1 text-[0.8rem] font-medium text-ink"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={13} strokeWidth={1.8} />
              Code
            </motion.a>
          )}
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              variants={{
                hidden: { opacity: 0, y: 6 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
              }}
              whileHover={{ y: -2 }}
              className="link-underline inline-flex items-center gap-1 text-[0.8rem] font-medium text-ink"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={13} strokeWidth={1.8} />
              Demo
            </motion.a>
          )}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 6 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
            }}
            whileHover={{ x: 3 }}
          >
            <Link
              to={`/projects/${project.slug}`}
              className="link-underline inline-flex items-center gap-1 text-[0.8rem] font-medium text-accent"
            >
              Case study <ArrowUpRight size={13} strokeWidth={1.8} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.article>
  );
}