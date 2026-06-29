import {
  AlignCenter,
  Image as ImageIcon,
  Minus,
  QrCode,
  Square,
  Stamp as StampIcon,
  Table as TableIcon,
  Type,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { PAPER } from 'src/components/ui/paper-surface';

export type ElType = 'heading' | 'text' | 'field' | 'table' | 'qr' | 'stamp' | 'divider' | 'image';

export interface El {
  id: string;
  type: ElType;
  x: number;
  y: number;
  w: number;
  h: number;
  text?: string;
  align?: 'left' | 'center' | 'right';
  size?: number;
  color?: string;
}

export const PALETTE: { type: ElType; label: string; icon: LucideIcon }[] = [
  { type: 'heading', label: '标题', icon: Type },
  { type: 'text', label: '文本', icon: AlignCenter },
  { type: 'field', label: '字段', icon: Square },
  { type: 'table', label: '表格', icon: TableIcon },
  { type: 'image', label: '图片', icon: ImageIcon },
  { type: 'qr', label: '二维码', icon: QrCode },
  { type: 'stamp', label: '印章', icon: StampIcon },
  { type: 'divider', label: '分割线', icon: Minus },
];

export const INITIAL: El[] = [
  { id: 'e1', type: 'heading', x: 60, y: 50, w: 480, h: 40, text: '医学检验报告单', align: 'center', size: 24, color: PAPER.ink },
  { id: 'e2', type: 'field', x: 60, y: 110, w: 200, h: 24, text: '姓名：张三', size: 13 },
  { id: 'e3', type: 'field', x: 300, y: 110, w: 200, h: 24, text: '性别：男  年龄：34', size: 13 },
  { id: 'e4', type: 'field', x: 60, y: 140, w: 200, h: 24, text: '科室：内科门诊', size: 13 },
  { id: 'e5', type: 'field', x: 300, y: 140, w: 240, h: 24, text: '样本号：LB-20260627-018', size: 13 },
  { id: 'e6', type: 'divider', x: 60, y: 176, w: 540, h: 2 },
  { id: 'e7', type: 'table', x: 60, y: 196, w: 540, h: 200 },
  { id: 'e8', type: 'qr', x: 60, y: 430, w: 84, h: 84 },
  { id: 'e9', type: 'stamp', x: 470, y: 420, w: 110, h: 110 },
];
