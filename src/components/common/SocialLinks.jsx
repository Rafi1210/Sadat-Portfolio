import { Github, Code2, FileText, Mail } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

const icons = {
  github: Github,
  codeforces: Code2,
  resume: FileText,
  mail: Mail,
};

const labels = {
  github: 'GitHub',
  codeforces: 'Codeforces',
  resume: 'Resume',
  mail: 'Email',
};

export default function SocialLinks({ variant = 'stack', className = '' }) {
  const items = [
    { id: 'github', href: siteConfig.socials.github },
    { id: 'codeforces', href: siteConfig.socials.codeforces },
    { id: 'resume', href: siteConfig.resumeUrl },
    { id: 'mail', href: `mailto:${siteConfig.email}` },
  ];

  if (variant === 'inline') {
    return (
      <ul className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${className}`}>
        {items.map(({ id, href }) => {
          const Icon = icons[id];
          const external = href.startsWith('http') || href.startsWith('mailto');
          return (
            <li key={id}>
              <a
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="link-underline inline-flex items-center gap-1.5 text-[0.82rem] text-ink-secondary transition-colors hover:text-ink"
                aria-label={labels[id]}
              >
                <Icon size={14} strokeWidth={1.6} />
                <span>{labels[id]}</span>
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className={`grid gap-3 sm:grid-cols-2 ${className}`}>
      {items.map(({ id, href }) => {
        const Icon = icons[id];
        const value =
          id === 'mail'
            ? siteConfig.email
            : id === 'github'
            ? 'github.com/Rafi1210'
            : id === 'codeforces'
            ? 'codeforces.com/profile/Rafi1210'
            : 'Download CV';
        return (
          <li key={id}>
            <a
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group flex items-center gap-3 rounded-2xl border border-line bg-surface px-5 py-4 transition-all duration-300 ease-soft-out hover:-translate-y-0.5 hover:border-[rgba(17,19,24,0.18)] hover:bg-surface-soft"
              aria-label={`${labels[id]} - ${value}`}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-surface-soft text-ink-secondary transition-colors group-hover:text-ink">
                <Icon size={16} strokeWidth={1.6} />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-ink-muted">
                  {labels[id]}
                </span>
                <span className="truncate text-[0.84rem] text-ink">{value}</span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}