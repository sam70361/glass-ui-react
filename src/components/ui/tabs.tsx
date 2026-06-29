import * as React from 'react';
import { Tabs as RadixTabs } from 'radix-ui';

import { cn } from 'src/lib/utils';

export const Tabs = RadixTabs.Root;

export const TabsList = React.forwardRef<
  React.ElementRef<typeof RadixTabs.List>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.List>
>(({ className, ...props }, ref) => (
  <RadixTabs.List
    ref={ref}
    className={cn(
      'inline-flex items-center gap-1 rounded-[var(--radius-md)] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] p-1 backdrop-blur-[var(--blur-sm)]',
      className
    )}
    {...props}
  />
));
TabsList.displayName = 'TabsList';

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.Trigger>
>(({ className, ...props }, ref) => (
  <RadixTabs.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center gap-1.5 rounded-[var(--radius-sm)] px-3 py-1.5 text-sm font-medium text-text-tertiary transition-all',
      'hover:text-foreground data-[state=active]:bg-[var(--color-glass-bg-active)] data-[state=active]:text-foreground data-[state=active]:shadow-[var(--shadow-z1)] [&_svg]:size-4',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = 'TabsTrigger';

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Content>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.Content>
>(({ className, ...props }, ref) => (
  <RadixTabs.Content ref={ref} className={cn('mt-4 outline-none', className)} {...props} />
));
TabsContent.displayName = 'TabsContent';
