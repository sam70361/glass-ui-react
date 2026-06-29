import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { MailThread } from 'src/types';
import { fetcher } from './fetcher';
import { queryKeys } from './query-keys';

/** 邮件线程 */
export function useMailThreadsQuery() {
  return useQuery({
    queryKey: queryKeys.mail.threads,
    queryFn: () => fetcher.get<MailThread[]>('/mail/threads'),
  });
}

type ThreadPatch = Partial<Pick<MailThread, 'read' | 'starred' | 'folder'>>;

/** 批量更新线程（标记已读/星标/移动文件夹） */
export function useUpdateThreadsMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ ids, patch }: { ids: string[]; patch: ThreadPatch }) =>
      fetcher.patch<MailThread[]>('/mail/threads', { ids, patch }),
    onSuccess: (threads) => qc.setQueryData(queryKeys.mail.threads, threads),
  });
}

/** 切换标签 */
export function useToggleThreadLabelMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ ids, labelId }: { ids: string[]; labelId: string }) =>
      fetcher.post<MailThread[]>('/mail/threads/labels', { ids, labelId }),
    onSuccess: (threads) => qc.setQueryData(queryKeys.mail.threads, threads),
  });
}

/** 永久删除 */
export function useDeleteThreadsMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (ids: string[]) => fetcher.post<MailThread[]>('/mail/threads/delete', { ids }),
    onSuccess: (threads) => qc.setQueryData(queryKeys.mail.threads, threads),
  });
}

/** 回复 */
export function useReplyThreadMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ threadId, body }: { threadId: string; body: string }) =>
      fetcher.post<MailThread[]>(`/mail/threads/${threadId}/reply`, { body }),
    onSuccess: (threads) => qc.setQueryData(queryKeys.mail.threads, threads),
  });
}

/** 撰写发送 */
export function useSendThreadMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { to: string[]; subject: string; body: string }) =>
      fetcher.post<MailThread[]>('/mail/threads', input),
    onSuccess: (threads) => qc.setQueryData(queryKeys.mail.threads, threads),
  });
}
