import * as React from 'react';

import { cn } from 'src/lib/utils';
import { SimpleTooltip } from 'src/components/ui/tooltip';

/** 工具条容器 */
export function Toolbar({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('flex flex-wrap items-center gap-1 rounded-[var(--radius-md)] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] p-1', className)}>
      {children}
    </div>
  );
}

export function ToolbarButton({
  active,
  className,
  title,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  const btn = (
    <button
      type="button"
      className={cn(
        'flex size-8 items-center justify-center rounded-[var(--radius-sm)] text-text-secondary transition-colors hover:bg-[var(--color-glass-bg-hover)] hover:text-foreground [&_svg]:size-4',
        active && 'bg-[var(--color-glass-bg-active)] text-cyan',
        className
      )}
      {...props}
    />
  );
  return title ? <SimpleTooltip content={title}>{btn}</SimpleTooltip> : btn;
}

export function ToolbarSeparator({ className }: { className?: string }) {
  return <span className={cn('mx-0.5 h-5 w-px self-center bg-[var(--color-glass-border)]', className)} />;
}
