import { MessageSquare, Paperclip } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { Badge } from 'src/components/ui/badge';
import { UserAvatar } from 'src/components/shared/user-avatar';
import { SimpleTooltip } from 'src/components/ui/tooltip';
import { useFormat } from 'src/lib/format';
import { tagMeta, priorityMeta } from 'src/config/constants';
import { useMember } from 'src/store';
import type { Task } from 'src/types';

const tagVariant: Record<string, 'cyan' | 'magenta' | 'amber' | 'success' | 'danger'> = {
  cyan: 'cyan',
  magenta: 'magenta',
  amber: 'amber',
  success: 'success',
  danger: 'danger',
};

export function TaskCard({ task, onClick, dragging }: { task: Task; onClick?: () => void; dragging?: boolean }) {
  const assignee = useMember(task.assigneeId);
  const fmt = useFormat();
  const pr = priorityMeta(task.priority);
  const subDone = task.subtasks?.filter((s) => s.done).length ?? 0;

  return (
    <div
      onClick={onClick}
      className={cn(
        'glass-card glass-card--interactive group cursor-pointer p-3.5',
        dragging && 'rotate-2 opacity-80'
      )}
    >
      <div className="mb-2 flex items-center gap-1.5">
        <SimpleTooltip content={pr.label}>
          <span className="size-2 rounded-full" style={{ background: pr.color }} />
        </SimpleTooltip>
        {task.tags.slice(0, 2).map((t) => {
          const meta = tagMeta(t);
          return (
            <Badge key={t} variant={tagVariant[meta.color] ?? 'cyan'} className="px-1.5 py-0">
              {meta.label}
            </Badge>
          );
        })}
      </div>
      <p className="line-clamp-2 min-h-[2.5em] text-sm font-medium leading-snug">{task.title}</p>
      {task.subtasks && task.subtasks.length > 0 && (
        <p className="mt-1.5 text-xs text-text-tertiary">
          子任务 {subDone}/{task.subtasks.length}
        </p>
      )}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-text-tertiary">
          {task.comments > 0 && (
            <span className="flex items-center gap-1">
              <MessageSquare className="size-3.5" />
              {task.comments}
            </span>
          )}
          {task.attachments > 0 && (
            <span className="flex items-center gap-1">
              <Paperclip className="size-3.5" />
              {task.attachments}
            </span>
          )}
          <span>{fmt.date(task.dueDate)}</span>
        </div>
        <UserAvatar user={assignee} size="sm" fallback={assignee ? undefined : '?'} />
      </div>
    </div>
  );
}
