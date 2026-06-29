import * as React from 'react';
import { Separator as RadixSeparator } from 'radix-ui';

import { cn } from 'src/lib/utils';

export const Separator = React.forwardRef<
  React.ElementRef<typeof RadixSeparator.Root>,
  React.ComponentPropsWithoutRef<typeof RadixSeparator.Root>
>(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
  <RadixSeparator.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      'shrink-0 bg-gradient-to-r from-transparent via-[var(--color-glass-border)] to-transparent',
      orientation === 'horizontal'
        ? 'h-px w-full'
        : 'h-full w-px bg-gradient-to-b from-transparent via-[var(--color-glass-border)] to-transparent',
      className
    )}
    {...props}
  />
));
Separator.displayName = 'Separator';
