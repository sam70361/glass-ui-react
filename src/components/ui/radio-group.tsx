import * as React from 'react';
import { RadioGroup as RadixRadioGroup } from 'radix-ui';
import { Circle } from 'lucide-react';

import { cn } from 'src/lib/utils';

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadixRadioGroup.Root>,
  React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>
>(({ className, ...props }, ref) => (
  <RadixRadioGroup.Root ref={ref} className={cn('grid gap-2.5', className)} {...props} />
));
RadioGroup.displayName = 'RadioGroup';

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadixRadioGroup.Item>,
  React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Item>
>(({ className, ...props }, ref) => (
  <RadixRadioGroup.Item
    ref={ref}
    className={cn(
      'aspect-square size-5 rounded-full border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] text-cyan transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=checked]:border-cyan',
      className
    )}
    {...props}
  >
    <RadixRadioGroup.Indicator className="flex items-center justify-center">
      <Circle className="size-2.5 fill-cyan text-cyan" />
    </RadixRadioGroup.Indicator>
  </RadixRadioGroup.Item>
));
RadioGroupItem.displayName = 'RadioGroupItem';
