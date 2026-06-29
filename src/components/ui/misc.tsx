import type { LucideIcon } from 'lucide-react';
import { Check, Copy, FileQuestion } from 'lucide-react';
import { useState } from 'react';

import { cn } from 'src/lib/utils';
import { DATA_PALETTE } from 'src/theme/palette';

/** 横向时间线（步骤/里程碑横排） */
export function HorizontalTimeline({
  items,
  className,
}: {
  items: { label: string; time?: string; color?: string; done?: boolean }[];
  className?: string;
}) {
  return (
    <div className={cn('flex items-start', className)}>
      {items.map((it, i) => (
        <div key={i} className={cn('flex items-center', i < items.length - 1 && 'flex-1')}>
          <div className="flex flex-col items-center gap-1.5 text-center">
            <span
              className="size-3 rounded-full ring-4 ring-[var(--color-bg-primary)]"
              style={{ background: it.color ?? (it.done ? DATA_PALETTE.emerald : DATA_PALETTE.cyan), boxShadow: `0 0 8px ${it.color ?? DATA_PALETTE.cyan}88` }}
            />
            <span className="whitespace-nowrap text-xs font-medium">{it.label}</span>
            {it.time && <span className="text-[10px] text-text-muted">{it.time}</span>}
          </div>
          {i < items.length - 1 && <span className="mx-2 mt-1.5 h-px flex-1 self-start bg-[var(--color-glass-border)]" />}
        </div>
      ))}
    </div>
  );
}

/** 标签/Chip（可关闭） */
export function Chip({ children, onClose, className }: { children: React.ReactNode; onClose?: () => void; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full bg-[var(--color-glass-bg-active)] px-2.5 py-1 text-xs font-medium', className)}>
      {children}
      {onClose && (
        <button onClick={onClose} className="text-text-tertiary hover:text-foreground" aria-label="移除">
          ×
        </button>
      )}
    </span>
  );
}

/** 描述列表（label/value 网格） */
export function DescriptionList({ items, columns = 2, className }: { items: { label: string; value: React.ReactNode }[]; columns?: number; className?: string }) {
  return (
    <dl className={cn('grid gap-x-6 gap-y-3', className)} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))` }}>
      {items.map((it, i) => (
        <div key={i} className="min-w-0">
          <dt className="text-xs text-text-tertiary">{it.label}</dt>
          <dd className="mt-0.5 truncate text-sm font-medium">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** 键盘按键样式 */
export function Kbd({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd className={cn('inline-flex h-5 min-w-5 items-center justify-center rounded border border-[var(--color-glass-border)] bg-[var(--color-glass-bg-active)] px-1.5 font-mono text-[11px] text-text-secondary', className)}>
      {children}
    </kbd>
  );
}

/** 结果/空/错误态 */
export function Result({
  icon: Icon = FileQuestion,
  status,
  title,
  description,
  action,
  className,
}: {
  icon?: LucideIcon;
  status?: 'success' | 'warning' | 'danger' | 'info';
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  const color = status === 'success' ? DATA_PALETTE.emerald : status === 'danger' ? DATA_PALETTE.red : status === 'warning' ? DATA_PALETTE.amber : DATA_PALETTE.cyan;
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 px-6 py-12 text-center', className)}>
      <span className="flex size-16 items-center justify-center rounded-full" style={{ background: `${color}1f`, color }}>
        <Icon className="size-8" />
      </span>
      <div className="space-y-1">
        <p className="font-display text-lg font-semibold">{title}</p>
        {description && <p className="mx-auto max-w-sm text-sm text-muted-foreground">{description}</p>}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

/** 环形进度（百分比） */
export function ProgressCircle({ value, size = 64, color = DATA_PALETTE.cyan, className }: { value: number; size?: number; color?: string; className?: string }) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className={cn('relative', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-track)" strokeWidth={4} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={4} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} style={{ transition: 'stroke-dashoffset .5s' }} />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold tabular-nums">{value}%</span>
    </div>
  );
}

/** 复制按钮 */
export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className={cn('inline-flex items-center gap-1.5 text-text-tertiary transition-colors hover:text-foreground', className)}
      aria-label="复制"
    >
      {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
    </button>
  );
}
