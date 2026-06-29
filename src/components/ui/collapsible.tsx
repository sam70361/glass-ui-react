import * as React from 'react';
import { Collapsible as RadixCollapsible } from 'radix-ui';
import { ChevronDown } from 'lucide-react';

import { cn } from 'src/lib/utils';

export const Collapsible = RadixCollapsible.Root;
export const CollapsibleContent = RadixCollapsible.Content;

export const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof RadixCollapsible.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixCollapsible.Trigger>
>(({ className, children, ...props }, ref) => (
  <RadixCollapsible.Trigger
    ref={ref}
    className={cn('flex w-full items-center justify-between gap-2 text-sm font-medium [&[data-state=open]>svg]:rotate-180', className)}
    {...props}
  >
    {children}
    <ChevronDown className="size-4 shrink-0 text-text-tertiary transition-transform" />
  </RadixCollapsible.Trigger>
));
CollapsibleTrigger.displayName = 'CollapsibleTrigger';
