import { Archive, Mail, MailOpen, Paperclip, Star, Trash2 } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { EmptyState } from 'src/components/ui/empty-state';
import { SkeletonText } from 'src/components/ui/skeleton';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from 'src/components/ui/context-menu';
import { Checkbox } from 'src/components/ui/checkbox';
import { useFormat } from 'src/lib/format';
import { mailLabels, useMailList, useMailLoading, useMailStore } from 'src/store';
import { useUpdateThreadsMutation } from 'src/api';
import type { MailThread } from 'src/types';
import { MailToolbar } from './mail-toolbar';
import { SenderAvatar, useMailUser } from './helpers';

export function MessageList() {
  const list = useMailList();
  const loading = useMailLoading();
  return (
    <div className="flex h-full min-h-0 flex-col">
      <MailToolbar list={list} />
      <div className="min-h-0 flex-1 overflow-y-auto">
        {loading ? (
          <SkeletonText lines={8} className="p-4" />
        ) : list.length === 0 ? (
          <EmptyState icon={Mail} title="没有邮件" description="该视图下暂无符合条件的邮件" />
        ) : (
          <ul>
            {list.map((t) => (
              <MessageRow key={t.id} thread={t} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function MessageRow({ thread }: { thread: MailThread }) {
  const fmt = useFormat();
  const selectedId = useMailStore((s) => s.selectedThreadId);
  const selectThread = useMailStore((s) => s.selectThread);
  const checkedIds = useMailStore((s) => s.checkedIds);
  const toggleChecked = useMailStore((s) => s.toggleChecked);
  const update = useUpdateThreadsMutation();

  const last = thread.messages[thread.messages.length - 1];
  const checked = checkedIds.includes(thread.id);
  const active = selectedId === thread.id;
  const labels = mailLabels.filter((l) => thread.labelIds.includes(l.id));

  const openThread = () => {
    selectThread(thread.id);
    if (!thread.read) update.mutate({ ids: [thread.id], patch: { read: true } });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <li
          onClick={openThread}
          className={cn(
            'group flex cursor-pointer gap-2.5 border-b border-[var(--color-glass-border)] px-3 py-2.5 transition-colors',
            active ? 'bg-[var(--color-glass-bg-active)]' : 'hover:bg-[var(--color-glass-bg)]',
            !thread.read && !active && 'bg-[rgba(var(--color-accent-cyan-rgb),0.04)]'
          )}
        >
          <div className="flex flex-col items-center gap-1.5 pt-0.5" onClick={(e) => e.stopPropagation()}>
            <Checkbox className="size-4" checked={checked} onCheckedChange={() => toggleChecked(thread.id)} aria-label="选择" />
            <button onClick={() => update.mutate({ ids: [thread.id], patch: { starred: !thread.starred } })} aria-label="星标" className="text-text-muted transition-colors hover:text-amber">
              <Star className={cn('size-4', thread.starred && 'fill-amber text-amber')} />
            </button>
          </div>

          <SenderAvatar id={last.fromId} size="sm" />

          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <span className={cn('truncate text-sm', thread.read ? 'text-text-secondary' : 'font-semibold text-foreground')}>
                {thread.participantIds.includes('me') && thread.folder === 'sent' ? '我' : <SenderName id={last.fromId} />}
              </span>
              <span className="shrink-0 text-[11px] text-text-muted">{fmt.fromNow(thread.updatedAt)}</span>
            </div>
            <p className={cn('truncate text-sm', !thread.read && 'font-medium')}>{thread.subject}</p>
            <div className="flex items-center gap-1.5">
              <p className="min-w-0 flex-1 truncate text-xs text-text-tertiary">{thread.snippet}</p>
              {thread.hasAttachments && <Paperclip className="size-3 shrink-0 text-text-muted" />}
            </div>
            {labels.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-1">
                {labels.map((l) => (
                  <span key={l.id} className="rounded-full px-1.5 py-px text-[10px]" style={{ background: `${l.color}22`, color: l.color }}>
                    {l.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {!thread.read && <span className="mt-1 size-2 shrink-0 rounded-full holographic-bg" />}
        </li>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onSelect={() => update.mutate({ ids: [thread.id], patch: { read: !thread.read } })}>
          {thread.read ? <Mail className="size-4" /> : <MailOpen className="size-4" />}
          标为{thread.read ? '未读' : '已读'}
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => update.mutate({ ids: [thread.id], patch: { starred: !thread.starred } })}>
          <Star className="size-4" /> {thread.starred ? '取消星标' : '加星标'}
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onSelect={() => update.mutate({ ids: [thread.id], patch: { folder: 'archive' } })}>
          <Archive className="size-4" /> 归档
        </ContextMenuItem>
        <ContextMenuItem destructive onSelect={() => { update.mutate({ ids: [thread.id], patch: { folder: 'trash' } }); if (active) selectThread(null); }}>
          <Trash2 className="size-4" /> 移到垃圾箱
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

function SenderName({ id }: { id: string }) {
  const user = useMailUser(id);
  return <>{id === 'me' ? '我' : user?.name ?? '系统'}</>;
}
