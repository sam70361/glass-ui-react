import { DATA_PALETTE } from 'src/theme/palette';

export interface Course {
  id: string;
  name: string;
  lessons: number;
  done: number;
  students: number;
  dur: string;
  g: [string, string];
}

export const COURSES: Course[] = [
  { id: 'c1', name: '设计系统进阶', lessons: 18, done: 12, students: 240, dur: '6h', g: [DATA_PALETTE.cyan, DATA_PALETTE.magenta] },
  { id: 'c2', name: 'React 工程实战', lessons: 24, done: 24, students: 512, dur: '9h', g: [DATA_PALETTE.violet, DATA_PALETTE.blue] },
  { id: 'c3', name: '品牌策略基础', lessons: 12, done: 4, students: 168, dur: '4h', g: [DATA_PALETTE.amber, DATA_PALETTE.magenta] },
  { id: 'c4', name: '数据可视化', lessons: 16, done: 9, students: 320, dur: '5h', g: [DATA_PALETTE.emerald, DATA_PALETTE.cyan] },
];
