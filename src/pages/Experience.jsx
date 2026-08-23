import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/common/SectionHeading';
import Reveal from '@/components/common/Reveal';
import { experience } from '@/data/experience';
import { siteConfig } from '@/data/siteConfig';
import { staggerContainer, blurIn } from '@/lib/motion';

export default function Experience() {
  return (
    <>
      <Helmet>
        <title>Experience | {siteConfig.name}</title>
        <meta
          name="description"
          content="Leadership roles, technical direction, and the work behind them."
        />
      </Helmet>

      <section className="pt-32 pb-12 sm:pt-40">
        <div className="container-page">
          <SectionHeading
            label="experience"
            title="A focused timeline."
            description="Roles I have held: what I owned, what I learned, and what changed."
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-page">
          <div className="relative">
            {/* timeline rail — animated draw */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ originY: 0 }}
              className="absolute bottom-0 left-[7px] top-2 hidden w-px bg-line md:block"
            />

            <motion.ol
              variants={staggerContainer(0.18, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-6"
            >
              {experience.map((item, i) => (
                <motion.li
                  key={item.id}
                  variants={blurIn}
                  className="relative md:pl-10"
                >
                  {/* dot — pulses subtly */}
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-0 top-6 hidden h-3.5 w-3.5 -translate-x-1/2 rounded-full border-[3px] border-surface bg-ink md:block"
                  >
                    {item.current && (
                      <motion.span
                        animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                        className="absolute inset-0 rounded-full bg-accent"
                      />
                    )}
                  </motion.span>

                  <motion.article
                    whileHover={{ y: -3, borderColor: 'rgba(17,19,24,0.25)' }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-3xl border border-line bg-surface p-6 sm:p-8"
                  >
                      <header className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-muted">
                            {item.period}
                            {item.current && (
                              <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-accent-soft px-1.5 py-0.5 text-[0.6rem] text-accent">
                                <span className="h-1 w-1 rounded-full bg-accent" />
                                Current
                              </span>
                            )}
                          </p>
                          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                            {item.role}
                          </h2>
                          <p className="mt-1 font-mono text-[0.8rem] text-ink-secondary">
                            {item.organization}
                          </p>
                        </div>
                        {item.tags && (
                          <ul className="flex flex-wrap gap-1.5">
                            {item.tags.map((t) => (
                              <motion.li
                                key={t}
                                whileHover={{ y: -2, borderColor: 'rgba(108,99,255,0.4)' }}
                                className="rounded-md border border-line bg-surface-soft px-2.5 py-1 font-mono text-[0.7rem] text-ink-secondary"
                              >
                                {t}
                              </motion.li>
                            ))}
                          </ul>
                        )}
                      </header>

                      <p className="mt-5 text-pretty text-justify text-[0.96rem] leading-relaxed text-ink-secondary">
                        {item.summary}
                      </p>

                      {item.highlights && (
                        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                          {item.highlights.map((h, idx) => (
                            <motion.li
                              key={h}
                              initial={{ opacity: 0, x: -8 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: 0.05 * idx }}
                              className="flex items-start gap-2 text-[0.9rem] text-ink-secondary"
                            >
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                              <span>{h}</span>
                            </motion.li>
                          ))}
                        </ul>
                      )}

                      {item.stats && (
                        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                          {item.stats.map((s, idx) => (
                            <motion.div
                              key={s.label}
                              initial={{ opacity: 0, y: 10, scale: 0.96 }}
                              whileInView={{ opacity: 1, y: 0, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: 0.08 * idx }}
                              whileHover={{ y: -3 }}
                              className="rounded-xl border border-line bg-surface-soft p-4"
                            >
                              <span className="block font-display text-2xl font-bold text-ink sm:text-3xl">
                                {s.value}
                              </span>
                              <span className="mt-1 block text-[0.74rem] text-ink-muted">
                                {s.label}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {item.quote && (
                        <blockquote className="mt-6 border-l-2 border-line pl-4 text-[0.92rem] italic leading-relaxed text-ink-secondary">
                          &ldquo;{item.quote}&rdquo;
                        </blockquote>
                      )}
                  </motion.article>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            label="competitive programming"
            title="Problem solving under constraints."
            description="A regular practice on Codeforces, LeetCode, and HackerRank."
          />
          <Reveal className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              'Dynamic Programming',
              'Graph Algorithms',
              'Binary Search',
              'Greedy',
              'STL & Data Structures',
              'Mathematics',
              'Divide & Conquer',
              'Number Theory',
            ].map((t) => (
              <div
                key={t}
                className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="font-mono text-[0.8rem] text-ink-secondary">
                  {t}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}