import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowUpRight, Briefcase, Rocket, FlaskConical, Users } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import SocialLinks from '@/components/common/SocialLinks';
import Reveal from '@/components/common/Reveal';
import { siteConfig } from '@/data/siteConfig';

function useCodeforces(handle) {
  const [data, setData] = useState({ rating: null, max: null, rank: null, solved: null });
  const [status, setStatus] = useState('loading');
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [info, status] = await Promise.all([
          fetch(`https://codeforces.com/api/user.info?handles=${handle}`).then((r) => r.json()),
          fetch(`https://codeforces.com/api/user.status?handle=${handle}`).then((r) => r.json()),
        ]);
        if (cancelled) return;
        if (info.status === 'OK') {
          const u = info.result[0];
          let solved = null;
          if (status.status === 'OK') {
            solved = new Set(
              status.result.filter((s) => s.verdict === 'OK').map((s) => s.problem.name)
            ).size;
          }
          setData({
            rating: u.rating ?? null,
            max: u.maxRating ?? null,
            rank: u.rank ?? null,
            solved,
          });
          setStatus('ok');
          return;
        }
        setStatus('error');
      } catch {
        if (!cancelled) setStatus('error');
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [handle]);
  return { data, status };
}

function Stat({ label, value, loading }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <p className="label-mono">{label}</p>
      <p className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
        {loading ? (
          <span className="inline-block h-7 w-16 animate-pulse rounded bg-surface-soft" />
        ) : (
          value ?? '—'
        )}
      </p>
    </div>
  );
}

export default function Contact() {
  const { data, status } = useCodeforces(siteConfig.socials.codeforcesHandle);
  return (
    <>
      <Helmet>
        <title>Contact — {siteConfig.name}</title>
        <meta
          name="description"
          content="Get in touch for internships, SWE roles, or research collaborations."
        />
      </Helmet>

      <section className="pt-32 pb-16 sm:pt-40">
        <div className="container-page">
          <SectionHeading
            label="contact"
            title="Have something worth building?"
            description="I read every message. Pick whichever channel is easiest — I'll reply."
          />
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page">
          <Reveal>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-line bg-surface p-6 sm:p-10">
                <p className="label-mono">{`// what I'm open to`}</p>
                <ul className="mt-5 space-y-3 text-[0.96rem] text-ink">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-accent-soft text-accent">
                      <Briefcase size={13} strokeWidth={1.8} />
                    </span>
                    <span>
                      <span className="font-medium">Internships</span> in
                      software engineering, AI/ML, or frontend
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-accent-soft text-accent">
                      <Rocket size={13} strokeWidth={1.8} />
                    </span>
                    <span>
                      <span className="font-medium">SWE roles</span> / full-time
                      or contract, remote or Dhaka-based
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-accent-soft text-accent">
                      <FlaskConical size={13} strokeWidth={1.8} />
                    </span>
                    <span>
                      <span className="font-medium">Research collaborations</span>{' '}
                      in applied AI, retrieval systems, or graph optimisation
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-accent-soft text-accent">
                      <Users size={13} strokeWidth={1.8} />
                    </span>
                    <span>
                      <span className="font-medium">Event partnerships</span> /
                      tech for student festivals and clubs
                    </span>
                  </li>
                </ul>
              </div>
              <div className="rounded-3xl border border-line bg-surface p-6 sm:p-10">
                <p className="label-mono">// codeforces · live</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Stat label="Rating" value={data.rating} loading={status === 'loading'} />
                  <Stat label="Max" value={data.max} loading={status === 'loading'} />
                  <Stat
                    label="Rank"
                    value={data.rank}
                    loading={status === 'loading'}
                  />
                  <Stat
                    label="Solved"
                    value={data.solved}
                    loading={status === 'loading'}
                  />
                </div>
                <a
                  href={siteConfig.socials.codeforces}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-5 inline-flex items-center gap-1 text-[0.82rem] text-ink"
                >
                  View profile
                  <ArrowUpRight size={13} strokeWidth={1.8} />
                </a>
                {status === 'error' && (
                  <p className="mt-3 font-mono text-[0.72rem] text-ink-muted">
                    Live data unavailable — handle:{' '}
                    {siteConfig.socials.codeforcesHandle}
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-page">
          <SectionHeading label="channels" title="Every way to reach me." />
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="mt-8"
          >
            <SocialLinks variant="grid" />
          </motion.div>
        </div>
      </section>
    </>
  );
}