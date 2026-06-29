import { Database, Download, Filter, Wand2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { SeriesPoint } from 'src/components/charts';

export type StageStatus = 'done' | 'running' | 'idle';

export const STAGES: { label: string; icon: LucideIcon; status: StageStatus }[] = [
  { label: '数据源', icon: Database, status: 'done' },
  { label: '清洗', icon: Filter, status: 'done' },
  { label: '转换', icon: Wand2, status: 'running' },
  { label: '加载', icon: Download, status: 'idle' },
];

export interface Dataset {
  id: string;
  name: string;
  rows: string;
  size: string;
  updated: string;
  status: 'fresh' | 'stale';
}

export const DATASETS: Dataset[] = [
  { id: 'user_events', name: 'user_events', rows: '2.4M', size: '1.2 GB', updated: '5 分钟前', status: 'fresh' },
  { id: 'orders_raw', name: 'orders_raw', rows: '860K', size: '420 MB', updated: '1 小时前', status: 'fresh' },
  { id: 'sessions', name: 'sessions', rows: '5.1M', size: '3.4 GB', updated: '昨天', status: 'stale' },
  { id: 'product_catalog', name: 'product_catalog', rows: '12K', size: '24 MB', updated: '3 天前', status: 'stale' },
];

export const RUNS = [
  { id: 'job-2048', name: '每日用户行为 ETL', status: 'running', progress: 62, took: '进行中' },
  { id: 'job-2047', name: '订单聚合', status: 'success', progress: 100, took: '3m 12s' },
  { id: 'job-2046', name: '会话清洗', status: 'success', progress: 100, took: '1m 48s' },
  { id: 'job-2045', name: '目录同步', status: 'failed', progress: 40, took: '0m 52s' },
];

export const throughput: SeriesPoint[] = [
  { label: '00', value: 12 },
  { label: '04', value: 8 },
  { label: '08', value: 22 },
  { label: '12', value: 34 },
  { label: '16', value: 28 },
  { label: '20', value: 18 },
];
