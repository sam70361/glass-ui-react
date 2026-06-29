import * as React from 'react';
import { ScrollArea as RadixScrollArea } from 'radix-ui';

import { cn } from 'src/lib/utils';

export const ScrollArea = React.forwardRef<
  React.ElementRef<typeof RadixScrollArea.Root>,
  React.ComponentPropsWithoutRef<typeof RadixScrollArea.Root>
>(({ className, children, ...props }, ref) => (
  <RadixScrollArea.Root ref={ref} className={cn('relative overflow-hidden', className)} {...props}>
    <RadixScrollArea.Viewport className="size-full rounded-[inherit]">{children}</RadixScrollArea.Viewport>
    <ScrollBar />
    <RadixScrollArea.Corner />
  </RadixScrollArea.Root>
));
ScrollArea.displayName = 'ScrollArea';

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof RadixScrollArea.Scrollbar>,
  React.ComponentPropsWithoutRef<typeof RadixScrollArea.Scrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <RadixScrollArea.Scrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' && 'h-full w-2 p-0.5',
      orientation === 'horizontal' && 'h-2 flex-col p-0.5',
      className
    )}
    {...props}
  >
    <RadixScrollArea.Thumb className="relative flex-1 rounded-full bg-[var(--color-scrollbar-thumb)]" />
  </RadixScrollArea.Scrollbar>
));
ScrollBar.displayName = 'ScrollBar';

export { ScrollBar };
