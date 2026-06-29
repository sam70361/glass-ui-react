import { cn } from 'src/lib/utils';
import { fieldVariants, fieldFocus } from 'src/theme/mixins';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Input } from './input';

const SWATCHES = ['#00d4ff', '#ff2d92', '#ffb347', '#00ff94', '#a855f7', '#5b8cff', '#ff4757', '#10131c', '#ffffff'];

/** 颜色选择：色块预设 + 取色器 + 十六进制输入 */
export function ColorPicker({ value, onChange, className }: { value: string; onChange: (v: string) => void; className?: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            'flex h-10 items-center gap-2 px-2.5 text-sm transition-colors hover:bg-[var(--color-glass-bg-hover)]',
            fieldVariants.glass,
            fieldFocus,
            className
          )}
        >
          <span className="size-6 rounded-[var(--radius-sm)] border border-[var(--color-glass-border)]" style={{ background: value }} />
          <span className="font-mono uppercase">{value}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56 space-y-3" align="start">
        <div className="grid grid-cols-9 gap-1.5">
          {SWATCHES.map((c) => (
            <button
              key={c}
              onClick={() => onChange(c)}
              className={cn('size-5 rounded-full transition-transform hover:scale-110', value === c && 'ring-2 ring-cyan ring-offset-2 ring-offset-[var(--color-surface-solid)]')}
              style={{ background: c }}
              aria-label={c}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="size-9 cursor-pointer rounded-[var(--radius-sm)] border-0 bg-transparent" />
          <Input value={value} onChange={(e) => onChange(e.target.value)} className="font-mono uppercase" />
        </div>
      </PopoverContent>
    </Popover>
  );
}
