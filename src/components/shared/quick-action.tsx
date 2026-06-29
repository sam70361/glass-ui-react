import type { LucideIcon } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { DATA_PALETTE } from 'src/theme/palette';

export interface QuickActionProps {
  icon: LucideIcon;
  label: string;
  color?: string;
  onClick?: () => void;
}

/** 快捷操作卡（仪表盘） */
export function QuickAction({ icon: Icon, label, color = DATA_PALETTE.cyan, onClick }: QuickActionProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group flex flex-col items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] py-4 transition-all hover:-translate-y-0.5 hover:bg-[var(--color-glass-bg-hover)]'
      )}
    >
      <span
        className="flex size-10 items-center justify-center rounded-full transition-transform group-hover:scale-110"
        style={{ background: `${color}1f`, color }}
      >
        <Icon className="size-5" />
      </span>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}
