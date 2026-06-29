import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Project } from 'src/types';
import { fetcher } from './fetcher';
import { queryKeys } from './query-keys';

/** 项目写操作：服务端返回全量项目，写入 query 缓存。 */
export function useCreateProjectMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Pick<Project, 'name' | 'description'> & Partial<Project>) =>
      fetcher.post<Project[]>('/projects', input),
    onSuccess: (projects) => qc.setQueryData(queryKeys.projects, projects),
  });
}
