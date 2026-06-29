import { useMemo } from 'react';
import { create } from 'zustand';

import { mailLabels } from 'src/mocks/fixtures/mail';
import { useMailThreadsQuery } from 'src/api';
import type { MailThread, MailViewId } from 'src/types';

export type MailFilter = 'all' | 'unread' | 'attachments';

export interface ComposeDraft {
  to: string[];
  subject: string;
  body: string;
}

/**
 * 邮件 store：仅保留纯 UI 本地态（视图/选中/多选/搜索/筛选/撰写）。
 * 线程数据（服务端态）已迁至 react-query（useMailThreadsQuery），写操作走 src/api 的 mutation。
 */
interface MailState {
  view: MailViewId;
  selectedThreadId: string | null;
  checkedIds: string[];
  search: string;
  filter: MailFilter;
  composeOpen: boolean;
  draft: ComposeDraft;
}

interface MailActions {
  setView: (view: MailViewId) => void;
  selectThread: (id: string | null) => void;
  toggleChecked: (id: string) => void;
  setChecked: (ids: string[]) => void;
  clearChecked: () => void;
  setSearch: (q: string) => void;
  setFilter: (f: MailFilter) => void;
  openCompose: (draft?: Partial<ComposeDraft>) => void;
  closeCompose: () => void;
  setDraft: (patch: Partial<ComposeDraft>) => void;
  reset: () => void;
}

const emptyDraft: ComposeDraft = { to: [], subject: '', body: '' };

const initial: MailState = {
  view: 'inbox',
  selectedThreadId: null,
  checkedIds: [],
  search: '',
  filter: 'all',
  composeOpen: false,
  draft: emptyDraft,
};

export const useMailStore = create<MailState & MailActions>()((set) => ({
  ...initial,
  setView: (view) => set({ view, selectedThreadId: null, checkedIds: [] }),
  selectThread: (id) => set({ selectedThreadId: id }),
  toggleChecked: (id) =>
    set((s) => ({
      checkedIds: s.checkedIds.includes(id) ? s.checkedIds.filter((x) => x !== id) : [...s.checkedIds, id],
    })),
  setChecked: (ids) => set({ checkedIds: ids }),
  clearChecked: () => set({ checkedIds: [] }),
  setSearch: (q) => set({ search: q }),
  setFilter: (f) => set({ filter: f }),
  openCompose: (draft) => set({ composeOpen: true, draft: { ...emptyDraft, ...draft } }),
  closeCompose: () => set({ composeOpen: false, draft: emptyDraft }),
  setDraft: (patch) => set((s) => ({ draft: { ...s.draft, ...patch } })),
  reset: () => set({ ...initial }),
}));

export { mailLabels };

// ---- 派生选择器（线程取自 react-query；UI 过滤取自 store）----

function inView(t: MailThread, view: MailViewId) {
  if (view === 'starred') return t.starred && t.folder !== 'trash';
  return t.folder === view;
}

/** 当前视图过滤 + 搜索 + 筛选后的线程，按时间倒序 */
export function useMailList() {
  const { data: threads = [] } = useMailThreadsQuery();
  const view = useMailStore((s) => s.view);
  const search = useMailStore((s) => s.search);
  const filter = useMailStore((s) => s.filter);
  return useMemo(() => {
    const q = search.trim().toLowerCase();
    return threads
      .filter((t) => inView(t, view))
      .filter((t) => (filter === 'unread' ? !t.read : filter === 'attachments' ? t.hasAttachments : true))
      .filter((t) => (q ? `${t.subject} ${t.snippet}`.toLowerCase().includes(q) : true))
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [threads, view, search, filter]);
}

/** 各视图计数（inbox 未读 / 其它总数 / starred） */
export function useMailCounts() {
  const { data: threads = [] } = useMailThreadsQuery();
  return useMemo(() => {
    const unread = (f: MailThread['folder']) => threads.filter((t) => t.folder === f && !t.read).length;
    return {
      inbox: unread('inbox'),
      starred: threads.filter((t) => t.starred && t.folder !== 'trash').length,
      drafts: threads.filter((t) => t.folder === 'drafts').length,
      sent: threads.filter((t) => t.folder === 'sent').length,
      archive: threads.filter((t) => t.folder === 'archive').length,
      trash: threads.filter((t) => t.folder === 'trash').length,
    };
  }, [threads]);
}

export function useMailThread(id: string | null) {
  const { data: threads = [] } = useMailThreadsQuery();
  return useMemo(() => (id ? threads.find((t) => t.id === id) : undefined), [threads, id]);
}

/** 当前线程列表是否仍在加载（供 loading 态） */
export function useMailLoading() {
  return useMailThreadsQuery().isPending;
}
