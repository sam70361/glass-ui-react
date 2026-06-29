import * as React from 'react';
import { Switch as RadixSwitch } from 'radix-ui';

import { cn } from 'src/lib/utils';

export const Switch = React.forwardRef<
  React.ElementRef<typeof RadixSwitch.Root>,
  React.ComponentPropsWithoutRef<typeof RadixSwitch.Root>
>(({ className, ...props }, ref) => (
  <RadixSwitch.Root
    ref={ref}
    className={cn(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-transparent p-0.5 transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50',
      'bg-[var(--color-track)] data-[state=checked]:bg-cyan data-[state=checked]:border-[rgba(var(--color-accent-cyan-rgb),0.5)]',
      className
    )}
    {...props}
  >
    <RadixSwitch.Thumb className="pointer-events-none block size-5 rounded-full bg-[var(--color-control-thumb)] shadow-[var(--shadow-z1)] ring-1 ring-[var(--color-glass-border)] transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" />
  </RadixSwitch.Root>
));
Switch.displayName = 'Switch';
