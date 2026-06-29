import * as React from 'react';
import { Avatar as RadixAvatar } from 'radix-ui';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from 'src/lib/utils';

const avatarVariants = cva('relative flex shrink-0 overflow-hidden rounded-full border bg-[var(--color-glass-bg)]', {
  variants: {
    size: {
      sm: 'size-7 border',
      md: 'size-9 border-2',
      lg: 'size-12 border-2',
      xl: 'size-16 border-2',
    },
  },
  defaultVariants: { size: 'md' },
});

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof RadixAvatar.Root>,
    VariantProps<typeof avatarVariants> {}

export const Avatar = React.forwardRef<React.ElementRef<typeof RadixAvatar.Root>, AvatarProps>(
  ({ className, size, ...props }, ref) => (
    <RadixAvatar.Root ref={ref} className={cn(avatarVariants({ size }), className)} {...props} />
  )
);
Avatar.displayName = 'Avatar';

export const AvatarImage = React.forwardRef<
  React.ElementRef<typeof RadixAvatar.Image>,
  React.ComponentPropsWithoutRef<typeof RadixAvatar.Image>
>(({ className, ...props }, ref) => (
  <RadixAvatar.Image ref={ref} className={cn('aspect-square size-full object-cover', className)} {...props} />
));
AvatarImage.displayName = 'AvatarImage';

export const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof RadixAvatar.Fallback>,
  React.ComponentPropsWithoutRef<typeof RadixAvatar.Fallback>
>(({ className, ...props }, ref) => (
  <RadixAvatar.Fallback
    ref={ref}
    className={cn(
      'flex size-full items-center justify-center bg-[var(--color-glass-bg-active)] text-xs font-semibold text-text-secondary',
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = 'AvatarFallback';

/** 头像组：重叠展示，多余以 +N 计数 */
export function AvatarGroup({
  children,
  max = 4,
  className,
}: {
  children: React.ReactNode;
  max?: number;
  className?: string;
}) {
  const items = React.Children.toArray(children);
  const shown = items.slice(0, max);
  const rest = items.length - shown.length;
  return (
    <div className={cn('flex items-center -space-x-2', className)}>
      {shown.map((child, i) => (
        <div key={i} className="ring-2 ring-[var(--color-bg-primary)] rounded-full">
          {child}
        </div>
      ))}
      {rest > 0 && (
        <div className="flex size-9 items-center justify-center rounded-full border-2 bg-[var(--color-glass-bg-active)] text-xs font-semibold ring-2 ring-[var(--color-bg-primary)]">
          +{rest}
        </div>
      )}
    </div>
  );
}

export { avatarVariants };
