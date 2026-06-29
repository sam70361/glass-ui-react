import { localApi } from './local-api';

/** 数据访问层基础 fetcher：统一 baseURL `/api`、JSON 解析与错误处理。 */

export const API_BASE = '/api';

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

function toUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  // 生产构建无 MSW worker：直接走本地内存后端（fixtures/db），保证渲染与写入不崩。
  // dev 下行为不变，仍真实 fetch 经 MSW（含写 handler 的可变态）。
  if (import.meta.env.PROD) {
    return localApi<T>(method, path, body);
  }

  const res = await fetch(toUrl(path), {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!res.ok) {
    let message = `请求失败 (${res.status})`;
    try {
      const data = await res.json();
      if (data && typeof data === 'object' && 'message' in data) message = String(data.message);
    } catch {
      /* 忽略非 JSON 错误体 */
    }
    throw new ApiError(res.status, message);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const fetcher = {
  get: <T>(path: string) => request<T>('GET', path),
  post: <T>(path: string, body?: unknown) => request<T>('POST', path, body),
  patch: <T>(path: string, body?: unknown) => request<T>('PATCH', path, body),
  delete: <T>(path: string) => request<T>('DELETE', path),
};
