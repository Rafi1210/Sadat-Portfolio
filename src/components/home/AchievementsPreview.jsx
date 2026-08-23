import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import { achievements } from '@/data/achievements';
import { staggerContainer } from '@/lib/motion';

export default function AchievementsPreview() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          label="milestones"
          title="A few turning points."
          description="Roles, projects, and a couple of things I'm proud of."
        />

        <motion.ul
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {achievements.map((a, i) => (
            <motion.li
              key={a.id}
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-[rgba(17,19,24,0.18)]"
            >
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-muted">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-display text-[1.05rem] font-semibold tracking-tight text-ink">
                {a.title}
              </h3>
              <p className="mt-2 text-pretty text-justify text-[0.86rem] leading-relaxed text-ink-secondary">
                {a.description}
              </p>
              <ArrowUpRight
                size={16}
                strokeWidth={1.6}
                className="absolute right-5 top-5 text-ink-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}