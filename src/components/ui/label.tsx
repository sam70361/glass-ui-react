import * as React from 'react';
import { Label as RadixLabel } from 'radix-ui';

import { cn } from 'src/lib/utils';

export const Label = React.forwardRef<
  React.ElementRef<typeof RadixLabel.Root>,
  React.ComponentPropsWithoutRef<typeof RadixLabel.Root>
>(({ className, ...props }, ref) => (
  <RadixLabel.Root
    ref={ref}
    className={cn(
      'text-sm font-medium text-text-secondary peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    )}
    {...props}
  />
));
Label.displayName = 'Label';
