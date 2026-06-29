import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Task } from 'src/types';
import { fetcher } from './fetcher';
import { queryKeys } from './query-keys';

type NewTask = Partial<Task> & Pick<Task, 'title' | 'projectId' | 'assigneeId' | 'priority'>;

/** 任务写操作：服务端返回全量任务，直接写入 query 缓存（无需重取）。 */
export function useCreateTaskMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: NewTask) => fetcher.post<Task[]>('/tasks', input),
    onSuccess: (tasks) => qc.setQueryData(queryKeys.tasks, tasks),
  });
}

export function useUpdateTaskMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Partial<Task> }) =>
      fetcher.patch<Task[]>(`/tasks/${id}`, patch),
    // 乐观更新：拖拽改状态/改优先级即时反映，失败回滚，成功以服务端全量为准。
    onMutate: async ({ id, patch }) => {
      await qc.cancelQueries({ queryKey: queryKeys.tasks });
      const prev = qc.getQueryData<Task[]>(queryKeys.tasks);
      if (prev) qc.setQueryData(queryKeys.tasks, prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) qc.setQueryData(queryKeys.tasks, ctx.prev);
    },
    onSuccess: (tasks) => qc.setQueryData(queryKeys.tasks, tasks),
  });
}

export function useDeleteTaskMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fetcher.delete<Task[]>(`/tasks/${id}`),
    onSuccess: (tasks) => qc.setQueryData(queryKeys.tasks, tasks),
  });
}

export function useAddCommentMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId, userId, text }: { taskId: string; userId: string; text: string }) =>
      fetcher.post<Task[]>(`/tasks/${taskId}/comments`, { userId, text }),
    onSuccess: (tasks) => qc.setQueryData(queryKeys.tasks, tasks),
  });
}

export function useToggleSubtaskMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId, subId }: { taskId: string; subId: string }) =>
      fetcher.patch<Task[]>(`/tasks/${taskId}/subtasks/${subId}`),
    onSuccess: (tasks) => qc.setQueryData(queryKeys.tasks, tasks),
  });
}
