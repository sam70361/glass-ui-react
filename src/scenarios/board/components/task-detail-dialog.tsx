import { useState } from 'react';
import { Trash2 } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'src/components/ui/dialog';
import { Badge } from 'src/components/ui/badge';
import { Button } from 'src/components/ui/button';
import { Checkbox } from 'src/components/ui/checkbox';
import { Input } from 'src/components/ui/input';
import { UserAvatar } from 'src/components/shared/user-avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select';
import { useFormat } from 'src/lib/format';
import { TASK_STATUSES, priorityMeta } from 'src/config/constants';
import { useAppStore, useMember } from 'src/store';
import {
  useTasksQuery,
  useAddCommentMutation,
  useDeleteTaskMutation,
  useToggleSubtaskMutation,
  useUpdateTaskMutation,
} from 'src/api';
import type { Task, TaskStatus } from 'src/types';

export function TaskDetailDialog({ task, onClose }: { task: Task | null; onClose: () => void }) {
  const toggleSubtask = useToggleSubtaskMutation();
  const addComment = useAddCommentMutation();
  const updateTask = useUpdateTaskMutation();
  const deleteTask = useDeleteTaskMutation();
  const currentUser = useAppStore((s) => s.currentUser);
  const { data: tasks = [] } = useTasksQuery();
  const liveTask = tasks.find((t) => t.id === task?.id);
  const assignee = useMember(liveTask?.assigneeId);
  const fmt = useFormat();
  const [comment, setComment] = useState('');

  const t = liveTask;
  if (!task || !t) return null;
  const pr = priorityMeta(t.priority);

  return (
    <Dialog open={!!task} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full" style={{ background: pr.color }} />
            <Badge variant="cyan">{pr.label}</Badge>
          </div>
          <DialogTitle>{t.title}</DialogTitle>
          <DialogDescription>{t.description}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 sm:grid-cols-[1fr_180px]">
          <div className="space-y-4">
            {t.subtasks && t.subtasks.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-semibold">子任务</p>
                <div className="space-y-2">
                  {t.subtasks.map((s) => (
                    <label key={s.id} className="flex cursor-pointer items-center gap-2.5 text-sm">
                      <Checkbox checked={s.done} onCheckedChange={() => toggleSubtask.mutate({ taskId: t.id, subId: s.id })} />
                      <span className={s.done ? 'text-text-tertiary line-through' : ''}>{s.title}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="mb-2 text-sm font-semibold">评论</p>
              <div className="space-y-3">
                {(t.commentList ?? []).map((c) => (
                  <Comment key={c.id} userId={c.userId} text={c.text} time={c.time} />
                ))}
                {(t.commentList ?? []).length === 0 && <p className="text-sm text-text-tertiary">暂无评论</p>}
              </div>
              <form
                className="mt-3 flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!comment.trim()) return;
                  addComment.mutate({ taskId: t.id, userId: currentUser.id, text: comment });
                  setComment('');
                }}
              >
                <Input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="添加评论…" />
                <Button type="submit" variant="primary">
                  发送
                </Button>
              </form>
            </div>
          </div>

          <div className="space-y-4">
            <Field label="状态">
              <Select value={t.status} onValueChange={(v) => updateTask.mutate({ id: t.id, patch: { status: v as TaskStatus } })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TASK_STATUSES.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="负责人">
              <div className="flex items-center gap-2">
                <UserAvatar user={assignee} size="sm" fallback={assignee ? undefined : '?'} />
                <span className="text-sm">{assignee?.name}</span>
              </div>
            </Field>
            <Field label="截止日期">
              <span className="text-sm">{fmt.date(t.dueDate, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </Field>
            <Button
              variant="danger"
              className="w-full"
              onClick={() => {
                deleteTask.mutate(t.id);
                onClose();
              }}
            >
              <Trash2 className="size-4" /> 删除任务
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">{label}</p>
      {children}
    </div>
  );
}

function Comment({ userId, text, time }: { userId: string; text: string; time: string }) {
  const user = useMember(userId);
  const fmt = useFormat();
  return (
    <div className="flex gap-2.5">
      <UserAvatar user={user} size="sm" fallback={user ? undefined : '?'} />
      <div className="flex-1 rounded-[var(--radius-md)] bg-[var(--color-glass-bg)] px-3 py-2">
        <p className="text-xs">
          <span className="font-medium">{user?.name}</span>{' '}
          <span className="text-text-muted">{fmt.fromNow(time)}</span>
        </p>
        <p className="mt-0.5 text-sm">{text}</p>
      </div>
    </div>
  );
}
