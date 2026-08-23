import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/common/SectionHeading';
import Reveal from '@/components/common/Reveal';
import { skillGroups } from '@/data/skills';
import { siteConfig } from '@/data/siteConfig';
import { ArrowRight } from 'lucide-react';
import { rotateIn, staggerContainer } from '@/lib/motion';

const journey = [
  {
    label: 'Currently',
    title: 'Available, looking for the next team',
    body:
      'Just wrapped my presidency of EWU Robotics Club and NRF26. Open to software engineering roles where I can keep building thoughtful systems and ship meaningful work.',
  },
  {
    label: 'How I build',
    title: 'Frontend engineering meets machine learning',
    body:
      'I enjoy system architecture as much as a clean UI, both feel like puzzle solving. Most of my projects combine a thoughtful interface with a meaningful backend model.',
  },
  {
    label: 'Why',
    title: 'Tech should connect people, not just run',
    body:
      'Leading NRF26, Bangladesh\'s national robotics festival, taught me that the real engineering is people. Technology is most meaningful when it gives others a chance to make something.',
  },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About / {siteConfig.name}</title>
        <meta
          name="description"
          content="The story, the focus areas, and what I'm exploring right now."
        />
      </Helmet>

      <section className="pt-32 pb-16 sm:pt-40">
        <div className="container-page">
          <SectionHeading
            label="about"
            title="A short version of me."
            description="More useful than a resume, less theatrical than a manifesto."
          />
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="container-page grid gap-10 md:grid-cols-12 md:items-center">
          <Reveal className="md:col-span-4">
            <div className="relative mx-auto w-full max-w-[280px]">
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-surface shadow-soft">
                <img
                  src="/assets/portrait.jpg"
                  alt="Portrait of Md. Sadat Ahmed Rafi"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 hidden rounded-2xl border border-line bg-surface px-3 py-2 shadow-soft sm:block">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-muted">
                  he / him
                </p>
                <p className="mt-0.5 font-display text-[0.95rem] font-semibold text-ink">
                  {siteConfig.shortName}.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="md:col-span-8">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink-muted">
              // in one breath
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.7rem,4vw,2.6rem)] font-extrabold leading-[1.1] tracking-tightest text-ink">
              CSE undergrad, building software that earns its place on your screen.
            </h2>
            <p className="mt-5 max-w-2xl text-pretty text-justify text-[1.05rem] leading-relaxed text-ink-secondary">
              I split time between frontend engineering and ML systems, with a
              soft spot for spatial graphs, retrieval pipelines, and the quiet
              plumbing that makes interfaces feel honest. Right now I'm
              actively learning full-stack engineering and system design,
              chasing the gap between shipping a clean UI and knowing what
              happens underneath it.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-soft px-3 py-1 font-mono text-[0.7rem] text-ink-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Open to SWE &amp; AI roles
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-soft px-3 py-1 font-mono text-[0.7rem] text-ink-secondary">
                Dhaka, Bangladesh
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-soft px-3 py-1 font-mono text-[0.7rem] text-ink-secondary">
                CSE · East West University
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line py-20 sm:py-24">
        <div className="container-page grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="space-y-6 text-justify text-[1.02rem] leading-[1.85] text-ink-secondary">
              <Reveal>
                <p>
                  I&apos;m a CSE undergraduate at{' '}
                  <span className="text-ink">East West University</span>,
                  Dhaka, building software that&apos;s honest about what it
                  does and why. I split my time between frontend engineering
                  and machine-learning systems, with a soft spot for the
                  quiet work that makes things feel right.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  My projects tend to start with a problem I&apos;ve actually
                  felt: delivery routes that waste driver time, lost-and-found
                  boards that nobody reads, recommendations that ignore
                  context. The build is the easy part; figuring out what to
                  build is the real engineering.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  Most recently, my undergrad capstone went into{' '}
                  <span className="text-ink">Dropify</span>, a graph-based
                  last-mile delivery platform. It pulled together everything
                  I&apos;d been learning: spatial data, routing, an Android
                  app, a manager dashboard, and the unglamorous plumbing that
                  keeps a system honest.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  I just wrapped my presidency of the EWU Robotics Club,
                  directing a national festival of 2,000+ students and 80+
                  institutions. That work taught me more about systems
                  thinking than any textbook, and I&apos;m grateful for it.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  Now I&apos;m looking for a software engineering role where I
                  can keep building thoughtful systems, open to full-time,
                  contract, or research, with a strong lean toward AI/ML,
                  frontend, and applied graph / RAG work.
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal className="md:col-span-5">
            <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
              <p className="label-mono">// at a glance</p>
              <dl className="mt-5 space-y-4 text-[0.92rem]">
                {[
                  ['Based in', siteConfig.location],
                  ['University', 'East West University'],
                  [
                    'Focus',
                    <>AI <ArrowRight size={11} className="inline" /> Systems <ArrowRight size={11} className="inline" /> Web</>,
                  ],
                  [
                    'Currently',
                    <span className="flex items-center gap-1.5 text-ink">
                      <span className="avail-dot" aria-hidden /> Available for new roles
                    </span>,
                  ],
                  [
                    'Open to',
                    <>SWE <ArrowRight size={11} className="inline" /> AI/ML <ArrowRight size={11} className="inline" /> Frontend</>,
                  ],
                ].map(([k, v], idx, arr) => (
                  <motion.div
                    key={k}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.05 * idx }}
                    className={`flex justify-between gap-4 ${
                      idx < arr.length - 1 ? 'border-b border-line pb-3' : ''
                    }`}
                  >
                    <dt className="text-ink-muted">{k}</dt>
                    <dd className="text-ink">{v}</dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line py-20 sm:py-24">
        <div className="container-page grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="label-mono">// journey</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              How I think about this.
            </h2>
          </div>
          <motion.ol
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="md:col-span-8 space-y-5"
          >
            {journey.map((item, i) => (
              <motion.li
                key={item.title}
                variants={rotateIn}
                whileHover={{ x: 4, borderColor: 'rgba(17,19,24,0.25)' }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                className="rounded-2xl border border-line bg-surface p-6"
              >
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-muted">
                  {item.label}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-pretty text-justify text-[0.94rem] leading-relaxed text-ink-secondary">
                  {item.body}
                </p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      <section className="border-t border-line py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            label="stack"
            title="The full toolkit."
            description="Everything grouped by what I actually use it for."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, i) => (
              <Reveal key={group.id} delay={i * 0.03}>
                <div className="rounded-2xl border border-line bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-[rgba(17,19,24,0.25)]">
                  <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                    {group.title}
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {group.items.map((t, j) => (
                      <motion.li
                        key={t}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: 0.03 * j }}
                        whileHover={{
                          y: -2,
                          backgroundColor: 'rgba(108,99,255,0.10)',
                          borderColor: 'rgba(108,99,255,0.4)',
                          color: '#111318',
                        }}
                        className="cursor-default rounded-md border border-line bg-surface-soft px-2.5 py-1 font-mono text-[0.7rem] text-ink-secondary"
                      >
                        {t}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-20 sm:py-24">
        <div className="container-page grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="label-mono">// currently exploring</p>
          </div>
          <div className="md:col-span-8">
            <p className="text-pretty text-justify text-[1rem] leading-relaxed text-ink-secondary">
              Right now, I&apos;m digging deeper into retrieval-augmented
              systems with agent graphs, graph-based optimisation for real
              road networks, and small-scale fine-tuning experiments. I read
              papers, I ship small, and I try to keep the loop tight.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}