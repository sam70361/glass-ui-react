import type { MultiRow } from 'src/components/charts';

export interface Plan {
  name: string;
  price: number;
  features: string[];
  current: boolean;
}

export interface Usage {
  label: string;
  used: number;
  cap: number;
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid';
  /** 仅用于操作列的列键占位（下载按钮） */
  action?: undefined;
}

export const PLANS: Plan[] = [
  { name: 'Free', price: 0, features: ['3 个项目', '社区支持'], current: false },
  { name: 'Pro', price: 99, features: ['无限项目', '优先支持', 'AI Copilot'], current: true },
  { name: 'Team', price: 299, features: ['团队协作', 'SSO', '审计日志'], current: false },
];

export const USAGE: Usage[] = [
  { label: 'API 调用', used: 7300, cap: 10000 },
  { label: '存储', used: 64, cap: 100 },
  { label: '协作席位', used: 6, cap: 10 },
];

export const INVOICES: Invoice[] = [
  { id: 'INV-2026-06', date: '2026-06-01', amount: 99, status: 'paid' },
  { id: 'INV-2026-05', date: '2026-05-01', amount: 99, status: 'paid' },
  { id: 'INV-2026-04', date: '2026-04-01', amount: 99, status: 'paid' },
];

/** 收入（柱）+ MRR（线）月度趋势，供 ComposedTrend 渲染 */
export const REVENUE_TREND: MultiRow[] = [
  { label: '1月', revenue: 82, mrr: 41 },
  { label: '2月', revenue: 96, mrr: 45 },
  { label: '3月', revenue: 88, mrr: 48 },
  { label: '4月', revenue: 124, mrr: 56 },
  { label: '5月', revenue: 138, mrr: 63 },
  { label: '6月', revenue: 165, mrr: 72 },
];
