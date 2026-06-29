import { cn } from 'src/lib/utils';
import { DATA_PALETTE } from 'src/theme/palette';

/** 环形仪表（SVG），用于 IoT / 监控指标 */
export function GaugeRing({
  value,
  max = 100,
  label,
  unit = '%',
  color = DATA_PALETTE.cyan,
  size = 96,
  className,
}: {
  value: number;
  max?: number;
  label?: string;
  unit?: string;
  color?: string;
  size?: number;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(1, value / max));
  const r = (size - 12) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className={cn('flex flex-col items-center gap-1.5', className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-track)" strokeWidth={6} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - pct)}
            style={{ transition: 'stroke-dashoffset 0.6s ease', filter: `drop-shadow(0 0 6px ${color}66)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-xl font-bold tabular-nums">{value}</span>
          <span className="text-[10px] text-text-tertiary">{unit}</span>
        </div>
      </div>
      {label && <span className="text-xs text-text-tertiary">{label}</span>}
    </div>
  );
}
