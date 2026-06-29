export interface Msg {
  role: 'user' | 'assistant';
  text: string;
}

export const CONVERSATIONS = [
  { id: 'c1', title: '品牌视觉风格探索', preview: '帮我生成一套全息渐变配色…', time: '刚刚', active: true },
  { id: 'c2', title: '产品文案润色', preview: '把这段介绍改得更有科技感', time: '2 小时前' },
  { id: 'c3', title: '竞品分析总结', preview: '对比这 3 个竞品的核心差异', time: '昨天' },
  { id: 'c4', title: '周报自动生成', preview: '根据本周任务生成周报', time: '3 天前' },
];

export const INIT: Msg[] = [
  { role: 'user', text: '帮我设计一套适合科技品牌的全息渐变配色方案' },
  {
    role: 'assistant',
    text: '为科技品牌推荐 **全息渐变** 方案，按 60/30/10 比例使用：\n\n- **主色** `#00d4ff` 青蓝 —— 科技感与信任\n- **辅色** `#ff2d92` 品红 —— 活力与强调\n- **点缀** `#ffb347` 琥珀 —— 温度与平衡\n\n建议在暗色底上叠加毛玻璃，提升层次与高级感。',
  },
];
