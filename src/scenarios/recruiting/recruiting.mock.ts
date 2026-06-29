import { DATA_PALETTE } from 'src/theme/palette';

export interface Candidate {
  id: string;
  name: string;
  role: string;
  stage: string;
  score: number;
  av: number;
}

export const STAGES = [
  { id: 'applied', label: '已投递', color: DATA_PALETTE.neutral },
  { id: 'screen', label: '初筛', color: DATA_PALETTE.cyan },
  { id: 'interview', label: '面试', color: DATA_PALETTE.amber },
  { id: 'offer', label: 'Offer', color: DATA_PALETTE.emerald },
];

export const STAGE_LABEL: Record<string, string> = Object.fromEntries(STAGES.map((s) => [s.id, s.label]));

export const INITIAL: Candidate[] = [
  { id: 'a', name: '林晓', role: '高级前端', stage: 'interview', score: 4, av: 6 },
  { id: 'b', name: '周航', role: '产品设计', stage: 'screen', score: 3, av: 7 },
  { id: 'c', name: '吴蕾', role: 'UX 研究', stage: 'offer', score: 5, av: 8 },
  { id: 'd', name: '郑昊', role: '后端工程', stage: 'applied', score: 0, av: 9 },
  { id: 'e', name: '孙琪', role: '数据分析', stage: 'interview', score: 4, av: 10 },
  { id: 'f', name: '冯雪', role: '运营', stage: 'screen', score: 3, av: 11 },
];
