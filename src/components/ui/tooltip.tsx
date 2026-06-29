import * as React from 'react';
import { Tooltip as RadixTooltip } from 'radix-ui';

import { cn } from 'src/lib/utils';

export const TooltipProvider = RadixTooltip.Provider;
export const Tooltip = RadixTooltip.Root;
export const TooltipTrigger = RadixTooltip.Trigger;

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof RadixTooltip.Content>,
  React.ComponentPropsWithoutRef<typeof RadixTooltip.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <RadixTooltip.Portal>
    <RadixTooltip.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'glass-overlay z-[var(--z-tooltip)] rounded-[var(--radius-md)] px-2.5 py-1.5 text-xs font-medium text-foreground data-[state=delayed-open]:animate-fade-in',
        className
      )}
      {...props}
    />
  </RadixTooltip.Portal>
));
TooltipContent.displayName = 'TooltipContent';

/** 便捷封装：包裹元素直接给出 tooltip */
export function SimpleTooltip({
  content,
  children,
  side = 'top',
}: {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>{content}</TooltipContent>
    </Tooltip>
  );
}
