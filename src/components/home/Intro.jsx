import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/common/Reveal';
import { staggerContainer } from '@/lib/motion';

const stats = [
  { value: '5', label: 'Shipped projects' },
  { value: '1', label: 'Undergrad capstone' },
  { value: '2K+', label: 'Event participants' },
  { value: '80+', label: 'Institutions reached' },
];

export default function Intro() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <p className="label-mono">// about</p>
            </Reveal>
            <Reveal>
              <h2 className="mt-3 max-w-xl font-display text-[clamp(1.9rem,3.5vw,2.8rem)] font-bold leading-[1.1] tracking-tighter text-ink">
                Engineering ideas into{' '}
                <span className="text-accent">real, useful</span> software.
              </h2>
            </Reveal>
            <div className="mt-7 space-y-5 text-justify text-[1rem] leading-[1.85] text-ink-secondary">
              <Reveal>
                <p>
                  I&apos;m a CSE undergraduate at{' '}
                  <span className="text-ink">East West University</span> in
                  Dhaka, obsessed with building things that actually solve
                  problems, from AI-powered retrieval systems to last-mile
                  delivery platforms.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  My work sits where{' '}
                  <span className="text-ink">
                    frontend engineering meets machine learning
                  </span>
                  . I enjoy system architecture as much as a clean UI, both
                  feel like puzzle solving to me.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  I just wrapped my presidency of the EWU Robotics Club,
                  where I led events bringing together 2,000+ students from
                  across Bangladesh. Now I&apos;m looking for a team that
                  takes thoughtful engineering as seriously as I do.
                </p>
              </Reveal>
            </div>
            <Reveal>
              <Link
                to="/about"
                className="link-underline mt-7 inline-flex items-center gap-1 text-[0.86rem] font-medium text-ink"
              >
                More about me <ArrowUpRight size={14} strokeWidth={1.8} />
              </Link>
            </Reveal>
          </div>

          <motion.div
            variants={staggerContainer(0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 gap-3 md:col-span-5 md:gap-4"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                variants={{
                  hidden: { opacity: 0, y: 18, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                whileHover={{ y: -4, borderColor: 'rgba(17,19,24,0.25)' }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                className="group/stat rounded-2xl border border-line bg-surface p-5 sm:p-6"
              >
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.05 }}
                  className="block font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
                >
                  {s.value}
                </motion.span>
                <span className="mt-2 block text-[0.78rem] text-ink-muted transition-colors group-hover/stat:text-ink-secondary">
                  {s.label}
                </span>
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-3 block h-px origin-left bg-gradient-to-r from-accent/60 via-accent/30 to-transparent"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}