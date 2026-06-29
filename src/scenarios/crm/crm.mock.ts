import { DATA_PALETTE } from 'src/theme/palette';

export interface Stage {
  id: string;
  label: string;
  color: string;
}

export interface Deal {
  id: string;
  name: string;
  amount: number;
  stage: string;
  owner: number;
}

export const STAGES: Stage[] = [
  { id: 'lead', label: '线索', color: DATA_PALETTE.neutral },
  { id: 'qualified', label: '已确认', color: DATA_PALETTE.cyan },
  { id: 'proposal', label: '方案', color: DATA_PALETTE.amber },
  { id: 'won', label: '成交', color: DATA_PALETTE.emerald },
];

export const DEALS: Deal[] = [
  { id: 'd1', name: '星河科技 年度合约', amount: 120000, stage: 'proposal', owner: 0 },
  { id: 'd2', name: '云端传媒 设计外包', amount: 48000, stage: 'qualified', owner: 1 },
  { id: 'd3', name: '极光教育 品牌升级', amount: 86000, stage: 'won', owner: 2 },
  { id: 'd4', name: '蓝海零售 小程序', amount: 32000, stage: 'lead', owner: 3 },
  { id: 'd5', name: '光年文化 官网改版', amount: 56000, stage: 'qualified', owner: 1 },
  { id: 'd6', name: '未来出行 App', amount: 150000, stage: 'proposal', owner: 0 },
  { id: 'd7', name: '晨曦医疗 系统', amount: 210000, stage: 'lead', owner: 4 },
];
