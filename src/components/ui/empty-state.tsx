import type { LucideIcon } from 'lucide-react';
import { Inbox } from 'lucide-react';

import { cn } from 'src/lib/utils';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon = Inbox, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 px-6 py-16 text-center', className)}>
      <div className="flex size-14 items-center justify-center rounded-full border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] text-text-tertiary">
        <Icon className="size-6" />
      </div>
      <div className="space-y-1">
        <p className="font-display font-semibold">{title}</p>
        {description && <p className="mx-auto max-w-sm text-sm text-muted-foreground">{description}</p>}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
