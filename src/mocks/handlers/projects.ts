import { http, HttpResponse } from 'msw';

import { createProject } from 'src/mocks/db';
import { currentUser } from 'src/mocks/fixtures';
import type { Project } from 'src/types';

/** 项目写端点：返回全量项目数组。 */
export const projectHandlers = [
  http.post('/api/projects', async ({ request }) => {
    const body = (await request.json()) as Pick<Project, 'name' | 'description'> & Partial<Project>;
    return HttpResponse.json(createProject(body, currentUser.id), { status: 201 });
  }),
];
