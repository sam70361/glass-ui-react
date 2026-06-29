import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  FolderKanban,
  FolderPlus,
  Gauge,
  PlusSquare,
  Sparkles,
  Upload,
  UserPlus,
  Users,
} from 'lucide-react';

import { cn } from 'src/lib/utils';
import { DATA_PALETTE } from 'src/theme/palette';
import { PageHeader } from 'src/components/shared/page-header';
import { StatCard } from 'src/components/shared/stat-card';
import { TaskItem } from 'src/components/shared/task-item';
import { QuickAction } from 'src/components/shared/quick-action';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { EmptyState } from 'src/components/ui/empty-state';
import { Skeleton, SkeletonText } from 'src/components/ui/skeleton';
import { Timeline, TimelineItem } from 'src/components/shared/timeline';
import { AreaTrend, DonutChart } from 'src/components/charts';
import { useFormat } from 'src/lib/format';
import { paths } from 'src/routes/paths';
import { useAppStore } from 'src/store';
import { useUIStore } from 'src/store';
import { useTranslation } from 'src/i18n';
import { useActivitiesQuery, useProjectsQuery, useTasksQuery, useTeamQuery } from 'src/api';
import { weeklyData } from 'src/mocks/fixtures/core-data';
import { priorityMeta } from 'src/config/constants';
import type { Activity, Task, User } from 'src/types';

function useGreeting() {
  const { t } = useTranslation();
  const h = new Date().getHours();
  if (h < 6) return t('dashboard.greeting.lateNight');
  if (h < 12) return t('dashboard.greeting.morning');
  if (h < 14) return t('dashboard.greeting.noon');
  if (h < 18) return t('dashboard.greeting.afternoon');
  return t('dashboard.greeting.evening');
}

const DAY = 86400000;

/** 项目任务统计（基于 query 数据本地派生，避免依赖 store getState） */
function statsFor(projectId: string, tasks: Task[]) {
  const list = tasks.filter((t) => t.projectId === projectId);
  const done = list.filter((t) => t.status === 'done').length;
  return { total: list.length, done, progress: list.length ? Math.round((done / list.length) * 100) : 0 };
}

export default function DashboardView() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setCopilotOpen = useUIStore((s) => s.setCopilotOpen);
  const currentUser = useAppStore((s) => s.currentUser);
  const setActiveProject = useAppStore((s) => s.setActiveProject);
  const fmt = useFormat();
  const greet = useGreeting();

  const projectsQ = useProjectsQuery();
  const tasksQ = useTasksQuery();
  const teamQ = useTeamQuery();
  const activitiesQ = useActivitiesQuery();

  const projects = projectsQ.data ?? [];
  const tasks = tasksQ.data ?? [];
  const team = teamQ.data ?? [];
  const activities = activitiesQ.data ?? [];

  const loading = projectsQ.isPending || tasksQ.isPending || teamQ.isPending || activitiesQ.isPending;

  const done = tasks.filter((t) => t.status === 'done').length;
  const total = tasks.length;
  const activeMembers = team.filter((m) => tasks.some((t) => t.assigneeId === m.id && t.status !== 'done')).length;
  const stats = {
    projectsCount: projects.length,
    done,
    total,
    completionRate: total ? Math.round((done / total) * 100) : 0,
    teamActivity: team.length ? Math.round((activeMembers / team.length) * 100) : 0,
  };

  const pOrder = { high: 0, medium: 1, low: 2 } as const;
  const todayTasks = tasks
    .filter((t) => t.status !== 'done')
    .sort((a, b) => pOrder[a.priority] - pOrder[b.priority])
    .slice(0, 6);

  const myTasks = tasks.filter((t) => t.assigneeId === currentUser.id);
  const myActive = myTasks.filter((t) => t.status !== 'done');
  const myDone = myTasks.filter((t) => t.status === 'done');
  const myOverdue = myTasks.filter((t) => t.status !== 'done' && new Date(t.dueDate).getTime() < Date.now());
  const dueSoon = tasks
    .filter((t) => t.status !== 'done' && new Date(t.dueDate).getTime() - Date.now() < 3 * DAY)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 4);

  const trend = weeklyData.map((d) => ({ label: d.day, value: d.completed }));
  const distribution = projects.map((p) => ({ label: p.name, value: statsFor(p.id, tasks).total }));

  const quickActions = [
    { icon: FolderPlus, label: t('common.create'), color: DATA_PALETTE.cyan, onClick: () => navigate(paths.board) },
    { icon: Upload, label: t('common.upload'), color: DATA_PALETTE.magenta, onClick: () => navigate(paths.assets) },
    { icon: UserPlus, label: t('team.invite'), color: DATA_PALETTE.amber, onClick: () => navigate(paths.team) },
    { icon: PlusSquare, label: t('board.addTask'), color: DATA_PALETTE.emerald, onClick: () => navigate(paths.board) },
  ];

  return (
    <div className="animate-fade-up">
      <PageHeader title={t('dashboard.title')} description={`${greet}，${currentUser.name}。${t('dashboard.creativeDay')}`} />

      {/* 欢迎横幅 */}
      <Card className="mb-6 overflow-hidden">
        <CardContent className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-display text-xl font-bold">
              {greet}，{currentUser.name} 👋
            </p>
            <p className="mt-1 text-sm text-text-tertiary">
              你今天有 <strong className="text-foreground">{myActive.length}</strong> 个进行中的任务
              {dueSoon.length > 0 ? (
                <>
                  ，其中 <strong className="text-warning">{dueSoon.length}</strong> 个即将到期
                </>
              ) : (
                '，节奏良好'
              )}
              。
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setCopilotOpen(true)}>
              <Sparkles className="size-4" /> AI 总结今日
            </Button>
            <Button variant="primary" onClick={() => navigate(paths.board)}>
              新建任务
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 统计卡 */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label={t('dashboard.projects')} value={loading ? '—' : stats.projectsCount} change={20} icon={FolderKanban} color={DATA_PALETTE.cyan} spark={trend} />
        <StatCard label={t('dashboard.tasksCompleted')} value={loading ? '—' : stats.done} change={12} icon={CheckCircle2} color={DATA_PALETTE.emerald} spark={trend} />
        <StatCard label={t('dashboard.completionRate')} value={loading ? '—' : `${stats.completionRate}%`} change={5} icon={Gauge} color={DATA_PALETTE.amber} />
        <StatCard label={t('dashboard.teamActivity')} value={loading ? '—' : `${stats.teamActivity}%`} change={-3} icon={Users} color={DATA_PALETTE.magenta} />
      </div>

      {/* 主网格 */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* 左列 */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>{t('dashboard.weeklyTrend')}</CardTitle>
              <span className="text-xs text-text-tertiary">任务完成趋势</span>
            </CardHeader>
            <CardContent>
              <AreaTrend data={trend} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>{t('dashboard.todayTasks')}</CardTitle>
              <Button variant="ghost" size="icon-sm" onClick={() => navigate(paths.board)} aria-label="新建任务">
                <PlusSquare className="size-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              {loading ? (
                <SkeletonText lines={6} />
              ) : todayTasks.length > 0 ? (
                <div className="space-y-0.5">
                  {todayTasks.map((t) => (
                    <TaskItem key={t.id} task={t} onOpen={() => navigate(paths.board)} />
                  ))}
                </div>
              ) : (
                <EmptyState icon={CheckCircle2} title="今天没有待办任务" description="享受创作时光！" />
              )}
            </CardContent>
          </Card>
        </div>

        {/* 右列 */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.quickActions')}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2.5 pt-0">
              {quickActions.map((a) => (
                <QuickAction key={a.label} {...a} />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>临期提醒</CardTitle>
              <span className="text-xs text-text-tertiary">未来 3 天</span>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              {loading ? (
                <SkeletonText lines={4} />
              ) : dueSoon.length > 0 ? (
                dueSoon.map((t) => {
                  const overdue = new Date(t.dueDate).getTime() < Date.now();
                  return (
                    <button
                      key={t.id}
                      onClick={() => navigate(paths.board)}
                      className="flex w-full items-center gap-2.5 rounded-[var(--radius-md)] px-2 py-1.5 text-left transition-colors hover:bg-[var(--color-glass-bg)]"
                    >
                      <span className="size-2 shrink-0 rounded-full" style={{ background: priorityMeta(t.priority).color }} />
                      <span className="flex-1 truncate text-sm">{t.title}</span>
                      <span className={cn('text-xs', overdue ? 'text-danger' : 'text-text-tertiary')}>
                        {overdue ? '已逾期' : fmt.date(t.dueDate)}
                      </span>
                    </button>
                  );
                })
              ) : (
                <p className="px-2 py-1 text-sm text-text-tertiary">近期没有到期任务 🎉</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>项目进度</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {loading ? (
                <SkeletonText lines={4} />
              ) : (
                projects.slice(0, 4).map((p) => {
                  const pct = statsFor(p.id, tasks).progress;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setActiveProject(p.id);
                        navigate(paths.board);
                      }}
                      className="block w-full text-left"
                    >
                      <div className="mb-1 flex items-center gap-2 text-sm">
                        <span className="size-2.5 rounded-full" style={{ background: p.color }} />
                        <span className="flex-1 truncate">{p.name}</span>
                        <span className="text-text-tertiary">{pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[var(--color-track)]">
                        <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, background: p.color }} />
                      </div>
                    </button>
                  );
                })
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>我的工作量</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-2 pt-0 text-center">
              <Workload value={myActive.length} label="进行中" />
              <Workload value={myDone.length} label="已完成" />
              <Workload value={myOverdue.length} label="已逾期" danger={myOverdue.length > 0} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>项目分布</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? <Skeleton className="mx-auto size-44 rounded-full" /> : <DonutChart data={distribution} height={180} />}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>{t('dashboard.recentActivity')}</CardTitle>
              <button onClick={() => navigate(paths.activity)} className="text-xs text-cyan hover:underline">
                查看全部
              </button>
            </CardHeader>
            <CardContent className="pt-0">
              {loading ? (
                <SkeletonText lines={6} />
              ) : (
                <Timeline>
                  {activities.slice(0, 6).map((a, i, arr) => (
                    <ActivityRow key={a.id} activity={a} team={team} last={i === arr.length - 1} />
                  ))}
                </Timeline>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Workload({ value, label, danger }: { value: number; label: string; danger?: boolean }) {
  return (
    <div className="rounded-[var(--radius-md)] bg-[var(--color-glass-bg)] py-3">
      <p className={cn('font-display text-2xl font-bold tabular-nums', danger && 'text-danger')}>{value}</p>
      <p className="text-xs text-text-tertiary">{label}</p>
    </div>
  );
}

function ActivityRow({ activity, team, last }: { activity: Activity; team: User[]; last?: boolean }) {
  const user = team.find((m) => m.id === activity.userId);
  const fmt = useFormat();
  return (
    <TimelineItem color={activity.type} time={fmt.fromNow(activity.time)} last={last}>
      <span className="font-medium">{user?.name}</span> <span className="text-text-tertiary">{activity.action}</span>{' '}
      <span className="text-cyan">{activity.target}</span>
    </TimelineItem>
  );
}
