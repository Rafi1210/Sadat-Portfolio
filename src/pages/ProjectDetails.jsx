import { Link, Navigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, ArrowRight, Github, ExternalLink, GraduationCap } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import Reveal from '@/components/common/Reveal';
import { getProjectBySlug, getAdjacentProjects } from '@/data/projects';
import { siteConfig } from '@/data/siteConfig';
import { staggerContainer, letterRise, blurIn } from '@/lib/motion';

function StatRow({ stats }) {
  if (!stats || !stats.length) return null;
  return (
    <motion.div
      variants={staggerContainer(0.08, 0.05)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-2 gap-3 sm:grid-cols-4"
    >
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          variants={{
            hidden: { opacity: 0, y: 16, scale: 0.95 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          whileHover={{ y: -3, borderColor: 'rgba(17,19,24,0.25)' }}
          className="rounded-xl border border-line bg-surface-soft p-4 transition-all"
        >
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.05 }}
            className="block font-display text-2xl font-bold text-ink sm:text-3xl"
          >
            {s.value}
          </motion.span>
          <span className="mt-1 block text-[0.74rem] text-ink-muted">{s.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

function Pipeline({ pipeline }) {
  if (!pipeline || !pipeline.length) return null;
  return (
    <div className="overflow-x-auto">
      <div className="flex items-center gap-2 whitespace-nowrap">
        {pipeline.map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2"
          >
            <span className="rounded-full border border-line bg-surface-soft px-3 py-1.5 font-mono text-[0.74rem] text-ink">
              {step}
            </span>
            {i < pipeline.length - 1 && (
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
                className="text-ink-muted"
              >
                →
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ArchitectureDiagram({ items }) {
  if (!items || !items.length) return null;
  return (
    <motion.div
      variants={staggerContainer(0.12, 0.05)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
    >
      {items.map((item, i) => (
        <motion.div
          key={item.name}
          variants={{
            hidden: { opacity: 0, y: 16, scale: 0.96 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          whileHover={{ y: -4, borderColor: 'rgba(17,19,24,0.25)' }}
          className="relative rounded-2xl border border-line bg-surface p-4 transition-all"
        >
          <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ink-muted">
            0{i + 1}
          </span>
          <h4 className="mt-2 font-display text-[0.96rem] font-semibold tracking-tight text-ink">
            {item.name}
          </h4>
          <p className="mt-1 text-[0.78rem] text-ink-secondary">{item.detail}</p>
          {i < items.length - 1 && (
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
              className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-ink-muted lg:inline"
            >
              ↓
            </motion.span>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

function Gallery({ items, title }) {
  if (!items || !items.length) return null;
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((img, i) => (
        <motion.a
          key={img + i}
          href={`/assets/projects/${img}.svg`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${title} figure ${i + 1} in a new tab`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="group/fig relative block overflow-hidden rounded-2xl border border-line bg-surface"
        >
          <img
            src={`/assets/projects/${img}.svg`}
            alt={`${title} - figure ${i + 1}`}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-soft-out group-hover/fig:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 flex items-end justify-end bg-gradient-to-tl from-black/0 via-black/0 to-black/0 p-3 opacity-0 transition-opacity duration-300 group-hover/fig:opacity-100">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 font-mono text-[0.7rem] font-semibold text-ink shadow-lg">
              <ExternalLink size={11} strokeWidth={2} />
              View
            </span>
          </div>
        </motion.a>
      ))}
    </div>
  );
}

export default function ProjectDetails() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  if (!project) return <Navigate to="/projects" replace />;

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <>
      <Helmet>
        <title>
          {project.title} / {project.category} / {siteConfig.name}
        </title>
        <meta name="description" content={project.summary} />
      </Helmet>

      <article>
        {/* Hero */}
        <section className="relative pt-32 pb-12 sm:pt-40">
          <div className="atmospheric-orb h-[400px] w-[400px] -top-24 -right-24 bg-[rgba(108,99,255,0.10)]" />
          <div className="container-page relative">
            <Reveal>
              <Link
                to="/projects"
                className="link-underline inline-flex items-center gap-1 text-[0.82rem] text-ink-secondary transition-colors hover:text-ink"
              >
                <ArrowLeft size={14} strokeWidth={1.8} />
                All projects
              </Link>
            </Reveal>

            <div className="mt-6 grid gap-8 md:grid-cols-12 md:items-end">
              <div className="md:col-span-8">
                <Reveal>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink-muted">
                      {project.number} / {project.category} / {project.year}
                    </p>
                    {project.capstone && (
                      <span
                        className="inline-flex items-center gap-1 rounded-full border border-ink bg-ink px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-bg"
                        title="Undergrad capstone project"
                      >
                        <GraduationCap size={11} strokeWidth={2} />
                        Capstone
                      </span>
                    )}
                  </div>
                </Reveal>
                <h1 className="mt-3 font-display text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold leading-[1.02] tracking-tightest text-ink">
                  {project.title}
                </h1>
                <Reveal>
                  <p className="mt-5 max-w-2xl text-pretty text-[1.05rem] leading-relaxed text-ink-secondary sm:text-[1.12rem]">
                    {project.tagline || project.summary}
                  </p>
                </Reveal>
              </div>

              <Reveal className="md:col-span-4">
                <div className="rounded-2xl border border-line bg-surface p-5">
                  <p className="label-mono">Stack</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {(project.stack || project.technologies).map((t) => (
                      <li
                        key={t}
                        className="rounded-md border border-line bg-surface-soft px-2.5 py-1 font-mono text-[0.7rem] text-ink-secondary"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  {(project.github || project.demo) && (
                    <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-soft px-3 py-1.5 font-mono text-[0.72rem] font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-bg"
                        >
                          <Github size={12} strokeWidth={1.8} />
                          GitHub
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 font-mono text-[0.72rem] font-semibold text-bg transition-all hover:-translate-y-0.5"
                        >
                          <ExternalLink size={12} strokeWidth={1.8} />
                          Live demo
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Hero image */}
        <Reveal>
          <section className="container-page">
            <a
              href={`/assets/projects/${project.image}.svg`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} hero image in a new tab`}
              className="group/hero relative block overflow-hidden rounded-3xl border border-line bg-surface"
            >
              <img
                src={`/assets/projects/${project.image}.svg`}
                alt={`${project.title} hero image`}
                className="aspect-[16/9] w-full object-cover transition-transform duration-700 ease-soft-out group-hover/hero:scale-[1.02]"
              />
              <div className="pointer-events-none absolute inset-0 flex items-end justify-end bg-gradient-to-tl from-black/0 via-black/0 to-black/0 p-4 opacity-0 transition-opacity duration-300 group-hover/hero:opacity-100">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-2 font-mono text-[0.74rem] font-semibold text-ink shadow-lg">
                  <ExternalLink size={12} strokeWidth={2} />
                  Open image
                </span>
              </div>
            </a>
          </section>
        </Reveal>

        {/* Overview */}
        <section className="py-20 sm:py-24">
          <div className="container-page grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="label-mono">// overview</p>
            </div>
            <Reveal className="md:col-span-8">
              <p className="text-pretty text-[1.05rem] leading-relaxed text-ink sm:text-[1.12rem]">
                {project.overview || project.description}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Problem */}
        {project.problem && (
          <section className="border-t border-line py-20 sm:py-24">
            <div className="container-page grid gap-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="label-mono">// problem</p>
              </div>
              <Reveal className="md:col-span-8">
                <p className="text-pretty text-[1rem] leading-relaxed text-ink-secondary">
                  {project.problem}
                </p>
              </Reveal>
            </div>
          </section>
        )}

        {/* Solution */}
        {project.solution && (
          <section className="border-t border-line py-20 sm:py-24">
            <div className="container-page grid gap-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="label-mono">// solution</p>
              </div>
              <Reveal className="md:col-span-8">
                <p className="text-pretty text-[1rem] leading-relaxed text-ink-secondary">
                  {project.solution}
                </p>
              </Reveal>
            </div>
          </section>
        )}

        {/* Pipeline (e.g., CaseLaw) */}
        {project.pipeline && (
          <section className="border-t border-line py-20 sm:py-24">
            <div className="container-page grid gap-8 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="label-mono">// how it works</p>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">
                  Retrieval → answer flow
                </h3>
              </div>
              <div className="md:col-span-8">
                <Pipeline pipeline={project.pipeline} />
              </div>
            </div>
          </section>
        )}

        {/* Architecture */}
        {project.architecture && (
          <section className="border-t border-line py-20 sm:py-24">
            <div className="container-page">
              <div className="mb-10">
                <p className="label-mono">// architecture</p>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">
                  How the pieces fit together
                </h3>
              </div>
              <ArchitectureDiagram items={project.architecture} />
            </div>
          </section>
        )}

        {/* Stats (e.g., NRF26) */}
        {project.stats && (
          <section className="border-t border-line py-20 sm:py-24">
            <div className="container-page">
              <div className="mb-10">
                <p className="label-mono">// scale</p>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">
                  What it supported
                </h3>
              </div>
              <StatRow stats={project.stats} />
            </div>
          </section>
        )}

        {/* Features */}
        {project.features && (
          <section className="border-t border-line py-20 sm:py-24">
            <div className="container-page">
              <SectionHeading
                label="features"
                title="What it actually does."
              />
              <motion.ul
                variants={staggerContainer(0.07, 0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="mt-10 grid gap-3 sm:grid-cols-2"
              >
                {project.features.map((f, i) => (
                  <motion.li
                    key={f}
                    variants={{
                      hidden: { opacity: 0, x: -12 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                    whileHover={{ x: 3, borderColor: 'rgba(17,19,24,0.25)' }}
                    className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-5"
                  >
                    <motion.span
                      whileInView={{ rotate: [0, 8, 0] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.05 }}
                      className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft font-mono text-[0.7rem] text-accent"
                    >
                      0{i + 1}
                    </motion.span>
                    <span className="text-[0.96rem] leading-relaxed text-ink">
                      {f}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </section>
        )}

        {/* Gallery */}
        {project.gallery && (
          <section className="border-t border-line py-20 sm:py-24">
            <div className="container-page">
              <SectionHeading label="screenshots" title="Selected visuals." />
              <div className="mt-10">
                <Gallery items={project.gallery} title={project.title} />
              </div>
            </div>
          </section>
        )}

        {/* Challenges */}
        {project.challenges && (
          <section className="border-t border-line py-20 sm:py-24">
            <div className="container-page grid gap-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="label-mono">// challenges</p>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">
                  What was hard.
                </h3>
              </div>
              <ul className="md:col-span-8 space-y-3">
                {project.challenges.map((c, i) => (
                  <li
                    key={c}
                    className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-5"
                  >
                    <span className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ink-muted">
                      0{i + 1}
                    </span>
                    <span className="text-[0.96rem] leading-relaxed text-ink-secondary">
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* What I learned */}
        {project.whatILearned && (
          <section className="border-t border-line py-20 sm:py-24">
            <div className="container-page grid gap-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="label-mono">// what I learned</p>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">
                  What stuck with me.
                </h3>
              </div>
              <ul className="md:col-span-8 space-y-3">
                {project.whatILearned.map((c, i) => (
                  <li
                    key={c}
                    className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-5"
                  >
                    <span className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ink-muted">
                      0{i + 1}
                    </span>
                    <span className="text-[0.96rem] leading-relaxed text-ink-secondary">
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Prev / Next navigation */}
        <section className="border-t border-line py-16">
          <div className="container-page">
            <div className="grid gap-3 sm:grid-cols-3">
              {prev && (
                <Link
                  to={`/projects/${prev.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-[rgba(17,19,24,0.18)]"
                >
                  <div>
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-muted">
                      Previous
                    </p>
                    <p className="mt-1 font-display text-base font-semibold text-ink">
                      {prev.title}
                    </p>
                  </div>
                  <ArrowLeft
                    size={18}
                    strokeWidth={1.6}
                    className="text-ink-muted transition-transform duration-300 group-hover:-translate-x-1 group-hover:text-ink"
                  />
                </Link>
              )}
              <Link
                to="/projects"
                className="group flex items-center justify-center gap-2 rounded-2xl border border-line bg-surface-soft p-5 text-center text-[0.86rem] font-medium text-ink-secondary transition-colors hover:bg-[#E6E8EC] hover:text-ink"
              >
                All projects
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.8}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
              {next && (
                <Link
                  to={`/projects/${next.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-[rgba(17,19,24,0.18)]"
                >
                  <div className="text-right">
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-muted">
                      Next
                    </p>
                    <p className="mt-1 font-display text-base font-semibold text-ink">
                      {next.title}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    strokeWidth={1.6}
                    className="text-ink-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink"
                  />
                </Link>
              )}
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
