import { http, HttpResponse } from 'msw';

import {
  addTaskComment,
  createTask,
  deleteTask,
  patchTask,
  toggleSubtask,
} from 'src/mocks/db';
import type { Task } from 'src/types';

/** 任务写端点：改 db 后统一返回全量任务数组，供前端 setQueryData。 */
export const taskHandlers = [
  http.post('/api/tasks', async ({ request }) => {
    const body = (await request.json()) as Partial<Task> & Pick<Task, 'title' | 'projectId' | 'assigneeId' | 'priority'>;
    return HttpResponse.json(createTask(body), { status: 201 });
  }),
  http.patch('/api/tasks/:id', async ({ params, request }) => {
    const updates = (await request.json()) as Partial<Task>;
    return HttpResponse.json(patchTask(String(params.id), updates));
  }),
  http.delete('/api/tasks/:id', ({ params }) => HttpResponse.json(deleteTask(String(params.id)))),
  http.post('/api/tasks/:id/comments', async ({ params, request }) => {
    const body = (await request.json()) as { userId: string; text: string; time?: string };
    return HttpResponse.json(
      addTaskComment(String(params.id), { userId: body.userId, text: body.text, time: body.time ?? new Date().toISOString() }),
      { status: 201 }
    );
  }),
  http.patch('/api/tasks/:id/subtasks/:subId', ({ params }) =>
    HttpResponse.json(toggleSubtask(String(params.id), String(params.subId)))
  ),
];
