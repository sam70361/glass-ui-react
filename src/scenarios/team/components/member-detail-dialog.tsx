import { MessageSquare, UserMinus } from 'lucide-react';
import { toast } from 'sonner';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'src/components/ui/dialog';
import { UserAvatar } from 'src/components/shared/user-avatar';
import { Badge } from 'src/components/ui/badge';
import { Button } from 'src/components/ui/button';
import { Progress } from 'src/components/ui/progress';
import { Separator } from 'src/components/ui/separator';
import { projectStats } from 'src/store';
import { useProjectsQuery, useTasksQuery, useRemoveMemberMutation } from 'src/api';
import { priorityMeta } from 'src/config/constants';
import type { User } from 'src/types';

const STATUS = { online: ['success', '在线'], away: ['amber', '离开'], offline: ['cyan', '离线'] } as const;

export function MemberDetailDialog({ member, onClose }: { member: User | null; onClose: () => void }) {
  const tasks = useTasksQuery().data ?? [];
  const projects = useProjectsQuery().data ?? [];
  const removeMember = useRemoveMemberMutation();

  if (!member) return null;
  const memberTasks = tasks.filter((t) => t.assigneeId === member.id);
  const active = memberTasks.filter((t) => t.status !== 'done');
  const memberProjects = projects.filter((p) => p.memberIds.includes(member.id));
  const loadPct = Math.min(100, Math.round((active.length / 6) * 100));
  const [variant, label] = STATUS[member.status];

  return (
    <Dialog open={!!member} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>成员详情</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-4">
          <UserAvatar user={member} size="xl" />
          <div>
            <p className="font-display text-lg font-bold">{member.name}</p>
            <p className="text-sm text-text-tertiary">
              {member.role}
              {member.department ? ` · ${member.department}` : ''}
            </p>
            <p className="text-xs text-text-muted">{member.email}</p>
            <Badge variant={variant} className="mt-1.5">
              {label}
            </Badge>
          </div>
        </div>

        <div className="mt-5 space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-tertiary">当前工作量</span>
            <strong>{active.length} 进行中</strong>
          </div>
          <Progress value={loadPct} />
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {(member.skills ?? []).map((s) => (
            <Badge key={s} variant="cyan">
              {s}
            </Badge>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-semibold">参与项目 ({memberProjects.length})</p>
            <div className="space-y-1.5">
              {memberProjects.length ? (
                memberProjects.map((p) => (
                  <div key={p.id} className="flex items-center gap-2 text-sm">
                    <span className="size-2 rounded-full" style={{ background: p.color }} />
                    <span className="flex-1 truncate">{p.name}</span>
                    <span className="text-xs text-text-muted">{projectStats(p.id).progress}%</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-text-muted">暂无</p>
              )}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold">负责任务 ({memberTasks.length})</p>
            <div className="space-y-1.5">
              {memberTasks.slice(0, 5).map((t) => (
                <div key={t.id} className="flex items-center gap-2 text-sm">
                  <span className="size-2 shrink-0 rounded-full" style={{ background: priorityMeta(t.priority).color }} />
                  <span className="truncate">{t.title}</span>
                </div>
              ))}
              {!memberTasks.length && <p className="text-sm text-text-muted">暂无</p>}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button
            variant="danger"
            className="me-auto"
            onClick={() => {
              removeMember.mutate(member.id);
              onClose();
              toast.success(`${member.name} 已移出团队`);
            }}
          >
            <UserMinus className="size-4" /> 移出团队
          </Button>
          <Button variant="secondary" onClick={() => toast.info(`正在与 ${member.name} 发起对话…`)}>
            <MessageSquare className="size-4" /> 发送消息
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
