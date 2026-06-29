export type MemCat = 'preference' | 'fact' | 'project' | 'people';

export interface Memory {
  id: string;
  text: string;
  category: MemCat;
  relevance: number;
  source: string;
  time: string;
  pinned?: boolean;
}

export const CAT_LABEL: Record<MemCat, { label: string; variant: 'cyan' | 'magenta' | 'amber' | 'success' }> = {
  preference: { label: '偏好', variant: 'magenta' },
  fact: { label: '事实', variant: 'cyan' },
  project: { label: '项目', variant: 'amber' },
  people: { label: '人物', variant: 'success' },
};

export const MEMORIES: Memory[] = [
  { id: 'm1', text: '用户偏好暗色 + 全息渐变的视觉风格，强调高级感与科技感。', category: 'preference', relevance: 96, source: '对话 #1248', time: '2 天前', pinned: true },
  { id: 'm2', text: 'Aurora 品牌重塑项目截止日期为本月 12 日，负责人是陈星辰。', category: 'project', relevance: 88, source: '项目看板', time: '5 小时前' },
  { id: 'm3', text: '用户是创意总监，关注品牌策略与用户研究。', category: 'people', relevance: 82, source: '个人资料', time: '1 周前' },
  { id: 'm4', text: '团队统一使用 Space Grotesk 作为标题字体，Manrope 作为正文。', category: 'fact', relevance: 74, source: '设计规范', time: '3 天前' },
  { id: 'm5', text: '用户倾向简洁的 UI，不喜欢过多动画干扰。', category: 'preference', relevance: 61, source: '对话 #1180', time: '2 周前' },
  { id: 'm6', text: 'Nebula App 2.0 当前进度 45%，存在风险需关注。', category: 'project', relevance: 55, source: '数据分析', time: '1 天前' },
];

export const FILTERS = [
  { id: 'all', label: '全部' },
  { id: 'preference', label: '偏好' },
  { id: 'fact', label: '事实' },
  { id: 'project', label: '项目' },
  { id: 'people', label: '人物' },
];
