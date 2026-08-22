import { motion } from 'framer-motion';
import SectionHeading from '@/components/common/SectionHeading';
import { skillGroups } from '@/data/skills';
import { staggerContainer } from '@/lib/motion';

export default function SkillsPreview() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          label="technical skills"
          title="What I work with."
          description="A working stack, not a wish list. Each tool here has shipped in a real project."
        />

        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.id}
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-[rgba(17,19,24,0.18)]"
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <h3 className="font-display text-[0.92rem] font-semibold tracking-tight text-ink">
                  {group.title}
                </h3>
              </div>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.items.map((t) => (
                  <li
                    key={t}
                    className="rounded-md border border-line bg-surface-soft px-2.5 py-1 font-mono text-[0.7rem] text-ink-secondary"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}