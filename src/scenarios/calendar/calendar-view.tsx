import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { PageHeader } from 'src/components/shared/page-header';
import { Card } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { SimpleTooltip } from 'src/components/ui/tooltip';
import { useAppStore } from 'src/store';
import { DATA_PALETTE } from 'src/theme/palette';

const COLOR: Record<string, string> = { cyan: DATA_PALETTE.cyan, magenta: DATA_PALETTE.magenta, amber: DATA_PALETTE.amber };
const WEEKDAYS = ['一', '二', '三', '四', '五', '六', '日'];

export default function CalendarView() {
  const events = useAppStore((s) => s.calendarEvents);
  const [cursor, setCursor] = useState(new Date());

  const { cells, monthLabel } = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const first = new Date(year, month, 1);
    const startWeekday = (first.getDay() + 6) % 7; // 周一为首列
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const list: { date: Date | null }[] = [];
    for (let i = 0; i < startWeekday; i++) list.push({ date: null });
    for (let d = 1; d <= daysInMonth; d++) list.push({ date: new Date(year, month, d) });
    return { cells: list, monthLabel: `${year} 年 ${month + 1} 月` };
  }, [cursor]);

  const eventsByDay = (date: Date) =>
    events.filter((e) => {
      const ed = new Date(e.date);
      return ed.getFullYear() === date.getFullYear() && ed.getMonth() === date.getMonth() && ed.getDate() === date.getDate();
    });

  const today = new Date();

  return (
    <div className="animate-fade-up">
      <PageHeader
        title="日历"
        description="项目排期与团队日程一览"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon-sm" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}>
              <ChevronLeft className="size-4" />
            </Button>
            <span className="min-w-32 text-center font-display font-semibold">{monthLabel}</span>
            <Button variant="ghost" size="icon-sm" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}>
              <ChevronRight className="size-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCursor(new Date())}>
              今天
            </Button>
          </div>
        }
      />

      <Card className="p-4">
        <div className="grid grid-cols-7 gap-px">
          {WEEKDAYS.map((w) => (
            <div key={w} className="pb-2 text-center text-xs font-semibold text-text-tertiary">
              {w}
            </div>
          ))}
          {cells.map((c, i) => {
            const isToday =
              c.date &&
              c.date.getDate() === today.getDate() &&
              c.date.getMonth() === today.getMonth() &&
              c.date.getFullYear() === today.getFullYear();
            const dayEvents = c.date ? eventsByDay(c.date) : [];
            return (
              <div
                key={i}
                className={cn(
                  'min-h-24 rounded-[var(--radius-sm)] border border-[var(--color-glass-border)] p-1.5',
                  !c.date && 'border-transparent',
                  isToday && 'bg-[rgba(var(--color-accent-cyan-rgb),0.08)]'
                )}
              >
                {c.date && (
                  <>
                    <span className={cn('text-xs', isToday ? 'font-bold text-cyan' : 'text-text-tertiary')}>
                      {c.date.getDate()}
                    </span>
                    <div className="mt-1 space-y-1">
                      {dayEvents.slice(0, 3).map((e) => (
                        <SimpleTooltip key={e.id} content={`${e.time} ${e.title}`}>
                          <div
                            className="truncate rounded px-1.5 py-0.5 text-[10px] font-medium text-[var(--color-holo-foreground)]"
                            style={{ background: COLOR[e.color] }}
                          >
                            {e.title}
                          </div>
                        </SimpleTooltip>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
