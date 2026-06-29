import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { Card } from 'src/components/ui/card';
import { Sparkline, type SeriesPoint } from 'src/components/charts';
import { DATA_PALETTE } from 'src/theme/palette';

export interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  spark?: SeriesPoint[];
  color?: string;
}

export function StatCard({ label, value, change, icon: Icon, spark, color = DATA_PALETTE.cyan }: StatCardProps) {
  const up = (change ?? 0) >= 0;
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div className="flex size-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-glass-bg-active)]" style={{ color }}>
          <Icon className="size-5" />
        </div>
        {change !== undefined && (
          <span className={cn('flex items-center gap-0.5 text-xs font-medium', up ? 'text-success' : 'text-danger')}>
            {up ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
            {Math.abs(change)}%
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="font-display text-3xl font-bold tabular-nums">{value}</p>
        <p className="mt-1 text-sm text-text-tertiary">{label}</p>
      </div>
      {spark && (
        <div className="mt-3">
          <Sparkline data={spark} color={color} height={40} />
        </div>
      )}
    </Card>
  );
}
