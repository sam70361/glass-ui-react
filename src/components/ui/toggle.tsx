import * as React from 'react';
import { Toggle as RadixToggle, ToggleGroup as RadixToggleGroup } from 'radix-ui';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from 'src/lib/utils';

const toggleVariants = cva(
  'inline-flex items-center justify-center gap-1.5 rounded-[var(--radius-md)] text-sm font-medium transition-colors outline-none hover:bg-[var(--color-glass-bg)] focus-visible:ring-2 focus-visible:ring-ring/50 disabled:opacity-50 data-[state=on]:bg-[var(--color-glass-bg-active)] data-[state=on]:text-cyan [&_svg]:size-4',
  {
    variants: {
      size: { sm: 'h-8 px-2.5', default: 'h-10 px-3', lg: 'h-12 px-4' },
    },
    defaultVariants: { size: 'default' },
  }
);

export const Toggle = React.forwardRef<
  React.ElementRef<typeof RadixToggle.Root>,
  React.ComponentPropsWithoutRef<typeof RadixToggle.Root> & VariantProps<typeof toggleVariants>
>(({ className, size, ...props }, ref) => (
  <RadixToggle.Root ref={ref} className={cn(toggleVariants({ size }), className)} {...props} />
));
Toggle.displayName = 'Toggle';

export const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof RadixToggleGroup.Root>,
  React.ComponentPropsWithoutRef<typeof RadixToggleGroup.Root>
>(({ className, ...props }, ref) => (
  <RadixToggleGroup.Root
    ref={ref}
    className={cn('inline-flex items-center gap-1 rounded-[var(--radius-md)] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] p-1', className)}
    {...props}
  />
));
ToggleGroup.displayName = 'ToggleGroup';

export const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof RadixToggleGroup.Item>,
  React.ComponentPropsWithoutRef<typeof RadixToggleGroup.Item> & VariantProps<typeof toggleVariants>
>(({ className, size, ...props }, ref) => (
  <RadixToggleGroup.Item ref={ref} className={cn(toggleVariants({ size: size ?? 'sm' }), className)} {...props} />
));
ToggleGroupItem.displayName = 'ToggleGroupItem';

export { toggleVariants };

/** 分段控件：单选 ToggleGroup 的常用形态 */
export function Segmented<T extends string>({
  value,
  onValueChange,
  options,
  className,
}: {
  value: T;
  onValueChange: (v: T) => void;
  options: { value: T; label: React.ReactNode }[];
  className?: string;
}) {
  return (
    <ToggleGroup type="single" value={value} onValueChange={(v) => v && onValueChange(v as T)} className={className}>
      {options.map((o) => (
        <ToggleGroupItem key={o.value} value={o.value} size="sm">
          {o.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
