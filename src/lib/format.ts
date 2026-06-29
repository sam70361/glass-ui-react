import { useSettings } from 'src/theme/settings';

/** 原生 Intl 本地化日期/数字（不引 dayjs/MUI adapter，精简 i18n 的一部分） */

export function formatDate(value: string | number | Date, locale = 'zh-CN', opts?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(locale, opts ?? { month: 'short', day: 'numeric' }).format(new Date(value));
}

export function formatDateTime(value: string | number | Date, locale = 'zh-CN') {
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

/** 相对时间（如 "3 天前"） */
export function fromNow(value: string | number | Date, locale = 'zh-CN') {
  const diff = Date.now() - new Date(value).getTime();
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  const sec = Math.round(diff / 1000);
  const min = Math.round(sec / 60);
  const hr = Math.round(min / 60);
  const day = Math.round(hr / 24);
  if (Math.abs(sec) < 60) return rtf.format(-sec, 'second');
  if (Math.abs(min) < 60) return rtf.format(-min, 'minute');
  if (Math.abs(hr) < 24) return rtf.format(-hr, 'hour');
  return rtf.format(-day, 'day');
}

/** 在组件里取当前 locale 的便捷 hook */
export function useFormat() {
  const { locale } = useSettings();
  return {
    date: (v: string | number | Date, opts?: Intl.DateTimeFormatOptions) => formatDate(v, locale, opts),
    dateTime: (v: string | number | Date) => formatDateTime(v, locale),
    fromNow: (v: string | number | Date) => fromNow(v, locale),
  };
}
