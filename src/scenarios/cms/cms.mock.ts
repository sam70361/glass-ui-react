export const CATEGORIES = [
  { id: 'all', label: '全部内容' },
  { id: 'news', label: '新闻动态' },
  { id: 'product', label: '产品更新' },
  { id: 'design', label: '设计观点' },
  { id: 'tutorial', label: '教程指南' },
];

export const CAT_LABEL: Record<string, string> = { news: '新闻动态', product: '产品更新', design: '设计观点', tutorial: '教程指南' };

export type Status = 'published' | 'draft' | 'review';
export interface Article { id: string; title: string; category: string; author: string; status: Status; views: number; date: string }

export const INITIAL: Article[] = [
  { id: 'a1', title: '2026 全息渐变设计趋势全景解读', category: 'design', author: '小鱼儿', status: 'published', views: 3240, date: '06-26' },
  { id: 'a2', title: 'Glass UI 2.0 发布：更快、更美、更智能', category: 'product', author: '沈清辞', status: 'published', views: 1820, date: '06-24' },
  { id: 'a3', title: '从 0 到 1 搭建团队设计系统', category: 'tutorial', author: '陈星辰', status: 'review', views: 0, date: '06-23' },
  { id: 'a4', title: '毛玻璃在暗色界面中的最佳实践', category: 'design', author: '顾南笙', status: 'draft', views: 0, date: '06-22' },
  { id: 'a5', title: '我们如何用 AI 提升 40% 协作效率', category: 'news', author: '白清寒', status: 'published', views: 2560, date: '06-20' },
  { id: 'a6', title: '组件库版本治理与发布流程', category: 'tutorial', author: '苏墨言', status: 'published', views: 980, date: '06-18' },
  { id: 'a7', title: 'Nebula 2.0 内测招募', category: 'news', author: '沈清辞', status: 'draft', views: 0, date: '06-16' },
];

export const STATUS: Record<Status, { variant: 'success' | 'amber' | 'default'; label: string }> = {
  published: { variant: 'success', label: '已发布' },
  review: { variant: 'amber', label: '审核中' },
  draft: { variant: 'default', label: '草稿' },
};
