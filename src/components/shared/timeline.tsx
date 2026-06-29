import { cn } from 'src/lib/utils';
import { DATA_PALETTE } from 'src/theme/palette';

export type TimelineColor = 'cyan' | 'magenta' | 'amber' | 'success' | 'danger';

const DOT: Record<TimelineColor, string> = {
  cyan: DATA_PALETTE.cyan,
  magenta: DATA_PALETTE.magenta,
  amber: DATA_PALETTE.amber,
  success: DATA_PALETTE.emerald,
  danger: DATA_PALETTE.red,
};

/**
 * 垂直时间线（移植 glass .timeline 风格）：连接线 + 发光色点 + 内容 + 时间。
 */
export function Timeline({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'relative ps-1',
        'before:absolute before:bottom-2 before:start-[6px] before:top-2 before:w-px before:bg-[var(--color-glass-border)]',
        className
      )}
    >
      {children}
    </div>
  );
}

export function TimelineItem({
  color = 'cyan',
  children,
  time,
  last,
}: {
  color?: TimelineColor;
  children: React.ReactNode;
  time?: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={cn('relative flex gap-3.5', !last && 'pb-4')}>
      <span
        className="relative z-10 mt-1 size-3 shrink-0 rounded-full ring-4 ring-[var(--color-bg-primary)]"
        style={{ background: DOT[color], boxShadow: `0 0 8px ${DOT[color]}88` }}
      />
      <div className="-mt-0.5 min-w-0 flex-1">
        <div className="text-sm leading-snug">{children}</div>
        {time && <div className="mt-0.5 text-xs text-text-muted">{time}</div>}
      </div>
    </div>
  );
}
