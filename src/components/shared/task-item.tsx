import { Check } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { UserAvatar } from 'src/components/shared/user-avatar';
import { Badge } from 'src/components/ui/badge';
import { SimpleTooltip } from 'src/components/ui/tooltip';
import { useFormat } from 'src/lib/format';
import { priorityMeta, tagMeta } from 'src/config/constants';
import { useMember } from 'src/store';
import { useUpdateTaskMutation } from 'src/api';
import type { Task } from 'src/types';

const tagVariant: Record<string, 'cyan' | 'magenta' | 'amber' | 'success' | 'danger'> = {
  cyan: 'cyan',
  magenta: 'magenta',
  amber: 'amber',
  success: 'success',
  danger: 'danger',
};

/** 紧凑任务项（复选框 + 优先级 + 标题 + 标签 + 截止 + 头像），用于列表场景 */
export function TaskItem({ task, onOpen }: { task: Task; onOpen?: () => void }) {
  const updateTask = useUpdateTaskMutation();
  const assignee = useMember(task.assigneeId);
  const fmt = useFormat();
  const pr = priorityMeta(task.priority);
  const done = task.status === 'done';

  return (
    <div
      onClick={onOpen}
      className={cn(
        'flex cursor-pointer items-center gap-3 rounded-[var(--radius-md)] border border-transparent px-2.5 py-2 transition-colors hover:bg-[var(--color-glass-bg)]',
        done && 'opacity-55'
      )}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          updateTask.mutate({ id: task.id, patch: { status: task.status === 'done' ? 'todo' : 'done' } });
        }}
        className={cn(
          'flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors',
          done ? 'holographic-bg border-transparent text-[var(--color-holo-foreground)]' : 'border-[var(--color-glass-border)] hover:border-cyan'
        )}
        aria-label="完成"
      >
        {done && <Check className="size-3 stroke-[3]" />}
      </button>

      <SimpleTooltip content={pr.label}>
        <span className="size-2 shrink-0 rounded-full" style={{ background: pr.color }} />
      </SimpleTooltip>

      <div className="min-w-0 flex-1">
        <p className={cn('truncate text-sm font-medium', done && 'line-through')}>{task.title}</p>
        <div className="mt-0.5 flex items-center gap-1.5">
          {task.tags.slice(0, 2).map((t) => {
            const meta = tagMeta(t);
            return (
              <Badge key={t} variant={tagVariant[meta.color] ?? 'cyan'} className="px-1.5 py-0">
                {meta.label}
              </Badge>
            );
          })}
          <span className="text-xs text-text-tertiary">{fmt.date(task.dueDate)}</span>
        </div>
      </div>

      <UserAvatar user={assignee} size="sm" fallback={assignee ? undefined : '?'} />
    </div>
  );
}
