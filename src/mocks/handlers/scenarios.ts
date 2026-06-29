import { http, HttpResponse } from 'msw';

import { DOCS, RESULTS, SCENARIO_DATA } from 'src/mocks/fixtures';
import type { RagDoc } from 'src/mocks/fixtures';

let ragDocs: RagDoc[] = [...DOCS];

export const scenarioHandlers = [
  // AI 工作台 · 知识库
  http.get('/api/scenarios/rag', () => HttpResponse.json({ docs: ragDocs, results: RESULTS })),
  http.post('/api/scenarios/rag/docs', async ({ request }) => {
    const body = (await request.json().catch(() => ({}))) as { name?: string };
    const name = body.name?.trim() || `未命名文档-${ragDocs.length + 1}.pdf`;
    const doc: RagDoc = {
      id: `doc-${Date.now()}`,
      name,
      chunks: 12 + Math.floor(Math.random() * 200),
      status: '索引中',
    };
    ragDocs = [doc, ...ragDocs];
    return HttpResponse.json(doc, { status: 201 });
  }),

  // 通用场景数据：其余场景统一经此读取注册表中的可序列化负载
  http.get('/api/scenarios/:id', ({ params }) => {
    const id = String(params.id);
    const payload = SCENARIO_DATA[id];
    return payload ? HttpResponse.json(payload) : new HttpResponse(null, { status: 404 });
  }),
];
