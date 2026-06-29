import * as React from 'react';
import { Progress as RadixProgress } from 'radix-ui';

import { cn } from 'src/lib/utils';

export const Progress = React.forwardRef<
  React.ElementRef<typeof RadixProgress.Root>,
  React.ComponentPropsWithoutRef<typeof RadixProgress.Root> & { value?: number }
>(({ className, value = 0, ...props }, ref) => (
  <RadixProgress.Root
    ref={ref}
    className={cn('relative h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-track)]', className)}
    {...props}
  >
    <RadixProgress.Indicator
      className="size-full flex-1 holographic-bg transition-transform duration-500"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </RadixProgress.Root>
));
Progress.displayName = 'Progress';
