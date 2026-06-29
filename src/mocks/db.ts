import { AVATAR_POOL } from 'src/mocks/fixtures/core-data';
import { CATEGORICAL } from 'src/theme/palette';
import {
  assets as assetsFixture,
  projects as projectsFixture,
  tasks as tasksFixture,
  team as teamFixture,
  mailThreads as threadsFixture,
} from 'src/mocks/fixtures';
import type {
  Asset,
  MailMessage,
  MailThread,
  Project,
  Task,
  TaskComment,
  User,
} from 'src/types';

/**
 * MSW 可变内存态（dev/演示「后端」）。
 * 从 fixtures 深拷贝初始化，写 handler 直接改这里；GET 读这里。
 * 与 Zustand 同源（fixtures），但运行期独立可变，作为服务端真相源。
 */
const clone = <T>(x: T): T => JSON.parse(JSON.stringify(x)) as T;
const uid = (p: string) => `${p}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

export const db = {
  tasks: clone(tasksFixture) as Task[],
  team: clone(teamFixture) as User[],
  assets: clone(assetsFixture) as Asset[],
  projects: clone(projectsFixture) as Project[],
  threads: clone(threadsFixture) as MailThread[],
};

// ---------- tasks ----------
export function createTask(input: Partial<Task> & Pick<Task, 'title' | 'projectId' | 'assigneeId' | 'priority'>): Task[] {
  const task: Task = {
    id: uid('task'),
    description: '',
    status: 'todo',
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString(),
    tags: [],
    attachments: 0,
    comments: 0,
    createdAt: new Date().toISOString(),
    ...input,
  } as Task;
  db.tasks = [...db.tasks, task];
  return db.tasks;
}

export function patchTask(id: string, updates: Partial<Task>): Task[] {
  db.tasks = db.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t));
  return db.tasks;
}

export function deleteTask(id: string): Task[] {
  db.tasks = db.tasks.filter((t) => t.id !== id);
  return db.tasks;
}

export function addTaskComment(id: string, comment: Omit<TaskComment, 'id'>): Task[] {
  db.tasks = db.tasks.map((t) =>
    t.id === id
      ? { ...t, commentList: [...(t.commentList ?? []), { id: uid('c'), ...comment }], comments: (t.comments ?? 0) + 1 }
      : t
  );
  return db.tasks;
}

export function toggleSubtask(id: string, subId: string): Task[] {
  db.tasks = db.tasks.map((t) =>
    t.id === id
      ? { ...t, subtasks: (t.subtasks ?? []).map((s) => (s.id === subId ? { ...s, done: !s.done } : s)) }
      : t
  );
  return db.tasks;
}

// ---------- team ----------
export function createMember(input: Pick<User, 'name' | 'email' | 'role'> & Partial<User>): User[] {
  const member: User = {
    id: uid('user'),
    status: 'offline',
    skills: [],
    tasksAssigned: 0,
    tasksCompleted: 0,
    avatar: AVATAR_POOL[db.team.length % AVATAR_POOL.length],
    ...input,
  } as User;
  db.team = [...db.team, member];
  return db.team;
}

export function patchMember(id: string, updates: Partial<User>): User[] {
  db.team = db.team.map((m) => (m.id === id ? { ...m, ...updates } : m));
  return db.team;
}

export function deleteMember(id: string): User[] {
  db.team = db.team.filter((m) => m.id !== id);
  return db.team;
}

// ---------- assets ----------
export function createAsset(input: Pick<Asset, 'name' | 'type' | 'projectId'> & Partial<Asset>, uploaderId: string): Asset[] {
  const asset: Asset = {
    id: uid('asset'),
    url: '#',
    tags: [],
    uploadedById: uploaderId,
    uploadedAt: new Date().toISOString(),
    size: '0KB',
    favorite: false,
    ...input,
  } as Asset;
  db.assets = [asset, ...db.assets];
  return db.assets;
}

export function deleteAsset(id: string): Asset[] {
  db.assets = db.assets.filter((a) => a.id !== id);
  return db.assets;
}

export function toggleAssetFavorite(id: string): Asset[] {
  db.assets = db.assets.map((a) => (a.id === id ? { ...a, favorite: !a.favorite } : a));
  return db.assets;
}

export function setAssetReview(id: string, reviewStatus: Asset['reviewStatus']): Asset[] {
  db.assets = db.assets.map((a) => (a.id === id ? { ...a, reviewStatus } : a));
  return db.assets;
}

export function addAssetAnnotation(id: string, annotation: { x: number; y: number; by: string; text: string }): Asset[] {
  db.assets = db.assets.map((a) =>
    a.id === id ? { ...a, annotations: [...(a.annotations ?? []), { id: uid('an'), ...annotation }] } : a
  );
  return db.assets;
}

// ---------- projects ----------
export function createProject(input: Pick<Project, 'name' | 'description'> & Partial<Project>, ownerId: string): Project[] {
  const project: Project = {
    id: uid('proj'),
    color: CATEGORICAL[db.projects.length % CATEGORICAL.length],
    progress: 0,
    status: 'active',
    health: 'good',
    taskCount: 0,
    memberIds: [ownerId],
    dueDate: new Date(Date.now() + 30 * 86400000).toISOString(),
    ...input,
  } as Project;
  db.projects = [...db.projects, project];
  return db.projects;
}

// ---------- mail ----------
export function updateThreads(ids: string[], patch: Partial<Pick<MailThread, 'read' | 'starred' | 'folder'>>): MailThread[] {
  db.threads = db.threads.map((t) => (ids.includes(t.id) ? { ...t, ...patch } : t));
  return db.threads;
}

export function toggleThreadLabel(ids: string[], labelId: string): MailThread[] {
  db.threads = db.threads.map((t) =>
    ids.includes(t.id)
      ? {
          ...t,
          labelIds: t.labelIds.includes(labelId)
            ? t.labelIds.filter((l) => l !== labelId)
            : [...t.labelIds, labelId],
        }
      : t
  );
  return db.threads;
}

export function deleteThreads(ids: string[]): MailThread[] {
  db.threads = db.threads.filter((t) => !ids.includes(t.id));
  return db.threads;
}

export function replyThread(threadId: string, body: string): MailThread[] {
  db.threads = db.threads.map((t) => {
    if (t.id !== threadId) return t;
    const msg: MailMessage = {
      id: uid('msg'),
      fromId: 'me',
      toIds: t.participantIds.filter((p) => p !== 'me'),
      body,
      sentAt: new Date().toISOString(),
    };
    return { ...t, messages: [...t.messages, msg], snippet: body.slice(0, 60), updatedAt: msg.sentAt, read: true };
  });
  return db.threads;
}

export function sendThread(input: { to: string[]; subject: string; body: string }): MailThread[] {
  const id = uid('m');
  const msg: MailMessage = {
    id: `${id}-1`,
    fromId: 'me',
    toIds: input.to,
    body: input.body,
    sentAt: new Date().toISOString(),
  };
  const thread: MailThread = {
    id,
    subject: input.subject || '(无主题)',
    folder: 'sent',
    participantIds: ['me', ...input.to],
    messages: [msg],
    snippet: input.body.slice(0, 60),
    read: true,
    starred: false,
    labelIds: [],
    hasAttachments: false,
    updatedAt: msg.sentAt,
  };
  db.threads = [thread, ...db.threads];
  return db.threads;
}
