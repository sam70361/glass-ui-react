import * as React from 'react';
import { Menubar as RadixMenubar } from 'radix-ui';

import { cn } from 'src/lib/utils';

export const Menubar = React.forwardRef<
  React.ElementRef<typeof RadixMenubar.Root>,
  React.ComponentPropsWithoutRef<typeof RadixMenubar.Root>
>(({ className, ...props }, ref) => (
  <RadixMenubar.Root
    ref={ref}
    className={cn('flex items-center gap-0.5 rounded-[var(--radius-md)] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] p-1', className)}
    {...props}
  />
));
Menubar.displayName = 'Menubar';

export const MenubarMenu = RadixMenubar.Menu;

export const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof RadixMenubar.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixMenubar.Trigger>
>(({ className, ...props }, ref) => (
  <RadixMenubar.Trigger
    ref={ref}
    className={cn(
      'cursor-pointer rounded-[var(--radius-sm)] px-3 py-1.5 text-sm font-medium outline-none transition-colors data-[state=open]:bg-[var(--color-glass-bg-active)] data-[highlighted]:bg-[var(--color-glass-bg)]',
      className
    )}
    {...props}
  />
));
MenubarTrigger.displayName = 'MenubarTrigger';

export const MenubarContent = React.forwardRef<
  React.ElementRef<typeof RadixMenubar.Content>,
  React.ComponentPropsWithoutRef<typeof RadixMenubar.Content>
>(({ className, align = 'start', sideOffset = 6, ...props }, ref) => (
  <RadixMenubar.Portal>
    <RadixMenubar.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn('glass-overlay z-[var(--z-overlay)] min-w-[10rem] rounded-[var(--radius-md)] p-1.5 data-[state=open]:animate-fade-in', className)}
      {...props}
    />
  </RadixMenubar.Portal>
));
MenubarContent.displayName = 'MenubarContent';

export const MenubarItem = React.forwardRef<
  React.ElementRef<typeof RadixMenubar.Item>,
  React.ComponentPropsWithoutRef<typeof RadixMenubar.Item>
>(({ className, ...props }, ref) => (
  <RadixMenubar.Item
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center gap-2 rounded-[var(--radius-sm)] px-2.5 py-2 text-sm outline-none transition-colors focus:bg-[var(--color-glass-bg-active)] focus:text-foreground [&_svg]:size-4',
      className
    )}
    {...props}
  />
));
MenubarItem.displayName = 'MenubarItem';

export const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof RadixMenubar.Separator>,
  React.ComponentPropsWithoutRef<typeof RadixMenubar.Separator>
>(({ className, ...props }, ref) => (
  <RadixMenubar.Separator ref={ref} className={cn('-mx-1.5 my-1 h-px bg-[var(--color-glass-border)]', className)} {...props} />
));
MenubarSeparator.displayName = 'MenubarSeparator';
