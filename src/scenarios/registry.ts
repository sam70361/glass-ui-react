import { createElement, lazy } from 'react';
import type { ComponentType, LazyExoticComponent } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import {
  Activity,
  Bell,
  CalendarDays,
  Clock,
  Image,
  Bot,
  Boxes,
  Brain,
  ClipboardList,
  Cpu,
  Database,
  FileSignature,
  FileText,
  FlaskConical,
  FolderTree,
  Gauge,
  GitPullRequest,
  GraduationCap,
  HeartPulse,
  Images,
  Inbox,
  KanbanSquare,
  KeyRound,
  LayoutDashboard,
  LineChart,
  LogIn,
  MessageSquare,
  Newspaper,
  Package,
  ShieldCheck,
  ShoppingCart,
  Terminal,
  Ticket,
  Truck,
  UserCircle,
  Users,
  Users2,
  Variable,
  Workflow,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { DATA_PALETTE } from 'src/theme/palette';
import { paths, scenarioPath } from 'src/routes/paths';

/**
 * 场景分类：core = 工作区（核心业务页），其余 6 项对应 6 大演示场景分类。
 * 每个细化子模块 = 一个独立的二级场景（各自路由），归属到其中一个分类。
 * hub 与导航的二级项均按此分类派生。
 */
export type ScenarioCategory =
  | 'core'
  | 'ai'
  | 'commerce'
  | 'data'
  | 'collab'
  | 'content'
  | 'vertical';

/** core = 主产品功能（进侧栏工作区），demo = 演示场景（进场景分类），util = 仅路由不进导航 */
export type ScenarioTier = 'core' | 'demo' | 'util';

/**
 * 场景注册项 = 元数据 + 懒加载组件，单一真相源。
 * 新增场景只需在 SCENARIOS 增加一条（含 component loader），
 * hub 卡片、路由、导航、命令面板均由此派生。
 */
export interface Scenario {
  id: string;
  title: string;
  desc: string;
  category: ScenarioCategory;
  icon: LucideIcon;
  accent: string;
  tier?: ScenarioTier;
  /** core 页使用既有固定路由；demo 走 /scenarios/:id（留空则由 id 派生） */
  path?: string;
  /** 懒加载组件 loader（默认导出） */
  component: () => Promise<{ default: ComponentType }>;
}

/** 仅 demo 分类（hub 与场景导航按此渲染；core 单独成「工作区」组） */
export const SCENARIO_CATEGORIES: { id: ScenarioCategory; label: string }[] = [
  { id: 'ai', label: 'AI 工作台' },
  { id: 'commerce', label: '商务中台' },
  { id: 'data', label: '数据与运维' },
  { id: 'collab', label: '协作与服务' },
  { id: 'content', label: '内容与编辑' },
  { id: 'vertical', label: '行业垂直' },
];

export const SCENARIOS: Scenario[] = [
  // ===== 核心业务页（tier:core）：登记进 registry 供导航/命令面板派生，使用既有实现与路由 =====
  { id: 'dashboard', title: '仪表盘', desc: '总览指标、趋势与近期动态', category: 'core', tier: 'core', icon: LayoutDashboard, accent: DATA_PALETTE.cyan, path: paths.dashboard, component: () => import('src/scenarios/dashboard') },
  { id: 'board', title: '项目看板', desc: '任务看板、泳道与拖拽流转', category: 'core', tier: 'core', icon: KanbanSquare, accent: DATA_PALETTE.violet, path: paths.board, component: () => import('src/scenarios/board') },
  { id: 'inbox', title: '收件箱', desc: '消息会话、通知与处理', category: 'core', tier: 'core', icon: Inbox, accent: DATA_PALETTE.magenta, path: paths.inbox, component: () => import('src/scenarios/inbox') },
  { id: 'team', title: '团队', desc: '成员、角色与协作', category: 'core', tier: 'core', icon: Users, accent: DATA_PALETTE.emerald, path: paths.team, component: () => import('src/scenarios/team') },
  { id: 'assets', title: '素材库', desc: '素材网格、标签与预览', category: 'core', tier: 'core', icon: Images, accent: DATA_PALETTE.amber, path: paths.assets, component: () => import('src/scenarios/assets') },
  { id: 'profile', title: '个人中心', desc: '资料、偏好与活动', category: 'core', tier: 'core', icon: UserCircle, accent: DATA_PALETTE.blue, path: paths.profile, component: () => import('src/scenarios/profile') },

  // ===== 工具页（tier:util）：有固定路由但不进侧栏导航（经顶栏/命令面板/直达访问） =====
  { id: 'timeline', title: '时间线', desc: '动态流与里程碑时间轴', category: 'core', tier: 'util', icon: Clock, accent: DATA_PALETTE.cyan, path: paths.timeline, component: () => import('src/scenarios/timeline') },
  { id: 'calendar', title: '日历', desc: '日程、事件与排期', category: 'core', tier: 'util', icon: CalendarDays, accent: DATA_PALETTE.violet, path: paths.calendar, component: () => import('src/scenarios/calendar') },
  { id: 'analytics', title: '分析', desc: '指标洞察与多维报表', category: 'core', tier: 'util', icon: LineChart, accent: DATA_PALETTE.emerald, path: paths.analytics, component: () => import('src/scenarios/analytics') },
  { id: 'moodboard', title: '灵感板', desc: '视觉参考与情绪板', category: 'core', tier: 'util', icon: Image, accent: DATA_PALETTE.magenta, path: paths.moodboard, component: () => import('src/scenarios/moodboard') },
  { id: 'activity', title: '活动', desc: '操作记录与审计流', category: 'core', tier: 'util', icon: Activity, accent: DATA_PALETTE.amber, path: paths.activity, component: () => import('src/scenarios/activity') },
  { id: 'automations', title: '自动化', desc: '触发器、规则与编排', category: 'core', tier: 'util', icon: Workflow, accent: DATA_PALETTE.violet, path: paths.automations, component: () => import('src/scenarios/automations') },
  { id: 'notifications', title: '通知', desc: '系统通知与提醒中心', category: 'core', tier: 'util', icon: Bell, accent: DATA_PALETTE.blue, path: paths.notifications, component: () => import('src/scenarios/notifications') },

  // ===== AI 工作台（ai）=====
  { id: 'chat', title: '对话', desc: '多轮对话、模型切换与流式回复', category: 'ai', tier: 'demo', icon: MessageSquare, accent: DATA_PALETTE.cyan, component: () => import('src/scenarios/chat') },
  { id: 'agents', title: 'Agent', desc: '智能体编排、工具调用与运行轨迹', category: 'ai', tier: 'demo', icon: Bot, accent: DATA_PALETTE.cyan, component: () => import('src/scenarios/agents') },
  { id: 'prompts', title: 'Prompt', desc: '提示词模板、变量与版本管理', category: 'ai', tier: 'demo', icon: Variable, accent: DATA_PALETTE.cyan, component: () => import('src/scenarios/prompts') },
  { id: 'rag', title: '知识库', desc: '文档检索增强、切片与召回', category: 'ai', tier: 'demo', icon: Database, accent: DATA_PALETTE.cyan, component: () => import('src/scenarios/rag') },
  { id: 'memory', title: '记忆', desc: '长期记忆、画像与上下文留存', category: 'ai', tier: 'demo', icon: Brain, accent: DATA_PALETTE.cyan, component: () => import('src/scenarios/memory') },
  { id: 'skills', title: 'Skills', desc: '技能插件市场与能力装配', category: 'ai', tier: 'demo', icon: Boxes, accent: DATA_PALETTE.cyan, component: () => import('src/scenarios/skills') },
  { id: 'api-keys', title: '模型配置', desc: '模型 API 密钥、额度与路由', category: 'ai', tier: 'demo', icon: KeyRound, accent: DATA_PALETTE.cyan, component: () => import('src/scenarios/api-keys') },

  // ===== 商务中台（commerce）=====
  { id: 'orders', title: '订单', desc: '订单流转、发货与履约跟踪', category: 'commerce', tier: 'demo', icon: ShoppingCart, accent: DATA_PALETTE.amber, component: () => import('src/scenarios/orders') },
  { id: 'inventory', title: '库存', desc: '库存水位、补货与多仓调拨', category: 'commerce', tier: 'demo', icon: Package, accent: DATA_PALETTE.amber, component: () => import('src/scenarios/inventory') },
  { id: 'crm', title: 'CRM', desc: '客户画像、商机与跟进', category: 'commerce', tier: 'demo', icon: Users2, accent: DATA_PALETTE.amber, component: () => import('src/scenarios/crm') },
  { id: 'billing', title: '计费', desc: '订阅、账单与用量结算', category: 'commerce', tier: 'demo', icon: ClipboardList, accent: DATA_PALETTE.amber, component: () => import('src/scenarios/billing') },
  { id: 'trading', title: '交易', desc: '行情盘口、撮合与持仓', category: 'commerce', tier: 'demo', icon: LineChart, accent: DATA_PALETTE.amber, component: () => import('src/scenarios/trading') },
  { id: 'risk', title: '风控', desc: '规则引擎、命中与处置', category: 'commerce', tier: 'demo', icon: ShieldCheck, accent: DATA_PALETTE.amber, component: () => import('src/scenarios/risk') },

  // ===== 数据与运维（data）=====
  { id: 'observability', title: '可观测', desc: '指标、日志与告警大盘', category: 'data', tier: 'demo', icon: Gauge, accent: DATA_PALETTE.violet, component: () => import('src/scenarios/observability') },
  { id: 'iot', title: 'IoT', desc: '设备拓扑、遥测与控制', category: 'data', tier: 'demo', icon: Cpu, accent: DATA_PALETTE.violet, component: () => import('src/scenarios/iot') },
  { id: 'data-pipeline', title: '数据管道', desc: 'ETL 编排、血缘与调度', category: 'data', tier: 'demo', icon: Database, accent: DATA_PALETTE.violet, component: () => import('src/scenarios/data-pipeline') },
  { id: 'sql-console', title: 'SQL 控制台', desc: '查询编辑、执行与结果集', category: 'data', tier: 'demo', icon: Terminal, accent: DATA_PALETTE.violet, component: () => import('src/scenarios/sql-console') },
  { id: 'experiments', title: 'A/B 实验', desc: '实验分流、指标与显著性', category: 'data', tier: 'demo', icon: FlaskConical, accent: DATA_PALETTE.violet, component: () => import('src/scenarios/experiments') },

  // ===== 协作与服务（collab）=====
  { id: 'tickets', title: '工单', desc: '工单分配、SLA 与协同处理', category: 'collab', tier: 'demo', icon: Ticket, accent: DATA_PALETTE.magenta, component: () => import('src/scenarios/tickets') },
  { id: 'code-review', title: '代码评审', desc: '代码差异、评论与合并', category: 'collab', tier: 'demo', icon: GitPullRequest, accent: DATA_PALETTE.magenta, component: () => import('src/scenarios/code-review') },
  { id: 'workflow', title: '流程编排', desc: '节点画布、条件与自动化', category: 'collab', tier: 'demo', icon: Workflow, accent: DATA_PALETTE.magenta, component: () => import('src/scenarios/workflow') },
  { id: 'auth', title: '认证布局', desc: '登录、注册与重置密码布局', category: 'collab', tier: 'demo', icon: LogIn, accent: DATA_PALETTE.magenta, component: () => import('src/scenarios/auth') },

  // ===== 内容与编辑（content）=====
  { id: 'cms', title: 'CMS', desc: '内容条目、分类与发布', category: 'content', tier: 'demo', icon: Newspaper, accent: DATA_PALETTE.emerald, component: () => import('src/scenarios/cms') },
  { id: 'files', title: '文件', desc: '文件树、预览与版本', category: 'content', tier: 'demo', icon: FolderTree, accent: DATA_PALETTE.emerald, component: () => import('src/scenarios/files') },
  { id: 'doc-editor', title: '文档', desc: '富文本写作与协同编辑', category: 'content', tier: 'demo', icon: FileText, accent: DATA_PALETTE.emerald, component: () => import('src/scenarios/doc-editor') },
  { id: 'report-designer', title: '报告设计器', desc: '拖拽元素、纸张与导出', category: 'content', tier: 'demo', icon: FileSignature, accent: DATA_PALETTE.emerald, component: () => import('src/scenarios/report-designer') },

  // ===== 行业垂直（vertical）=====
  { id: 'healthcare', title: '医疗', desc: '患者体征、检验与就诊记录', category: 'vertical', tier: 'demo', icon: HeartPulse, accent: DATA_PALETTE.blue, component: () => import('src/scenarios/healthcare') },
  { id: 'logistics', title: '物流', desc: '运单轨迹、网点与时效', category: 'vertical', tier: 'demo', icon: Truck, accent: DATA_PALETTE.blue, component: () => import('src/scenarios/logistics') },
  { id: 'lms', title: '教育', desc: '课程、章节与学习进度', category: 'vertical', tier: 'demo', icon: GraduationCap, accent: DATA_PALETTE.blue, component: () => import('src/scenarios/lms') },
  { id: 'recruiting', title: '招聘', desc: '候选人管道、面试与评估', category: 'vertical', tier: 'demo', icon: Users2, accent: DATA_PALETTE.blue, component: () => import('src/scenarios/recruiting') },
];

export function getScenario(id: string) {
  return SCENARIOS.find((s) => s.id === id);
}

/** 场景在导航/命令面板中的路由：有固定 path 用 path，否则 demo 走 /scenarios/:id */
export function scenarioNavPath(s: Scenario): string {
  return s.path ?? scenarioPath(s.id);
}

/** 场景 id → 懒加载组件（demo：无固定 path，走 /scenarios/:id 动态路由） */
export const scenarioComponents: Record<string, LazyExoticComponent<ComponentType>> = Object.fromEntries(
  SCENARIOS.filter((s) => !s.path).map((s) => [s.id, lazy(s.component)])
);

/** 固定路由模块（core + util）：path → 懒加载组件，供 app 路由表派生 */
export const fixedRoutes: { path: string; Comp: LazyExoticComponent<ComponentType> }[] = SCENARIOS
  .filter((s) => s.path)
  .map((s) => ({ path: s.path as string, Comp: lazy(s.component) }));

export function ScenarioRouter() {
  const { id } = useParams();
  const Comp = id ? scenarioComponents[id] : undefined;
  if (!Comp) return createElement(Navigate, { to: paths.scenarios, replace: true });
  return createElement(Comp);
}
