import { cn } from 'src/lib/utils';
import { SimpleTooltip } from 'src/components/ui/tooltip';
import { DATA_PALETTE } from 'src/theme/palette';

/** 贡献热力图（GitHub 风格）：52 周 × 7 天 */
export function ContributionHeatmap({
  data,
  weeks = 52,
  color = DATA_PALETTE.emerald,
  className,
}: {
  /** 长度 weeks*7 的强度数组(0-4)，缺省随机演示 */
  data?: number[];
  weeks?: number;
  color?: string;
  className?: string;
}) {
  const cells = data ?? Array.from({ length: weeks * 7 }, () => Math.floor(Math.random() * 5));
  return (
    <div className={cn('overflow-x-auto', className)}>
      <div className="grid grid-flow-col gap-[3px]" style={{ gridTemplateRows: 'repeat(7, 10px)' }}>
        {cells.map((v, i) => (
          <SimpleTooltip key={i} content={`${v} 次贡献`}>
            <span
              className="size-2.5 rounded-[2px]"
              style={{ background: color, opacity: v === 0 ? 0.08 : 0.2 + v * 0.2 }}
            />
          </SimpleTooltip>
        ))}
      </div>
    </div>
  );
}
