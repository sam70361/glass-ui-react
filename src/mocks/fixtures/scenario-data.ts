/**
 * 场景数据服务注册表（单一真相源）。
 *
 * 仅登记「可序列化的内容数据」（纯数组/对象/字符串），经 `/api/scenarios/:id`
 * 由 MSW(dev) 与 localApi(prod) 统一提供，使各场景与基准场景同走 API。
 * 图标(LucideIcon)、函数、纯展示配置(Record 映射) 等不可序列化项仍由各场景就近 import，不在此登记。
 */
import * as agents from 'src/scenarios/agents/agents.mock';
import * as billing from 'src/scenarios/billing/billing.mock';
import * as crm from 'src/scenarios/crm/crm.mock';
import * as dataPipeline from 'src/scenarios/data-pipeline/data-pipeline.mock';
import * as docEditor from 'src/scenarios/doc-editor/doc-editor.mock';
import * as inventory from 'src/scenarios/inventory/inventory.mock';
import * as iot from 'src/scenarios/iot/iot.mock';
import * as lms from 'src/scenarios/lms/lms.mock';
import * as risk from 'src/scenarios/risk/risk.mock';
import * as trading from 'src/scenarios/trading/trading.mock';
import * as tickets from 'src/scenarios/tickets/tickets.mock';
import * as logistics from 'src/scenarios/logistics/logistics.mock';
import * as memory from 'src/scenarios/memory/memory.mock';
import * as prompts from 'src/scenarios/prompts/prompts.mock';
import * as apiKeys from 'src/scenarios/api-keys/api-keys.mock';
import * as skills from 'src/scenarios/skills/skills.mock';
import * as sqlConsole from 'src/scenarios/sql-console/sql-console.mock';
import * as cms from 'src/scenarios/cms/cms.mock';
import * as chat from 'src/scenarios/chat/chat.mock';
import * as codeReview from 'src/scenarios/code-review/code-review.mock';
import * as experiments from 'src/scenarios/experiments/experiments.mock';
import * as files from 'src/scenarios/files/files.mock';
import * as recruiting from 'src/scenarios/recruiting/recruiting.mock';
import * as reportDesigner from 'src/scenarios/report-designer/report-designer.mock';
import * as healthcare from 'src/scenarios/healthcare/healthcare.mock';
import { ORDERS, CUSTOMERS } from 'src/scenarios/orders/orders.mock';
import { qps, latency, SERVICES, ALERTS, serviceScores } from 'src/scenarios/observability/observability.mock';

/**
 * 场景 id → 该场景的可序列化数据负载（响应体）。
 * 注：workflow 的节点数据内嵌 LucideIcon 组件引用、无法 JSON 序列化，按约定就近保留本地种子，不在此登记。
 */
export const SCENARIO_DATA: Record<string, Record<string, unknown>> = {
  // ===== A 类：只读展示型 =====
  agents: { RUNS: agents.RUNS, STEPS: agents.STEPS },
  billing: { PLANS: billing.PLANS, USAGE: billing.USAGE, INVOICES: billing.INVOICES, REVENUE_TREND: billing.REVENUE_TREND },
  crm: { STAGES: crm.STAGES, DEALS: crm.DEALS },
  'data-pipeline': { DATASETS: dataPipeline.DATASETS, RUNS: dataPipeline.RUNS, throughput: dataPipeline.throughput },
  'doc-editor': { OUTLINE: docEditor.OUTLINE, DOC: docEditor.DOC },
  inventory: { SKUS: inventory.SKUS },
  iot: { GAUGES: iot.GAUGES, DEVICES: iot.DEVICES },
  lms: { COURSES: lms.COURSES },
  risk: { RULES: risk.RULES, TXN_DETAIL: risk.TXN_DETAIL },
  orders: { orders: ORDERS, customers: CUSTOMERS },
  observability: { qps, latency, services: SERVICES, alerts: ALERTS, serviceScores },

  // ===== B 类：交互型（仅登记可序列化内容数据，加载后种入本地 state） =====
  trading: { WATCH: trading.WATCH, TREND: trading.TREND },
  tickets: { TICKETS: tickets.TICKETS },
  logistics: { SHIPMENTS: logistics.SHIPMENTS },
  memory: { MEMORIES: memory.MEMORIES },
  prompts: { PROMPTS: prompts.PROMPTS },
  'api-keys': { PROVIDERS: apiKeys.PROVIDERS },
  skills: { SKILLS: skills.SKILLS },
  'sql-console': { TABLES: sqlConsole.TABLES, RESULT: sqlConsole.RESULT },
  cms: { INITIAL: cms.INITIAL },
  chat: { CONVERSATIONS: chat.CONVERSATIONS, INIT: chat.INIT },
  'code-review': { FILES: codeReview.FILES, CHECKS: codeReview.CHECKS },
  experiments: { INITIAL: experiments.INITIAL, trendSeries: experiments.trendSeries },
  files: { INITIAL: files.INITIAL },
  recruiting: { INITIAL: recruiting.INITIAL, STAGES: recruiting.STAGES },
  'report-designer': { INITIAL: reportDesigner.INITIAL },
  healthcare: { PATIENTS: healthcare.PATIENTS },
};
