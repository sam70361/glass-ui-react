export type ProjectHealth = 'good' | 'risk' | 'warning';

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  progress: number;
  status: string;
  health: ProjectHealth;
  startDate?: string;
  dueDate: string;
  memberIds: string[];
  taskCount: number;
}
