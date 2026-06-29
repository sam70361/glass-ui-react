import { ArrowRight, CheckCircle2, Loader2, Play } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { ScenarioFrame, ScenarioGate, notify } from 'src/scenarios/_kit';
import { DATA_PALETTE } from 'src/theme/palette';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { Progress } from 'src/components/ui/progress';
import { DataTable, type Column } from 'src/components/ui/data-table';
import { BarSeries, type SeriesPoint } from 'src/components/charts';
import { useScenarioData } from 'src/api';
import { STAGES, type Dataset } from './data-pipeline.mock';

type PipelineData = {
  DATASETS: Dataset[];
  RUNS: { id: string; name: string; status: string; progress: number; took: string }[];
  throughput: SeriesPoint[];
};

const datasetColumns: Column<Dataset>[] = [
  { key: 'name', header: '名称', sortable: true, className: 'font-mono text-sm' },
  { key: 'rows', header: '行数', sortable: true, align: 'end', className: 'tabular-nums text-text-secondary' },
  { key: 'size', header: '大小', sortable: true, align: 'end', className: 'tabular-nums text-text-secondary' },
  {
    key: 'status',
    header: '状态',
    className: 'w-24',
    render: (d) => <Badge variant={d.status === 'fresh' ? 'success' : 'amber'}>{d.status === 'fresh' ? '最新' : '待更新'}</Badge>,
  },
  { key: 'updated', header: '更新', className: 'w-24 text-text-tertiary' },
];

export default function DataPipelineScenario() {
  const q = useScenarioData<PipelineData>('data-pipeline');
  return (
    <ScenarioFrame
      id="data-pipeline"
      surface="flat"
      actions={
        <Button variant="primary" onClick={() => notify.success('管道已开始运行', 'ETL 任务已入队')}>
          <Play className="size-4" /> 运行管道
        </Button>
      }
    >
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>ETL 管道</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-2">
          {STAGES.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex items-center gap-2">
                <div
                  className={cn(
                    'flex items-center gap-2.5 rounded-[var(--radius-lg)] border px-4 py-3',
                    s.status === 'running'
                      ? 'border-[rgba(var(--color-accent-cyan-rgb),0.5)] bg-[rgba(var(--color-accent-cyan-rgb),0.08)]'
                      : 'border-[var(--color-glass-border)] bg-[var(--color-glass-bg)]'
                  )}
                >
                  <span className={cn('flex size-9 items-center justify-center rounded-[var(--radius-md)]', s.status === 'idle' ? 'text-text-tertiary' : 'text-cyan')}>
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-medium">{s.label}</p>
                    <p className="flex items-center gap-1 text-xs text-text-tertiary">
                      {s.status === 'done' && <CheckCircle2 className="size-3 text-success" />}
                      {s.status === 'running' && <Loader2 className="size-3 animate-spin text-cyan" />}
                      {s.status === 'done' ? '完成' : s.status === 'running' ? '运行中' : '等待'}
                    </p>
                  </div>
                </div>
                {i < STAGES.length - 1 && <ArrowRight className="size-4 text-text-muted" />}
              </div>
            );
          })}
        </CardContent>
      </Card>

      <ScenarioGate query={q}>
        {({ DATASETS, RUNS, throughput }) => (
          <>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>数据集</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable data={DATASETS} columns={datasetColumns} pageSize={6} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>处理吞吐 (万行/h)</CardTitle>
          </CardHeader>
          <CardContent>
            <BarSeries data={throughput} color={DATA_PALETTE.violet} height={180} />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>任务运行</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {RUNS.map((r) => (
            <div key={r.id} className="flex items-center gap-4">
              <span className="font-mono text-xs text-text-tertiary">{r.id}</span>
              <span className="w-40 truncate text-sm font-medium">{r.name}</span>
              <Progress value={r.progress} className="flex-1" />
              <Badge variant={r.status === 'success' ? 'success' : r.status === 'failed' ? 'danger' : 'cyan'}>
                {r.status === 'success' ? '成功' : r.status === 'failed' ? '失败' : '运行中'}
              </Badge>
              <span className="w-16 text-end text-xs tabular-nums text-text-tertiary">{r.took}</span>
            </div>
          ))}
        </CardContent>
      </Card>
          </>
        )}
      </ScenarioGate>
    </ScenarioFrame>
  );
}
