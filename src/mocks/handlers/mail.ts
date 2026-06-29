import { http, HttpResponse } from 'msw';

import { mailLabels } from 'src/mocks/fixtures';
import {
  db,
  deleteThreads,
  replyThread,
  sendThread,
  toggleThreadLabel,
  updateThreads,
} from 'src/mocks/db';
import type { MailThread } from 'src/types';

type ThreadPatch = Partial<Pick<MailThread, 'read' | 'starred' | 'folder'>>;

/** 邮件域端点：GET 读 db，写后返回全量线程数组。 */
export const mailHandlers = [
  http.get('/api/mail/threads', () => HttpResponse.json(db.threads)),
  http.get('/api/mail/labels', () => HttpResponse.json(mailLabels)),

  // 批量更新（标记已读/星标/移动文件夹）
  http.patch('/api/mail/threads', async ({ request }) => {
    const body = (await request.json()) as { ids: string[]; patch: ThreadPatch };
    return HttpResponse.json(updateThreads(body.ids, body.patch));
  }),
  // 标签切换
  http.post('/api/mail/threads/labels', async ({ request }) => {
    const body = (await request.json()) as { ids: string[]; labelId: string };
    return HttpResponse.json(toggleThreadLabel(body.ids, body.labelId));
  }),
  // 永久删除
  http.post('/api/mail/threads/delete', async ({ request }) => {
    const body = (await request.json()) as { ids: string[] };
    return HttpResponse.json(deleteThreads(body.ids));
  }),
  // 回复
  http.post('/api/mail/threads/:id/reply', async ({ params, request }) => {
    const body = (await request.json()) as { body: string };
    return HttpResponse.json(replyThread(String(params.id), body.body), { status: 201 });
  }),
  // 撰写发送
  http.post('/api/mail/threads', async ({ request }) => {
    const body = (await request.json()) as { to: string[]; subject: string; body: string };
    return HttpResponse.json(sendThread(body), { status: 201 });
  }),
];
