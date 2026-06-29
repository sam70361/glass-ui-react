# 组件库

## 技术栈

基于 **shadcn/ui 模式** 构建：Radix UI 无头原语 + Tailwind CSS v4 + CVA 变体。

| 层级     | 技术              |
|----------|-------------------|
| 无头行为 | Radix UI          |
| 样式     | Tailwind CSS v4   |
| 变体     | CVA (class-variance-authority) |
| 工具函数 | clsx + tailwind-merge → `cn()` |
| 图标     | lucide-react      |
| 动画     | framer-motion     |
| 图表     | recharts          |

## 组件分类

### 原子组件 (`src/components/ui/`)

40+ 基础组件，提供完整的 UI 原语：

| 类别     | 组件列表                                              |
|----------|-------------------------------------------------------|
| 输入     | Button, Input, Textarea, Select, Checkbox, Switch, Slider |
| 展示     | Badge, Avatar, Card, Separator, Progress, Skeleton    |
| 导航     | Tabs, Breadcrumb, Pagination                          |
| 浮层     | Dialog, Sheet, Popover, Tooltip, DropdownMenu         |
| 反馈     | Toast, Alert                                          |
| 数据     | Table, DataTable (含排序/筛选/分页)                   |
| 专用     | Command (命令面板), Calendar, DatePicker               |

### 业务复合组件 (`src/components/shared/`)

| 组件           | 用途                                   |
|----------------|----------------------------------------|
| `PageHeader`   | 页面标题 + 描述 + 操作区               |
| `StatCard`     | 统计卡片 (数值 + 趋势 + 图标)          |
| `TaskCard`     | 任务卡片 (拖拽式看板)                   |
| `QuickAction`  | 快捷操作按钮组                          |
| `UserAvatar`   | 用户头像 (含在线状态)                   |
| `Timeline`     | 时间轴 (垂直/水平)                      |
| `Logo`         | 品牌标识 (含文字/纯图标模式)            |
| `EmptyState`   | 空状态占位                              |

### 场景模板 (`src/scenarios/_kit/`)

| 模板               | 用途                                |
|--------------------|-------------------------------------|
| `MasterDetail`     | 主从布局 (列表 + 详情面板)           |
| `ScenarioToolbar`  | 场景级工具栏 (筛选/搜索/视图切换)    |
| `ScenarioGate`     | 加载态/错误态/空态统一处理            |
| `CodeBlock`        | 代码块展示 (含语法高亮)              |

### 图表组件 (`src/components/charts/`)

| 组件         | 用途              |
|--------------|-------------------|
| `AreaTrend`  | 面积趋势图        |
| `DonutChart` | 环形图            |
| `Heatmap`    | 热力图            |

## 毛玻璃工具类

定义在 `src/theme/glass.css`：

| 类名                | 效果                                    |
|---------------------|-----------------------------------------|
| `.glass-card`       | 毛玻璃卡片 (backdrop-blur + 透明边框)    |
| `.glass-nav`        | 导航面板玻璃效果                         |
| `.glass-panel`      | 模态/面板玻璃底色                        |
| `.glass-topbar`     | 顶部栏玻璃效果                           |
| `.holographic-text` | 全息渐变文字                             |
| `.holographic-bg`   | 全息渐变背景 (主操作按钮)                 |

### 使用示例

```tsx
<div className="glass-card p-6 rounded-[var(--radius-lg)]">
  <h3 className="holographic-text text-lg font-semibold">标题</h3>
  <p className="text-text-secondary">内容描述</p>
  <button className="holographic-bg px-4 py-2 rounded-[var(--radius-md)] text-white">
    主操作
  </button>
</div>
```

## 响应式与无障碍

- 弹性布局：CSS Grid + `--content-gutter` 变量控制内容留白
- 导航自适应：迷你侧栏 → 展开侧栏 → 横向顶栏
- 所有交互元素均具备 `aria-*` 标签
- 尊重 `prefers-reduced-motion` (通过 `data-reduce-motion`)
- 高对比度模式 (通过 `data-contrast="high"`)
- 全键盘导航支持 (命令面板 `Cmd+K`)

## 组件开发规范

1. 所有新组件放 `src/components/ui/` (原子) 或 `src/components/shared/` (复合)
2. 使用 `cn()` 合并 className
3. 样式全部通过 Tailwind 类 + CSS 变量，禁止 inline style (除非动态值)
4. 导出 props type 供外部扩展
5. 为每个组件编写 Storybook stories
