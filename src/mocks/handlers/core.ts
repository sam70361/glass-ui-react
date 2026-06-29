import { http, HttpResponse } from 'msw';

import { activities, calendarEvents, currentUser, notifications } from 'src/mocks/fixtures';
import { db } from 'src/mocks/db';

/** 核心业务域只读端点：可变域读 db，静态域读 fixtures。 */
export const coreHandlers = [
  http.get('/api/me', () => HttpResponse.json(currentUser)),
  http.get('/api/projects', () => HttpResponse.json(db.projects)),
  http.get('/api/tasks', () => HttpResponse.json(db.tasks)),
  http.get('/api/team', () => HttpResponse.json(db.team)),
  http.get('/api/assets', () => HttpResponse.json(db.assets)),
  http.get('/api/activities', () => HttpResponse.json(activities)),
  http.get('/api/notifications', () => HttpResponse.json(notifications)),
  http.get('/api/calendar-events', () => HttpResponse.json(calendarEvents)),
];
