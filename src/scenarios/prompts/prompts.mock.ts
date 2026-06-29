export interface PromptTemplate {
  id: string;
  name: string;
  category: string;
  version: string;
  body: string;
  vars: string[];
}

export const PROMPTS: PromptTemplate[] = [
  { id: 'p1', name: '配色生成', category: '设计', version: 'v3', body: '为「{{brand}}」生成一套{{style}}风格的配色方案，输出 60/30/10 比例与十六进制色值。', vars: ['brand', 'style'] },
  { id: 'p2', name: '周报汇总', category: '协作', version: 'v2', body: '根据以下任务列表 {{tasks}} 生成结构化周报，包含进展、风险与下周计划。', vars: ['tasks'] },
  { id: 'p3', name: '竞品拆解', category: '调研', version: 'v1', body: '对比 {{competitors}} 在 {{dimension}} 维度的差异，给出洞察与建议。', vars: ['competitors', 'dimension'] },
  { id: 'p4', name: '文案润色', category: '内容', version: 'v4', body: '把这段文案改写得更{{tone}}：{{text}}', vars: ['tone', 'text'] },
];
