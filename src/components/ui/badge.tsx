import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from 'src/lib/utils';
import { softColor } from 'src/theme/mixins';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium [&_svg]:size-3',
  {
    variants: {
      variant: {
        default: 'border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] text-text-secondary',
        cyan: softColor('cyan'),
        magenta: softColor('magenta'),
        amber: softColor('amber'),
        success: softColor('success'),
        warning: softColor('warning'),
        danger: softColor('danger'),
        solid: 'holographic-bg border-transparent text-[var(--color-holo-foreground)] font-semibold',
      },
      appearance: {
        soft: '',
        outline: 'bg-transparent',
      },
    },
    defaultVariants: { variant: 'default', appearance: 'soft' },
  }
);

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, appearance, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, appearance }), className)} {...props} />;
}

export { badgeVariants };
