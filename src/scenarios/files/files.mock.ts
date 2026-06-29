import {
  File as FileIcon,
  FileText,
  Film,
  Folder,
  Image as ImageIcon,
  Music,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { DATA_PALETTE } from 'src/theme/palette';

export type FType = 'folder' | 'image' | 'video' | 'doc' | 'audio' | 'file';
export interface FileNode {
  id: string;
  name: string;
  type: FType;
  size: string;
  modified: string;
  folder: string;
}

export const FOLDERS = [
  { id: 'design', label: '设计资产' },
  { id: 'docs', label: '文档' },
  { id: 'media', label: '媒体' },
  { id: 'exports', label: '导出' },
];

export const ICONS: Record<FType, LucideIcon> = { folder: Folder, image: ImageIcon, video: Film, doc: FileText, audio: Music, file: FileIcon };
export const COLORS: Record<FType, string> = { folder: DATA_PALETTE.cyan, image: DATA_PALETTE.magenta, video: DATA_PALETTE.violet, doc: DATA_PALETTE.amber, audio: DATA_PALETTE.emerald, file: DATA_PALETTE.neutral };

export const INITIAL: FileNode[] = [
  { id: 'f1', name: '品牌规范', type: 'folder', size: '—', modified: '2 天前', folder: 'design' },
  { id: 'f3', name: 'hero-aurora.png', type: 'image', size: '2.4 MB', modified: '3 小时前', folder: 'design' },
  { id: 'f8', name: 'mockup-2.png', type: 'image', size: '3.1 MB', modified: '今天', folder: 'design' },
  { id: 'f7', name: 'logo-pack.zip', type: 'file', size: '12 MB', modified: '4 天前', folder: 'design' },
  { id: 'f5', name: '设计规范.pdf', type: 'doc', size: '1.2 MB', modified: '5 天前', folder: 'docs' },
  { id: 'f9', name: '需求文档.docx', type: 'doc', size: '420 KB', modified: '昨天', folder: 'docs' },
  { id: 'f4', name: '产品演示.mp4', type: 'video', size: '48 MB', modified: '昨天', folder: 'media' },
  { id: 'f6', name: '点击音效.wav', type: 'audio', size: '320 KB', modified: '1 周前', folder: 'media' },
  { id: 'f10', name: '宣传片-终版.mp4', type: 'video', size: '120 MB', modified: '3 天前', folder: 'media' },
  { id: 'f11', name: 'release-2.0.zip', type: 'file', size: '64 MB', modified: '今天', folder: 'exports' },
];
