/**
 * 按需加载 Web 字体：仅当用户选择对应字体时才动态引入其 @font-face CSS，
 * 避免把大体积 CJK 字体打进首屏。浏览器按 unicode-range 仅下载实际用到的子集。
 */
const loaded = new Set<string>();

export function ensureFontLoaded(font: string) {
  if (loaded.has(font)) return;
  loaded.add(font);
  if (font === 'noto') {
    // 思源黑体（简体子集，按需）
    void import('@fontsource/noto-sans-sc/chinese-simplified-400.css');
    void import('@fontsource/noto-sans-sc/chinese-simplified-500.css');
    void import('@fontsource/noto-sans-sc/chinese-simplified-700.css');
  }
}
