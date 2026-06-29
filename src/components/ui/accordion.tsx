import * as React from 'react';
import { Accordion as RadixAccordion } from 'radix-ui';
import { ChevronDown } from 'lucide-react';

import { cn } from 'src/lib/utils';

export const Accordion = RadixAccordion.Root;

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Item>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Item>
>(({ className, ...props }, ref) => (
  <RadixAccordion.Item ref={ref} className={cn('border-b border-[var(--color-glass-border)]', className)} {...props} />
));
AccordionItem.displayName = 'AccordionItem';

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Trigger>
>(({ className, children, ...props }, ref) => (
  <RadixAccordion.Header className="flex">
    <RadixAccordion.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:text-cyan [&[data-state=open]>svg]:rotate-180',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="size-4 shrink-0 transition-transform duration-200" />
    </RadixAccordion.Trigger>
  </RadixAccordion.Header>
));
AccordionTrigger.displayName = 'AccordionTrigger';

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Content>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Content>
>(({ className, children, ...props }, ref) => (
  <RadixAccordion.Content
    ref={ref}
    className="overflow-hidden text-sm text-muted-foreground data-[state=closed]:animate-fade-in data-[state=open]:animate-fade-in"
    {...props}
  >
    <div className={cn('pb-4', className)}>{children}</div>
  </RadixAccordion.Content>
));
AccordionContent.displayName = 'AccordionContent';
