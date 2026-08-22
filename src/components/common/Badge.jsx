import { cn } from '@/lib/utils';

export default function Badge({ children, className = '', variant = 'default' }) {
  const styles = {
    default: 'border-line bg-surface-soft text-ink-secondary',
    outline: 'border-[rgba(17,19,24,0.18)] bg-transparent text-ink',
    accent: 'border-accent-line bg-accent-soft text-accent',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.7rem] tracking-wide text-ink-secondary',
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
