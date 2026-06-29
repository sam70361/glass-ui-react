import { Activity, AlertTriangle, Server, Timer, Zap } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { ScenarioFrame, ScenarioGate, notify } from 'src/scenarios/_kit';
import { DATA_PALETTE } from 'src/theme/palette';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { Skeleton } from 'src/components/ui/skeleton';
import { StatCard } from 'src/components/shared/stat-card';
import { AreaTrend, GroupedBar, type MultiRow, type SeriesPoint } from 'src/components/charts';
import { useScenarioData } from 'src/api';
import { HEALTH, SEV, scoreSeries, type Alert, type Service } from './observability.mock';

interface ObservabilityPayload {
  qps: SeriesPoint[];
  latency: SeriesPoint[];
  services: Service[];
  alerts: Alert[];
  serviceScores: MultiRow[];
}

export default function ObservabilityScenario() {
  const query = useScenarioData<ObservabilityPayload>('observability');

  return (
    <ScenarioFrame
      id="observability"
      surface="flat"
      actions={
        <Button variant="primary" onClick={() => notify.info('已开启实时模式', '指标每 5 秒刷新')}>
          <Activity className="size-4" /> 实时模式
        </Button>
      }
    >
      <ScenarioGate query={query} skeleton={
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2"><Skeleton className="h-56" /><Skeleton className="h-56" /></div>
          <Skeleton className="h-64" />
        </div>
      }>
        {(data) => (
          <>
            <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              <StatCard label="请求量 (QPS)" value="1.98k" change={8} icon={Zap} color={DATA_PALETTE.cyan} spark={data.qps} />
              <StatCard label="错误率" value="0.42%" change={-12} icon={AlertTriangle} color={DATA_PALETTE.magenta} />
              <StatCard label="P99 延迟" value="240ms" change={6} icon={Timer} color={DATA_PALETTE.amber} />
              <StatCard label="在线服务" value="4/5" icon={Server} color={DATA_PALETTE.emerald} />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader><CardTitle>请求量 (QPS)</CardTitle></CardHeader>
                <CardContent><AreaTrend data={data.qps} color={DATA_PALETTE.cyan} /></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>响应延迟 (ms)</CardTitle></CardHeader>
                <CardContent><AreaTrend data={data.latency} color={DATA_PALETTE.amber} /></CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader><CardTitle>服务健康评分对比（可用性 / 性能 / 容量）</CardTitle></CardHeader>
              <CardContent><GroupedBar data={data.serviceScores} series={scoreSeries} /></CardContent>
            </Card>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
              <Card>
                <CardHeader><CardTitle>服务健康</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {data.services.map((s) => {
                    const h = HEALTH[s.health];
                    return (
                      <div key={s.id} className="flex items-center gap-3 rounded-[var(--radius-md)] bg-[var(--color-glass-bg)] px-3 py-2.5">
                        <span className="size-2.5 rounded-full" style={{ background: h.color, boxShadow: `0 0 6px ${h.color}` }} />
                        <span className="flex-1 font-mono text-sm">{s.name}</span>
                        <span className="text-xs text-text-tertiary">uptime {s.uptime}</span>
                        <span className="w-16 text-end text-xs tabular-nums text-text-secondary">{s.p99}</span>
                        <Badge variant={h.variant}>{h.label}</Badge>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>告警</CardTitle></CardHeader>
                <CardContent className="space-y-2.5">
                  {data.alerts.map((a, i) => {
                    const sev = SEV[a.sev];
                    return (
                      <div key={i} className="flex gap-3 rounded-[var(--radius-md)] border border-[var(--color-glass-border)] p-3">
                        <span className={cn('mt-1 size-2 shrink-0 rounded-full')} style={{ background: sev.color }} />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold" style={{ color: sev.color }}>{sev.label}</span>
                            <span className="text-xs text-text-muted">{a.time}</span>
                          </div>
                          <p className="mt-0.5 text-sm">{a.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </ScenarioGate>
    </ScenarioFrame>
  );
}
