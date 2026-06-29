import type { MultiRow, ScatterPoint, SeriesPoint } from 'src/components/charts';
import { DATA_PALETTE } from 'src/theme/palette';

/** 多维分析 mock 数据（演示用，覆盖趋势/构成/占比/关系/漏斗/雷达/层级/热力） */

export const monthlyTrend: MultiRow[] = [
  { label: '1月', 完成: 120, 新建: 98, 工时: 320 },
  { label: '2月', 完成: 98, 新建: 110, 工时: 290 },
  { label: '3月', 完成: 145, 新建: 130, 工时: 360 },
  { label: '4月', 完成: 160, 新建: 120, 工时: 400 },
  { label: '5月', 完成: 175, 新建: 150, 工时: 420 },
  { label: '6月', 完成: 210, 新建: 165, 工时: 460 },
];

export const trendSeries = [
  { key: '完成', name: '完成', color: DATA_PALETTE.emerald },
  { key: '新建', name: '新建', color: DATA_PALETTE.cyan },
  { key: '工时', name: '工时', color: DATA_PALETTE.amber },
];

export const projectStatusStack: MultiRow[] = [
  { label: 'Aurora', 待办: 6, 进行中: 8, 审核: 4, 完成: 6 },
  { label: 'Nebula', 待办: 10, 进行中: 12, 审核: 6, 完成: 10 },
  { label: 'Luna', 待办: 14, 进行中: 16, 审核: 8, 完成: 18 },
  { label: 'Stellar', 待办: 4, 进行中: 5, 审核: 3, 完成: 6 },
  { label: 'Cosmos', 待办: 8, 进行中: 10, 审核: 5, 完成: 19 },
];

export const statusStackSeries = [
  { key: '待办', name: '待办', color: DATA_PALETTE.neutral },
  { key: '进行中', name: '进行中', color: DATA_PALETTE.cyan },
  { key: '审核', name: '审核', color: DATA_PALETTE.amber },
  { key: '完成', name: '完成', color: DATA_PALETTE.emerald },
];

export const tagDistribution: SeriesPoint[] = [
  { label: '设计', value: 38 },
  { label: '开发', value: 32 },
  { label: '调研', value: 18 },
  { label: '会议', value: 12 },
  { label: '紧急', value: 9 },
];

export const channelPie: SeriesPoint[] = [
  { label: '看板', value: 46 },
  { label: '收件箱', value: 24 },
  { label: '命令面板', value: 18 },
  { label: '自动化', value: 12 },
];

export const taskFunnel = [
  { label: '待办', value: 100 },
  { label: '进行中', value: 72 },
  { label: '审核中', value: 48 },
  { label: '已完成', value: 36 },
];

export const memberRadar: MultiRow[] = [
  { label: '设计', 小鱼儿: 90, 陈星辰: 80 },
  { label: '开发', 小鱼儿: 40, 陈星辰: 70 },
  { label: '调研', 小鱼儿: 70, 陈星辰: 50 },
  { label: '协作', 小鱼儿: 85, 陈星辰: 75 },
  { label: '产出', 小鱼儿: 78, 陈星辰: 88 },
  { label: '响应', 小鱼儿: 65, 陈星辰: 82 },
];

export const radarSeries = [
  { key: '小鱼儿', name: '小鱼儿', color: DATA_PALETTE.cyan },
  { key: '陈星辰', name: '陈星辰', color: DATA_PALETTE.magenta },
];

export const effortScatter: ScatterPoint[] = [
  { x: 4, y: 6, z: 120, name: 'Aurora' },
  { x: 8, y: 10, z: 180, name: 'Nebula' },
  { x: 12, y: 18, z: 260, name: 'Luna' },
  { x: 3, y: 6, z: 90, name: 'Stellar' },
  { x: 9, y: 19, z: 220, name: 'Cosmos' },
  { x: 6, y: 9, z: 140, name: 'Orbit' },
  { x: 11, y: 14, z: 200, name: 'Pulse' },
];

export const projectTreemap = [
  { name: 'Aurora', size: 24 },
  { name: 'Nebula', size: 38 },
  { name: 'Luna', size: 56 },
  { name: 'Stellar', size: 18 },
  { name: 'Cosmos', size: 42 },
];

export const heatmapRows = ['第1周', '第2周', '第3周', '第4周', '第5周'];
export const heatmapCols = ['一', '二', '三', '四', '五', '六', '日'];
export const heatmapData: number[][] = [
  [3, 5, 4, 7, 6, 2, 1],
  [5, 8, 6, 9, 7, 3, 1],
  [2, 6, 9, 8, 10, 4, 2],
  [6, 9, 7, 11, 8, 5, 2],
  [4, 7, 10, 9, 12, 6, 3],
];

/** 对比明细 */
export const comparisonRows = [
  { project: 'Aurora 品牌重塑', total: 24, done: 18, rate: 75, hours: 120, trend: '+12%' },
  { project: 'Nebula App 2.0', total: 38, done: 17, rate: 45, hours: 180, trend: '-6%' },
  { project: 'Luna 电商平台', total: 56, done: 38, rate: 68, hours: 260, trend: '+9%' },
  { project: 'Stellar 官网设计', total: 18, done: 6, rate: 33, hours: 90, trend: '+4%' },
  { project: 'Cosmos 设计系统', total: 42, done: 25, rate: 60, hours: 200, trend: '+15%' },
];
