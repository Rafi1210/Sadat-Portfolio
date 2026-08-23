import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/common/Reveal';
import SectionHeading from '@/components/common/SectionHeading';
import { experience } from '@/data/experience';

export default function ExperiencePreview() {
  const items = experience.slice(0, 2);
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading
            label="experience"
            title="Where I've shown up."
            description="Leadership and technical roles focused on getting things shipped."
          />
          <Link
            to="/experience"
            className="link-underline hidden shrink-0 items-center gap-1 text-[0.86rem] text-ink transition-colors hover:text-accent md:inline-flex"
          >
            Full timeline <ArrowUpRight size={14} strokeWidth={1.8} />
          </Link>
        </div>

        <ol className="mt-12 space-y-3">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.05}>
              <li className="grid grid-cols-1 gap-3 rounded-2xl border border-line bg-surface p-6 sm:p-7 md:grid-cols-[1fr_2fr_auto] md:items-center md:gap-8">
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
                  <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
                    {item.role}
                  </h3>
                </div>
                <div>
                  <p className="font-mono text-[0.8rem] text-ink-secondary">
                    {item.organization}
                  </p>
                  <p className="mt-2 text-pretty text-[0.92rem] leading-relaxed text-ink-secondary">
                    {item.summary}
                  </p>
                </div>
                <div className="hidden md:block">
                  <span className="font-mono text-[0.7rem] text-ink-muted">
                    0{i + 1}
                  </span>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}