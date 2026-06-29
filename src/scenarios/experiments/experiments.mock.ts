import { DATA_PALETTE } from 'src/theme/palette';

export type Status = 'running' | 'stopped' | 'draft';

export interface Variant {
  name: string;
  traffic: number;
  conv: number;
  users: number;
  winner: boolean;
}

export interface Experiment {
  id: string;
  name: string;
  status: Status;
  confidence: number;
  uplift: number;
  samples: string;
  days: number;
  variants: Variant[];
}

export const INITIAL: Experiment[] = [
  { id: 'e1', name: '结算页按钮文案优化', status: 'running', confidence: 98.6, uplift: 38, samples: '24.8k', days: 7, variants: [{ name: '对照组 A', traffic: 50, conv: 4.2, users: 12400, winner: false }, { name: '实验组 B', traffic: 50, conv: 5.8, users: 12380, winner: true }] },
  { id: 'e2', name: '首页 Hero 布局实验', status: 'running', confidence: 86.2, uplift: 12, samples: '18.2k', days: 4, variants: [{ name: '对照组 A', traffic: 50, conv: 6.1, users: 9100, winner: false }, { name: '实验组 B', traffic: 50, conv: 6.8, users: 9080, winner: true }] },
  { id: 'e3', name: '新用户引导流程', status: 'stopped', confidence: 72.4, uplift: -3, samples: '9.4k', days: 10, variants: [{ name: '对照组 A', traffic: 50, conv: 3.4, users: 4700, winner: true }, { name: '实验组 B', traffic: 50, conv: 3.3, users: 4690, winner: false }] },
  { id: 'e4', name: '推荐算法 v3 灰度', status: 'draft', confidence: 0, uplift: 0, samples: '0', days: 0, variants: [{ name: '对照组 A', traffic: 50, conv: 0, users: 0, winner: false }, { name: '实验组 B', traffic: 50, conv: 0, users: 0, winner: false }] },
];

export const STATUS: Record<Status, { v: 'success' | 'default' | 'amber'; t: string }> = {
  running: { v: 'success', t: '运行中' },
  stopped: { v: 'default', t: '已停止' },
  draft: { v: 'amber', t: '草稿' },
};

export const trendSeries = [
  { key: '对照组', name: '对照组 A', color: DATA_PALETTE.neutral },
  { key: '实验组', name: '实验组 B', color: DATA_PALETTE.emerald },
];

export const mkSeries = (a: number, b: number) =>
  Array.from({ length: 7 }, (_, i) => ({ label: `D${i + 1}`, 对照组: 12 + i * a, 实验组: 12 + i * b }));
