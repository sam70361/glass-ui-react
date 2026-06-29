import { RotateCcw } from 'lucide-react';

import { cn } from 'src/lib/utils';

/** 带浮动标题徽标与重置入口的分区容器 */
export function OptionBlock({
  title,
  canReset,
  onReset,
  children,
  className,
}: {
  title: string;
  canReset?: boolean;
  onReset?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('relative rounded-[var(--radius-lg)] border border-[var(--color-glass-border)] p-4 pt-5', className)}>
      <span className="absolute -top-3 left-3 inline-flex items-center gap-1 rounded-full bg-foreground px-2.5 py-0.5 text-xs font-semibold text-[var(--color-bg-primary)]">
        {canReset && (
          <button onClick={onReset} className="opacity-70 transition-opacity hover:opacity-100" aria-label="重置">
            <RotateCcw className="size-3" />
          </button>
        )}
        {title}
      </span>
      {children}
    </div>
  );
}
