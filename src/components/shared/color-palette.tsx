import { cn } from 'src/lib/utils';

export interface Swatch {
  name: string;
  value: string;
  ratio?: number;
}

/** 色板展示（用于素材库色彩系统、Copilot 配色建议） */
export function ColorPalette({ swatches, className }: { swatches: Swatch[]; className?: string }) {
  return (
    <div className={cn('grid grid-cols-2 gap-2 sm:grid-cols-4', className)}>
      {swatches.map((s) => (
        <div key={s.name} className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-glass-border)]">
          <div className="h-16 w-full" style={{ background: s.value }} />
          <div className="flex items-center justify-between gap-2 px-2.5 py-2">
            <div className="min-w-0">
              <p className="truncate text-xs font-medium">{s.name}</p>
              <p className="font-mono text-[10px] uppercase text-text-tertiary">{s.value}</p>
            </div>
            {s.ratio !== undefined && <span className="text-xs text-text-tertiary">{s.ratio}%</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
