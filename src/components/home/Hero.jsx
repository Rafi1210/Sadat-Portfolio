import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, MapPin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/data/siteConfig';
import Button from '@/components/common/Button';
import { tiltLoop, blurIn } from '@/lib/motion';

const ease = [0.22, 1, 0.36, 1];

function useTypingRoles(roles) {
  const [text, setText] = useState('');
  useEffect(() => {
    let ri = 0;
    let ci = 0;
    let deleting = false;
    let timer;
    const tick = () => {
      const r = roles[ri];
      const next = deleting ? r.slice(0, --ci) : r.slice(0, ++ci);
      setText(next);
      if (!deleting && ci === r.length) {
        deleting = true;
        timer = setTimeout(tick, 1800);
        return;
      }
      if (deleting && ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
      }
      timer = setTimeout(tick, deleting ? 36 : 78);
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [roles]);
  return text;
}

export default function Hero() {
  const role = useTypingRoles(siteConfig.roles);

  const lineOne = ['Md.', 'Sadat', 'Ahmed'];
  const lineTwo = ['Rafi.'];

  // Photo card parallax tilt
  const photoRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 180, damping: 18, mass: 0.5 });
  const smy = useSpring(my, { stiffness: 180, damping: 18, mass: 0.5 });
  const rotateY = useTransform(smx, [-0.5, 0.5], [-7, 7]);
  const rotateX = useTransform(smy, [-0.5, 0.5], [7, -7]);
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const m = window.matchMedia('(pointer: coarse)');
    setCoarse(m.matches);
  }, []);

  const onPhotoMove = (e) => {
    if (coarse || !photoRef.current) return;
    const r = photoRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onPhotoLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div className="container-page relative">
        <div className="grid gap-12 md:grid-cols-12 md:items-start">
          <div className="md:col-span-8">
            <h1 className="font-display text-[clamp(2.9rem,7.5vw,5.8rem)] font-extrabold leading-[0.96] tracking-tightest text-ink">
              <span className="block">
                {lineOne.map((word, i) => (
                  <motion.span
                    key={`l1-${word}-${i}`}
                    initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.09 }}
                    className="inline-block"
                  >
                    {word}
                    {i < lineOne.length - 1 && '\u00A0'}
                  </motion.span>
                ))}
              </span>
              <span className="block">
                {lineTwo.map((word, i) => (
                  <motion.span
                    key={`l2-${word}-${i}`}
                    initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.7,
                      ease,
                      delay: 0.15 + lineOne.length * 0.09 + i * 0.09,
                    }}
                    className="inline-block gradient-text-dark"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.p
              variants={blurIn}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.7, ease, delay: 0.55 }}
              className="mt-7 max-w-2xl text-pretty text-[1.05rem] leading-relaxed text-ink-secondary sm:text-[1.12rem]"
            >
              I build thoughtful digital products, intelligent systems, and
              real-world software. From RAG pipelines and route optimisers to
              national-scale event platforms. CSE undergraduate at{' '}
              <span className="text-ink">{siteConfig.university}</span>, just
              wrapped my presidency of EWU Robotics Club, and looking for the next
              team to build with.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.7 }}
              className="mt-7 flex items-center gap-2 font-mono text-[0.85rem] text-ink-secondary"
              aria-live="polite"
            >
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block h-2 w-2 rounded-full bg-accent"
              />
              <span>{role || '\u00A0'}</span>
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="text-ink-muted"
              >
                |
              </motion.span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.82 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Button as={Link} to="/projects" variant="primary">
                View projects
                <ArrowUpRight size={15} strokeWidth={1.8} />
              </Button>
              <Button as={Link} to="/contact" variant="ghost">
                Contact me
              </Button>
              <Button as="a" href={`mailto:${siteConfig.email}`} variant="soft">
                <Mail size={14} strokeWidth={1.8} />
                Email
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.35 }}
            className="md:col-span-4 md:pt-2"
          >
            <motion.div
              ref={photoRef}
              onMouseMove={onPhotoMove}
              onMouseLeave={onPhotoLeave}
              style={{
                rotateX: coarse ? 0 : rotateX,
                rotateY: coarse ? 0 : rotateY,
                transformStyle: 'preserve-3d',
                transformPerspective: 1200,
              }}
              className="relative mx-auto w-full max-w-[300px]"
            >
              <motion.div
                animate={tiltLoop(2)}
                className="pointer-events-none absolute -inset-6 rounded-[32px] opacity-50 blur-3xl"
                style={{
                  background:
                    'conic-gradient(from 200deg at 50% 50%, rgba(108,99,255,0.45), rgba(255,122,198,0.35), rgba(34,211,238,0.35), rgba(108,99,255,0.45))',
                }}
              />
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                className="gradient-border glass-card relative overflow-hidden rounded-[24px] p-1.5"
              >
                <img
                  src="/portfolio.png"
                  alt="Md. Sadat Ahmed Rafi"
                  className="block aspect-[4/5] w-full rounded-[18px] object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.95 }}
                className="glass-card mt-4 flex items-center justify-between gap-3 rounded-2xl px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="avail-dot" aria-hidden />
                  <div className="leading-tight">
                    <p className="font-display text-[0.86rem] font-semibold text-ink">
                      Available for hire
                    </p>
                    <p className="font-mono text-[0.7rem] text-ink-muted">
                      SWE / AI / Frontend
                    </p>
                  </div>
                </div>
                <a
                  href="/portfolio.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open portrait in new tab"
                  className="grid h-8 w-8 place-items-center rounded-full border border-line bg-surface text-ink-secondary transition-all hover:-translate-y-0.5 hover:border-ink hover:text-ink"
                >
                  <ArrowUpRight size={13} strokeWidth={1.8} />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.95 }}
          whileHover={{ y: -3 }}
          className="glass-card gradient-border shine-sweep mt-12 flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-7"
          data-hover
        >
          <dl className="grid flex-1 grid-cols-2 gap-x-6 gap-y-3 text-[0.82rem] sm:grid-cols-4">
            <div>
              <dt className="label-mono">Status</dt>
              <dd className="mt-1 flex items-center gap-1.5 text-ink">
                <span className="avail-dot" aria-hidden /> Available for hire
              </dd>
            </div>
            <div>
              <dt className="label-mono">Focus</dt>
              <dd className="mt-1 text-ink">AI / Systems / Web</dd>
            </div>
            <div>
              <dt className="label-mono">University</dt>
              <dd className="mt-1 text-ink">EWU, Dhaka</dd>
            </div>
            <div>
              <dt className="label-mono">Based in</dt>
              <dd className="mt-1 flex items-center gap-1 text-ink">
                <MapPin size={11} strokeWidth={1.8} />
                {siteConfig.location}
              </dd>
            </div>
          </dl>
        </motion.div>
      </div>
    </section>
  );
}