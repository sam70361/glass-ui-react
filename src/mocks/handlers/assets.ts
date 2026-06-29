import { http, HttpResponse } from 'msw';

import {
  addAssetAnnotation,
  createAsset,
  deleteAsset,
  setAssetReview,
  toggleAssetFavorite,
} from 'src/mocks/db';
import { currentUser } from 'src/mocks/fixtures';
import type { Asset } from 'src/types';

/** 素材写端点：返回全量素材数组。 */
export const assetHandlers = [
  http.post('/api/assets', async ({ request }) => {
    const body = (await request.json()) as Pick<Asset, 'name' | 'type' | 'projectId'> & Partial<Asset>;
    return HttpResponse.json(createAsset(body, currentUser.id), { status: 201 });
  }),
  http.delete('/api/assets/:id', ({ params }) => HttpResponse.json(deleteAsset(String(params.id)))),
  http.post('/api/assets/:id/favorite', ({ params }) => HttpResponse.json(toggleAssetFavorite(String(params.id)))),
  http.patch('/api/assets/:id', async ({ params, request }) => {
    const body = (await request.json()) as { reviewStatus?: Asset['reviewStatus'] };
    return HttpResponse.json(setAssetReview(String(params.id), body.reviewStatus));
  }),
  http.post('/api/assets/:id/annotations', async ({ params, request }) => {
    const body = (await request.json()) as { x: number; y: number; by: string; text: string };
    return HttpResponse.json(addAssetAnnotation(String(params.id), body), { status: 201 });
  }),
];
