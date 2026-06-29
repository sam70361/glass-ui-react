import * as React from 'react';
import { Select as RadixSelect } from 'radix-ui';
import { Check, ChevronDown } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from 'src/lib/utils';
import { fieldVariants, fieldSizes, fieldStatus, fieldFocus, type FieldStatus } from 'src/theme/mixins';

export const Select = RadixSelect.Root;
export const SelectGroup = RadixSelect.Group;
export const SelectValue = RadixSelect.Value;

const selectTriggerVariants = cva(
  `flex w-full items-center justify-between gap-2 transition-colors data-[placeholder]:text-text-muted disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:size-4 ${fieldFocus}`,
  {
    variants: { variant: fieldVariants, triggerSize: fieldSizes },
    defaultVariants: { variant: 'glass', triggerSize: 'md' },
  }
);

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Trigger> &
    VariantProps<typeof selectTriggerVariants> & { status?: FieldStatus }
>(({ className, children, variant, triggerSize, status, ...props }, ref) => (
  <RadixSelect.Trigger
    ref={ref}
    className={cn(selectTriggerVariants({ variant, triggerSize }), status && fieldStatus[status], className)}
    {...props}
  >
    {children}
    <RadixSelect.Icon asChild>
      <ChevronDown className="opacity-60" />
    </RadixSelect.Icon>
  </RadixSelect.Trigger>
));
SelectTrigger.displayName = 'SelectTrigger';

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Content>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <RadixSelect.Portal>
    <RadixSelect.Content
      ref={ref}
      position={position}
      className={cn(
        'glass-overlay z-[var(--z-elevated)] max-h-72 min-w-[8rem] overflow-hidden rounded-[var(--radius-md)] p-1.5 data-[state=open]:animate-fade-in',
        position === 'popper' && 'data-[side=bottom]:translate-y-1',
        className
      )}
      {...props}
    >
      <RadixSelect.Viewport className="p-0">{children}</RadixSelect.Viewport>
    </RadixSelect.Content>
  </RadixSelect.Portal>
));
SelectContent.displayName = 'SelectContent';

export const SelectLabel = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Label>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Label>
>(({ className, ...props }, ref) => (
  <RadixSelect.Label ref={ref} className={cn('px-2 py-1.5 text-xs font-semibold text-text-tertiary', className)} {...props} />
));
SelectLabel.displayName = 'SelectLabel';

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Item>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Item>
>(({ className, children, ...props }, ref) => (
  <RadixSelect.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-pointer select-none items-center rounded-[var(--radius-sm)] py-2 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-[var(--color-glass-bg-active)] focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex size-4 items-center justify-center">
      <RadixSelect.ItemIndicator>
        <Check className="size-4" />
      </RadixSelect.ItemIndicator>
    </span>
    <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
  </RadixSelect.Item>
));
SelectItem.displayName = 'SelectItem';

export const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Separator>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Separator>
>(({ className, ...props }, ref) => (
  <RadixSelect.Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-[var(--color-glass-border)]', className)} {...props} />
));
SelectSeparator.displayName = 'SelectSeparator';

export { selectTriggerVariants };
