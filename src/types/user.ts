export type MemberStatus = 'online' | 'away' | 'offline';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  title?: string;
  status: MemberStatus;
  department?: string;
  skills?: string[];
  bio?: string;
  joinDate?: string;
  tasksAssigned?: number;
  tasksCompleted?: number;
}
