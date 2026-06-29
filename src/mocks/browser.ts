import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';

/** 浏览器端 MSW worker（仅在 dev/演示态由 main.tsx 动态启动）。 */
export const worker = setupWorker(...handlers);
