import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { RagDoc } from 'src/scenarios/rag/rag.mock';
import { fetcher } from './fetcher';
import { queryKeys } from './query-keys';
import type { RagResponse } from './types';

/**
 * 通用场景数据查询：统一经 `/api/scenarios/:id` 提供（dev 走 MSW，prod 走 localApi）。
 * 返回该场景在 `mocks/fixtures/scenario-data` 中登记的可序列化数据负载。
 */
export function useScenarioData<T>(id: string) {
  return useQuery({
    queryKey: queryKeys.scenarios.data(id),
    queryFn: () => fetcher.get<T>(`/scenarios/${id}`),
  });
}

/** AI 工作台 · 知识库 */
export function useRagQuery() {
  return useQuery({
    queryKey: queryKeys.scenarios.rag,
    queryFn: () => fetcher.get<RagResponse>('/scenarios/rag'),
  });
}

/** 上传知识库文档：写入后失效 rag query 触发重取。 */
export function useUploadRagDocMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => fetcher.post<RagDoc>('/scenarios/rag/docs', { name }),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: queryKeys.scenarios.rag });
    },
  });
}
