const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';

const isMac = /Mac|iPod|iPhone|iPad/.test(ua);

/** 平台修饰键符号：macOS → ⌘，Windows/Linux → Ctrl */
export const MOD_KEY = isMac ? '⌘' : 'Ctrl';
