import { Clock } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

const pad = (n: number) => String(n).padStart(2, '0');

/** 时间选择（时:分），step 控制分钟粒度 */
export function TimePicker({
  value,
  onChange,
  step = 30,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  step?: number;
  className?: string;
}) {
  const [h, m] = value.split(':');
  const hours = Array.from({ length: 24 }, (_, i) => pad(i));
  const minutes = Array.from({ length: Math.ceil(60 / step) }, (_, i) => pad(i * step));

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Clock className="size-4 text-text-tertiary" />
      <Select value={h} onValueChange={(nh) => onChange(`${nh}:${m ?? '00'}`)}>
        <SelectTrigger className="h-9 w-20 text-sm">
          <SelectValue placeholder="时" />
        </SelectTrigger>
        <SelectContent>
          {hours.map((x) => (
            <SelectItem key={x} value={x}>
              {x}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="text-text-tertiary">:</span>
      <Select value={m} onValueChange={(nm) => onChange(`${h ?? '00'}:${nm}`)}>
        <SelectTrigger className="h-9 w-20 text-sm">
          <SelectValue placeholder="分" />
        </SelectTrigger>
        <SelectContent>
          {minutes.map((x) => (
            <SelectItem key={x} value={x}>
              {x}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
