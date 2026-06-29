/**
 * 数据调色板（数据层颜色的唯一来源）。
 *
 * 为什么是 hex 而非 var(--palette-*)：图表(recharts) 与部分 SVG 通过"呈现属性"
 * (fill/stroke/stopColor) 着色，而 CSS 自定义属性 var() 不能在 SVG 呈现属性中解析，
 * 因此数据色必须是具体色值。这些值与 tokens.css 第1层 --palette-* 一一对应（同源镜像）。
 *
 * 语义：这里管理的是"数据身份色"（项目/分类/系列/状态点），属分类标识，
 * 不随主题(data-theme)或明暗主题切换——切换的是 UI chrome，而非数据身份。
 *
 * UI chrome 的强调/状态色请用 tokens.css 的 CSS 变量与 Tailwind 工具类，勿用此处。
 */

/** 品牌原色（镜像 tokens.css --palette-*） */
export const DATA_PALETTE = {
  cyan: '#00d4ff',
  magenta: '#ff2d92',
  amber: '#ffb347',
  emerald: '#00ff94',
  violet: '#a855f7',
  blue: '#5b8cff',
  neutral: '#6b7280',
  red: '#ff4757',
} as const;

export type DataColor = keyof typeof DATA_PALETTE;

/** 分类/系列调色板（图表多系列着色，取代散落的裸色数组与 CHART_COLORS） */
export const CATEGORICAL: string[] = [
  DATA_PALETTE.cyan,
  DATA_PALETTE.magenta,
  DATA_PALETTE.amber,
  DATA_PALETTE.emerald,
  DATA_PALETTE.violet,
  DATA_PALETTE.blue,
];
