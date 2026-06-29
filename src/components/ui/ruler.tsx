import { cn } from 'src/lib/utils';

/**
 * 刻度尺：横向/竖向，随缩放刷新刻度。用于排版设计器边框。
 */
export function Ruler({
  orientation = 'horizontal',
  length,
  zoom = 1,
  step = 10,
  majorEvery = 5,
  className,
}: {
  orientation?: 'horizontal' | 'vertical';
  length: number;
  zoom?: number;
  step?: number;
  majorEvery?: number;
  className?: string;
}) {
  const horizontal = orientation === 'horizontal';
  const ticks = Math.floor(length / (step * zoom));
  const marks = Array.from({ length: ticks + 1 }, (_, i) => i);

  return (
    <div
      className={cn('relative overflow-hidden bg-[var(--color-surface-sunken)] text-text-muted', horizontal ? 'h-6 w-full border-b' : 'h-full w-6 border-e', 'border-[var(--color-glass-border)]', className)}
    >
      {marks.map((i) => {
        const pos = i * step * zoom;
        const major = i % majorEvery === 0;
        return (
          <div
            key={i}
            className="absolute bg-[var(--color-glass-border-hover)]"
            style={
              horizontal
                ? { left: pos, bottom: 0, width: 1, height: major ? 10 : 5 }
                : { top: pos, right: 0, height: 1, width: major ? 10 : 5 }
            }
          >
            {major && (
              <span
                className="absolute font-mono text-[9px]"
                style={horizontal ? { left: 2, bottom: 10 } : { top: 1, right: 11, writingMode: 'vertical-rl' }}
              >
                {i * step}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
