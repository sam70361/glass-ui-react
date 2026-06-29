import { Archive, FileText, Inbox, Send, SquarePen, Star, Trash2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { Button } from 'src/components/ui/button';
import type { MailViewId } from 'src/types';
import { mailLabels, useMailCounts, useMailStore } from 'src/store';

const VIEWS: { id: MailViewId; label: string; icon: LucideIcon }[] = [
  { id: 'inbox', label: '收件箱', icon: Inbox },
  { id: 'starred', label: '星标', icon: Star },
  { id: 'sent', label: '已发送', icon: Send },
  { id: 'drafts', label: '草稿', icon: FileText },
  { id: 'archive', label: '归档', icon: Archive },
  { id: 'trash', label: '垃圾箱', icon: Trash2 },
];

export function FolderRail({ className }: { className?: string }) {
  const view = useMailStore((s) => s.view);
  const setView = useMailStore((s) => s.setView);
  const openCompose = useMailStore((s) => s.openCompose);
  const counts = useMailCounts();

  return (
    <div className={cn('flex w-56 shrink-0 flex-col gap-4 border-e border-[var(--color-glass-border)] p-3', className)}>
      <Button variant="primary" className="w-full" onClick={() => openCompose()}>
        <SquarePen className="size-4" /> 撰写
      </Button>

      <nav className="flex flex-col gap-0.5">
        {VIEWS.map((v) => {
          const Icon = v.icon;
          const count = counts[v.id];
          const active = view === v.id;
          return (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              className={cn(
                'flex items-center gap-2.5 rounded-[var(--radius-md)] px-3 py-2 text-sm transition-colors',
                active
                  ? 'bg-[var(--color-glass-bg-active)] font-medium text-foreground'
                  : 'text-text-secondary hover:bg-[var(--color-glass-bg)]'
              )}
            >
              <Icon className={cn('size-4', active && 'text-cyan')} />
              <span className="flex-1 text-left">{v.label}</span>
              {count > 0 && (
                <span
                  className={cn(
                    'min-w-5 rounded-full px-1.5 text-center text-xs tabular-nums',
                    v.id === 'inbox' ? 'holographic-bg font-semibold text-[var(--color-holo-foreground)]' : 'bg-[var(--color-glass-bg-active)] text-text-tertiary'
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-1">
        <p className="mb-1.5 px-3 text-xs font-semibold text-text-tertiary">标签</p>
        <div className="flex flex-col gap-0.5">
          {mailLabels.map((l) => (
            <div key={l.id} className="flex items-center gap-2.5 rounded-[var(--radius-md)] px-3 py-1.5 text-sm text-text-secondary">
              <span className="size-2.5 rounded-full" style={{ background: l.color }} />
              {l.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
