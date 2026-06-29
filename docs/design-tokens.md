# 设计令牌与主题系统

## 设计理念

Glass UI React 遵循 **暗夜毛玻璃 (Dark Glassmorphism)** 设计语言：

- 在深色画布上呈现半透明磨砂玻璃表面
- 全息渐变作为强调色和主操作标识
- 微妙的环境光效增强空间感

### 核心原则

1. **透明营造层次** — 多层玻璃表面通过透明度建立空间层级，而非硬边框
2. **色彩即信号** — 全息渐变标记主操作；语义色传达状态
3. **有意义的动效** — Framer Motion 动画引导注意力，尊重无障碍设置
4. **Token 驱动一致性** — 每个视觉决策都映射到 CSS 变量

## 色彩体系

### 基础调色板

这些是主题无关的原始色值，作为所有主题的色彩来源：

| 名称      | 变量               | 色值       | 用途                  |
|-----------|--------------------|------------|----------------------|
| Cyan      | `--palette-cyan`   | `#00d4ff`  | 主强调色、链接、激活态  |
| Magenta   | `--palette-magenta`| `#ff2d92`  | 次强调色、渐变辅色     |
| Amber     | `--palette-amber`  | `#ffb347`  | 暖色点缀、渐变收尾     |
| Emerald   | `--palette-emerald`| `#00ff94`  | 成功、完成状态         |
| Violet    | `--palette-violet` | `#a855f7`  | 特殊标记、cyber 主题   |
| Blue      | `--palette-blue`   | `#5b8cff`  | 信息链接、图表辅色     |
| Red       | `--palette-red`    | `#ff4757`  | 危险、删除、错误       |
| Neutral   | `--palette-neutral`| `#6b7280`  | 中性灰、辅助信息       |

每个色值同时提供 RGB 版本（如 `--palette-cyan-rgb: 0, 212, 255`），用于 `rgba()` 合成透明色。

### 语义色

语义色映射到具体功能含义，与主题无关：

| 语义       | 变量               | 映射色       | 用途              |
|------------|--------------------|--------------|----|
| Success    | `--color-success`  | Emerald      | 成功提示、完成标记 |
| Warning    | `--color-warning`  | Amber        | 警告、注意事项     |
| Danger     | `--color-danger`   | Red          | 错误、删除确认     |
| Info       | `--color-info`     | Cyan         | 信息提示           |

### 强调色系

用于主要操作按钮和激活态：

| 变量                         | 色值       | 用途                |
|------------------------------|------------|---------------------|
| `--color-accent-cyan`        | `#00d4ff`  | 主要按钮、激活态     |
| `--color-accent-magenta`     | `#ff2d92`  | 次要强调、渐变组合   |
| `--color-accent-amber`       | `#ffb347`  | 点缀色、渐变收尾     |

## Token 体系

所有视觉变量定义在 `src/theme/tokens.css`。主题切换通过 React 运行时动态设置根元素的 `data-*` 属性实现（React 应用渲染在 HTML 文档中，通过 CSS 属性选择器响应主题变更）。

### Token 层级

```
Layer 1: 原始色板 (主题无关)
  --palette-cyan, --palette-magenta, --palette-amber ...
  --palette-*-rgb (用于 rgba 合成)

Layer 2: 语义表面 (主题 × 明暗 联动)
  --color-bg-primary / secondary / tertiary
  --color-glass-bg, --color-glass-border
  --color-surface-card, --color-surface-nav
  --color-text-primary / secondary / tertiary / muted

Layer 3: 功能 Token
  --gradient-holographic, --color-holo-foreground
  --color-success / warning / danger / info
  --shadow-glass, --shadow-card, --shadow-dialog
  --blur-sm / md / lg / xl
  --radius, --radius-sm / md / lg / xl / 2xl
```

### 关键 CSS 变量速查

| 变量                          | 用途                        |
|-------------------------------|-----------------------------|
| `--color-glass-bg`            | 玻璃表面底色 (带透明度)      |
| `--color-glass-border`        | 玻璃边框 (微光分割线)        |
| `--color-glass-bg-hover`      | 交互态悬浮底色              |
| `--gradient-holographic`      | 三色全息渐变 (主操作)        |
| `--color-accent-cyan-rgb`     | 主强调色 RGB 值              |
| `--shadow-glow-cyan`          | 青色辉光投影                |
| `--blur-md`                   | 中等模糊值 (12px)           |

## 主题系统

5 个内置主题，各含深色/浅色两套 (共 10 套配色方案)：

| ID        | 名称       | 性格                | 签名渐变                   |
|-----------|------------|---------------------|----------------------------|
| `aurora`  | 极光全息   | 冷调·玻璃·全息      | cyan → magenta → amber     |
| `cyber`   | 赛博霓虹   | 霓虹·OLED·强发光    | purple → pink → sky        |
| `sunset`  | 暖阳极简   | 暖调·扁平·柔影      | orange → pink → amber      |
| `forest`  | 森林自然   | 绿意·柔和·有机      | emerald → teal → lime      |
| `scholar` | 学术专业   | 靛蓝·结构·描边      | indigo → sky → violet      |

### 运行时切换机制

React 运行时通过 `src/theme/settings/apply-settings.ts` 动态设置根元素属性，CSS 属性选择器据此切换对应变量集：

```html
<!-- React 在根 <html> 元素上设置 data-* 属性 -->
<html
  data-theme="aurora"
  data-mode="dark"
  data-density="standard"
  data-contrast="default"
  data-font="sans"
  data-reduce-motion="false"
  data-ambient="on"
>
```

CSS 选择器示例：

```css
[data-theme="aurora"][data-mode="dark"] {
  --color-bg-primary: #0a0a0f;
  --gradient-holographic: linear-gradient(135deg, #00d4ff, #ff2d92, #ffb347);
}
```

### 新增主题步骤

1. 在 `src/theme/tokens.css` 中添加 `[data-theme="xxx"][data-mode="dark|light"]` 规则集
2. 在 `src/theme/theme-config.ts` 的 `THEMES` 数组中注册
3. 在 `src/i18n/locales/` 的 `settings.themes.xxx` 添加翻译
4. 完成，无需其他修改

## 字体方案

| 预设 ID    | 字体栈                            | 说明             |
|------------|-----------------------------------|------------------|
| `sans`     | Manrope + system fallback         | 默认 (几何无衬线) |
| `system`   | system-ui                         | 跟随操作系统      |
| `noto`     | Noto Sans SC                      | 思源黑体          |
| `misans`   | MiSans                            | 小米字体          |
| `puhui`    | Alibaba PuHuiTi                   | 阿里普惠体        |

## 圆角规范

| Token            | 值    | 用途                   |
|------------------|-------|------------------------|
| `--radius-sm`    | 4px   | 小按钮、徽标            |
| `--radius-md`    | 8px   | 卡片、输入框            |
| `--radius-lg`    | 12px  | 对话框、抽屉            |
| `--radius-xl`    | 16px  | 面板                   |
| `--radius-2xl`   | 24px  | 大型浮层               |

## 投影层级

| Token             | 效果                          |
|-------------------|-------------------------------|
| `--shadow-z1`     | 轻微浮起 (卡片)               |
| `--shadow-z2`     | 中层浮起 (下拉菜单)           |
| `--shadow-z3`     | 高层浮起 (对话框)             |
| `--shadow-glass`  | 玻璃表面专用投影              |
| `--shadow-glow-*` | 辉光投影 (cyan/magenta/amber) |
