import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { cn } from 'src/lib/utils';

type Variant = 'info' | 'success' | 'warning' | 'danger';

const MAP: Record<Variant, { icon: LucideIcon; cls: string; iconCls: string }> = {
  info: { icon: Info, cls: 'border-[rgba(var(--color-accent-cyan-rgb),0.3)] bg-[rgba(var(--color-accent-cyan-rgb),0.08)]', iconCls: 'text-cyan' },
  success: { icon: CheckCircle2, cls: 'border-[rgba(var(--color-success-rgb),0.3)] bg-[rgba(var(--color-success-rgb),0.08)]', iconCls: 'text-success' },
  warning: { icon: AlertTriangle, cls: 'border-[rgba(var(--color-warning-rgb),0.3)] bg-[rgba(var(--color-warning-rgb),0.08)]', iconCls: 'text-warning' },
  danger: { icon: XCircle, cls: 'border-[rgba(var(--color-danger-rgb),0.3)] bg-[rgba(var(--color-danger-rgb),0.08)]', iconCls: 'text-danger' },
};

export function Alert({
  variant = 'info',
  title,
  children,
  action,
  className,
}: {
  variant?: Variant;
  title?: React.ReactNode;
  children?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  const m = MAP[variant];
  const Icon = m.icon;
  return (
    <div className={cn('flex gap-3 rounded-[var(--radius-md)] border p-3.5', m.cls, className)} role="alert">
      <Icon className={cn('mt-0.5 size-5 shrink-0', m.iconCls)} />
      <div className="min-w-0 flex-1">
        {title && <p className="text-sm font-semibold">{title}</p>}
        {children && <div className="mt-0.5 text-sm text-text-secondary">{children}</div>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
