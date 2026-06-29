import {
  db,
  createTask,
  patchTask,
  deleteTask,
  addTaskComment,
  toggleSubtask,
  createMember,
  patchMember,
  deleteMember,
  createAsset,
  deleteAsset,
  toggleAssetFavorite,
  setAssetReview,
  addAssetAnnotation,
  createProject,
  updateThreads,
  toggleThreadLabel,
  deleteThreads,
  replyThread,
  sendThread,
} from 'src/mocks/db';
import {
  DOCS,
  RESULTS,
  SCENARIO_DATA,
  activities,
  calendarEvents,
  currentUser,
  mailLabels,
  notifications,
} from 'src/mocks/fixtures';
import type { Asset, MailThread, Project, Task, User } from 'src/types';

/**
 * 本地兜底 API（无 MSW 的「内存后端」）。
 *
 * 仅在生产构建（无 Service Worker）时由 fetcher 调用：直接复用 `src/mocks/db` 的
 * 可变内存态与写函数 —— 与 dev 下 MSW handlers 调用的是同一套 db 逻辑。
 * 因此生产也能正常渲染四域 + 场景，且写操作（新建/拖拽/收藏/邮件/邀请/建项目）
 * 真正落到内存 db 并即时反映，不白屏。dev 不会走到这里（仍真实 fetch 经 MSW）。
 */

class LocalApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = 'LocalApiError';
    this.status = status;
  }
}

const seg = (path: string) => path.replace(/^\//, '').split('?')[0].split('/');

export function localApi<T>(method: string, path: string, body?: unknown): T {
  const [a, b, c, d] = seg(path);
  const m = method.toUpperCase();
  const obj = (body ?? {}) as Record<string, unknown>;
  const out = (v: unknown) => v as unknown as T;

  // ---- 身份 / 静态只读 ----
  if (a === 'me') return out(currentUser);
  if (a === 'activities') return out(activities);
  if (a === 'notifications') return out(notifications);
  if (a === 'calendar-events') return out(calendarEvents);

  // ---- projects ----
  if (a === 'projects') {
    if (!b && m === 'GET') return out(db.projects);
    if (!b && m === 'POST')
      return out(createProject(obj as Pick<Project, 'name' | 'description'> & Partial<Project>, currentUser.id));
  }

  // ---- tasks ----
  if (a === 'tasks') {
    if (!b && m === 'GET') return out(db.tasks);
    if (!b && m === 'POST')
      return out(createTask(obj as Partial<Task> & Pick<Task, 'title' | 'projectId' | 'assigneeId' | 'priority'>));
    if (b && c === 'comments' && m === 'POST')
      return out(addTaskComment(b, { userId: String(obj.userId), text: String(obj.text), time: new Date().toISOString() }));
    if (b && c === 'subtasks' && d && m === 'PATCH') return out(toggleSubtask(b, d));
    if (b && m === 'PATCH') return out(patchTask(b, obj as Partial<Task>));
    if (b && m === 'DELETE') return out(deleteTask(b));
  }

  // ---- team ----
  if (a === 'team') {
    if (!b && m === 'GET') return out(db.team);
    if (!b && m === 'POST') return out(createMember(obj as Pick<User, 'name' | 'email' | 'role'> & Partial<User>));
    if (b && m === 'PATCH') return out(patchMember(b, obj as Partial<User>));
    if (b && m === 'DELETE') return out(deleteMember(b));
  }

  // ---- assets ----
  if (a === 'assets') {
    if (!b && m === 'GET') return out(db.assets);
    if (!b && m === 'POST')
      return out(createAsset(obj as Pick<Asset, 'name' | 'type' | 'projectId'> & Partial<Asset>, currentUser.id));
    if (b && c === 'favorite' && m === 'POST') return out(toggleAssetFavorite(b));
    if (b && c === 'annotations' && m === 'POST')
      return out(addAssetAnnotation(b, obj as { x: number; y: number; by: string; text: string }));
    if (b && m === 'PATCH') return out(setAssetReview(b, obj.reviewStatus as Asset['reviewStatus']));
    if (b && m === 'DELETE') return out(deleteAsset(b));
  }

  // ---- mail ----
  if (a === 'mail' && b === 'labels') return out(mailLabels);
  if (a === 'mail' && b === 'threads') {
    if (d === 'reply' && m === 'POST') return out(replyThread(c, String(obj.body)));
    if (c === 'labels' && m === 'POST') return out(toggleThreadLabel(obj.ids as string[], String(obj.labelId)));
    if (c === 'delete' && m === 'POST') return out(deleteThreads(obj.ids as string[]));
    if (!c && m === 'GET') return out(db.threads);
    if (!c && m === 'PATCH')
      return out(updateThreads(obj.ids as string[], obj.patch as Partial<Pick<MailThread, 'read' | 'starred' | 'folder'>>));
    if (!c && m === 'POST')
      return out(sendThread(obj as { to: string[]; subject: string; body: string }));
  }

  // ---- scenarios ----
  if (a === 'scenarios') {
    if (b === 'rag') {
      if (!c && m === 'GET') return out({ docs: DOCS, results: RESULTS });
      if (c === 'docs' && m === 'POST')
        return out({ id: `doc-${Date.now()}`, name: String(obj.name ?? '未命名文档.pdf'), chunks: 16, status: '索引中' });
    }
    // 通用场景数据：注册表兜底
    if (b && !c && m === 'GET' && SCENARIO_DATA[b]) return out(SCENARIO_DATA[b]);
  }

  throw new LocalApiError(404, `本地兜底未匹配路由: ${method} ${path}`);
}
