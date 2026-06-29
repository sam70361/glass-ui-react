import { useMemo, useState } from 'react';
import { Activity as ActivityIcon } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { PageHeader } from 'src/components/shared/page-header';
import { Card } from 'src/components/ui/card';
import { UserAvatar } from 'src/components/shared/user-avatar';
import { Badge } from 'src/components/ui/badge';
import { SkeletonText } from 'src/components/ui/skeleton';
import { EmptyState } from 'src/components/ui/empty-state';
import { Timeline, TimelineItem } from 'src/components/shared/timeline';
import { useFormat } from 'src/lib/format';
import { useActivitiesQuery, useTeamQuery } from 'src/api';
import type { Activity as ActivityT, User } from 'src/types';

export default function ActivityView() {
  const { data: activities = [], isPending, isError } = useActivitiesQuery();
  const { data: team = [] } = useTeamQuery();
  const [kind, setKind] = useState<string>('all');

  const kinds = ['all', 'task', 'asset', 'comment', 'project', 'member'];
  const list = useMemo(() => activities.filter((a) => kind === 'all' || a.kind === kind), [activities, kind]);

  return (
    <div className="animate-fade-up">
      <PageHeader title="活动日志" description="团队协作的完整时间线" />

      <div className="mb-5 flex flex-wrap gap-1.5">
        {kinds.map((k) => (
          <button
            key={k}
            onClick={() => setKind(k)}
            className={cn(
              'rounded-full px-3.5 py-1.5 text-sm transition-colors',
              kind === k ? 'holographic-bg text-[var(--color-holo-foreground)]' : 'bg-[var(--color-glass-bg)] hover:bg-[var(--color-glass-bg-hover)]'
            )}
          >
            {{ all: '全部', task: '任务', asset: '素材', comment: '评论', project: '项目', member: '成员' }[k]}
          </button>
        ))}
      </div>

      <Card className="p-6">
        {isError ? (
          <EmptyState icon={ActivityIcon} title="活动加载失败" description="请稍后重试" />
        ) : isPending ? (
          <SkeletonText lines={8} />
        ) : list.length === 0 ? (
          <EmptyState icon={ActivityIcon} title="暂无活动" description="切换筛选条件试试" />
        ) : (
          <Timeline>
            {list.map((a, i) => (
              <Row key={a.id} activity={a} team={team} last={i === list.length - 1} />
            ))}
          </Timeline>
        )}
      </Card>
    </div>
  );
}

const KIND_LABEL: Record<ActivityT['kind'], string> = {
  task: '任务',
  asset: '素材',
  comment: '评论',
  project: '项目',
  member: '成员',
};

function Row({ activity, team, last }: { activity: ActivityT; team: User[]; last?: boolean }) {
  const user = team.find((m) => m.id === activity.userId);
  const fmt = useFormat();
  return (
    <TimelineItem color={activity.type} time={fmt.fromNow(activity.time)} last={last}>
      <div className="flex items-center gap-2.5">
        <UserAvatar user={user} size="sm" fallback={user ? undefined : '?'} />
        <p className="flex-1">
          <span className="font-medium">{user?.name}</span> <span className="text-text-tertiary">{activity.action}</span>{' '}
          <span className="text-cyan">{activity.target}</span>
        </p>
        <Badge>{KIND_LABEL[activity.kind]}</Badge>
      </div>
    </TimelineItem>
  );
}
