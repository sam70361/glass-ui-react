import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Asset } from 'src/types';
import { fetcher } from './fetcher';
import { queryKeys } from './query-keys';

/** 素材写操作：服务端返回全量素材，写入 query 缓存。 */
export function useUploadAssetMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Pick<Asset, 'name' | 'type' | 'projectId'> & Partial<Asset>) =>
      fetcher.post<Asset[]>('/assets', input),
    onSuccess: (assets) => qc.setQueryData(queryKeys.assets, assets),
  });
}

export function useDeleteAssetMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fetcher.delete<Asset[]>(`/assets/${id}`),
    onSuccess: (assets) => qc.setQueryData(queryKeys.assets, assets),
  });
}

export function useToggleAssetFavoriteMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fetcher.post<Asset[]>(`/assets/${id}/favorite`),
    onSuccess: (assets) => qc.setQueryData(queryKeys.assets, assets),
  });
}

export function useSetAssetReviewMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Asset['reviewStatus'] }) =>
      fetcher.patch<Asset[]>(`/assets/${id}`, { reviewStatus: status }),
    onSuccess: (assets) => qc.setQueryData(queryKeys.assets, assets),
  });
}

export function useAddAssetAnnotationMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, annotation }: { id: string; annotation: { x: number; y: number; by: string; text: string } }) =>
      fetcher.post<Asset[]>(`/assets/${id}/annotations`, annotation),
    onSuccess: (assets) => qc.setQueryData(queryKeys.assets, assets),
  });
}
