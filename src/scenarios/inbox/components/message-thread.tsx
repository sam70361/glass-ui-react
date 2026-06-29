import { useState } from 'react';
import { Archive, ArrowLeft, File, FileArchive, FileText, Image as ImageIcon, Mail, Paperclip, Reply, Send, Sheet, Star, Trash2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { MOD_KEY } from 'src/lib/platform';
import { Button } from 'src/components/ui/button';
import { EmptyState } from 'src/components/ui/empty-state';
import { AutosizeTextarea } from 'src/components/ui/autosize-textarea';
import { SimpleTooltip } from 'src/components/ui/tooltip';
import { useFormat } from 'src/lib/format';
import { toast } from 'src/components/ui/sonner';
import { mailLabels, useMailStore, useMailThread } from 'src/store';
import { useReplyThreadMutation, useUpdateThreadsMutation } from 'src/api';
import type { MailAttachmentKind, MailMessage } from 'src/types';
import { SenderAvatar, useMailUser } from './helpers';

const ATT_ICON: Record<MailAttachmentKind, LucideIcon> = {
  image: ImageIcon,
  doc: FileText,
  pdf: FileText,
  sheet: Sheet,
  zip: FileArchive,
  other: File,
};

export function MessageThread({ onBack }: { onBack?: () => void }) {
  const selectedId = useMailStore((s) => s.selectedThreadId);
  const selectThread = useMailStore((s) => s.selectThread);
  const thread = useMailThread(selectedId);
  const update = useUpdateThreadsMutation();
  const reply = useReplyThreadMutation();
  const [draft, setDraft] = useState('');

  if (!thread) {
    return (
      <div className="flex h-full items-center justify-center">
        <EmptyState icon={Mail} title="选择一封邮件" description="从左侧列表选择邮件查看完整会话" />
      </div>
    );
  }

  const labels = mailLabels.filter((l) => thread.labelIds.includes(l.id));

  const send = () => {
    if (!draft.trim()) return;
    reply.mutate({ threadId: thread.id, body: draft.trim() });
    setDraft('');
    toast.success('回复已发送');
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-start gap-2 border-b border-[var(--color-glass-border)] p-4">
        {onBack && (
          <Button variant="ghost" size="icon-sm" className="lg:hidden" onClick={onBack} aria-label="返回">
            <ArrowLeft className="size-4" />
          </Button>
        )}
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-lg font-semibold leading-tight">{thread.subject}</h2>
          {labels.length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {labels.map((l) => (
                <span key={l.id} className="rounded-full px-2 py-0.5 text-[11px]" style={{ background: `${l.color}22`, color: l.color }}>
                  {l.name}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-0.5">
          <SimpleTooltip content={thread.starred ? '取消星标' : '加星标'}>
            <Button variant="ghost" size="icon-sm" onClick={() => update.mutate({ ids: [thread.id], patch: { starred: !thread.starred } })}>
              <Star className={cn('size-4', thread.starred && 'fill-amber text-amber')} />
            </Button>
          </SimpleTooltip>
          <SimpleTooltip content="归档">
            <Button variant="ghost" size="icon-sm" onClick={() => { update.mutate({ ids: [thread.id], patch: { folder: 'archive' } }); toast.success('已归档'); }}>
              <Archive className="size-4" />
            </Button>
          </SimpleTooltip>
          <SimpleTooltip content="移到垃圾箱">
            <Button variant="ghost" size="icon-sm" className="text-danger" onClick={() => { update.mutate({ ids: [thread.id], patch: { folder: 'trash' } }); selectThread(null); toast.success('已移到垃圾箱'); }}>
              <Trash2 className="size-4" />
            </Button>
          </SimpleTooltip>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
        {thread.messages.map((m, i) => (
          <MessageBubble key={m.id} msg={m} defaultOpen={i === thread.messages.length - 1} />
        ))}
      </div>

      <div className="border-t border-[var(--color-glass-border)] p-3">
        <AutosizeTextarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={`回复…（${MOD_KEY} + Enter 发送）`}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
              e.preventDefault();
              send();
            }
          }}
        />
        <div className="mt-2 flex items-center justify-between">
          <Button variant="ghost" size="sm"><Paperclip className="size-4" /> 附件</Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Reply className="size-4" /> 转发</Button>
            <Button variant="primary" size="sm" onClick={send} disabled={!draft.trim()}><Send className="size-4" /> 发送</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ msg, defaultOpen }: { msg: MailMessage; defaultOpen: boolean }) {
  const fmt = useFormat();
  const [open, setOpen] = useState(defaultOpen);
  const user = useMailUser(msg.fromId);
  const isMe = msg.fromId === 'me';

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)]">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center gap-3 p-3 text-left">
        <SenderAvatar id={msg.fromId} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">{isMe ? '我' : user?.name ?? '系统'}</p>
          <p className="truncate text-xs text-text-tertiary">{open ? `发送给 ${msg.toIds.length} 人` : msg.body.split('\n')[0]}</p>
        </div>
        <span className="shrink-0 text-[11px] text-text-muted">{fmt.dateTime(msg.sentAt)}</span>
      </button>
      {open && (
        <div className="border-t border-[var(--color-glass-border)] p-4">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-text-secondary">{msg.body}</p>
          {msg.attachments && msg.attachments.length > 0 && (
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {msg.attachments.map((a) => {
                const Icon = ATT_ICON[a.kind];
                return (
                  <div key={a.id} className="flex items-center gap-2.5 rounded-[var(--radius-md)] border border-[var(--color-glass-border)] bg-[var(--color-surface-sunken)] p-2.5">
                    <span className="flex size-9 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-glass-bg-active)] text-cyan">
                      <Icon className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{a.name}</p>
                      <p className="text-xs text-text-tertiary">{a.size}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
