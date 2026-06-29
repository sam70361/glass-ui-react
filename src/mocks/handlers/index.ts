import { coreHandlers } from './core';
import { taskHandlers } from './tasks';
import { teamHandlers } from './team';
import { assetHandlers } from './assets';
import { projectHandlers } from './projects';
import { mailHandlers } from './mail';
import { scenarioHandlers } from './scenarios';

/** 全部 MSW 请求处理器（聚合各域读写）。 */
export const handlers = [
  ...coreHandlers,
  ...taskHandlers,
  ...teamHandlers,
  ...assetHandlers,
  ...projectHandlers,
  ...mailHandlers,
  ...scenarioHandlers,
];
