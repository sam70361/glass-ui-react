/** 集中的路由常量 */
export const paths = {
  dashboard: '/dashboard',
  inbox: '/inbox',
  board: '/board',
  timeline: '/timeline',
  assets: '/assets',
  team: '/team',
  calendar: '/calendar',
  analytics: '/analytics',
  moodboard: '/moodboard',
  activity: '/activity',
  automations: '/automations',
  notifications: '/notifications',
  profile: '/profile',

  scenarios: '/scenarios',
} as const;

/** 单个场景路由 */
export const scenarioPath = (id: string) => `/scenarios/${id}`;
