import SectionHeading from '@/components/common/SectionHeading';
import Reveal from '@/components/common/Reveal';
import { researchInterests } from '@/data/achievements';

export default function ResearchPreview() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          label="research"
          title="What I'm thinking about."
          description="Applied research at the intersection of AI, optimisation, and real systems."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-line bg-surface p-6 sm:p-7">
              <h3 className="font-display text-[1.05rem] font-semibold tracking-tight text-ink">
                Research interests
              </h3>
              <p className="mt-3 text-pretty text-[0.92rem] leading-relaxed text-ink-secondary">
                Drawn to problems at the intersection of AI systems,
                optimisation, and real-world logistics. Interested in how
                retrieval-augmented generation and graph-based optimisation
                apply to delivery, legal systems, and recommendation engines.
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {researchInterests.map((t) => (
                  <li
                    key={t}
                    className="rounded-md border border-line bg-surface-soft px-2.5 py-1 font-mono text-[0.7rem] text-ink-secondary"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal>
            <div className="rounded-2xl border border-line bg-surface p-6 sm:p-7">
              <h3 className="font-display text-[1.05rem] font-semibold tracking-tight text-ink">
                Ongoing work
              </h3>
              <p className="mt-3 text-pretty text-[0.92rem] leading-relaxed text-ink-secondary">
                Developing Dropify as a research-grade delivery optimisation
                system — exploring edge-based interpolation models with
                Shapely and OSM node snapping. Also conducting applied data
                mining research across clustering, text mining, and
                association-rule learning.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-line bg-surface-soft px-3 py-2 font-mono text-[0.74rem] text-ink-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Publications in progress — coming soon.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}