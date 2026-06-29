import * as React from 'react';
import { ContextMenu as RCM } from 'radix-ui';

import { cn } from 'src/lib/utils';

export const ContextMenu = RCM.Root;
export const ContextMenuTrigger = RCM.Trigger;

export const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof RCM.Content>,
  React.ComponentPropsWithoutRef<typeof RCM.Content>
>(({ className, ...props }, ref) => (
  <RCM.Portal>
    <RCM.Content
      ref={ref}
      className={cn(
        'glass-overlay z-[var(--z-elevated)] min-w-[10rem] overflow-hidden rounded-[var(--radius-md)] p-1.5 data-[state=open]:animate-fade-in',
        className
      )}
      {...props}
    />
  </RCM.Portal>
));
ContextMenuContent.displayName = 'ContextMenuContent';

export const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof RCM.Item>,
  React.ComponentPropsWithoutRef<typeof RCM.Item> & { destructive?: boolean }
>(({ className, destructive, ...props }, ref) => (
  <RCM.Item
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center gap-2 rounded-[var(--radius-sm)] px-2.5 py-2 text-sm outline-none transition-colors focus:bg-[var(--color-glass-bg-active)] focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-4',
      destructive && 'text-danger focus:bg-[rgba(var(--color-danger-rgb),0.12)]',
      className
    )}
    {...props}
  />
));
ContextMenuItem.displayName = 'ContextMenuItem';

export const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof RCM.Separator>,
  React.ComponentPropsWithoutRef<typeof RCM.Separator>
>(({ className, ...props }, ref) => (
  <RCM.Separator ref={ref} className={cn('-mx-1.5 my-1 h-px bg-[var(--color-glass-border)]', className)} {...props} />
));
ContextMenuSeparator.displayName = 'ContextMenuSeparator';

export const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof RCM.Label>,
  React.ComponentPropsWithoutRef<typeof RCM.Label>
>(({ className, ...props }, ref) => (
  <RCM.Label ref={ref} className={cn('px-2.5 py-1.5 text-xs font-semibold text-text-tertiary', className)} {...props} />
));
ContextMenuLabel.displayName = 'ContextMenuLabel';
