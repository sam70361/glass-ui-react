import { Bot, GitBranch, Mail, Webhook, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { DATA_PALETTE } from 'src/theme/palette';

export interface Node {
  id: string;
  title: string;
  type: string;
  icon: LucideIcon;
  color: string;
  x: number;
  y: number;
}

export const INIT_NODES: Node[] = [
  { id: 'n1', title: 'Webhook 触发', type: 'trigger', icon: Webhook, color: DATA_PALETTE.cyan, x: 40, y: 120 },
  { id: 'n2', title: '条件判断', type: 'condition', icon: GitBranch, color: DATA_PALETTE.amber, x: 300, y: 120 },
  { id: 'n3', title: 'AI 处理', type: 'action', icon: Bot, color: DATA_PALETTE.magenta, x: 560, y: 40 },
  { id: 'n4', title: '发送邮件', type: 'action', icon: Mail, color: DATA_PALETTE.emerald, x: 560, y: 220 },
];

export const EDGES: [string, string][] = [
  ['n1', 'n2'],
  ['n2', 'n3'],
  ['n2', 'n4'],
];

export const PALETTE = [
  { icon: Webhook, label: '触发器', color: DATA_PALETTE.cyan },
  { icon: GitBranch, label: '条件', color: DATA_PALETTE.amber },
  { icon: Bot, label: 'AI 动作', color: DATA_PALETTE.magenta },
  { icon: Mail, label: '通知', color: DATA_PALETTE.emerald },
  { icon: Zap, label: '自动化', color: DATA_PALETTE.violet },
];

export const NODE_W = 160;
export const NODE_H = 64;
