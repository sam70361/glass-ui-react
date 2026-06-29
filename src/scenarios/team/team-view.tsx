import { useMemo, useState } from 'react';
import { MessageSquare, MoreHorizontal, Plus } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { PageHeader } from 'src/components/shared/page-header';
import { Card } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { UserAvatar } from 'src/components/shared/user-avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select';
import { SearchInput } from 'src/components/shared/search-input';
import { SimpleTooltip } from 'src/components/ui/tooltip';
import { SkeletonCard } from 'src/components/ui/skeleton';
import { memberStats } from 'src/store';
import { useProjectsQuery, useTeamQuery } from 'src/api';
import { DATA_PALETTE } from 'src/theme/palette';
import type { MemberStatus, User } from 'src/types';
import { MemberDetailDialog } from './components/member-detail-dialog';
import { InviteDialog } from './components/invite-dialog';

const STATUS_COLOR: Record<MemberStatus, string> = {
  online: DATA_PALETTE.emerald,
  away: DATA_PALETTE.amber,
  offline: DATA_PALETTE.neutral,
};
const STATUS_LABEL: Record<MemberStatus, string> = { online: '在线', away: '离开', offline: '离线' };

export default function TeamView() {
  const teamQ = useTeamQuery();
  const team = teamQ.data ?? [];
  const projects = useProjectsQuery().data ?? [];
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>('all');
  const [dept, setDept] = useState('all');
  const [detail, setDetail] = useState<User | null>(null);
  const [inviteOpen, setInviteOpen] = useState(false);

  const depts = [...new Set(team.map((m) => m.department).filter(Boolean) as string[])];
  const statusCount = (s: string) => (s === 'all' ? team.length : team.filter((m) => m.status === s).length);
  const onlineCount = team.filter((m) => m.status === 'online').length;
  const withActive = team.filter((m) => memberStats(m.id).active > 0).length;

  const list = useMemo(
    () =>
      team.filter((m) => {
        if (status !== 'all' && m.status !== status) return false;
        if (dept !== 'all' && m.department !== dept) return false;
        if (!search) return true;
        const q = search.toLowerCase();
        return [m.name, m.role, m.email, m.department].some((v) => (v ?? '').toLowerCase().includes(q));
      }),
    [team, search, status, dept]
  );

  const STATUS_FILTERS = [
    { id: 'all', label: '全部成员' },
    { id: 'online', label: '在线' },
    { id: 'away', label: '离开' },
    { id: 'offline', label: '离线' },
  ];

  return (
    <div className="animate-fade-up">
      <PageHeader
        title="团队管理"
        description="管理团队成员和协作权限"
        actions={
          <Button variant="primary" onClick={() => setInviteOpen(true)}>
            <Plus className="size-4" /> 邀请成员
          </Button>
        }
      />

      {/* 统计卡 */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <TeamStat value={team.length} label="团队成员" />
        <TeamStat value={onlineCount} label="当前在线" color={DATA_PALETTE.emerald} />
        <TeamStat value={projects.length} label="活跃项目" />
        <TeamStat value={withActive} label="有任务进行中" />
      </div>

      {/* 筛选 */}
      <div className="mb-5 flex flex-wrap items-center gap-2.5">
        <SearchInput value={search} onValueChange={setSearch} placeholder="搜索成员姓名、角色、部门…" className="w-full max-w-xs" />
        <Select value={dept} onValueChange={setDept}>
          <SelectTrigger className="h-9 w-auto min-w-32 text-sm">
            <SelectValue placeholder="部门" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部部门</SelectItem>
            {depts.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="ms-auto flex flex-wrap gap-1.5">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setStatus(f.id)}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm transition-colors',
                status === f.id ? 'holographic-bg text-[var(--color-holo-foreground)]' : 'bg-[var(--color-glass-bg)] hover:bg-[var(--color-glass-bg-hover)]'
              )}
            >
              {f.label}
              <span className={cn('text-xs', status === f.id ? 'text-[var(--color-holo-foreground)]/70' : 'text-text-tertiary')}>{statusCount(f.id)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 成员卡 */}
      {teamQ.isPending ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((m) => {
          const stats = memberStats(m.id);
          return (
            <Card key={m.id} interactive className="p-5" onClick={() => setDetail(m)}>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <UserAvatar user={m} size="lg" />
                  <span className="absolute bottom-0 end-0 size-3.5 rounded-full ring-2 ring-[var(--color-bg-primary)]" style={{ background: STATUS_COLOR[m.status] }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display font-semibold">{m.name}</p>
                  <p className="truncate text-sm text-text-tertiary">
                    {m.role}
                    {m.department ? ` · ${m.department}` : ''}
                  </p>
                  <p className="truncate text-xs text-text-muted">{m.email}</p>
                </div>
                <div className="flex flex-col gap-1" onClick={(e) => e.stopPropagation()}>
                  <SimpleTooltip content="发送消息">
                    <button className="text-text-tertiary transition-colors hover:text-cyan" aria-label="消息">
                      <MessageSquare className="size-4" />
                    </button>
                  </SimpleTooltip>
                  <SimpleTooltip content="详情">
                    <button onClick={() => setDetail(m)} className="text-text-tertiary transition-colors hover:text-foreground" aria-label="详情">
                      <MoreHorizontal className="size-4" />
                    </button>
                  </SimpleTooltip>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-[var(--radius-md)] bg-[var(--color-glass-bg)] px-4 py-2.5">
                <Stat value={stats.active} label="进行中" />
                <span className="h-8 w-px bg-[var(--color-glass-border)]" />
                <Stat value={stats.completed} label="已完成" />
                <span className="h-8 w-px bg-[var(--color-glass-border)]" />
                <Stat value={stats.total} label="总数" />
              </div>

              <div className="mt-3 flex items-center gap-1.5 text-xs" style={{ color: STATUS_COLOR[m.status] }}>
                <span className="size-1.5 rounded-full" style={{ background: STATUS_COLOR[m.status] }} />
                {STATUS_LABEL[m.status]}
              </div>
            </Card>
          );
        })}
      </div>
      )}

      <MemberDetailDialog member={detail} onClose={() => setDetail(null)} />
      <InviteDialog open={inviteOpen} onOpenChange={setInviteOpen} />
    </div>
  );
}

function TeamStat({ value, label, color }: { value: number; label: string; color?: string }) {
  return (
    <Card className="p-5 text-center">
      <p className="font-display text-3xl font-bold tabular-nums" style={color ? { color } : undefined}>
        {value}
      </p>
      <p className="mt-1 text-sm text-text-tertiary">{label}</p>
    </Card>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <p className="font-display text-lg font-bold tabular-nums">{value}</p>
      <p className="text-[11px] text-text-tertiary">{label}</p>
    </div>
  );
}
