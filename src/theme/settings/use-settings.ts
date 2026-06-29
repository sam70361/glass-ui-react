import { useSettingsStore } from './settings-store';

/**
 * 便捷 hook：读取设置 state 与操作方法。
 */
export function useSettings() {
  return useSettingsStore();
}
