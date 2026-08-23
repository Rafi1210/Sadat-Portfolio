import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Briefcase,
  Rocket,
  FlaskConical,
  Users,
  Mail,
  Send,
  Check,
  Copy,
  Loader2,
  AlertCircle,
} from 'lucide-react';
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
          value ?? 'N/A'
        )}
      </p>
    </div>
  );
}

function Field({
  id,
  label,
  type = 'text',
  value,
  onChange,
  required,
  error,
  placeholder,
  maxLength,
  disabled,
}) {
  const hasError = Boolean(error);
  return (
    <div>
      <label
        htmlFor={id}
        className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-muted"
      >
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? `${id}-error` : undefined}
        required={required}
        className={`mt-2 w-full rounded-xl border bg-bg/40 px-3.5 py-2.5 font-mono text-[0.86rem] text-ink placeholder:text-ink-muted/70 transition-all focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:opacity-60 ${
          hasError
            ? 'border-red-300 focus:border-red-400'
            : 'border-line focus:border-ink'
        }`}
      />
      {hasError && (
        <p
          id={`${id}-error`}
          className="mt-1.5 flex items-center gap-1 font-mono text-[0.7rem] text-red-600"
        >
          <AlertCircle size={11} strokeWidth={2.2} />
          {error}
        </p>
      )}
    </div>
  );
}

function TextArea({
  id,
  label,
  value,
  onChange,
  required,
  error,
  placeholder,
  maxLength,
  rows = 5,
  disabled,
}) {
  const hasError = Boolean(error);
  const remaining = maxLength ? maxLength - value.length : null;
  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-muted"
        >
          {label}
          {required && <span className="ml-1 text-accent">*</span>}
        </label>
        {remaining !== null && (
          <span className="font-mono text-[0.66rem] text-ink-muted">
            {remaining}
          </span>
        )}
      </div>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        disabled={disabled}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? `${id}-error` : undefined}
        required={required}
        className={`mt-2 w-full resize-y rounded-xl border bg-bg/40 px-3.5 py-2.5 font-mono text-[0.86rem] leading-relaxed text-ink placeholder:text-ink-muted/70 transition-all focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:opacity-60 ${
          hasError
            ? 'border-red-300 focus:border-red-400'
            : 'border-line focus:border-ink'
        }`}
      />
      {hasError && (
        <p
          id={`${id}-error`}
          className="mt-1.5 flex items-center gap-1 font-mono text-[0.7rem] text-red-600"
        >
          <AlertCircle size={11} strokeWidth={2.2} />
          {error}
        </p>
      )}
    </div>
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ContactFormSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState('idle'); // 'idle' | 'submitting' | 'success'
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
    } catch {
      /* clipboard may be unavailable */
    }
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 1500);
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!form.email.trim()) {
      next.email = 'Please enter your email.';
    } else if (!EMAIL_RE.test(form.email.trim())) {
      next.email = 'That email does not look right.';
    }
    if (form.subject.length > 120) {
      next.subject = 'Subject is too long (max 120 chars).';
    }
    if (!form.message.trim()) {
      next.message = 'Please add a message.';
    } else if (form.message.trim().length < 10) {
      next.message = 'A few more words would help — at least 10 characters.';
    } else if (form.message.length > 2000) {
      next.message = 'Message is too long (max 2000 chars).';
    }
    return next;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) {
      // focus the first errored field for keyboard users
      const firstKey = Object.keys(v).find((k) => k !== '_form');
      if (firstKey) {
        const el = document.getElementById(firstKey);
        if (el) el.focus();
      }
      return;
    }

    setFormState('submitting');
    try {
      const body = new FormData(e.currentTarget);
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams([...body.entries()]).toString(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSubmittedEmail(form.email.trim());
      setFormState('success');
    } catch (err) {
      setFormState('idle');
      setErrors({
        _form:
          'Could not send right now. Please email me directly at ' +
          siteConfig.email +
          '.',
      });
    }
  };

  const resetForm = () => {
    setForm({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setFormState('idle');
    setSubmittedEmail('');
  };

  return (
    <section className="border-t border-line py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          label="send a message"
          title="Or just write to me."
          description="Drop a note below. Submissions go straight to my inbox and I usually reply within a day."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-12">
          {/* Sidebar */}
          <Reveal className="md:col-span-4">
            <div className="space-y-6">
              <div className="rounded-2xl border border-line bg-surface p-6">
                <p className="label-mono">// direct email</p>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="group mt-3 inline-flex items-center gap-2 rounded-md border border-line bg-surface-soft px-3 py-2 font-mono text-[0.85rem] text-ink transition-all hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-bg"
                  aria-label="Copy email address to clipboard"
                >
                  <Mail size={13} strokeWidth={1.8} />
                  <span>{siteConfig.email}</span>
                  <AnimatePresence mode="wait" initial={false}>
                    {emailCopied ? (
                      <motion.span
                        key="copied"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.18 }}
                      >
                        <Check size={12} strokeWidth={2.2} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.18 }}
                      >
                        <Copy size={12} strokeWidth={1.8} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              <div className="rounded-2xl border border-line bg-surface p-6">
                <p className="label-mono">// response time</p>
                <p className="mt-3 text-pretty text-justify text-[0.92rem] leading-relaxed text-ink-secondary">
                  I read every message personally. Expect a reply within 24
                  hours on weekdays. For longer threads, I will propose a quick
                  call to talk through details.
                </p>
                <div className="mt-5 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                  <p className="font-mono text-[0.72rem] text-ink-secondary">
                    Currently available for new work
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal className="md:col-span-8" delay={0.05}>
            <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
              <AnimatePresence mode="wait" initial={false}>
                {formState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    role="status"
                    aria-live="polite"
                    className="flex flex-col items-start gap-3 py-6"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-500/10 text-emerald-600">
                      <Check size={20} strokeWidth={2.2} />
                    </span>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-ink">
                      Message sent. Thank you.
                    </h3>
                    <p className="text-pretty text-justify text-[0.96rem] leading-relaxed text-ink-secondary">
                      Your note landed in my inbox. I will reply to{' '}
                      <span className="text-ink">{submittedEmail}</span> within
                      24 hours. If something urgent came up, feel free to
                      follow up on Twitter or GitHub.
                    </p>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="link-underline mt-2 inline-flex items-center gap-1 text-[0.82rem] font-medium text-ink"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    netlify-honeypot="bot-field"
                    onSubmit={onSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    noValidate
                    className="space-y-5"
                  >
                    {/* Netlify hidden fields — required for build to detect and activate the form */}
                    <input type="hidden" name="form-name" value="contact" />
                    {/* Honeypot — humans never see this; bots fill it */}
                    <p className="hidden" aria-hidden="true">
                      <label>
                        Don&apos;t fill this out if you&apos;re human:{' '}
                        <input name="bot-field" tabIndex={-1} autoComplete="off" />
                      </label>
                    </p>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        id="name"
                        label="Your name"
                        required
                        value={form.name}
                        onChange={(v) => setForm({ ...form, name: v })}
                        error={errors.name}
                        placeholder="Jane Doe"
                        disabled={formState === 'submitting'}
                      />
                      <Field
                        id="email"
                        label="Email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(v) => setForm({ ...form, email: v })}
                        error={errors.email}
                        placeholder="jane@example.com"
                        disabled={formState === 'submitting'}
                      />
                    </div>

                    <Field
                      id="subject"
                      label="Subject"
                      value={form.subject}
                      onChange={(v) => setForm({ ...form, subject: v })}
                      error={errors.subject}
                      placeholder="What is this about?"
                      maxLength={120}
                      disabled={formState === 'submitting'}
                    />

                    <TextArea
                      id="message"
                      label="Message"
                      required
                      value={form.message}
                      onChange={(v) => setForm({ ...form, message: v })}
                      error={errors.message}
                      placeholder="Tell me a bit about what you are building, the timeline, and what would make this a yes for both of us."
                      maxLength={2000}
                      rows={6}
                      disabled={formState === 'submitting'}
                    />

                    {errors._form && (
                      <div
                        role="alert"
                        className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50/60 px-3 py-2.5 text-[0.82rem] text-red-700"
                      >
                        <AlertCircle size={14} strokeWidth={2} className="mt-0.5 shrink-0" />
                        <span>{errors._form}</span>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <p className="font-mono text-[0.72rem] text-ink-muted">
                        Submissions are routed through Netlify. No tracking, no
                        newsletter.
                      </p>
                      <motion.button
                        type="submit"
                        disabled={formState === 'submitting'}
                        whileHover={formState === 'submitting' ? undefined : { y: -2 }}
                        whileTap={formState === 'submitting' ? undefined : { scale: 0.97 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                        className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[0.86rem] font-semibold text-bg shadow-soft transition-all hover:bg-[#222831] hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {formState === 'submitting' ? (
                          <>
                            <Loader2 size={15} strokeWidth={2} className="animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send message
                            <Send size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function Contact() {
  const { data, status } = useCodeforces(siteConfig.socials.codeforcesHandle);
  return (
    <>
      <Helmet>
        <title>Contact | {siteConfig.name}</title>
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
            description="I read every message. Pick whichever channel is easiest. I will reply."
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
                    Live data unavailable. Handle:{' '}
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

      <ContactFormSection />
    </>
  );
}