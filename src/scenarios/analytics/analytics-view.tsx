import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { Activity, CalendarRange, CheckCircle2, Clock, TrendingUp } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { PageHeader } from 'src/components/shared/page-header';
import { StatCard } from 'src/components/shared/stat-card';
import { DATA_PALETTE } from 'src/theme/palette';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover';
import { Calendar } from 'src/components/ui/calendar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import { Progress } from 'src/components/ui/progress';
import {
  FunnelSeries,
  Heatmap,
  MultiLine,
  PieBreakdown,
  RadarSeries,
  RadialGauge,
  ScatterPlot,
  StackedBar,
  TreemapChart,
} from 'src/components/charts';
import {
  channelPie,
  comparisonRows,
  effortScatter,
  heatmapCols,
  heatmapData,
  heatmapRows,
  memberRadar,
  monthlyTrend,
  projectStatusStack,
  projectTreemap,
  radarSeries,
  statusStackSeries,
  taskFunnel,
  trendSeries,
} from './analytics.mock';

const DIMENSIONS = [
  { id: 'day', label: '按天' },
  { id: 'week', label: '按周' },
  { id: 'month', label: '按月' },
];

export default function AnalyticsView() {
  const [dim, setDim] = useState('month');
  const [range, setRange] = useState<DateRange | undefined>();

  return (
    <div className="animate-fade-up">
      <PageHeader title="数据分析" description="团队效率与项目健康度的多维洞察" />

      {/* KPI */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="本月完成" value={210} change={14} icon={CheckCircle2} color={DATA_PALETTE.emerald} spark={monthlyTrend.map((m) => ({ label: m.label, value: m.完成 as number }))} />
        <StatCard label="本月新建" value={165} change={9} icon={TrendingUp} color={DATA_PALETTE.cyan} spark={monthlyTrend.map((m) => ({ label: m.label, value: m.新建 as number }))} />
        <StatCard label="累计工时" value="2.25k" change={11} icon={Clock} color={DATA_PALETTE.amber} />
        <StatCard label="平均完成率" value="56%" change={5} icon={Activity} color={DATA_PALETTE.magenta} />
      </div>

      {/* 筛选栏 */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <CalendarRange className="size-4" />
              {range?.from ? `${range.from.toLocaleDateString()} - ${range.to?.toLocaleDateString() ?? '…'}` : '近 30 天'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={1} />
          </PopoverContent>
        </Popover>

        <div className="flex items-center gap-1 rounded-full border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] p-1">
          {DIMENSIONS.map((d) => (
            <button
              key={d.id}
              onClick={() => setDim(d.id)}
              className={cn(
                'rounded-full px-3 py-1 text-sm font-medium transition-colors',
                dim === d.id ? 'holographic-bg text-[var(--color-holo-foreground)]' : 'text-text-tertiary hover:text-foreground'
              )}
            >
              {d.label}
            </button>
          ))}
        </div>
        <Badge variant="cyan" className="ms-auto">
          维度：{DIMENSIONS.find((d) => d.id === dim)?.label} · 全部项目
        </Badge>
      </div>

      {/* 第 1 行：趋势 + 完成率 */}
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>完成 / 新建 / 工时趋势</CardTitle>
          </CardHeader>
          <CardContent>
            <MultiLine data={monthlyTrend} series={trendSeries} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>整体完成率</CardTitle>
          </CardHeader>
          <CardContent>
            <RadialGauge value={56} label="已完成" color={DATA_PALETTE.emerald} />
          </CardContent>
        </Card>
      </div>

      {/* 第 2 行：构成 + 占比 */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>各项目任务状态构成</CardTitle>
          </CardHeader>
          <CardContent>
            <StackedBar data={projectStatusStack} series={statusStackSeries} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>任务来源占比</CardTitle>
          </CardHeader>
          <CardContent>
            <PieBreakdown data={channelPie} />
          </CardContent>
        </Card>
      </div>

      {/* 第 3 行：漏斗 + 雷达 + 散点 */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>任务生命周期漏斗</CardTitle>
          </CardHeader>
          <CardContent>
            <FunnelSeries data={taskFunnel} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>成员能力雷达</CardTitle>
          </CardHeader>
          <CardContent>
            <RadarSeries data={memberRadar} series={radarSeries} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>工时 vs 产出</CardTitle>
          </CardHeader>
          <CardContent>
            <ScatterPlot points={effortScatter} xName="工时(d)" yName="完成数" color={DATA_PALETTE.violet} />
          </CardContent>
        </Card>
      </div>

      {/* 第 4 行：树图 + 热力 */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>项目体量分布</CardTitle>
          </CardHeader>
          <CardContent>
            <TreemapChart data={projectTreemap} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>每周活跃热力</CardTitle>
          </CardHeader>
          <CardContent>
            <Heatmap rows={heatmapRows} cols={heatmapCols} data={heatmapData} color={DATA_PALETTE.cyan} />
          </CardContent>
        </Card>
      </div>

      {/* 对比明细表 */}
      <Card className="mt-4 p-0">
        <CardHeader>
          <CardTitle>项目指标对比</CardTitle>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>项目</TableHead>
              <TableHead className="text-end">任务</TableHead>
              <TableHead className="text-end">完成</TableHead>
              <TableHead className="w-40">完成率</TableHead>
              <TableHead className="text-end">工时</TableHead>
              <TableHead className="w-20 text-end">环比</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comparisonRows.map((r) => (
              <TableRow key={r.project}>
                <TableCell className="font-medium">{r.project}</TableCell>
                <TableCell className="text-end tabular-nums text-text-secondary">{r.total}</TableCell>
                <TableCell className="text-end tabular-nums text-text-secondary">{r.done}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-2">
                    <Progress value={r.rate} className="flex-1" />
                    <span className="w-9 text-end text-xs tabular-nums">{r.rate}%</span>
                  </span>
                </TableCell>
                <TableCell className="text-end tabular-nums text-text-secondary">{r.hours}</TableCell>
                <TableCell className={cn('text-end text-xs tabular-nums', r.trend.startsWith('-') ? 'text-danger' : 'text-success')}>{r.trend}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
