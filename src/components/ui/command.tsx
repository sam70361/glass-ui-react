import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { Dialog, DialogContent, DialogTitle } from './dialog';

export const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn('flex size-full flex-col overflow-hidden rounded-[var(--radius-lg)] text-foreground', className)}
    {...props}
  />
));
Command.displayName = 'Command';

export function CommandDialog({
  children,
  open,
  onOpenChange,
  footer,
}: {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  footer?: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent hideClose className="max-w-[36rem] translate-y-0 overflow-hidden p-0 top-[12vh]">
        <DialogTitle className="sr-only">命令面板</DialogTitle>
        <Command>
          {children}
        </Command>
        {footer}
      </DialogContent>
    </Dialog>
  );
}

export const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center gap-2 border-b border-[var(--color-glass-border)] px-4 transition-colors focus-within:border-[var(--color-accent-cyan)]/50" cmdk-input-wrapper="">
    <Search className="size-4 shrink-0 text-text-tertiary" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'flex h-11 w-full bg-transparent py-3 text-sm outline-none placeholder:text-text-muted disabled:opacity-50',
        className
      )}
      {...props}
    />
  </div>
));
CommandInput.displayName = 'CommandInput';

export const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List ref={ref} className={cn('max-h-[min(24rem,60vh)] overflow-y-auto overflow-x-hidden p-2', className)} {...props} />
));
CommandList.displayName = 'CommandList';

export const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm text-text-tertiary" {...props} />
));
CommandEmpty.displayName = 'CommandEmpty';

export const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-text-tertiary',
      className
    )}
    {...props}
  />
));
CommandGroup.displayName = 'CommandGroup';

export const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center gap-2.5 rounded-[var(--radius-sm)] px-2.5 py-2.5 text-sm outline-none transition-colors data-[selected=true]:bg-[var(--color-glass-bg-active)] data-[selected=true]:text-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:size-4 [&_svg]:text-text-tertiary data-[selected=true]:[&_svg]:text-cyan before:absolute before:start-0 before:inset-y-2 before:w-0.5 before:rounded-full before:holographic-bg before:opacity-0 before:transition-opacity data-[selected=true]:before:opacity-100',
      className
    )}
    {...props}
  />
));
CommandItem.displayName = 'CommandItem';

export const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator ref={ref} className={cn('-mx-2 my-1 h-px bg-[var(--color-glass-border)]', className)} {...props} />
));
CommandSeparator.displayName = 'CommandSeparator';

export function CommandShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('ml-auto text-xs tracking-widest text-text-muted', className)} {...props} />;
}

/** 命令面板底部键盘提示栏 */
export function CommandFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 border-t border-[var(--color-glass-border)] px-4 py-2 text-xs text-text-muted',
        className
      )}
      {...props}
    />
  );
}

export function CommandKbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center gap-0.5 rounded-[var(--radius-xs,4px)] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] px-1.5 py-0.5 font-mono text-[0.6875rem] leading-none text-text-tertiary">
      {children}
    </kbd>
  );
}
