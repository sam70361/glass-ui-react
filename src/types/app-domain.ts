export type NotificationType =
  | 'mention'
  | 'assign'
  | 'comment'
  | 'system'
  | 'deadline'
  | 'invite';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  content: string;
  fromUserId: string | null;
  avatar?: string;
  read: boolean;
  archived?: boolean;
  createdAt: string;
  project?: string;
  link?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number;
  color: 'cyan' | 'magenta' | 'amber';
  projectId: string | null;
}

export interface Moodboard {
  id: string;
  name: string;
}

export interface MoodboardElement {
  id: string;
  boardId: string;
  type: 'image' | 'note';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  color?: string;
}

export interface Automation {
  id: string;
  name: string;
  trigger: string;
  action: string;
  enabled: boolean;
  runs: number;
  description: string;
}

export interface Activity {
  id: string;
  userId: string;
  action: string;
  target: string;
  time: string;
  type: 'success' | 'cyan' | 'magenta' | 'amber';
  kind: 'task' | 'asset' | 'comment' | 'project' | 'member';
  projectId: string | null;
}
