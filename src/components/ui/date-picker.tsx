import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { CalendarDays, CalendarRange } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { fieldVariants, fieldSizes, fieldFocus } from 'src/theme/mixins';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Calendar } from './calendar';

function fmt(d?: Date) {
  return d ? d.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '';
}

/** 单日期选择 */
export function DatePicker({
  value,
  onChange,
  placeholder = '选择日期',
  className,
}: {
  value?: Date;
  onChange: (d?: Date) => void;
  placeholder?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            'flex w-full items-center gap-2 transition-colors hover:bg-[var(--color-glass-bg-hover)]',
            fieldVariants.glass,
            fieldSizes.md,
            fieldFocus,
            className
          )}
        >
          <CalendarDays className="size-4 text-text-tertiary" />
          <span className={cn(!value && 'text-text-muted')}>{value ? fmt(value) : placeholder}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(d) => {
            onChange(d);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

/** 日期范围选择 */
export function DateRangePicker({
  value,
  onChange,
  placeholder = '选择日期范围',
  className,
}: {
  value?: DateRange;
  onChange: (r?: DateRange) => void;
  placeholder?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            'flex w-full items-center gap-2 transition-colors hover:bg-[var(--color-glass-bg-hover)]',
            fieldVariants.glass,
            fieldSizes.md,
            fieldFocus,
            className
          )}
        >
          <CalendarRange className="size-4 text-text-tertiary" />
          <span className={cn(!value?.from && 'text-text-muted')}>
            {value?.from ? `${fmt(value.from)} - ${fmt(value.to) || '…'}` : placeholder}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="range" selected={value} onSelect={onChange} numberOfMonths={2} />
      </PopoverContent>
    </Popover>
  );
}
