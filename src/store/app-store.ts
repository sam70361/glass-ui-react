import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import * as mock from 'src/mocks/fixtures/core-data';
import { CATEGORICAL } from 'src/theme/palette';
import type {
  Activity,
  AppNotification,
  Asset,
  Automation,
  CalendarEvent,
  Moodboard,
  MoodboardElement,
  Priority,
  Project,
  Task,
  TaskComment,
  TaskStatus,
  User,
} from 'src/types';

const uid = (p: string) => `${p}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

interface AppState {
  currentUser: User;
  team: User[];
  projects: Project[];
  activeProjectId: string;
  tasks: Task[];
  assets: Asset[];
  notifications: AppNotification[];
  calendarEvents: CalendarEvent[];
  moodboards: Moodboard[];
  moodboardElements: MoodboardElement[];
  activeMoodboardId: string;
  automations: Automation[];
  activities: Activity[];
}

interface AppActions {
  setActiveProject: (id: string) => void;
  // tasks
  addTask: (task: Partial<Task> & Pick<Task, 'title' | 'projectId' | 'assigneeId' | 'priority'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, status: TaskStatus) => void;
  toggleTaskComplete: (id: string) => void;
  toggleSubtask: (taskId: string, subId: string) => void;
  addComment: (taskId: string, comment: TaskComment) => void;
  // assets
  addAsset: (asset: Partial<Asset> & Pick<Asset, 'name' | 'type' | 'projectId'>) => void;
  toggleAssetFavorite: (id: string) => void;
  setAssetReview: (id: string, status: Asset['reviewStatus']) => void;
  addAssetAnnotation: (id: string, annotation: { x: number; y: number; by: string; text: string }) => void;
  // projects
  addProject: (project: Pick<Project, 'name' | 'description'>) => void;
  deleteProject: (id: string) => void;
  // team
  addMember: (member: Pick<User, 'name' | 'email' | 'role'>) => void;
  deleteMember: (id: string) => void;
  // notifications
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  archiveNotification: (id: string) => void;
  // moodboard
  setActiveMoodboard: (id: string) => void;
  addMoodboardElement: (el: { type: MoodboardElement['type']; content: string } & Partial<MoodboardElement>) => void;
  updateMoodboardElement: (id: string, updates: Partial<MoodboardElement>) => void;
  deleteMoodboardElement: (id: string) => void;
  // automations
  toggleAutomation: (id: string) => void;
  // profile
  updateProfile: (updates: Partial<User>) => void;
  resetData: () => void;
}

const initial: AppState = {
  currentUser: mock.currentUser,
  team: mock.team,
  projects: mock.projects,
  activeProjectId: mock.projects[0].id,
  tasks: mock.tasks,
  assets: mock.assets,
  notifications: mock.notifications,
  calendarEvents: mock.calendarEvents,
  moodboards: mock.moodboards,
  moodboardElements: mock.moodboardElements,
  activeMoodboardId: mock.moodboards[0].id,
  automations: mock.automations,
  activities: mock.activities,
};

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set) => ({
      ...initial,

      setActiveProject: (id) => set({ activeProjectId: id }),

      addTask: (task) =>
        set((s) => ({
          tasks: [
            ...s.tasks,
            {
              id: uid('task'),
              description: '',
              status: 'todo',
              dueDate: new Date(Date.now() + 7 * 86400000).toISOString(),
              tags: [],
              attachments: 0,
              comments: 0,
              createdAt: new Date().toISOString(),
              ...task,
            } as Task,
          ],
        })),
      updateTask: (id, updates) =>
        set((s) => ({ tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)) })),
      deleteTask: (id) => set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),
      moveTask: (id, status) =>
        set((s) => ({ tasks: s.tasks.map((t) => (t.id === id ? { ...t, status } : t)) })),
      toggleTaskComplete: (id) =>
        set((s) => ({
          tasks: s.tasks.map((t) =>
            t.id === id ? { ...t, status: t.status === 'done' ? 'todo' : 'done' } : t
          ),
        })),
      toggleSubtask: (taskId, subId) =>
        set((s) => ({
          tasks: s.tasks.map((t) =>
            t.id === taskId
              ? { ...t, subtasks: (t.subtasks ?? []).map((sub) => (sub.id === subId ? { ...sub, done: !sub.done } : sub)) }
              : t
          ),
        })),
      addComment: (taskId, comment) =>
        set((s) => ({
          tasks: s.tasks.map((t) =>
            t.id === taskId
              ? { ...t, commentList: [...(t.commentList ?? []), comment], comments: (t.comments ?? 0) + 1 }
              : t
          ),
        })),

      addAsset: (asset) =>
        set((s) => ({
          assets: [
            {
              id: uid('asset'),
              url: '#',
              tags: [],
              uploadedById: s.currentUser.id,
              uploadedAt: new Date().toISOString(),
              size: '0KB',
              favorite: false,
              ...asset,
            } as Asset,
            ...s.assets,
          ],
        })),
      toggleAssetFavorite: (id) =>
        set((s) => ({ assets: s.assets.map((a) => (a.id === id ? { ...a, favorite: !a.favorite } : a)) })),
      setAssetReview: (id, status) =>
        set((s) => ({ assets: s.assets.map((a) => (a.id === id ? { ...a, reviewStatus: status } : a)) })),
      addAssetAnnotation: (id, annotation) =>
        set((s) => ({
          assets: s.assets.map((a) =>
            a.id === id ? { ...a, annotations: [...(a.annotations ?? []), { id: uid('an'), ...annotation }] } : a
          ),
        })),

      addProject: (project) =>
        set((s) => {
          const colors = CATEGORICAL;
          return {
            projects: [
              ...s.projects,
              {
                id: uid('proj'),
                color: colors[s.projects.length % colors.length],
                progress: 0,
                status: 'active',
                health: 'good',
                taskCount: 0,
                memberIds: [s.currentUser.id],
                dueDate: new Date(Date.now() + 30 * 86400000).toISOString(),
                ...project,
              } as Project,
            ],
          };
        }),
      deleteProject: (id) => set((s) => ({ projects: s.projects.filter((p) => p.id !== id) })),

      addMember: (member) =>
        set((s) => ({
          team: [
            ...s.team,
            {
              id: uid('user'),
              status: 'offline',
              skills: [],
              tasksAssigned: 0,
              tasksCompleted: 0,
              avatar: mock.AVATAR_POOL[s.team.length % mock.AVATAR_POOL.length],
              ...member,
            } as User,
          ],
        })),
      deleteMember: (id) => set((s) => ({ team: s.team.filter((m) => m.id !== id) })),

      markNotificationRead: (id) =>
        set((s) => ({ notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)) })),
      markAllNotificationsRead: () =>
        set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),
      archiveNotification: (id) =>
        set((s) => ({ notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true, archived: true } : n)) })),

      setActiveMoodboard: (id) => set({ activeMoodboardId: id }),
      addMoodboardElement: (el) =>
        set((s) => ({
          moodboardElements: [
            ...s.moodboardElements,
            {
              id: uid('mb'),
              boardId: s.activeMoodboardId,
              x: 80 + Math.random() * 200,
              y: 80 + Math.random() * 160,
              width: 200,
              height: 140,
              rotation: 0,
              ...el,
            } as MoodboardElement,
          ],
        })),
      updateMoodboardElement: (id, updates) =>
        set((s) => ({
          moodboardElements: s.moodboardElements.map((e) => (e.id === id ? { ...e, ...updates } : e)),
        })),
      deleteMoodboardElement: (id) =>
        set((s) => ({ moodboardElements: s.moodboardElements.filter((e) => e.id !== id) })),

      toggleAutomation: (id) =>
        set((s) => ({ automations: s.automations.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)) })),

      updateProfile: (updates) => set((s) => ({ currentUser: { ...s.currentUser, ...updates } })),
      resetData: () => set({ ...initial }),
    }),
    {
      name: 'glass-ui-data',
      version: 1,
      partialize: (s) => ({
        team: s.team,
        projects: s.projects,
        activeProjectId: s.activeProjectId,
        tasks: s.tasks,
        assets: s.assets,
        notifications: s.notifications,
        calendarEvents: s.calendarEvents,
        moodboards: s.moodboards,
        moodboardElements: s.moodboardElements,
        activeMoodboardId: s.activeMoodboardId,
        automations: s.automations,
        activities: s.activities,
        currentUser: s.currentUser,
      }),
    }
  )
);

// ---- 派生选择器（单一数据源，与 tasks 数组始终一致）----
export function projectStats(projectId: string) {
  const { tasks } = useAppStore.getState();
  const list = tasks.filter((t) => t.projectId === projectId);
  const done = list.filter((t) => t.status === 'done').length;
  return { total: list.length, done, active: list.length - done, progress: list.length ? Math.round((done / list.length) * 100) : 0 };
}

export function memberStats(memberId: string) {
  const { tasks } = useAppStore.getState();
  const list = tasks.filter((t) => t.assigneeId === memberId);
  const completed = list.filter((t) => t.status === 'done').length;
  return { total: list.length, completed, active: list.length - completed };
}

export function useMember(id: string | null | undefined): User | undefined {
  return useAppStore((s) => s.team.find((m) => m.id === id));
}

// 这些常量供 Priority/TaskStatus 类型推断使用
export type { Priority, TaskStatus };
