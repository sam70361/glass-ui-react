import type { RagDoc, RagResult } from 'src/scenarios/rag/rag.mock';

/** 场景域 API 响应契约（hooks 与 MSW handlers 共用）。 */
export interface RagResponse {
  docs: RagDoc[];
  results: RagResult[];
}
