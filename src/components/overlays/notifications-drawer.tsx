import { AtSign, Bell, CalendarClock, CheckCheck, MessageSquare, UserPlus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { Sheet, SheetBody, SheetContent, SheetHeader, SheetTitle } from 'src/components/ui/sheet';
import { Button } from 'src/components/ui/button';
import { EmptyState } from 'src/components/ui/empty-state';
import { useFormat } from 'src/lib/format';
import { useAppStore } from 'src/store';
import { useUIStore } from 'src/store';
import type { NotificationType } from 'src/types';

const ICONS: Record<NotificationType, LucideIcon> = {
  mention: AtSign,
  assign: UserPlus,
  comment: MessageSquare,
  system: Bell,
  deadline: CalendarClock,
  invite: UserPlus,
};

export function NotificationsDrawer() {
  const open = useUIStore((s) => s.notifOpen);
  const setOpen = useUIStore((s) => s.setNotifOpen);
  const notifications = useAppStore((s) => s.notifications);
  const markRead = useAppStore((s) => s.markNotificationRead);
  const markAllRead = useAppStore((s) => s.markAllNotificationsRead);
  const fmt = useFormat();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full max-w-md">
        <SheetHeader className="flex-row items-center justify-between">
          <SheetTitle>通知</SheetTitle>
          <Button variant="ghost" size="sm" onClick={markAllRead}>
            <CheckCheck className="size-4" />
            全部已读
          </Button>
        </SheetHeader>
        <SheetBody className="space-y-1.5">
          {notifications.length === 0 ? (
            <EmptyState icon={Bell} title="暂无通知" />
          ) : (
            notifications.map((n) => {
              const Icon = ICONS[n.type];
              return (
                <button
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className={cn(
                    'flex w-full gap-3 rounded-[var(--radius-md)] border border-transparent p-3 text-left transition-colors hover:bg-[var(--color-glass-bg)]',
                    !n.read && 'bg-[var(--color-glass-bg)]'
                  )}
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-glass-bg-active)] text-cyan">
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="truncate text-sm text-text-tertiary">{n.content}</p>
                    <p className="mt-1 text-xs text-text-tertiary">
                      {n.project ? `${n.project} · ` : ''}
                      {fmt.fromNow(n.createdAt)}
                    </p>
                  </div>
                  {!n.read && <span className="mt-1.5 size-2 shrink-0 rounded-full holographic-bg" />}
                </button>
              );
            })
          )}
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
}
