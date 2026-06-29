export interface Skill {
  id: string;
  name: string;
  desc: string;
  category: string;
  version: string;
  runs: number;
  enabled: boolean;
}

export const SKILLS: Skill[] = [
  { id: 's1', name: '配色生成', desc: '根据品牌关键词生成全息渐变配色方案', category: '设计', version: '1.4.0', runs: 312, enabled: true },
  { id: 's2', name: '周报汇总', desc: '聚合任务与活动，自动生成结构化周报', category: '协作', version: '2.1.0', runs: 188, enabled: true },
  { id: 's3', name: '竞品调研', desc: '检索并对比竞品的功能与体验差异', category: '调研', version: '0.9.2', runs: 74, enabled: false },
  { id: 's4', name: '图片标注', desc: '对设计稿自动生成可用性标注建议', category: '设计', version: '1.0.1', runs: 56, enabled: true },
  { id: 's5', name: '邮件分类', desc: '按意图与优先级自动分类收件箱', category: '自动化', version: '1.2.3', runs: 421, enabled: false },
  { id: 's6', name: '数据洞察', desc: '从数据集中提炼关键趋势与异常', category: '数据', version: '0.6.0', runs: 39, enabled: true },
];

export const SAMPLE = `export const skill = defineSkill({
  name: 'palette-gen',
  description: '生成全息渐变配色',
  input: z.object({ brand: z.string() }),
  async run({ brand }, ctx) {
    const base = await ctx.llm.complete(\`为 \${brand} 生成配色\`);
    return { palette: parsePalette(base) };
  },
});`;
