import { http, HttpResponse } from 'msw';

import { createMember, deleteMember, patchMember } from 'src/mocks/db';
import type { User } from 'src/types';

/** 团队写端点：返回全量成员数组。 */
export const teamHandlers = [
  http.post('/api/team', async ({ request }) => {
    const body = (await request.json()) as Pick<User, 'name' | 'email' | 'role'> & Partial<User>;
    return HttpResponse.json(createMember(body), { status: 201 });
  }),
  http.patch('/api/team/:id', async ({ params, request }) => {
    const updates = (await request.json()) as Partial<User>;
    return HttpResponse.json(patchMember(String(params.id), updates));
  }),
  http.delete('/api/team/:id', ({ params }) => HttpResponse.json(deleteMember(String(params.id)))),
];
