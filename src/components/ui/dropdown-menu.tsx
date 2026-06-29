import * as React from 'react';
import { DropdownMenu as RDM } from 'radix-ui';
import { Check, ChevronRight, Circle } from 'lucide-react';

import { cn } from 'src/lib/utils';

export const DropdownMenu = RDM.Root;
export const DropdownMenuTrigger = RDM.Trigger;
export const DropdownMenuGroup = RDM.Group;
export const DropdownMenuPortal = RDM.Portal;
export const DropdownMenuSub = RDM.Sub;
export const DropdownMenuRadioGroup = RDM.RadioGroup;

const contentCls =
  'glass-overlay z-[var(--z-overlay)] min-w-[10rem] overflow-hidden rounded-[var(--radius-md)] p-1.5 data-[state=open]:animate-fade-in';

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof RDM.Content>,
  React.ComponentPropsWithoutRef<typeof RDM.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <RDM.Portal>
    <RDM.Content ref={ref} sideOffset={sideOffset} className={cn(contentCls, className)} {...props} />
  </RDM.Portal>
));
DropdownMenuContent.displayName = 'DropdownMenuContent';

const itemCls =
  'relative flex cursor-pointer select-none items-center gap-2 rounded-[var(--radius-sm)] px-2.5 py-2 text-sm outline-none transition-colors focus:bg-[var(--color-glass-bg-active)] focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-4';

export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof RDM.Item>,
  React.ComponentPropsWithoutRef<typeof RDM.Item> & { inset?: boolean; destructive?: boolean }
>(({ className, inset, destructive, ...props }, ref) => (
  <RDM.Item
    ref={ref}
    className={cn(itemCls, inset && 'pl-8', destructive && 'text-danger focus:bg-[rgba(var(--color-danger-rgb),0.12)]', className)}
    {...props}
  />
));
DropdownMenuItem.displayName = 'DropdownMenuItem';

export const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof RDM.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof RDM.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <RDM.CheckboxItem ref={ref} checked={checked} className={cn(itemCls, 'pl-8', className)} {...props}>
    <span className="absolute left-2 flex size-4 items-center justify-center">
      <RDM.ItemIndicator>
        <Check className="size-4" />
      </RDM.ItemIndicator>
    </span>
    {children}
  </RDM.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

export const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof RDM.RadioItem>,
  React.ComponentPropsWithoutRef<typeof RDM.RadioItem>
>(({ className, children, ...props }, ref) => (
  <RDM.RadioItem ref={ref} className={cn(itemCls, 'pl-8', className)} {...props}>
    <span className="absolute left-2 flex size-4 items-center justify-center">
      <RDM.ItemIndicator>
        <Circle className="size-2 fill-current" />
      </RDM.ItemIndicator>
    </span>
    {children}
  </RDM.RadioItem>
));
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

export const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof RDM.Label>,
  React.ComponentPropsWithoutRef<typeof RDM.Label>
>(({ className, ...props }, ref) => (
  <RDM.Label ref={ref} className={cn('px-2.5 py-1.5 text-xs font-semibold text-text-tertiary', className)} {...props} />
));
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

export const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof RDM.Separator>,
  React.ComponentPropsWithoutRef<typeof RDM.Separator>
>(({ className, ...props }, ref) => (
  <RDM.Separator ref={ref} className={cn('-mx-1.5 my-1 h-px bg-[var(--color-glass-border)]', className)} {...props} />
));
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

export function DropdownMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('ms-auto text-xs tracking-widest text-text-muted', className)} {...props} />;
}

export const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof RDM.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof RDM.SubTrigger>
>(({ className, children, ...props }, ref) => (
  <RDM.SubTrigger ref={ref} className={cn(itemCls, className)} {...props}>
    {children}
    <ChevronRight className="ml-auto size-4" />
  </RDM.SubTrigger>
));
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

export const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof RDM.SubContent>,
  React.ComponentPropsWithoutRef<typeof RDM.SubContent>
>(({ className, ...props }, ref) => (
  <RDM.SubContent ref={ref} className={cn(contentCls, className)} {...props} />
));
DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';
