/**
 * 设计令牌配置。
 *
 * 主题 = 顶层设计语言（画布/表面/成套强调/圆角性格），各自提供深/浅两套；
 * 明暗(mode) 是主题下的子开关。语义映射在 tokens.css 完成，运行时切换在 settings 完成。
 */

export const themeConfig = {
  classesPrefix: 'glass',

  /** localStorage 持久化键 */
  settingsStorageKey: 'glass-ui-settings',

  /** 默认外观 */
  defaultSettings: {
    theme: 'aurora' as ThemeId,
    mode: 'dark' as ThemeMode,
    density: 'standard' as Density,
    contrast: 'default' as Contrast,
    reduceMotion: false,
    ambient: true,
    locale: 'zh-CN',
    fontSize: 16,
    fontFamily: 'sans' as FontPreset,
    navLayout: 'expanded' as NavLayout,
    contentGutter: 24,
  },
} as const;

export type ThemeMode = 'dark' | 'light';
export type Density = 'standard' | 'compact';
export type Contrast = 'default' | 'high';
export type NavLayout = 'expanded' | 'mini' | 'horizontal';

/**
 * 字体方案：Manrope（默认）/ 跟随系统 / 思源黑体（Noto Sans SC，按需加载真字体）
 * / MiSans / 阿里巴巴普惠体（后两者为本地字体栈，已安装则生效，否则回退系统中文字体）
 */
export type FontPreset = 'sans' | 'system' | 'noto' | 'misans' | 'puhui';
export const FONT_PRESETS: { value: FontPreset; label: string }[] = [
  { value: 'sans', label: 'Manrope' },
  { value: 'system', label: '跟随系统' },
  { value: 'noto', label: '思源黑体' },
  { value: 'misans', label: 'MiSans' },
  { value: 'puhui', label: '阿里普惠' },
];
/** 内容区左右留白（像素，连续可调，刻度尺控制） */
export type ContentGutter = number;

/** 表面风格：玻璃 / 扁平（真去玻璃）/ 描边（真去玻璃）—— 局部能力（场景/设计指南），非全局设置 */
export type Surface = 'glass' | 'flat' | 'outline';
export const SURFACE_PRESETS: { value: Surface; label: string }[] = [
  { value: 'glass', label: '玻璃' },
  { value: 'flat', label: '扁平' },
  { value: 'outline', label: '描边' },
];

/** 主题 id（设计语言）。每个主题在 tokens.css 有 data-theme=<id> + data-mode=dark|light 两套令牌。 */
export type ThemeId = 'aurora' | 'cyber' | 'sunset' | 'forest' | 'scholar';

/**
 * 主题注册表。`preview` 显式存放各主题深/浅的画布底色与签名渐变三色，
 * 供设置抽屉主题卡用 inline 样式渲染缩略图（不能用 live var(--color-*)，那只反映当前激活主题）。
 */
export interface ThemeDef {
  id: ThemeId;
  label: string;
  /** 一句话设计语言描述 */
  blurb: string;
  preview: {
    dark: { bg: string; gradient: [string, string, string] };
    light: { bg: string; gradient: [string, string, string] };
  };
}

export const THEMES: ThemeDef[] = [
  {
    id: 'aurora',
    label: '极光全息',
    blurb: '冷·玻璃·全息',
    preview: {
      dark: { bg: '#0a0a0f', gradient: ['#00d4ff', '#ff2d92', '#ffb347'] },
      light: { bg: '#eef1f6', gradient: ['#00d4ff', '#ff2d92', '#ffb347'] },
    },
  },
  {
    id: 'cyber',
    label: '赛博霓虹',
    blurb: '霓虹·OLED·强发光',
    preview: {
      dark: { bg: '#000000', gradient: ['#a855f7', '#ec4899', '#38bdf8'] },
      light: { bg: '#f4f4f7', gradient: ['#a855f7', '#ec4899', '#38bdf8'] },
    },
  },
  {
    id: 'sunset',
    label: '暖阳极简',
    blurb: '暖·扁平·柔影',
    preview: {
      dark: { bg: '#1a1714', gradient: ['#ff8a4c', '#ff5d8f', '#ffb347'] },
      light: { bg: '#faf6f0', gradient: ['#ff8a4c', '#ff5d8f', '#ffb347'] },
    },
  },
  {
    id: 'forest',
    label: '森林自然',
    blurb: '绿·柔和·有机',
    preview: {
      dark: { bg: '#0b1410', gradient: ['#10b981', '#14b8a6', '#84cc16'] },
      light: { bg: '#eef3ee', gradient: ['#10b981', '#14b8a6', '#84cc16'] },
    },
  },
  {
    id: 'scholar',
    label: '学术专业',
    blurb: '靛蓝·结构·描边',
    preview: {
      dark: { bg: '#0f172a', gradient: ['#4f46e5', '#0ea5e9', '#8b5cf6'] },
      light: { bg: '#f1f5f9', gradient: ['#4f46e5', '#0ea5e9', '#8b5cf6'] },
    },
  },
];

/** 字号可调范围（影响根 rem，等比缩放界面） */
export const FONT_SIZE_RANGE: [number, number] = [13, 18];

/** 内容边距可调范围（像素）+ 步进 + 刻度间隔 */
export const CONTENT_GUTTER_RANGE: [number, number] = [0, 240];
export const CONTENT_GUTTER_STEP = 4;
/** 刻度尺：每多少像素画一根小刻度 / 大刻度（带数字） */
export const CONTENT_GUTTER_TICK = 8;
export const CONTENT_GUTTER_MAJOR = 40;
