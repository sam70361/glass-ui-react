export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';
export type Priority = 'high' | 'medium' | 'low';

export interface Subtask {
  id: string;
  title: string;
  done: boolean;
}

export interface TaskComment {
  id: string;
  userId: string;
  text: string;
  time: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  projectId: string;
  assigneeId: string;
  dueDate: string;
  tags: string[];
  attachments: number;
  comments: number;
  subtasks?: Subtask[];
  commentList?: TaskComment[];
  createdAt?: string;
}
