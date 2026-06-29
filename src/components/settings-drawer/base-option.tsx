import type { LucideIcon } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { Switch } from 'src/components/ui/switch';

/** 卡片式开关项：左上图标 + 右上开关 + 左下标签 */
export function BaseOption({
  icon: Icon,
  label,
  selected,
  onToggle,
}: {
  icon: LucideIcon;
  label: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        'flex flex-col items-start gap-5 rounded-[var(--radius-lg)] border p-3.5 text-left transition-all',
        selected
          ? 'border-[rgba(var(--color-accent-cyan-rgb),0.4)] bg-[rgba(var(--color-accent-cyan-rgb),0.08)] shadow-[var(--shadow-z1)]'
          : 'border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] hover:bg-[var(--color-glass-bg-hover)]'
      )}
    >
      <div className="flex w-full items-center justify-between">
        <Icon className={cn('size-5', selected ? 'text-cyan' : 'text-text-tertiary')} />
        <Switch checked={selected} className="pointer-events-none" />
      </div>
      <span className="text-[13px] font-semibold">{label}</span>
    </button>
  );
}
