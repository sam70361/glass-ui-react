import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  themeConfig,
  type ContentGutter,
  type Contrast,
  type Density,
  type FontPreset,
  type NavLayout,
  type ThemeId,
  type ThemeMode,
} from '../theme-config';

// ----------------------------------------------------------------------

export type SettingsState = {
  theme: ThemeId;
  mode: ThemeMode;
  density: Density;
  contrast: Contrast;
  reduceMotion: boolean;
  ambient: boolean;
  locale: string;
  fontSize: number;
  fontFamily: FontPreset;
  navLayout: NavLayout;
  contentGutter: ContentGutter;
};

type SettingsActions = {
  setState: (partial: Partial<SettingsState>) => void;
  toggleMode: () => void;
  reset: () => void;
};

const SETTINGS_VERSION = 9;

const defaults: SettingsState = { ...themeConfig.defaultSettings };

/** 旧枚举边距到像素值的映射 */
const LEGACY_GUTTER_PX: Record<string, number> = { compact: 16, standard: 24, relaxed: 40, wide: 64 };

/** 旧 accent 值到 ThemeId 的映射 */
const LEGACY_ACCENT_THEME: Record<string, ThemeId> = {
  cyan: 'aurora',
  magenta: 'aurora',
  violet: 'cyber',
  amber: 'sunset',
  emerald: 'forest',
};

export const useSettingsStore = create<SettingsState & SettingsActions>()(
  persist(
    (set, get) => ({
      ...defaults,
      setState: (partial) => set(partial),
      toggleMode: () => set({ mode: get().mode === 'dark' ? 'light' : 'dark' }),
      reset: () => set(defaults),
    }),
    {
      name: themeConfig.settingsStorageKey,
      version: SETTINGS_VERSION,
      migrate: (persisted, version) => {
        if (version < SETTINGS_VERSION || !persisted) {
          const prev = (persisted as Record<string, unknown>) ?? {};
          if (typeof prev.contentGutter === 'string') {
            prev.contentGutter = LEGACY_GUTTER_PX[prev.contentGutter] ?? defaults.contentGutter;
          }
          if (prev.theme == null && typeof prev.accent === 'string') {
            prev.theme = LEGACY_ACCENT_THEME[prev.accent] ?? defaults.theme;
          }
          delete prev.accent;
          delete prev.surface;
          delete prev.direction;
          return { ...defaults, ...prev };
        }
        return persisted as SettingsState & SettingsActions;
      },
      partialize: (s) => ({
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
      }),
    }
  )
);
