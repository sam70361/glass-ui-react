import { Minus, Plus, RotateCcw } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { SimpleTooltip } from 'src/components/ui/tooltip';

/** 缩放控件：- / 百分比 / + / 重置 */
export function ZoomControl({
  zoom,
  onZoom,
  min = 0.25,
  max = 2,
  step = 0.1,
  className,
}: {
  zoom: number;
  onZoom: (z: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}) {
  const clamp = (z: number) => Math.max(min, Math.min(max, Math.round(z * 100) / 100));
  return (
    <div className={cn('inline-flex items-center gap-1 rounded-[var(--radius-md)] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] p-1', className)}>
      <button onClick={() => onZoom(clamp(zoom - step))} className="flex size-7 items-center justify-center rounded-[var(--radius-sm)] text-text-tertiary hover:bg-[var(--color-glass-bg-hover)] hover:text-foreground" aria-label="缩小">
        <Minus className="size-4" />
      </button>
      <SimpleTooltip content="重置">
        <button onClick={() => onZoom(1)} className="min-w-12 text-center text-xs font-medium tabular-nums">
          {Math.round(zoom * 100)}%
        </button>
      </SimpleTooltip>
      <button onClick={() => onZoom(clamp(zoom + step))} className="flex size-7 items-center justify-center rounded-[var(--radius-sm)] text-text-tertiary hover:bg-[var(--color-glass-bg-hover)] hover:text-foreground" aria-label="放大">
        <Plus className="size-4" />
      </button>
      <button onClick={() => onZoom(1)} className="flex size-7 items-center justify-center rounded-[var(--radius-sm)] text-text-tertiary hover:bg-[var(--color-glass-bg-hover)] hover:text-foreground" aria-label="重置">
        <RotateCcw className="size-3.5" />
      </button>
    </div>
  );
}
