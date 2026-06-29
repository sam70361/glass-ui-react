import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  title: string;
  path: string;
  icon: LucideIcon;
  badge?: number | string;
}

export interface NavGroup {
  subheader?: string;
  /** vertical 变体下分类标题是否可点击折叠（默认展开） */
  collapsible?: boolean;
  items: NavItem[];
}
