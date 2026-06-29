import type { Priority, TaskStatus } from 'src/types';
import { DATA_PALETTE } from 'src/theme/palette';

export const TASK_STATUSES: { id: TaskStatus; label: string; color: string }[] = [
  { id: 'todo', label: '待办', color: DATA_PALETTE.neutral },
  { id: 'in-progress', label: '进行中', color: DATA_PALETTE.cyan },
  { id: 'review', label: '审核中', color: DATA_PALETTE.amber },
  { id: 'done', label: '已完成', color: DATA_PALETTE.emerald },
];

export const PRIORITIES: { id: Priority; label: string; color: string }[] = [
  { id: 'high', label: '高优先级', color: DATA_PALETTE.red },
  { id: 'medium', label: '中优先级', color: DATA_PALETTE.amber },
  { id: 'low', label: '低优先级', color: DATA_PALETTE.cyan },
];

export const TAGS: { id: string; label: string; color: string }[] = [
  { id: 'design', label: '设计', color: 'magenta' },
  { id: 'development', label: '开发', color: 'cyan' },
  { id: 'research', label: '调研', color: 'amber' },
  { id: 'meeting', label: '会议', color: 'success' },
  { id: 'urgent', label: '紧急', color: 'danger' },
];

export function tagMeta(id: string) {
  return TAGS.find((t) => t.id === id) ?? { id, label: id, color: 'cyan' };
}
export function priorityMeta(id: Priority) {
  return PRIORITIES.find((p) => p.id === id)!;
}
