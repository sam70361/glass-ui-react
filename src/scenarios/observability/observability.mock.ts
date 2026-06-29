import { DATA_PALETTE } from 'src/theme/palette';
import type { MultiRow, SeriesDef, SeriesPoint } from 'src/components/charts';

export const qps: SeriesPoint[] = [
  { label: '00', value: 820 },
  { label: '04', value: 540 },
  { label: '08', value: 1320 },
  { label: '12', value: 1980 },
  { label: '16', value: 1640 },
  { label: '20', value: 1100 },
];

export const latency: SeriesPoint[] = [
  { label: '00', value: 120 },
  { label: '04', value: 98 },
  { label: '08', value: 180 },
  { label: '12', value: 240 },
  { label: '16', value: 210 },
  { label: '20', value: 150 },
];

export type Health = 'healthy' | 'degraded' | 'down';

export interface Service {
  id: string;
  name: string;
  health: Health;
  uptime: string;
  p99: string;
}

export const SERVICES: Service[] = [
  { id: 'svc-gateway', name: 'api-gateway', health: 'healthy', uptime: '99.98%', p99: '142ms' },
  { id: 'svc-auth', name: 'auth-service', health: 'healthy', uptime: '99.95%', p99: '88ms' },
  { id: 'svc-llm', name: 'llm-proxy', health: 'degraded', uptime: '99.20%', p99: '640ms' },
  { id: 'svc-render', name: 'render-worker', health: 'healthy', uptime: '99.99%', p99: '210ms' },
  { id: 'svc-notify', name: 'notify-service', health: 'down', uptime: '97.10%', p99: '—' },
];

export const HEALTH: Record<Health, { color: string; label: string; variant: 'success' | 'amber' | 'danger' }> = {
  healthy: { color: DATA_PALETTE.emerald, label: '健康', variant: 'success' },
  degraded: { color: DATA_PALETTE.amber, label: '降级', variant: 'amber' },
  down: { color: DATA_PALETTE.red, label: '故障', variant: 'danger' },
};

export interface Alert {
  sev: 'critical' | 'warning' | 'info';
  /** 关系字段：关联到具体服务 id */
  serviceId: string;
  text: string;
  time: string;
}

export const ALERTS: Alert[] = [
  { sev: 'critical', serviceId: 'svc-notify', text: 'notify-service 连续 5 分钟不可用', time: '2 分钟前' },
  { sev: 'warning', serviceId: 'svc-llm', text: 'llm-proxy P99 延迟 > 600ms', time: '12 分钟前' },
  { sev: 'info', serviceId: 'svc-render', text: 'render-worker 自动扩容至 6 实例', time: '40 分钟前' },
];

export const SEV: Record<string, { color: string; label: string }> = {
  critical: { color: DATA_PALETTE.red, label: '严重' },
  warning: { color: DATA_PALETTE.amber, label: '警告' },
  info: { color: DATA_PALETTE.cyan, label: '信息' },
};

/** 分服务 × 分维度健康评分（0-100，归一化以便同图对比），供 GroupedBar 展示 */
export const serviceScores: MultiRow[] = [
  { label: 'gateway', 可用性: 99, 性能: 92, 容量: 70 },
  { label: 'auth', 可用性: 99, 性能: 95, 容量: 62 },
  { label: 'llm-proxy', 可用性: 92, 性能: 64, 容量: 88 },
  { label: 'render', 可用性: 99, 性能: 88, 容量: 76 },
  { label: 'notify', 可用性: 78, 性能: 40, 容量: 30 },
];

export const scoreSeries: SeriesDef[] = [
  { key: '可用性', name: '可用性', color: DATA_PALETTE.emerald },
  { key: '性能', name: '性能', color: DATA_PALETTE.cyan },
  { key: '容量', name: '容量', color: DATA_PALETTE.violet },
];
