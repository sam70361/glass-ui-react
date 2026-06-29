/**
 * 样式配方层。
 *
 * 这里集中“跨组件复用的 Tailwind 类配方”，避免在每个组件里重复书写玻璃/发光/软色等样式。
 * 组件层（components/ui）统一调用这些配方派生 variant，保证同源、风格一致。
 */

/** 全息语义色，可用于 badge / button / tag 的 soft 与 solid 变体 */
export type HoloColor = 'cyan' | 'magenta' | 'amber' | 'success' | 'warning' | 'danger';

/**
 * 软色配方：半透明底 + 同色边 + 同色字。
 * 返回 Tailwind 任意值类组合。
 */
export function softColor(color: HoloColor): string {
  const map: Record<HoloColor, string> = {
    cyan: 'bg-[rgba(var(--color-accent-cyan-rgb),0.12)] text-cyan border-[rgba(var(--color-accent-cyan-rgb),0.25)]',
    magenta:
      'bg-[rgba(var(--color-accent-magenta-rgb),0.12)] text-magenta border-[rgba(var(--color-accent-magenta-rgb),0.25)]',
    amber:
      'bg-[rgba(var(--color-accent-amber-rgb),0.12)] text-amber border-[rgba(var(--color-accent-amber-rgb),0.25)]',
    success: 'bg-[rgba(var(--color-success-rgb),0.12)] text-success border-[rgba(var(--color-success-rgb),0.25)]',
    warning: 'bg-[rgba(var(--color-warning-rgb),0.12)] text-warning border-[rgba(var(--color-warning-rgb),0.25)]',
    danger: 'bg-[rgba(var(--color-danger-rgb),0.12)] text-danger border-[rgba(var(--color-danger-rgb),0.25)]',
  };
  return map[color];
}

/** 实色配方（solid filled），多用于强调按钮/标记 */
export function filledColor(color: HoloColor): string {
  const map: Record<HoloColor, string> = {
    cyan: 'bg-cyan text-[var(--color-holo-foreground)]',
    magenta: 'bg-magenta text-white',
    amber: 'bg-amber text-[var(--color-holo-foreground)]',
    success: 'bg-success text-[var(--color-holo-foreground)]',
    warning: 'bg-warning text-[var(--color-holo-foreground)]',
    danger: 'bg-danger text-white',
  };
  return map[color];
}

/** 自定义滚动条容器 */
export const scrollArea = 'overflow-auto [scrollbar-width:thin]';

// ---------------------------------------------------------------------------
// 统一变体配方（令牌驱动）：供 Card/Input/Select 等核心组件复用，保证多形态一致。
// flat/outline 换肤时通过覆盖 --blur-* / --color-surface-* 即可整体去玻璃。
// ---------------------------------------------------------------------------

/** 表面形态：卡片/面板等容器的多种形态 */
export type SurfaceVariant = 'glass' | 'solid' | 'outline' | 'soft' | 'ghost' | 'elevated';
export const surfaceVariants: Record<SurfaceVariant, string> = {
  glass: 'glass-card',
  solid: 'rounded-[var(--radius-lg)] border border-[var(--color-glass-border)] bg-[var(--color-surface-solid)]',
  outline: 'rounded-[var(--radius-lg)] border border-[var(--color-glass-border)] bg-transparent',
  soft: 'rounded-[var(--radius-lg)] border border-transparent bg-[var(--color-glass-bg)]',
  ghost: 'rounded-[var(--radius-lg)] border border-transparent bg-transparent',
  elevated: 'rounded-[var(--radius-lg)] border border-[var(--color-glass-border)] bg-[var(--color-surface-solid)] shadow-[var(--shadow-card)]',
};

/** 表面语义色（以内描边 ring 形式叠加，避免与 border 冲突） */
export type SurfaceTone = 'default' | 'accent' | 'success' | 'warning' | 'danger';
export const surfaceTones: Record<SurfaceTone, string> = {
  default: '',
  accent: 'ring-1 ring-inset ring-[rgba(var(--color-accent-cyan-rgb),0.35)]',
  success: 'ring-1 ring-inset ring-[rgba(var(--color-success-rgb),0.35)]',
  warning: 'ring-1 ring-inset ring-[rgba(var(--color-warning-rgb),0.35)]',
  danger: 'ring-1 ring-inset ring-[rgba(var(--color-danger-rgb),0.35)]',
};

/** 表单字段形态：blur 走 --blur-sm，换肤可整体去玻璃 */
export type FieldVariant = 'glass' | 'outline' | 'filled' | 'underline';
export const fieldVariants: Record<FieldVariant, string> = {
  glass: 'rounded-[var(--radius-md)] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] backdrop-blur-[var(--blur-sm)]',
  outline: 'rounded-[var(--radius-md)] border border-[var(--color-glass-border)] bg-transparent',
  filled: 'rounded-[var(--radius-md)] border border-transparent bg-[var(--color-glass-bg-active)]',
  underline: 'rounded-none border-0 border-b border-[var(--color-glass-border)] bg-transparent',
};

/** 统一表单聚焦态（focus-visible + 强调色描边 + 柔光环），全表单家族共用 */
export const fieldFocus =
  'focus-visible:outline-none focus-visible:border-[rgba(var(--color-accent-cyan-rgb),0.5)] focus-visible:ring-2 focus-visible:ring-[rgba(var(--color-accent-cyan-rgb),0.15)]';

/** 复合容器聚焦态：焦点在子元素时由父容器显示 ring（用于带前后缀的 Input 等） */
export const fieldFocusWithin =
  'focus-within:outline-none focus-within:border-[rgba(var(--color-accent-cyan-rgb),0.5)] focus-within:ring-2 focus-within:ring-[rgba(var(--color-accent-cyan-rgb),0.15)]';

export type FieldSize = 'sm' | 'md' | 'lg';
export const fieldSizes: Record<FieldSize, string> = {
  sm: 'h-8 px-2.5 text-xs',
  md: 'h-10 px-3.5 text-sm',
  lg: 'h-12 px-4 text-base',
};

/** 表单字段校验态（边框 + 聚焦环色），全表单家族共用，保证一致 */
export type FieldStatus = 'error' | 'success';
export const fieldStatus: Record<FieldStatus, string> = {
  error: 'border-danger focus-visible:border-danger focus-visible:ring-[rgba(var(--color-danger-rgb),0.18)] data-[state=open]:border-danger',
  success: 'border-success focus-visible:border-success focus-visible:ring-[rgba(var(--color-success-rgb),0.18)] data-[state=open]:border-success',
};
