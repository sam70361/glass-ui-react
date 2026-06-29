import { Check } from 'lucide-react';

import { cn } from 'src/lib/utils';

export interface Step {
  label: string;
  description?: string;
}

function Dot({ index, current }: { index: number; current: number }) {
  const done = index < current;
  const active = index === current;
  return (
    <span
      className={cn(
        'flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors',
        done && 'holographic-bg border-transparent text-[var(--color-holo-foreground)]',
        active && 'border-cyan text-cyan',
        !done && !active && 'border-[var(--color-glass-border)] text-text-tertiary'
      )}
    >
      {done ? <Check className="size-4" /> : index + 1}
    </span>
  );
}

/** 步骤条（横向/竖向），current 为当前索引（0-based） */
export function Stepper({
  steps,
  current,
  orientation = 'horizontal',
  className,
}: {
  steps: Step[];
  current: number;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}) {
  if (orientation === 'vertical') {
    return (
      <div className={cn('flex flex-col', className)}>
        {steps.map((s, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <Dot index={i} current={current} />
              {i < steps.length - 1 && <span className={cn('my-1 w-px flex-1', i < current ? 'bg-cyan' : 'bg-[var(--color-glass-border)]')} />}
            </div>
            <div className="pb-6">
              <p className={cn('text-sm font-medium', i === current ? 'text-foreground' : 'text-text-tertiary')}>{s.label}</p>
              {s.description && <p className="mt-0.5 text-xs text-text-muted">{s.description}</p>}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center', className)}>
      {steps.map((s, i) => (
        <div key={i} className={cn('flex items-center', i < steps.length - 1 && 'flex-1')}>
          <div className="flex items-center gap-2">
            <Dot index={i} current={current} />
            <span className={cn('hidden whitespace-nowrap text-sm font-medium md:block', i === current ? 'text-foreground' : 'text-text-tertiary')}>
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && <span className={cn('mx-3 h-px flex-1', i < current ? 'holographic-bg' : 'bg-[var(--color-glass-border)]')} />}
        </div>
      ))}
    </div>
  );
}
