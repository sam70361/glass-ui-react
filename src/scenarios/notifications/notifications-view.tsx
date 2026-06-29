import { useMemo, useState } from 'react';
import { AtSign, Bell, CalendarClock, CheckCheck, MessageSquare, UserPlus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { PageHeader } from 'src/components/shared/page-header';
import { FilterChips } from 'src/components/shared/filter-chips';
import { Card } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { EmptyState } from 'src/components/ui/empty-state';
import { useFormat } from 'src/lib/format';
import { useAppStore } from 'src/store';
import type { NotificationType } from 'src/types';

const ICONS: Record<NotificationType, LucideIcon> = {
  mention: AtSign,
  assign: UserPlus,
  comment: MessageSquare,
  system: Bell,
  deadline: CalendarClock,
  invite: UserPlus,
};

const FILTERS = [
  { id: 'all', label: '全部' },
  { id: 'mention', label: '提及' },
  { id: 'assign', label: '指派' },
  { id: 'comment', label: '评论' },
  { id: 'deadline', label: '截止' },
  { id: 'system', label: '系统' },
];

export default function NotificationsView() {
  const notifications = useAppStore((s) => s.notifications);
  const markRead = useAppStore((s) => s.markNotificationRead);
  const markAllRead = useAppStore((s) => s.markAllNotificationsRead);
  const fmt = useFormat();
  const [filter, setFilter] = useState('all');

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: notifications.length };
    notifications.forEach((n) => (c[n.type] = (c[n.type] ?? 0) + 1));
    return c;
  }, [notifications]);

  const list = notifications.filter((n) => filter === 'all' || n.type === filter);

  return (
    <div className="animate-fade-up">
      <PageHeader
        title="通知中心"
        description="所有提醒与系统消息"
        actions={
          <Button variant="outline" onClick={markAllRead}>
            <CheckCheck className="size-4" /> 全部已读
          </Button>
        }
      />

      <FilterChips
        className="mb-4"
        value={filter}
        onChange={setFilter}
        options={FILTERS.map((f) => ({ ...f, count: counts[f.id] ?? 0 }))}
      />

      <Card className="divide-y divide-[var(--color-glass-border)] p-0">
        {list.length === 0 && <EmptyState icon={Bell} title="暂无通知" />}
        {list.map((n) => {
          const Icon = ICONS[n.type];
          return (
            <button
              key={n.id}
              onClick={() => markRead(n.id)}
              className={cn('flex w-full gap-3 p-4 text-left transition-colors hover:bg-[var(--color-glass-bg)]', !n.read && 'bg-[var(--color-glass-bg)]')}
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-glass-bg-active)] text-cyan">
                <Icon className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{n.title}</p>
                <p className="line-clamp-2 text-sm text-text-tertiary">{n.content}</p>
                <div className="mt-1 flex items-center gap-2">
                  {n.project && <Badge variant="cyan">{n.project}</Badge>}
                  <span className="text-xs text-text-muted">{fmt.fromNow(n.createdAt)}</span>
                </div>
              </div>
              {!n.read && <span className="mt-1.5 size-2 shrink-0 rounded-full holographic-bg" />}
            </button>
          );
        })}
      </Card>
    </div>
  );
}
