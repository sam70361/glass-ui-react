import i18n from 'i18next';
import { initReactI18next, Trans, useTranslation as useReactI18nextTranslation } from 'react-i18next';

import { DEFAULT_LOCALE, loadLocaleMessages, supportedLocales, zhMessages } from './loader';

// ----------------------------------------------------------------------

void i18n.use(initReactI18next).init({
  resources: { [DEFAULT_LOCALE]: { translation: zhMessages } },
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  supportedLngs: supportedLocales,
  defaultNS: 'translation',
  interpolation: { escapeValue: false },
  returnObjects: false,
});

async function ensureLocaleLoaded(locale: string) {
  if (locale === DEFAULT_LOCALE || i18n.hasResourceBundle(locale, 'translation')) return;
  const messages = await loadLocaleMessages(locale);
  i18n.addResourceBundle(locale, 'translation', messages, true, true);
}

/** 切换语言：懒加载消息 + 持久化 + 设 <html lang> */
export async function changeLocale(locale: string): Promise<void> {
  if (!supportedLocales.includes(locale)) throw new Error(`Unsupported locale: ${locale}`);
  await ensureLocaleLoaded(locale);
  await i18n.changeLanguage(locale);
  if (typeof document !== 'undefined') document.documentElement.lang = locale;
}

/** 启动时按持久化设置激活初始语言（非阻塞，默认语言已在首包） */
export function applyInitialLocale(locale: string) {
  if (locale && locale !== DEFAULT_LOCALE) {
    void changeLocale(locale).catch((e) => console.error(`Failed to activate locale ${locale}`, e));
  }
}

export const useTranslation = useReactI18nextTranslation;
export { Trans, i18n, DEFAULT_LOCALE, supportedLocales };
export { LOCALE_LABELS } from './loader';
