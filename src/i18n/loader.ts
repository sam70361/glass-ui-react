import zhCN from './locales/zh-CN.json';

export const DEFAULT_LOCALE = 'zh-CN' as const;

/**
 * locale JSON 懒加载：仅激活语言会在运行时被 fetch；
 * 默认语言（zh-CN）随首包进入，作为源语言与回退。
 */
const localeLoaders = import.meta.glob('./locales/*.json', { import: 'default' }) as Record<
  string,
  () => Promise<unknown>
>;

function localeFromPath(path: string): string {
  const m = path.match(/\/([A-Za-z0-9_-]+)\.json$/);
  if (!m) throw new Error(`Invalid locale file path: ${path}`);
  return m[1];
}

const loadersByLocale = Object.fromEntries(
  Object.entries(localeLoaders).map(([path, loader]) => [localeFromPath(path), loader])
);

export const supportedLocales = Object.keys(loadersByLocale).sort();

/** 语言切换器用的本地语言名 */
export const LOCALE_LABELS: Record<string, string> = {
  'zh-CN': '简体中文',
  en: 'English',
};

export const zhMessages = zhCN;

export async function loadLocaleMessages(locale: string): Promise<unknown> {
  if (locale === DEFAULT_LOCALE) return zhCN;
  const loader = loadersByLocale[locale];
  if (!loader) throw new Error(`Unsupported locale: ${locale}`);
  return loader();
}
