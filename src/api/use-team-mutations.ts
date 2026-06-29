import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { User } from 'src/types';
import { fetcher } from './fetcher';
import { queryKeys } from './query-keys';

/** 团队写操作：服务端返回全量成员，写入 query 缓存。 */
export function useInviteMemberMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Pick<User, 'name' | 'email' | 'role'> & Partial<User>) =>
      fetcher.post<User[]>('/team', input),
    onSuccess: (team) => qc.setQueryData(queryKeys.team, team),
  });
}

export function useUpdateMemberMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Partial<User> }) =>
      fetcher.patch<User[]>(`/team/${id}`, patch),
    onSuccess: (team) => qc.setQueryData(queryKeys.team, team),
  });
}

export function useRemoveMemberMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fetcher.delete<User[]>(`/team/${id}`),
    onSuccess: (team) => qc.setQueryData(queryKeys.team, team),
  });
}
