# UI 设计规范

本文档是 Glass UI React 的视觉设计规范，帮助设计师和开发者理解并复刻这套 UI 系统。

## 视觉基调

| 维度     | 规范                                          |
|----------|-----------------------------------------------|
| 风格     | 暗夜毛玻璃 (Dark Glassmorphism)               |
| 底色     | 深色画布 (#0a0a0f ~ #0f172a)                  |
| 表面     | 半透明毛玻璃 (backdrop-blur + rgba 背景)       |
| 强调     | 全息三色渐变 (作为主操作/激活态标识)           |
| 边框     | 微光分割线 (rgba 白色 6-12% 不透明度)          |
| 圆角     | 统一圆角系统 (4px ~ 24px 递进)                 |

## 间距系统

基于 4px 基线网格：

| 级别  | 值    | 用途                        |
|-------|-------|-----------------------------|
| xs    | 4px   | 图标与文字间距               |
| sm    | 8px   | 组件内元素间距               |
| md    | 12px  | 卡片内间距                   |
| lg    | 16px  | 区块间距                     |
| xl    | 24px  | 面板/卡片内边距              |
| 2xl   | 32px  | 页面级分区间距               |
| 3xl   | 48px  | 主要区域间距                 |

## 排版规范

### 字号层级

| 层级        | 大小   | 行高   | 粗细     | 用途           |
|-------------|--------|--------|----------|----------------|
| Display     | 30px   | 1.2    | 700      | 页面大标题      |
| Heading 1   | 24px   | 1.3    | 600      | 区域标题        |
| Heading 2   | 20px   | 1.4    | 600      | 卡片标题        |
| Heading 3   | 16px   | 1.5    | 600      | 子标题          |
| Body        | 14px   | 1.5    | 400      | 正文            |
| Caption     | 12px   | 1.4    | 400      | 辅助说明        |
| Overline    | 10px   | 1.3    | 500      | 标签/角标       |

### 文字颜色

| 层级              | CSS 变量                   | 不透明度 | 用途        |
|-------------------|----------------------------|----------|-------------|
| Primary           | `--color-text-primary`     | 95%      | 标题/主文字  |
| Secondary         | `--color-text-secondary`   | 72%      | 正文        |
| Tertiary          | `--color-text-tertiary`    | 50%      | 辅助信息    |
| Muted             | `--color-text-muted`       | 35%      | 禁用/占位   |

## 玻璃表面规范

### 卡片 (glass-card)

```css
background: rgba(255, 255, 255, 0.03);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: var(--radius-lg);  /* 12px */
box-shadow: var(--shadow-glass);
```

### 导航面板 (glass-nav)

```css
background: rgba(10, 10, 15, 0.85);
backdrop-filter: blur(20px);
border-right: 1px solid rgba(255, 255, 255, 0.06);
```

### 浮层面板 (glass-panel)

```css
background: rgba(15, 15, 20, 0.92);
backdrop-filter: blur(24px);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: var(--radius-xl);  /* 16px */
box-shadow: var(--shadow-z3);
```

## 全息渐变规范

主操作元素使用全息渐变作为视觉标识：

```css
/* 渐变背景 (按钮/进度条/激活态) */
background: linear-gradient(135deg, var(--holo-1), var(--holo-2), var(--holo-3));

/* 渐变文字 */
background: linear-gradient(135deg, var(--holo-1), var(--holo-2), var(--holo-3));
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

各主题的签名三色：

| 主题     | 色 1      | 色 2      | 色 3      |
|----------|-----------|-----------|-----------|
| aurora   | `#00d4ff` | `#ff2d92` | `#ffb347` |
| cyber    | `#a855f7` | `#ec4899` | `#38bdf8` |
| sunset   | `#ff8a4c` | `#ff5d8f` | `#ffb347` |
| forest   | `#10b981` | `#14b8a6` | `#84cc16` |
| scholar  | `#4f46e5` | `#0ea5e9` | `#8b5cf6` |

## 交互态规范

| 状态     | 视觉变化                                          |
|----------|---------------------------------------------------|
| Default  | 玻璃底色 + 微光边框                               |
| Hover    | 底色加亮 (+0.02 alpha)，边框加亮                  |
| Active   | 全息渐变边框 / 青色强调色                          |
| Focus    | 外发光 ring (cyan 色 glow)                        |
| Disabled | 降低整体不透明度至 50%                            |

## 导航布局

### 展开侧栏 (默认)

- 宽度: 260px (`--sidebar-width-expanded`)
- 包含: Logo + 分组导航 + 底部快捷入口
- 分组标题: 12px uppercase，text-muted

### 迷你侧栏

- 宽度: 72px (`--sidebar-width`)
- 仅显示图标 + 10px 缩略文字
- Hover 时 tooltip 显示完整名称

### 横向顶栏

- 高度: 56px (`--topbar-height`)
- Logo + 下拉分组导航 + 搜索框 + 操作区

## 图标规范

- 图标库: lucide-react
- 默认尺寸: 18px (侧栏) / 16px (工具栏) / 20px (大图标)
- 描边宽度: 1.5px ~ 2px
- 颜色: 继承文字颜色 (`currentColor`)

## 动效规范

| 场景       | 时长      | 缓动函数              |
|------------|-----------|----------------------|
| 微交互     | 150ms     | ease-out             |
| 面板展开   | 200ms     | cubic-bezier(0.4,0,0.2,1) |
| 页面切换   | 250ms     | ease-in-out          |
| 弹窗进入   | 300ms     | spring (bounce)      |
| 拖拽反馈   | 0ms       | linear               |

当 `data-reduce-motion="true"` 时，所有动画时长归零。
