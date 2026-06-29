import * as React from 'react';
import { Popover as RadixPopover } from 'radix-ui';

import { cn } from 'src/lib/utils';

export const Popover = RadixPopover.Root;
export const PopoverTrigger = RadixPopover.Trigger;
export const PopoverAnchor = RadixPopover.Anchor;

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof RadixPopover.Content>,
  React.ComponentPropsWithoutRef<typeof RadixPopover.Content>
>(({ className, align = 'center', sideOffset = 8, ...props }, ref) => (
  <RadixPopover.Portal>
    <RadixPopover.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'glass-overlay z-[var(--z-overlay)] w-72 rounded-[var(--radius-lg)] p-4 outline-none data-[state=open]:animate-fade-up',
        className
      )}
      {...props}
    />
  </RadixPopover.Portal>
));
PopoverContent.displayName = 'PopoverContent';
