import { useCallback, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Github,
  ExternalLink,
  GraduationCap,
  Key,
  Copy,
  Check,
  Play,
  Monitor,
  Smartphone,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  Layers,
} from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import Reveal from '@/components/common/Reveal';
import Button from '@/components/common/Button';
import { getProjectBySlug, getAdjacentProjects } from '@/data/projects';
import { siteConfig } from '@/data/siteConfig';
import { staggerContainer, letterRise, blurIn } from '@/lib/motion';

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      /* clipboard may be unavailable — fall back silently */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={`Copy ${value}`}
      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-line bg-surface text-ink-secondary transition-all hover:border-ink hover:bg-ink hover:text-bg"
    >
      <motion.span
        key={copied ? 'check' : 'copy'}
        initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="inline-flex"
      >
        {copied ? <Check size={12} strokeWidth={2.2} /> : <Copy size={12} strokeWidth={1.8} />}
      </motion.span>
    </button>
  );
}

function CredentialRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface px-3.5 py-2.5">
      <div className="min-w-0">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-muted">
          {label}
        </p>
        <p className="mt-0.5 truncate font-mono text-[0.82rem] text-ink">{value}</p>
      </div>
      <CopyButton value={value} />
    </div>
  );
}

function DemoCredentialsCard({ credentials, demoUrl, apkUrl }) {
  if (!credentials || !credentials.length) return null;
  return (
    <Reveal>
      <section className="container-page">
        <div className="rounded-2xl border border-line bg-surface-soft p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-white">
                <Key size={15} strokeWidth={2} />
              </span>
              <div>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-muted">
                  // demo access
                </p>
                <h3 className="font-display text-[1.05rem] font-bold tracking-tight text-ink">
                  Try it yourself. Sign in as hub manager or driver.
                </h3>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {demoUrl && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 font-mono text-[0.7rem] font-semibold text-bg transition-all hover:-translate-y-0.5"
                >
                  Live site
                  <ExternalLink size={11} strokeWidth={1.8} />
                </a>
              )}
              {apkUrl && (
                <a
                  href={apkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[0.7rem] font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-bg"
                >
                  <Download size={11} strokeWidth={2} />
                  Download app
                </a>
              )}
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {credentials.map((c) => (
              <div
                key={c.role}
                className="rounded-2xl border border-line bg-bg/40 p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-ink px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-bg">
                    {c.role}
                  </span>
                </div>
                <div className="mt-3 space-y-2">
                  <CredentialRow label="Email" value={c.email} />
                  <CredentialRow label="Password" value={c.password} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

function DemoVideoBlock({ src, title }) {
  if (!src) return null;
  return (
    <Reveal>
      <section className="container-page">
        <div className="overflow-hidden rounded-3xl border border-line bg-surface">
          <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-soft px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-white">
                <Play size={11} strokeWidth={2.2} fill="currentColor" />
              </span>
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ink-secondary">
                // live walkthrough
              </p>
            </div>
            <a
              href={src.replace('/preview', '/view')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] font-medium text-ink-secondary transition-colors hover:text-ink"
            >
              Open in Drive
              <ExternalLink size={11} strokeWidth={1.8} />
            </a>
          </div>
          <div className="relative aspect-video w-full bg-ink">
            <iframe
              src={src}
              title={`${title} demo video`}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      </section>
    </Reveal>
  );
}

function SurfaceCard({ surface }) {
  const isMobile = surface.kind.toLowerCase().includes('android') ||
    surface.kind.toLowerCase().includes('mobile');
  const Icon = isMobile ? Smartphone : Monitor;
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className="flex flex-col rounded-3xl border border-line bg-surface p-5 sm:p-6"
    >
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-accent-soft text-accent">
          <Icon size={13} strokeWidth={2} />
        </span>
        <span className="rounded-full border border-line bg-surface-soft px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-secondary">
          {surface.kind}
        </span>
      </div>
      <h3 className="mt-3 font-display text-[1.35rem] font-bold tracking-tight text-ink">
        {surface.label}
      </h3>
      <p className="mt-2 text-[0.94rem] leading-relaxed text-ink-secondary">
        {surface.summary}
      </p>

      <div
        className={
          isMobile
            ? 'mt-5 flex justify-center'
            : 'mt-5 overflow-hidden rounded-2xl border border-line bg-surface-soft'
        }
      >
        {isMobile ? (
          <div className="relative w-full max-w-[260px] overflow-hidden rounded-[2rem] border border-line bg-ink p-2 shadow-[0_18px_40px_-12px_rgba(17,19,24,0.35)]">
            <img
              src={`/assets/projects/${surface.image}.png`}
              alt={`${surface.label} screenshot`}
              className="aspect-[9/16] w-full rounded-[1.6rem] object-cover"
              onError={(e) => {
                e.currentTarget.src = `/assets/projects/${surface.image}.svg`;
              }}
            />
          </div>
        ) : (
          <motion.img
            src={`/assets/projects/${surface.image}.png`}
            alt={`${surface.label} screenshot`}
            className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-soft-out hover:scale-[1.02]"
            onError={(e) => {
              e.currentTarget.src = `/assets/projects/${surface.image}.svg`;
            }}
          />
        )}
      </div>

      <ul className="mt-5 space-y-2.5">
        {surface.features.map((f, i) => (
          <li key={f} className="flex items-start gap-3">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft font-mono text-[0.62rem] text-accent">
              0{i + 1}
            </span>
            <span className="text-[0.9rem] leading-relaxed text-ink">
              <InlineBold text={f} />
            </span>
          </li>
        ))}
      </ul>

      {surface.linkUrl && (
        <div className="mt-6">
          <Button
            as="a"
            href={surface.linkUrl}
            variant={isMobile ? 'primary' : 'accent'}
          >
            {surface.linkLabel}
            <ArrowUpRight size={14} strokeWidth={2} />
          </Button>
        </div>
      )}
    </motion.div>
  );
}

function SurfacesSection({ surfaces }) {
  if (!surfaces || !surfaces.length) return null;
  return (
    <section className="border-t border-line py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          label="surfaces"
          title="Two products, one system."
          description="Dropify ships as two coordinated surfaces: one for the hub, one for the road."
        />
        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid gap-6 md:grid-cols-2"
        >
          {surfaces.map((s) => (
            <SurfaceCard key={s.key} surface={s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function StackTable({ stack }) {
  // Renders a clean Component / Technology two-column table.
  // Falls back to a single-column pill list for flat-array stacks (legacy projects).
  if (!stack || !stack.length) return null;
  const grouped =
    typeof stack[0] === 'object' && stack[0].component;
  if (!grouped) {
    return (
      <ul className="flex flex-wrap gap-1.5">
        {stack.map((t) => (
          <li
            key={t}
            className="rounded-md border border-line bg-surface-soft px-2.5 py-1 font-mono text-[0.7rem] text-ink-secondary"
          >
            {t}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <motion.div
      variants={staggerContainer(0.05, 0.05)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="overflow-hidden rounded-2xl border border-line bg-surface"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] border-b border-line bg-surface-soft">
        <div className="px-5 py-3">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-muted">
            Component
          </p>
        </div>
        <div className="border-l border-line px-5 py-3">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-muted">
            Technology
          </p>
        </div>
      </div>
      {stack.map((group, i) => (
        <motion.div
          key={group.component}
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          className={
            'grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)]' +
            (i < stack.length - 1 ? ' border-b border-line' : '')
          }
        >
          <div className="flex items-center px-5 py-3">
            <span className="rounded-md bg-accent-soft px-2 py-0.5 font-mono text-[0.7rem] font-semibold text-accent">
              {group.component}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 border-l border-line px-5 py-3">
            {group.techs.map((t) => (
              <span
                key={t}
                className="rounded-md border border-line bg-surface-soft px-2.5 py-1 font-mono text-[0.74rem] text-ink"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function InlineBold({ text, className = '' }) {
  if (!text) return null;
  // Splits on **markers** while preserving them as <strong> nodes.
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <span className={className}>
      {parts.map((p, i) =>
        p.startsWith('**') && p.endsWith('**') ? (
          <strong key={i} className="font-semibold text-ink">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </span>
  );
}

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

function normalizeGalleryItem(item, idx) {
  if (typeof item === 'string') {
    return { src: item, kind: 'web', caption: `Figure ${idx + 1}` };
  }
  return {
    src: item.src,
    kind: item.kind || 'web',
    caption: item.caption || `Figure ${idx + 1}`,
  };
}

function GalleryTile({ img, index, total, title, onOpen }) {
  const isMobile = img.kind === 'mobile';
  return (
    <motion.button
      type="button"
      onClick={() => onOpen?.(index)}
      aria-label={`Open ${title}: ${img.caption}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={
        isMobile
          ? 'group/fig relative block overflow-hidden rounded-2xl border border-line bg-surface text-left'
          : 'group/fig relative block overflow-hidden rounded-2xl border border-line bg-surface text-left'
      }
    >
      {isMobile ? (
        <div className="flex justify-center bg-surface-soft p-6">
          <div className="relative w-full max-w-[220px] overflow-hidden rounded-[1.6rem] border border-line bg-ink p-1.5 shadow-[0_10px_24px_-8px_rgba(17,19,24,0.18)]">
            <img
              src={`/assets/projects/${img.src}.png`}
              alt={`${title}: ${img.caption}`}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = `/assets/projects/${img.src}.svg`;
              }}
              className="aspect-[9/16] w-full rounded-[1.4rem] object-cover transition-transform duration-700 ease-soft-out group-hover/fig:scale-[1.03]"
            />
          </div>
        </div>
      ) : (
        <img
          src={`/assets/projects/${img.src}.png`}
          alt={`${title}: ${img.caption}`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = `/assets/projects/${img.src}.svg`;
          }}
          className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-soft-out group-hover/fig:scale-[1.03]"
        />
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover/fig:opacity-100">
        <span className="font-mono text-[0.7rem] font-medium text-white/95">
          {img.caption}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 font-mono text-[0.7rem] font-semibold text-ink shadow-lg">
          <ExternalLink size={11} strokeWidth={2} />
          View
        </span>
      </div>
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/55 px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/95 backdrop-blur-md">
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </motion.button>
  );
}

function Gallery({ items, title, onOpen }) {
  const normalized = items.map(normalizeGalleryItem);
  if (!normalized.length) return null;
  const webItems = normalized.filter((i) => i.kind !== 'mobile');
  const mobileItems = normalized.filter((i) => i.kind === 'mobile');

  const indexOf = (img) => normalized.findIndex((n) => n.src === img.src);

  return (
    <div className="space-y-4">
      {webItems.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {webItems.map((img) => (
            <GalleryTile
              key={img.src}
              img={img}
              index={indexOf(img)}
              total={normalized.length}
              title={title}
              onOpen={onOpen}
            />
          ))}
        </div>
      )}
      {mobileItems.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {mobileItems.map((img) => (
            <GalleryTile
              key={img.src}
              img={img}
              index={indexOf(img)}
              total={normalized.length}
              title={title}
              onOpen={onOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const open = index !== null && index !== undefined && index >= 0;
  const item = open ? items[index] : null;

  const handleKey = useCallback(
    (e) => {
      if (!open) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    },
    [open, onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', handleKey);
    };
  }, [open, handleKey]);

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={item.caption}
        >
          <motion.div
            initial={{ scale: 0.96, y: 8 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-4 flex max-h-[88vh] w-full max-w-5xl flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink">
              <img
                src={`/assets/projects/${item.src}.png`}
                alt={item.caption}
                className="max-h-[78vh] w-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = `/assets/projects/${item.src}.svg`;
                }}
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close lightbox"
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white/90 backdrop-blur-md transition-colors hover:bg-black/80"
              >
                <X size={16} strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white/90 backdrop-blur-md transition-colors hover:bg-black/80"
              >
                <ChevronLeft size={18} strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label="Next image"
                className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white/90 backdrop-blur-md transition-colors hover:bg-black/80"
              >
                <ChevronRight size={18} strokeWidth={2} />
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 px-1">
              <p className="truncate font-mono text-[0.78rem] text-white/80">
                <span className="text-white/50">
                  {String(index + 1).padStart(2, '0')} /{' '}
                  {String(items.length).padStart(2, '0')}
                </span>{' '}
                : {item.caption}
              </p>
              <div className="flex shrink-0 gap-2">
                {items.map((t, i) => (
                  <button
                    key={t.src + i}
                    type="button"
                    onClick={() => onNext(i)}
                    aria-label={`Go to image ${i + 1}`}
                    className={`h-1.5 w-6 rounded-full transition-all ${
                      i === index ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ProjectDetails() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  if (!project) return <Navigate to="/projects" replace />;

  const { prev, next } = getAdjacentProjects(slug);

  const galleryItems = (project.gallery || []).map((g, i) =>
    typeof g === 'string' ? { src: g, caption: `Figure ${i + 1}` } : g
  );
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = useCallback(
    (target) => {
      if (lightboxIndex === null) return;
      const next =
        typeof target === 'number'
          ? target
          : (lightboxIndex - 1 + galleryItems.length) % galleryItems.length;
      setLightboxIndex(next);
    },
    [lightboxIndex, galleryItems.length]
  );
  const showNext = useCallback(
    (target) => {
      if (lightboxIndex === null) return;
      const next =
        typeof target === 'number'
          ? target
          : (lightboxIndex + 1) % galleryItems.length;
      setLightboxIndex(next);
    },
    [lightboxIndex, galleryItems.length]
  );

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
                  <p className="label-mono">Links</p>
                  {(project.github || project.demo) && (
                    <div className="mt-3 flex flex-wrap gap-2">
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
              href={`/assets/projects/${project.image}.png`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} hero image in a new tab`}
              className="group/hero relative block overflow-hidden rounded-3xl border border-line bg-surface"
              onError={(e) => {
                e.currentTarget.src = `/assets/projects/${project.image}.svg`;
              }}
            >
              <img
                src={`/assets/projects/${project.image}.png`}
                alt={`${project.title} hero image`}
                className="aspect-[16/9] w-full object-cover transition-transform duration-700 ease-soft-out group-hover/hero:scale-[1.02]"
                onError={(e) => {
                  e.currentTarget.src = `/assets/projects/${project.image}.svg`;
                }}
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

        {/* Stack (component-grouped table) */}
        {project.stack && project.stack.length > 0 && (
          <section className="container-page mt-12">
            <SectionHeading
              label="stack"
              title="The moving parts."
              description="Each component, and the technologies it runs on."
            />
            <div className="mt-8">
              <StackTable stack={project.stack} />
            </div>
          </section>
        )}

        {/* Demo credentials + demo video (Dropify-specific) */}
        {project.demoCredentials && (
          <div className="mt-8 space-y-8">
            <DemoCredentialsCard
              credentials={project.demoCredentials}
              demoUrl={project.demo}
              apkUrl={project.apkUrl}
            />
            <DemoVideoBlock src={project.demoVideo} title={project.title} />
          </div>
        )}

        {/* Overview */}
        <section className="py-20 sm:py-24">
          <div className="container-page grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="label-mono">// overview</p>
            </div>
            <Reveal className="md:col-span-8">
              <p className="text-pretty text-justify text-[1rem] leading-relaxed text-ink-secondary">
                <InlineBold text={project.overview || project.description} />
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
                <p className="text-pretty text-justify text-[1rem] leading-relaxed text-ink-secondary">
                  <InlineBold text={project.problem} />
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
                <p className="text-pretty text-justify text-[1rem] leading-relaxed text-ink-secondary">
                  <InlineBold text={project.solution} />
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

        {/* Architecture (image-based, e.g., Dropify) */}
        {project.architectureImage && (
          <section className="border-t border-line py-20 sm:py-24">
            <div className="container-page">
              <div className="mb-10 max-w-2xl">
                <p className="label-mono">// architecture</p>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  How the pieces fit together
                </h3>
                {project.architectureImage.caption && (
                  <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-secondary">
                    {project.architectureImage.caption}
                  </p>
                )}
              </div>
              <Reveal>
                <div className="overflow-hidden rounded-3xl border border-line bg-surface">
                  <img
                    src={`/assets/projects/${project.architectureImage.src}.png`}
                    alt={`${project.title} system architecture`}
                    className="aspect-[16/9] w-full object-cover transition-transform duration-700 ease-soft-out hover:scale-[1.01]"
                    onError={(e) => {
                      e.currentTarget.src = `/assets/projects/${project.architectureImage.src}.svg`;
                    }}
                  />
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* Architecture diagram (legacy fallback for projects without an architecture image) */}
        {!project.architectureImage && project.architecture && (
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
                      <InlineBold text={f} />
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </section>
        )}

        {/* Surfaces (e.g., Dropify) */}
        {project.surfaces && <SurfacesSection surfaces={project.surfaces} />}

        {/* Gallery */}
        {project.gallery && (
          <section className="border-t border-line py-20 sm:py-24">
            <div className="container-page">
              <SectionHeading
                label="screenshots"
                title="Selected visuals."
                description="Click any screenshot to open the gallery."
              />
              <div className="mt-10">
                <Gallery
                  items={project.gallery}
                  title={project.title}
                  onOpen={openLightbox}
                />
              </div>
            </div>
          </section>
        )}

        {/* Lightbox — mounts once gallery exists */}
        {project.gallery && (
          <Lightbox
            items={galleryItems}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={showPrev}
            onNext={showNext}
          />
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
