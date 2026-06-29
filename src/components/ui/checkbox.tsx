import * as React from 'react';
import { Checkbox as RadixCheckbox } from 'radix-ui';
import { Check } from 'lucide-react';

import { cn } from 'src/lib/utils';

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof RadixCheckbox.Root>,
  React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root>
>(({ className, ...props }, ref) => (
  <RadixCheckbox.Root
    ref={ref}
    className={cn(
      'peer size-5 shrink-0 rounded-[var(--radius-sm)] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=checked]:holographic-bg data-[state=checked]:border-transparent data-[state=checked]:text-[var(--color-holo-foreground)]',
      className
    )}
    {...props}
  >
    <RadixCheckbox.Indicator className="flex items-center justify-center">
      <Check className="size-3.5 stroke-[3]" />
    </RadixCheckbox.Indicator>
  </RadixCheckbox.Root>
));
Checkbox.displayName = 'Checkbox';
