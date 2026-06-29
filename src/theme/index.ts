export { themeConfig, THEMES, SURFACE_PRESETS, FONT_PRESETS } from './theme-config';
export type { ThemeMode, ThemeId, ThemeDef, Density, Contrast, Surface, FontPreset } from './theme-config';
export { DATA_PALETTE, CATEGORICAL, type DataColor } from './palette';
export * from './mixins';
export {
  SettingsProvider,
  useSettings,
  useSettingsStore,
  applySettings,
  type SettingsState,
} from './settings';
