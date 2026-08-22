import { cn } from '@/lib/utils';

export default function TechStack({ items, className = '' }) {
  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {items.map((t) => (
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
