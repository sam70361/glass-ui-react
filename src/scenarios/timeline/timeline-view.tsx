import { useMemo, useState } from 'react';
import { Flag } from 'lucide-react';

import { PageHeader } from 'src/components/shared/page-header';
import { Card } from 'src/components/ui/card';
import { SimpleTooltip } from 'src/components/ui/tooltip';
import { useFormat } from 'src/lib/format';
import { paths } from 'src/routes/paths';
import { useAppStore, projectStats } from 'src/store';
import { priorityMeta } from 'src/config/constants';
import { useNavigate } from 'react-router-dom';

const DAY = 86400000;

export default function TimelineView() {
  const projects = useAppStore((s) => s.projects);
  const tasks = useAppStore((s) => s.tasks);
  const setActiveProject = useAppStore((s) => s.setActiveProject);
  const navigate = useNavigate();
  const fmt = useFormat();
  const [hoverTask, setHoverTask] = useState<string | null>(null);

  const { start, totalDays, months } = useMemo(() => {
    const dates: number[] = [Date.now()];
    projects.forEach((p) => {
      if (p.startDate) dates.push(new Date(p.startDate).getTime());
      dates.push(new Date(p.dueDate).getTime());
    });
    tasks.forEach((t) => dates.push(new Date(t.dueDate).getTime()));
    const min = new Date(Math.min(...dates));
    const max = new Date(Math.max(...dates));
    const start = new Date(min.getFullYear(), min.getMonth(), 1);
    const end = new Date(max.getFullYear(), max.getMonth() + 1, 0);
    const totalDays = Math.max(30, Math.round((end.getTime() - start.getTime()) / DAY));
    const months: { label: string; left: number }[] = [];
    let cur = new Date(start);
    while (cur <= end) {
      months.push({ label: `${cur.getMonth() + 1}月`, left: ((cur.getTime() - start.getTime()) / DAY / totalDays) * 100 });
      cur = new Date(cur.getFullYear(), cur.getMonth() + 1, 1);
    }
    return { start, totalDays, months };
  }, [projects, tasks]);

  const pct = (d: string | number | Date) =>
    Math.max(0, Math.min(100, ((new Date(d).getTime() - start.getTime()) / DAY / totalDays) * 100));
  const todayLeft = pct(Date.now());

  return (
    <div className="animate-fade-up">
      <PageHeader title="项目计划" description="跨项目时间轴 · 甘特图 · 里程碑" />

      <Card className="overflow-hidden p-0">
        {/* 月份刻度 */}
        <div className="flex border-b border-[var(--color-glass-border)]">
          <div className="w-56 shrink-0 border-e border-[var(--color-glass-border)] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-text-tertiary">
            项目
          </div>
          <div className="relative h-10 flex-1">
            {months.map((m, i) => (
              <span key={i} className="absolute top-3 text-xs text-text-tertiary" style={{ left: `${m.left}%` }}>
                {m.label}
              </span>
            ))}
            <span className="absolute top-0 h-full w-px bg-[rgba(var(--color-accent-cyan-rgb),0.6)]" style={{ left: `${todayLeft}%` }} />
          </div>
        </div>

        {/* 项目行 */}
        <div className="divide-y divide-[var(--color-glass-border)]">
          {projects.map((p) => {
            const left = pct(p.startDate ?? start.toISOString());
            const right = pct(p.dueDate);
            const width = Math.max(3, right - left);
            const prog = projectStats(p.id).progress;
            const projTasks = tasks.filter((t) => t.projectId === p.id);
            return (
              <div key={p.id} className="flex items-center hover:bg-[var(--color-glass-bg)]">
                <button
                  onClick={() => {
                    setActiveProject(p.id);
                    navigate(paths.board);
                  }}
                  className="flex w-56 shrink-0 items-center gap-2.5 border-e border-[var(--color-glass-border)] px-4 py-4 text-left"
                >
                  <span className="size-2.5 shrink-0 rounded-full" style={{ background: p.color }} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-text-tertiary">
                      {prog}% · 截止 {fmt.date(p.dueDate)}
                    </p>
                  </div>
                </button>

                <div className="relative h-14 flex-1">
                  <span className="absolute top-0 h-full w-px bg-[rgba(var(--color-accent-cyan-rgb),0.35)]" style={{ left: `${todayLeft}%` }} />
                  {/* 项目条 + 进度填充 */}
                  <div
                    className="absolute top-1/2 flex h-7 -translate-y-1/2 items-center overflow-hidden rounded-full"
                    style={{ left: `${left}%`, width: `${width}%`, background: `${p.color}33` }}
                  >
                    <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${prog}%`, background: p.color }} />
                    <span className="relative z-10 truncate px-3 text-xs font-medium text-foreground">{p.name}</span>
                  </div>
                  {/* 里程碑 */}
                  <SimpleTooltip content={`里程碑：交付 ${fmt.date(p.dueDate)}`}>
                    <span
                      className="absolute top-1/2 flex size-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-surface-solid)] text-amber ring-2 ring-amber"
                      style={{ left: `${right}%` }}
                    >
                      <Flag className="size-2.5" />
                    </span>
                  </SimpleTooltip>
                  {/* 任务截止点 */}
                  {projTasks.map((t) => (
                    <SimpleTooltip key={t.id} content={`${t.title} · ${fmt.date(t.dueDate)}`}>
                      <span
                        onMouseEnter={() => setHoverTask(t.id)}
                        onMouseLeave={() => setHoverTask(null)}
                        className="absolute bottom-1.5 size-2 -translate-x-1/2 rounded-full ring-2 ring-[var(--color-bg-primary)] transition-transform hover:scale-150"
                        style={{
                          left: `${pct(t.dueDate)}%`,
                          background: priorityMeta(t.priority).color,
                          transform: hoverTask === t.id ? 'translateX(-50%) scale(1.5)' : undefined,
                        }}
                      />
                    </SimpleTooltip>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* 图例 */}
        <div className="flex flex-wrap items-center gap-5 border-t border-[var(--color-glass-border)] px-4 py-3 text-xs text-text-tertiary">
          <span className="flex items-center gap-1.5">
            <Flag className="size-3 text-amber" /> 里程碑
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-px bg-[rgba(var(--color-accent-cyan-rgb),0.6)]" /> 今天
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-cyan" /> 任务截止
          </span>
        </div>
      </Card>
    </div>
  );
}
