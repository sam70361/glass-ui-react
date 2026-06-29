import type { TimelineColor } from 'src/components/shared/timeline';

export type RunStatus = 'running' | 'success' | 'failed' | 'queued';

export interface AgentRun {
  id: string;
  name: string;
  status: RunStatus;
  model: string;
  steps: number;
  took: string;
}

export const RUNS: AgentRun[] = [
  { id: 'r1', name: '竞品调研 Agent', status: 'running', model: 'GPT-4o', steps: 7, took: '进行中' },
  { id: 'r2', name: '周报生成 Agent', status: 'success', model: 'Claude 3.5', steps: 5, took: '12.4s' },
  { id: 'r3', name: '数据清洗 Agent', status: 'failed', model: 'GPT-4o', steps: 3, took: '4.1s' },
  { id: 'r4', name: '邮件分类 Agent', status: 'queued', model: 'Gemini 1.5', steps: 0, took: '排队中' },
];

export const STATUS: Record<RunStatus, { variant: 'success' | 'danger' | 'cyan' | 'amber'; label: string }> = {
  running: { variant: 'cyan', label: '运行中' },
  success: { variant: 'success', label: '成功' },
  failed: { variant: 'danger', label: '失败' },
  queued: { variant: 'amber', label: '排队' },
};

export const STEPS: { tool: string; color: TimelineColor; detail: string; time: string }[] = [
  { tool: 'web.search', color: 'cyan', detail: '检索「2026 设计趋势」返回 8 条结果', time: '0.0s' },
  { tool: 'browser.open', color: 'cyan', detail: '打开前 3 个高权重来源', time: '1.2s' },
  { tool: 'extract.summary', color: 'magenta', detail: '抽取关键观点并去重', time: '3.8s' },
  { tool: 'memory.write', color: 'success', detail: '写入 5 条记忆条目', time: '5.1s' },
  { tool: 'report.compose', color: 'amber', detail: '正在生成结构化报告…', time: '6.4s' },
];
