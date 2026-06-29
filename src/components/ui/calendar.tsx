import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from 'src/lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

/** 日期选择器（毛玻璃风格） */
export function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col gap-4',
        month: 'space-y-3',
        month_caption: 'flex items-center justify-center h-9 relative',
        caption_label: 'font-display text-sm font-semibold',
        nav: 'absolute inset-x-0 top-0 flex items-center justify-between px-1',
        button_previous:
          'inline-flex size-8 items-center justify-center rounded-[var(--radius-sm)] text-text-tertiary hover:bg-[var(--color-glass-bg)] hover:text-foreground',
        button_next:
          'inline-flex size-8 items-center justify-center rounded-[var(--radius-sm)] text-text-tertiary hover:bg-[var(--color-glass-bg)] hover:text-foreground',
        month_grid: 'w-full border-collapse',
        weekdays: 'flex',
        weekday: 'w-9 text-xs font-medium text-text-muted',
        week: 'flex w-full mt-1',
        day: 'size-9 p-0 text-center text-sm',
        day_button:
          'inline-flex size-9 items-center justify-center rounded-[var(--radius-sm)] transition-colors hover:bg-[var(--color-glass-bg)] aria-selected:holographic-bg aria-selected:text-[var(--color-holo-foreground)] aria-selected:font-semibold',
        today: 'text-cyan font-semibold',
        outside: 'text-text-muted opacity-50',
        disabled: 'opacity-30',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === 'left' ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />,
      }}
      {...props}
    />
  );
}
