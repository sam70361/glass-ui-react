import { Minus, Plus } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { Button } from './button';

export interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export function NumberInput({ value, onChange, min, max, step = 1, className }: NumberInputProps) {
  const clamp = (v: number) => {
    if (min !== undefined) v = Math.max(min, v);
    if (max !== undefined) v = Math.min(max, v);
    return v;
  };
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-[var(--radius-md)] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] p-1',
        className
      )}
    >
      <Button variant="ghost" size="icon-sm" onClick={() => onChange(clamp(value - step))} aria-label="减少">
        <Minus />
      </Button>
      <input
        className="w-14 bg-transparent text-center text-sm font-medium tabular-nums outline-none"
        value={value}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (!Number.isNaN(n)) onChange(clamp(n));
        }}
      />
      <Button variant="ghost" size="icon-sm" onClick={() => onChange(clamp(value + step))} aria-label="增加">
        <Plus />
      </Button>
    </div>
  );
}
