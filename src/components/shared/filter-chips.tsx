import { cn } from 'src/lib/utils';

export interface ChipOption {
  id: string;
  label: string;
  count?: number;
}

/** 通用筛选 chip 组（全息选中态） */
export function FilterChips({
  options,
  value,
  onChange,
  className,
}: {
  options: ChipOption[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={cn(
            'flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
            value === o.id
              ? 'holographic-bg text-[var(--color-holo-foreground)]'
              : 'bg-[var(--color-glass-bg)] text-text-secondary hover:bg-[var(--color-glass-bg-hover)]'
          )}
        >
          {o.label}
          {o.count !== undefined && (
            <span className={cn('text-xs', value === o.id ? 'text-[var(--color-holo-foreground)]/70' : 'text-text-tertiary')}>
              {o.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
