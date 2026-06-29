import { cn } from 'src/lib/utils';

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <svg viewBox="0 0 64 64" className="size-8 shrink-0" aria-hidden>
        <defs>
          <linearGradient id="glass-ui-logo" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-accent-cyan)" />
            <stop offset="50%" stopColor="var(--color-accent-magenta)" />
            <stop offset="100%" stopColor="var(--color-accent-amber)" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="18" fill="none" stroke="url(#glass-ui-logo)" strokeWidth="4.5" />
        <circle cx="32" cy="32" r="6" fill="url(#glass-ui-logo)" />
      </svg>
      {showText && <span className="font-display text-lg font-bold tracking-tight">Glass UI</span>}
    </div>
  );
}
