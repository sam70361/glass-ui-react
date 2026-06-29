import * as React from 'react';
import { HoverCard as RadixHoverCard } from 'radix-ui';

import { cn } from 'src/lib/utils';

export const HoverCard = RadixHoverCard.Root;
export const HoverCardTrigger = RadixHoverCard.Trigger;

export const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof RadixHoverCard.Content>,
  React.ComponentPropsWithoutRef<typeof RadixHoverCard.Content>
>(({ className, align = 'center', sideOffset = 8, ...props }, ref) => (
  <RadixHoverCard.Portal>
    <RadixHoverCard.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn('glass-overlay z-[var(--z-overlay)] w-64 rounded-[var(--radius-lg)] p-4 outline-none data-[state=open]:animate-fade-up', className)}
      {...props}
    />
  </RadixHoverCard.Portal>
));
HoverCardContent.displayName = 'HoverCardContent';
