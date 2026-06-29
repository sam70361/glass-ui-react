import { DATA_PALETTE } from 'src/theme/palette';

export const GAUGES = [
  { label: 'CPU 负载', value: 68, unit: '%', color: DATA_PALETTE.cyan },
  { label: '机舱温度', value: 42, unit: '°C', color: DATA_PALETTE.amber },
  { label: '湿度', value: 55, unit: '%', color: DATA_PALETTE.emerald },
  { label: '电压', value: 86, unit: 'V', color: DATA_PALETTE.violet },
];

export type DevStatus = 'online' | 'warning' | 'offline';

export const DEVICES: { id: string; name: string; status: DevStatus; temp: number; load: number }[] = [
  { id: 'D-01', name: '注塑机 A1', status: 'online', temp: 41, load: 62 },
  { id: 'D-02', name: '传送带 B2', status: 'online', temp: 38, load: 48 },
  { id: 'D-03', name: '焊接臂 C3', status: 'warning', temp: 67, load: 91 },
  { id: 'D-04', name: '冷却塔 D4', status: 'online', temp: 29, load: 34 },
  { id: 'D-05', name: '包装机 E5', status: 'offline', temp: 0, load: 0 },
  { id: 'D-06', name: '质检相机 F6', status: 'online', temp: 44, load: 57 },
];

export const STATUS: Record<DevStatus, { color: string; label: string; variant: 'success' | 'amber' | 'default' }> = {
  online: { color: DATA_PALETTE.emerald, label: '运行中', variant: 'success' },
  warning: { color: DATA_PALETTE.amber, label: '告警', variant: 'amber' },
  offline: { color: DATA_PALETTE.neutral, label: '离线', variant: 'default' },
};
