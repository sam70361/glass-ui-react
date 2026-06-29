import { CONTENT_GUTTER_RANGE, themeConfig } from '../theme-config';
import { ensureFontLoaded } from '../font-loader';
import type { SettingsState } from './settings-store';

/**
 * 运行时把设置写入 <html> 的 data-* 属性。
 * tokens.css 通过属性选择器即时切换主题/强调色/密度/对比度。
 */
export function applySettings(s: SettingsState) {
  const root = document.documentElement;

  root.setAttribute('data-theme', s.theme);
  root.setAttribute('data-mode', s.mode);

  if (s.density === 'compact') root.setAttribute('data-density', 'compact');
  else root.removeAttribute('data-density');

  if (s.contrast === 'high') root.setAttribute('data-contrast', 'high');
  else root.removeAttribute('data-contrast');

  if (s.fontFamily && s.fontFamily !== 'sans') root.setAttribute('data-font', s.fontFamily);
  else root.removeAttribute('data-font');
  ensureFontLoaded(s.fontFamily);

  root.setAttribute('data-reduce-motion', String(s.reduceMotion));
  root.setAttribute('data-ambient', s.ambient ? 'on' : 'off');
  root.setAttribute('lang', s.locale);

  // 字号：缩放根 rem（等比缩放整体界面）
  if (s.fontSize && s.fontSize !== themeConfig.defaultSettings.fontSize) root.style.fontSize = `${s.fontSize}px`;
  else root.style.removeProperty('font-size');

  // 内容边距：像素值 → CSS 变量（横/竖布局通用，左右对称，决定所有页面的左右留白）
  const [min, max] = CONTENT_GUTTER_RANGE;
  const px = Math.min(max, Math.max(min, Number(s.contentGutter) || 0));
  root.style.setProperty('--content-gutter', `${px}px`);
}
