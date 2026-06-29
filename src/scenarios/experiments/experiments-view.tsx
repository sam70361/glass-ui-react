import { useMemo, useState } from 'react';
import { CirclePlay, CircleStop, FlaskConical, Plus, TrendingUp, Trophy } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { ScenarioEmpty, ScenarioFrame, ScenarioGate, ScenarioSkeleton, ScenarioToolbar, MasterList, notify } from 'src/scenarios/_kit';
import { DATA_PALETTE } from 'src/theme/palette';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Badge } from 'src/components/ui/badge';
import { Progress } from 'src/components/ui/progress';
import { Button } from 'src/components/ui/button';
import { StatCard } from 'src/components/shared/stat-card';
import { MultiLine } from 'src/components/charts';
import { useScenarioData } from 'src/api';
import { STATUS, mkSeries, type Experiment } from './experiments.mock';

type ExperimentsData = { INITIAL: Experiment[]; trendSeries: { key: string; name: string; color: string }[] };

export default function ExperimentsScenario() {
  const q = useScenarioData<ExperimentsData>('experiments');
  return (
    <ScenarioGate query={q} skeleton={<ScenarioFrame id="experiments"><ScenarioSkeleton /></ScenarioFrame>}>
      {(d) => <ExperimentsInner {...d} />}
    </ScenarioGate>
  );
}

function ExperimentsInner({ INITIAL, trendSeries }: ExperimentsData) {
  const [list, setList] = useState<Experiment[]>(INITIAL);
  const [activeId, setActiveId] = useState('e1');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => list.filter((e) => filter === 'all' || e.status === filter), [list, filter]);
  const active = list.find((e) => e.id === activeId);
  const series = useMemo(() => (active ? mkSeries(active.variants[0].conv / 4, active.variants[1].conv / 4) : []), [active]);

  const create = () => {
    const e: Experiment = { id: `e-${Date.now()}`, name: '未命名实验', status: 'draft', confidence: 0, uplift: 0, samples: '0', days: 0, variants: [{ name: '对照组 A', traffic: 50, conv: 0, users: 0, winner: false }, { name: '实验组 B', traffic: 50, conv: 0, users: 0, winner: false }] };
    setList((s) => [e, ...s]);
    setActiveId(e.id);
    notify.success('已创建实验草稿');
  };
  const toggle = (id: string) => {
    setList((s) => s.map((e) => (e.id === id ? { ...e, status: e.status === 'running' ? 'stopped' : 'running' } : e)));
    notify.success('已更新实验状态');
  };

  return (
    <ScenarioFrame
      id="experiments"
      actions={<Button variant="primary" onClick={create}><Plus className="size-4" /> 新建实验</Button>}
    >
      <ScenarioToolbar
        filters={[
          { id: 'all', label: '全部', count: list.length },
          { id: 'running', label: '运行中', count: list.filter((e) => e.status === 'running').length },
          { id: 'stopped', label: '已停止', count: list.filter((e) => e.status === 'stopped').length },
          { id: 'draft', label: '草稿', count: list.filter((e) => e.status === 'draft').length },
        ]}
        activeFilter={filter}
        onFilter={setFilter}
      />

      <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
        <MasterList
          items={filtered}
          selectedId={activeId}
          getId={(e) => e.id}
          onSelect={(e) => setActiveId(e.id)}
          itemClassName="flex flex-col gap-1.5"
          renderItem={(e) => (
            <>
              <div className="flex items-center gap-2">
                <span className="min-w-0 flex-1 truncate text-sm font-medium">{e.name}</span>
                <Badge variant={STATUS[e.status].v}>{STATUS[e.status].t}</Badge>
              </div>
              <p className="text-xs text-text-tertiary">{e.status === 'draft' ? '尚未启动' : `置信度 ${e.confidence}% · ${e.days} 天`}</p>
            </>
          )}
        />

        {active && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <StatCard label="转化提升" value={`${active.uplift > 0 ? '+' : ''}${active.uplift}%`} change={active.uplift} icon={TrendingUp} color={DATA_PALETTE.emerald} />
              <StatCard label="置信度" value={`${active.confidence}%`} icon={FlaskConical} color={DATA_PALETTE.cyan} />
              <StatCard label="样本量" value={active.samples} icon={FlaskConical} color={DATA_PALETTE.violet} />
              <StatCard label="运行天数" value={active.days} icon={FlaskConical} color={DATA_PALETTE.amber} />
            </div>

            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold">{active.name}</h3>
              {active.status !== 'draft' ? (
                <Button variant={active.status === 'running' ? 'danger' : 'secondary'} size="sm" onClick={() => toggle(active.id)}>
                  {active.status === 'running' ? <><CircleStop className="size-4" /> 停止实验</> : <><CirclePlay className="size-4" /> 重新启动</>}
                </Button>
              ) : (
                <Button variant="primary" size="sm" onClick={() => toggle(active.id)}><CirclePlay className="size-4" /> 启动</Button>
              )}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader><CardTitle>转化率趋势（A/B）</CardTitle></CardHeader>
                <CardContent>
                  {active.status === 'draft' ? (
                    <ScenarioEmpty />
                  ) : (
                    <MultiLine data={series} series={trendSeries} />
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>分组对比</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {active.variants.map((v) => (
                    <div key={v.name} className={cn('rounded-[var(--radius-md)] border p-4', v.winner && active.status !== 'draft' ? 'border-[rgba(var(--color-success-rgb),0.4)] bg-[rgba(var(--color-success-rgb),0.06)]' : 'border-[var(--color-glass-border)]')}>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 font-medium">{v.name}{v.winner && active.status !== 'draft' && <Badge variant="success"><Trophy className="size-3" /> 胜出</Badge>}</span>
                        <span className="font-display text-xl font-bold tabular-nums">{v.conv}%</span>
                      </div>
                      <div className="mt-3 flex items-center gap-3 text-xs text-text-tertiary">
                        <span>流量 {v.traffic}%</span>
                        <Progress value={v.conv * 12} className="flex-1" />
                        <span>{v.users.toLocaleString()} 用户</span>
                      </div>
                    </div>
                  ))}
                  <p className="rounded-[var(--radius-md)] bg-[var(--color-glass-bg)] px-3 py-2 text-sm text-text-secondary">
                    {active.status === 'draft'
                      ? '配置分流与指标后启动实验。'
                      : active.confidence >= 95
                        ? '实验组转化率显著高于对照组（p < 0.05），建议全量发布。'
                        : '尚未达到显著性（置信度 < 95%），建议继续观察。'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </ScenarioFrame>
  );
}
