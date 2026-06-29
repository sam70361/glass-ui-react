import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import { Card } from 'src/components/ui/card';
import { UserAvatar } from 'src/components/shared/user-avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select';
import { EmptyState } from 'src/components/ui/empty-state';
import { useFormat } from 'src/lib/format';
import { PRIORITIES, TASK_STATUSES, priorityMeta } from 'src/config/constants';
import { useMember } from 'src/store';
import { useUpdateTaskMutation } from 'src/api';
import type { Task, TaskStatus, Priority } from 'src/types';

export function TaskTable({ tasks, onOpen }: { tasks: Task[]; onOpen: (t: Task) => void }) {
  const updateTask = useUpdateTaskMutation();
  const fmt = useFormat();

  if (!tasks.length) return <EmptyState title="暂无任务" description="调整筛选或新建任务" />;

  return (
    <Card className="p-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>任务</TableHead>
            <TableHead className="w-36">负责人</TableHead>
            <TableHead className="w-32">优先级</TableHead>
            <TableHead className="w-32">状态</TableHead>
            <TableHead className="w-24">截止</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((t) => (
            <TableRow key={t.id} className="cursor-pointer" onClick={() => onOpen(t)}>
              <TableCell className="font-medium">
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full" style={{ background: priorityMeta(t.priority).color }} />
                  {t.title}
                </span>
              </TableCell>
              <TableCell>
                <Assignee id={t.assigneeId} />
              </TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Select value={t.priority} onValueChange={(v) => updateTask.mutate({ id: t.id, patch: { priority: v as Priority } })}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORITIES.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Select value={t.status} onValueChange={(v) => updateTask.mutate({ id: t.id, patch: { status: v as TaskStatus } })}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TASK_STATUSES.map((sx) => (
                      <SelectItem key={sx.id} value={sx.id}>
                        {sx.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-text-tertiary">{fmt.date(t.dueDate)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

function Assignee({ id }: { id: string }) {
  const m = useMember(id);
  return (
    <span className="flex items-center gap-2">
      <UserAvatar user={m} size="sm" fallback={m ? undefined : '?'} />
      <span className="truncate text-sm">{m?.name ?? '未分配'}</span>
    </span>
  );
}
