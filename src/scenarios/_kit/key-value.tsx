import { cn } from 'src/lib/utils';

/** 键值行列表，用于配置/详情展示 */
export function KeyValueList({ items, className }: { items: { label: string; value: React.ReactNode }[]; className?: string }) {
  return (
    <dl className={cn('divide-y divide-[var(--color-glass-border)]', className)}>
      {items.map((it, i) => (
        <div key={i} className="flex items-center justify-between gap-4 py-2.5 text-sm">
          <dt className="text-text-tertiary">{it.label}</dt>
          <dd className="min-w-0 truncate text-end font-medium">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
