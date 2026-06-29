# 工程架构

## 概述

Glass UI React 采用 **注册表驱动路由** + **分层组件系统** 架构。核心理念：关注点分离、单一数据源、零配置场景扩展。

## 分层架构

```
┌─────────────────────────────────────────────┐
│  scenarios/        功能页面 (视图 + 局部状态)  │
├─────────────────────────────────────────────┤
│  scenarios/_kit/   场景布局模板               │
├─────────────────────────────────────────────┤
│  layouts/          应用外壳 (侧栏/顶栏/导航)  │
├─────────────────────────────────────────────┤
│  components/shared/  业务复合组件             │
├─────────────────────────────────────────────┤
│  components/ui/    原子组件 (Button, Dialog)  │
├─────────────────────────────────────────────┤
│  theme/            设计令牌, CSS 变量         │
└─────────────────────────────────────────────┘
```

**依赖方向严格单向**：底层永远不导入上层模块。

## 注册表驱动路由

所有页面在 `src/scenarios/registry.ts` 中注册。新增页面只需一行代码——路由、侧边导航、命令面板条目、场景总览页全部自动派生。

### 场景层级

| Tier   | 用途           | 路由规则                   |
|--------|----------------|----------------------------|
| `core` | 主产品页面     | 固定路径 (如 `/dashboard`) |
| `util` | 工具页         | 固定路径，不显示于侧栏     |
| `demo` | 行业演示场景   | 动态 `/scenarios/:id`      |

### 注册示例

```ts
{ id: 'my-page', title: '我的页面', icon: Star, tier: 'demo', category: 'ai', component: lazy(() => import('./my-page/my-page-view')) }
```

只需这一行，系统自动生成：
- 路由 → `/scenarios/my-page`
- 侧栏导航项
- 命令面板搜索项
- 场景总览卡片

## 核心目录

| 目录                    | 职责                                              |
|-------------------------|---------------------------------------------------|
| `src/theme/`            | 设计令牌 (CSS 变量)、主题配置、调色板、设置 store  |
| `src/components/ui/`    | 40+ 原子组件 (Radix/shadcn 模式)                  |
| `src/components/shared/`| 业务复合组件 (PageHeader, StatCard, TaskCard)      |
| `src/scenarios/_kit/`   | 场景布局模板 (MasterDetail, ScenarioToolbar)       |
| `src/scenarios/<id>/`   | 各场景: 视图 + 局部组件 + mock 数据               |
| `src/layouts/`          | 应用外壳 (仪表盘布局/认证布局/居中布局)            |
| `src/api/`              | TanStack Query hooks + fetcher 层                  |
| `src/mocks/`            | MSW handlers + fixture 数据                        |
| `src/store/`            | Zustand stores (应用数据, UI 状态)                 |
| `src/i18n/`             | i18next 配置 + locale JSON                         |

## 状态管理

| 层级       | 工具                   | 作用域                         |
|------------|------------------------|--------------------------------|
| 服务端状态 | TanStack Query         | 异步数据 (通过 MSW mock API)    |
| 应用状态   | Zustand (持久化)       | 用户、项目、任务等              |
| 设置状态   | Zustand (持久化)       | 主题、字体、布局、语言          |
| UI 状态    | Zustand (会话级)       | 模态框、抽屉、导航状态          |

## 构建工具链

| 工具             | 角色                |
|------------------|---------------------|
| Vite 6           | 开发服务器 + 构建   |
| SWC              | 快速 JSX/TS 转换    |
| Tailwind CSS v4  | 原子化样式          |
| TypeScript 5.7   | 类型安全            |
| ESLint 9         | 代码质量            |
| MSW 2            | Mock Service Worker  |
| Storybook 8      | 组件文档            |
| vite-plugin-pwa  | PWA 支持            |

## 硬性规则

1. **禁止硬编码颜色** — 全部通过 CSS 变量或 `DATA_PALETTE` 常量
2. **单一数据源** — 场景在 `registry.ts`，路径在 `paths.ts`
3. **场景数据** 通过 TanStack Query + MSW 获取，视图中不直接读 store
4. **单向依赖** — `theme → ui → shared → kit → scenarios`
5. **国际化** — 所有 UI 文本通过 `useTranslation()` / `t()` 调用
