import { useEffect } from 'react';

import { applySettings } from './apply-settings';
import { useSettingsStore, type SettingsState } from './settings-store';

// ----------------------------------------------------------------------

/**
 * 订阅设置变化并写入 <html data-*>，实现运行时主题切换。
 * 不引入额外 Context —— 直接复用 zustand store 作为单一来源。
 */
export function SettingsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 初次挂载即应用一次（与 index.html 首屏脚本保持一致）
    applySettings(readSettings());
    const unsub = useSettingsStore.subscribe((state) => applySettings(readSettings(state)));
    return unsub;
  }, []);

  return children;
}

function readSettings(state?: SettingsState): SettingsState {
  const s = state ?? useSettingsStore.getState();
  return {
    theme: s.theme,
    mode: s.mode,
    density: s.density,
    contrast: s.contrast,
    reduceMotion: s.reduceMotion,
    ambient: s.ambient,
    locale: s.locale,
    fontSize: s.fontSize,
    fontFamily: s.fontFamily,
    navLayout: s.navLayout,
    contentGutter: s.contentGutter,
  };
}
