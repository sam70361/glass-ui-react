export interface RagDoc {
  id: string;
  name: string;
  chunks: number;
  status: '已索引' | '索引中';
}

export interface RagResult {
  text: string;
  /** 关系字段：关联到具体文档 id */
  docId: string;
  /** 关系派生：文档名（由 docId 关联 DOCS） */
  source: string;
  score: number;
}

export const DOCS: RagDoc[] = [
  { id: 'doc-1', name: '产品需求文档.pdf', chunks: 128, status: '已索引' },
  { id: 'doc-2', name: '设计规范.md', chunks: 64, status: '已索引' },
  { id: 'doc-3', name: 'API 参考.html', chunks: 210, status: '索引中' },
  { id: 'doc-4', name: '用户访谈记录.docx', chunks: 96, status: '已索引' },
];

const docName = (id: string) => DOCS.find((d) => d.id === id)?.name ?? id;

export const RESULTS: RagResult[] = [
  { text: '全息渐变按 60/30/10 比例使用：主色青蓝、辅色品红、点缀琥珀…', docId: 'doc-2', source: docName('doc-2'), score: 0.94 },
  { text: '暗夜底色 #0a0a0f，毛玻璃 backdrop-filter: blur(24px) saturate(180%)…', docId: 'doc-2', source: docName('doc-2'), score: 0.88 },
  { text: '标题字体 Space Grotesk，正文 Manrope，数字 JetBrains Mono…', docId: 'doc-1', source: docName('doc-1'), score: 0.81 },
];
