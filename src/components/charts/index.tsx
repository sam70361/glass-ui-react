import {
  Area,
  AreaChart as ReAreaChart,
  Bar,
  BarChart as ReBarChart,
  CartesianGrid,
  Cell,
  ComposedChart as ReComposedChart,
  Funnel,
  FunnelChart as ReFunnelChart,
  LabelList,
  Legend,
  Line,
  LineChart as ReLineChart,
  Pie,
  PieChart as RePieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart as ReRadarChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart as ReScatterChart,
  Tooltip,
  Treemap as ReTreemap,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';

import { CATEGORICAL } from 'src/theme/palette';
import { SimpleTooltip } from 'src/components/ui/tooltip';

/** 全息调色板，供图表系列着色（数据层单一来源） */
export const CHART_COLORS = CATEGORICAL;

/* 结构色（坐标轴/网格/游标）随明暗主题切换：实际着色由 base.css 中针对 recharts */
/* 内部 class 的 CSS 规则完成（SVG 呈现属性不解析 var()）；此处保留 var 以表意图。 */
const axisProps = { stroke: 'var(--color-chart-axis)', fontSize: 11, tickLine: false, axisLine: false } as const;
const gridProps = { stroke: 'var(--color-chart-grid)', strokeDasharray: '3 3' } as const;
const tooltipStyle = {
  background: 'var(--color-surface-solid)',
  border: '1px solid var(--color-glass-border)',
  borderRadius: 10,
  fontSize: 12,
  color: 'var(--color-text-primary)',
} as const;

export interface SeriesPoint {
  label: string;
  value: number;
}
export interface SeriesDef {
  key: string;
  name: string;
  color?: string;
}
export type MultiRow = { label: string } & Record<string, number | string>;

const legendStyle = { fontSize: 11 } as const;

/* ============ 趋势类 ============ */

export function AreaTrend({ data, color = CHART_COLORS[0], height = 220 }: { data: SeriesPoint[]; color?: string; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReAreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id={`area-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.5} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid {...gridProps} vertical={false} />
        <XAxis dataKey="label" {...axisProps} />
        <YAxis {...axisProps} width={32} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: color, strokeOpacity: 0.2 }} />
        <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fill={`url(#area-${color})`} />
      </ReAreaChart>
    </ResponsiveContainer>
  );
}

export function MultiLine({ data, series, height = 240 }: { data: MultiRow[]; series: SeriesDef[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReLineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid {...gridProps} vertical={false} />
        <XAxis dataKey="label" {...axisProps} />
        <YAxis {...axisProps} width={32} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={legendStyle} />
        {series.map((s, i) => (
          <Line key={s.key} type="monotone" dataKey={s.key} name={s.name} stroke={s.color ?? CHART_COLORS[i % CHART_COLORS.length]} strokeWidth={2} dot={false} />
        ))}
      </ReLineChart>
    </ResponsiveContainer>
  );
}

export function ComposedTrend({ data, bar, line, height = 240 }: { data: MultiRow[]; bar: SeriesDef; line: SeriesDef; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReComposedChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid {...gridProps} vertical={false} />
        <XAxis dataKey="label" {...axisProps} />
        <YAxis {...axisProps} width={32} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={legendStyle} />
        <Bar dataKey={bar.key} name={bar.name} fill={bar.color ?? CHART_COLORS[0]} radius={[6, 6, 0, 0]} maxBarSize={28} />
        <Line type="monotone" dataKey={line.key} name={line.name} stroke={line.color ?? CHART_COLORS[1]} strokeWidth={2} dot={false} />
      </ReComposedChart>
    </ResponsiveContainer>
  );
}

/* ============ 构成类 ============ */

export function BarSeries({ data, color = CHART_COLORS[0], height = 220 }: { data: SeriesPoint[]; color?: string; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReBarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid {...gridProps} vertical={false} />
        <XAxis dataKey="label" {...axisProps} />
        <YAxis {...axisProps} width={32} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'var(--color-chart-cursor)' }} />
        <Bar dataKey="value" fill={color} radius={[6, 6, 0, 0]} maxBarSize={36} />
      </ReBarChart>
    </ResponsiveContainer>
  );
}

export function StackedBar({ data, series, height = 240 }: { data: MultiRow[]; series: SeriesDef[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReBarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid {...gridProps} vertical={false} />
        <XAxis dataKey="label" {...axisProps} />
        <YAxis {...axisProps} width={32} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'var(--color-chart-cursor)' }} />
        <Legend wrapperStyle={legendStyle} />
        {series.map((s, i) => (
          <Bar key={s.key} dataKey={s.key} name={s.name} stackId="a" fill={s.color ?? CHART_COLORS[i % CHART_COLORS.length]} maxBarSize={40} radius={i === series.length - 1 ? [6, 6, 0, 0] : 0} />
        ))}
      </ReBarChart>
    </ResponsiveContainer>
  );
}

export function GroupedBar({ data, series, height = 240 }: { data: MultiRow[]; series: SeriesDef[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReBarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid {...gridProps} vertical={false} />
        <XAxis dataKey="label" {...axisProps} />
        <YAxis {...axisProps} width={32} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'var(--color-chart-cursor)' }} />
        <Legend wrapperStyle={legendStyle} />
        {series.map((s, i) => (
          <Bar key={s.key} dataKey={s.key} name={s.name} fill={s.color ?? CHART_COLORS[i % CHART_COLORS.length]} radius={[4, 4, 0, 0]} maxBarSize={18} />
        ))}
      </ReBarChart>
    </ResponsiveContainer>
  );
}

/* ============ 占比类 ============ */

export function DonutChart({ data, height = 220 }: { data: SeriesPoint[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RePieChart>
        <Tooltip contentStyle={tooltipStyle} />
        <Pie data={data} dataKey="value" nameKey="label" innerRadius="58%" outerRadius="82%" paddingAngle={3} stroke="none">
          {data.map((_, i) => (
            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
        </Pie>
      </RePieChart>
    </ResponsiveContainer>
  );
}

export function PieBreakdown({ data, height = 220 }: { data: SeriesPoint[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RePieChart>
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={legendStyle} />
        <Pie data={data} dataKey="value" nameKey="label" outerRadius="80%" stroke="none" label={{ fontSize: 11 }}>
          {data.map((_, i) => (
            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
        </Pie>
      </RePieChart>
    </ResponsiveContainer>
  );
}

/* ============ 关系类 ============ */

export function RadarSeries({ data, series, height = 260 }: { data: MultiRow[]; series: SeriesDef[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReRadarChart data={data} outerRadius="72%">
        <PolarGrid stroke="var(--color-chart-grid)" />
        <PolarAngleAxis dataKey="label" tick={{ fontSize: 11 }} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={legendStyle} />
        {series.map((s, i) => {
          const c = s.color ?? CHART_COLORS[i % CHART_COLORS.length];
          return <Radar key={s.key} dataKey={s.key} name={s.name} stroke={c} fill={c} fillOpacity={0.25} />;
        })}
      </ReRadarChart>
    </ResponsiveContainer>
  );
}

export interface ScatterPoint {
  x: number;
  y: number;
  z?: number;
  name?: string;
}
export function ScatterPlot({ points, xName = 'X', yName = 'Y', color = CHART_COLORS[0], height = 240 }: { points: ScatterPoint[]; xName?: string; yName?: string; color?: string; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReScatterChart margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid {...gridProps} />
        <XAxis type="number" dataKey="x" name={xName} {...axisProps} />
        <YAxis type="number" dataKey="y" name={yName} {...axisProps} width={32} />
        <ZAxis type="number" dataKey="z" range={[40, 300]} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ strokeDasharray: '3 3' }} />
        <Scatter data={points} fill={color} fillOpacity={0.7} />
      </ReScatterChart>
    </ResponsiveContainer>
  );
}

/* ============ 流程类 ============ */

export function FunnelSeries({ data, height = 260 }: { data: { label: string; value: number }[]; height?: number }) {
  const rows = data.map((d, i) => ({ name: d.label, value: d.value, fill: CHART_COLORS[i % CHART_COLORS.length] }));
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReFunnelChart>
        <Tooltip contentStyle={tooltipStyle} />
        <Funnel dataKey="value" data={rows} isAnimationActive>
          <LabelList position="right" stroke="none" dataKey="name" fontSize={12} />
        </Funnel>
      </ReFunnelChart>
    </ResponsiveContainer>
  );
}

/* ============ 层级类 ============ */

export function TreemapChart({ data, height = 240 }: { data: { name: string; size: number }[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReTreemap data={data} dataKey="size" nameKey="name" stroke="var(--color-bg-primary)" content={<TreemapCell />} />
    </ResponsiveContainer>
  );
}
function TreemapCell(props: any) {
  const { x, y, width, height, index, name } = props;
  const fill = CHART_COLORS[(index ?? 0) % CHART_COLORS.length];
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={fill} fillOpacity={0.7} stroke="var(--color-bg-primary)" strokeWidth={2} rx={6} />
      {width > 50 && height > 24 && (
        <text x={x + 8} y={y + 18} style={{ fill: 'var(--color-holo-foreground)' }} fontSize={11} fontWeight={600}>
          {name}
        </text>
      )}
    </g>
  );
}

/* ============ 指标类 ============ */

export function RadialGauge({ value, color = CHART_COLORS[0], label, height = 200 }: { value: number; color?: string; label?: string; height?: number }) {
  const data = [{ name: label ?? '', value, fill: color }];
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={height}>
        <RadialBarChart innerRadius="70%" outerRadius="100%" data={data} startAngle={90} endAngle={90 - (value / 100) * 360}>
          <RadialBar background={{ fill: 'var(--color-track)' }} dataKey="value" cornerRadius={20} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-3xl font-bold tabular-nums">{value}%</span>
        {label && <span className="text-xs text-text-tertiary">{label}</span>}
      </div>
    </div>
  );
}

export function Sparkline({ data, color = CHART_COLORS[0], height = 48 }: { data: SeriesPoint[]; color?: string; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReAreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`spark-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.4} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fill={`url(#spark-${color})`} />
      </ReAreaChart>
    </ResponsiveContainer>
  );
}

/* ============ 密度类（自定义热力网格） ============ */

export function Heatmap({
  rows,
  cols,
  data,
  max,
  color = CHART_COLORS[0],
}: {
  rows: string[];
  cols: string[];
  /** data[rowIndex][colIndex] = value */
  data: number[][];
  max?: number;
  color?: string;
}) {
  const peak = max ?? Math.max(1, ...data.flat());
  return (
    <div className="overflow-x-auto">
      <div className="inline-grid gap-1" style={{ gridTemplateColumns: `auto repeat(${cols.length}, 1fr)` }}>
        <span />
        {cols.map((c) => (
          <span key={c} className="px-1 text-center text-[10px] text-text-tertiary">
            {c}
          </span>
        ))}
        {rows.map((r, ri) => (
          <FragmentRow key={r} label={r} values={data[ri] ?? []} peak={peak} color={color} />
        ))}
      </div>
    </div>
  );
}
function FragmentRow({ label, values, peak, color }: { label: string; values: number[]; peak: number; color: string }) {
  return (
    <>
      <span className="flex items-center pe-1 text-[10px] text-text-tertiary">{label}</span>
      {values.map((v, i) => (
        <SimpleTooltip key={i} content={`${v}`}>
          <div
            className="aspect-square min-w-4 rounded-[4px]"
            style={{ background: color, opacity: 0.12 + 0.88 * (v / peak) }}
          />
        </SimpleTooltip>
      ))}
    </>
  );
}
