/**
 * Fixtures 聚合入口（仅供 MSW handlers 使用，dev/演示态）。
 *
 * 数据真相源是 `src/mocks/fixtures/*`（核心域）与各 `src/scenarios/<id>/<id>.mock.ts`（场景域）；
 * 此处仅做「聚合 re-export」，避免 handlers 到处散引、并集中暴露共享 brand 常量。
 */

// 共享品牌常量
export { BRANDS } from './brand';

// 场景数据服务注册表（经 /api/scenarios/:id 统一提供）
export { SCENARIO_DATA } from './scenario-data';

// 核心业务域 fixtures（Zustand 同源）
export {
  currentUser,
  team,
  projects,
  tasks,
  assets,
  notifications,
  calendarEvents,
  activities,
} from 'src/mocks/fixtures/core-data';
export { mailThreads, mailLabels } from 'src/mocks/fixtures/mail';

// 场景域 fixtures（就近 mock 聚合）
export { DOCS, RESULTS } from 'src/scenarios/rag/rag.mock';
export type { RagDoc, RagResult } from 'src/scenarios/rag/rag.mock';
