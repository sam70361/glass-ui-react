import { DATA_PALETTE } from 'src/theme/palette';

export type Status = 'open' | 'pending' | 'resolved';
export type Pri = 'high' | 'medium' | 'low';

export interface Ticket {
  id: string;
  subject: string;
  requester: string;
  assignee: string;
  status: Status;
  priority: Pri;
  sla: string;
  slaWarn?: boolean;
  updated: string;
}

export const TICKETS: Ticket[] = [
  { id: 'T-1042', subject: '登录后偶发白屏，无法进入工作台', requester: '王敏', assignee: '苏墨言', status: 'open', priority: 'high', sla: '2h 内', slaWarn: true, updated: '10 分钟前' },
  { id: 'T-1041', subject: '导出 PDF 中文乱码', requester: '李哲', assignee: '陈星辰', status: 'pending', priority: 'medium', sla: '6h 内', updated: '1 小时前' },
  { id: 'T-1039', subject: '希望支持暗色模式下的高对比度', requester: '周妍', assignee: '白清寒', status: 'open', priority: 'low', sla: '1d 内', updated: '3 小时前' },
  { id: 'T-1036', subject: '素材上传偶尔失败', requester: '赵磊', assignee: '苏墨言', status: 'resolved', priority: 'medium', sla: '已解决', updated: '昨天' },
];

export const PRI: Record<Pri, string> = { high: DATA_PALETTE.red, medium: DATA_PALETTE.amber, low: DATA_PALETTE.cyan };

export const STATUS: Record<Status, { variant: 'cyan' | 'amber' | 'success'; label: string }> = {
  open: { variant: 'cyan', label: '待处理' },
  pending: { variant: 'amber', label: '处理中' },
  resolved: { variant: 'success', label: '已解决' },
};

export const FILTERS = [
  { id: 'all', label: '全部' },
  { id: 'open', label: '待处理' },
  { id: 'pending', label: '处理中' },
  { id: 'resolved', label: '已解决' },
];
