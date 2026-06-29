import * as React from 'react';
import { Slot } from 'radix-ui';
import { Loader2 } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from 'src/lib/utils';
import { softColor } from 'src/theme/mixins';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // 默认玻璃按钮
        default:
          'bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] backdrop-blur-[var(--blur-md)] text-foreground hover:bg-[var(--color-glass-bg-hover)] hover:border-[var(--color-glass-border-hover)] hover:-translate-y-0.5',
        // 全息主按钮
        primary:
          'holographic-bg text-[var(--color-holo-foreground)] font-semibold shadow-[0_4px_20px_rgba(var(--color-accent-cyan-rgb),0.3)] hover:shadow-[0_8px_30px_rgba(var(--color-accent-cyan-rgb),0.45)] hover:-translate-y-0.5',
        // 软强调（复用 mixins.softColor，跟随主题强调色）
        secondary: `border ${softColor('cyan')} hover:bg-[rgba(var(--color-accent-cyan-rgb),0.2)]`,
        outline:
          'border border-[var(--color-glass-border)] bg-transparent text-foreground hover:bg-[var(--color-glass-bg)]',
        ghost: 'bg-transparent text-foreground hover:bg-[var(--color-glass-bg)]',
        danger: `border ${softColor('danger')} hover:bg-[rgba(var(--color-danger-rgb),0.22)]`,
        link: 'text-cyan underline-offset-4 hover:underline bg-transparent',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        default: 'h-10 px-4',
        lg: 'h-12 px-6 text-base',
        icon: 'size-10 rounded-[var(--radius-md)] p-0',
        'icon-sm': 'size-8 rounded-[var(--radius-md)] p-0',
      },
      /** 形状覆盖（可选，不传则沿用默认胶囊 / 图标方角） */
      shape: {
        pill: 'rounded-full',
        rounded: 'rounded-[var(--radius-md)]',
        circle: 'rounded-full',
        square: 'rounded-[var(--radius-md)]',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** 加载态：显示 spinner 并禁用 */
  loading?: boolean;
  /** 块级：占满整行 */
  block?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, loading = false, block = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, shape }), block && 'w-full', className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && !asChild && <Loader2 className="size-4 animate-spin" />}
        {children}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { buttonVariants };
