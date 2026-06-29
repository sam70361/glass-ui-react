import * as React from 'react';
import { Dialog as RadixDialog } from 'radix-ui';
import { X } from 'lucide-react';

import { cn } from 'src/lib/utils';

export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogClose = RadixDialog.Close;
export const DialogPortal = RadixDialog.Portal;

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Overlay>
>(({ className, ...props }, ref) => (
  <RadixDialog.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-[var(--z-dialog)] bg-[var(--color-scrim)] backdrop-blur-[var(--blur-sm)] data-[state=open]:animate-fade-in',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = 'DialogOverlay';

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Content> & { hideClose?: boolean }
>(({ className, children, hideClose, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <RadixDialog.Content
      ref={ref}
      className={cn(
        'glass-overlay fixed left-1/2 top-1/2 z-[var(--z-dialog)] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-[var(--radius-xl)] p-6 shadow-[var(--shadow-dialog)] data-[state=open]:animate-fade-up',
        className
      )}
      {...props}
    >
      {children}
      {!hideClose && (
        <RadixDialog.Close className="absolute end-4 top-4 rounded-[var(--radius-md)] p-1 text-text-tertiary transition-colors hover:bg-[var(--color-glass-bg)] hover:text-foreground">
          <X className="size-4" />
          <span className="sr-only">关闭</span>
        </RadixDialog.Close>
      )}
    </RadixDialog.Content>
  </DialogPortal>
));
DialogContent.displayName = 'DialogContent';

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-4 flex flex-col gap-1.5', className)} {...props} />;
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-6 flex justify-end gap-2', className)} {...props} />;
}

export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Title>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Title>
>(({ className, ...props }, ref) => (
  <RadixDialog.Title ref={ref} className={cn('font-display text-lg font-semibold', className)} {...props} />
));
DialogTitle.displayName = 'DialogTitle';

export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Description>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Description>
>(({ className, ...props }, ref) => (
  <RadixDialog.Description ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
DialogDescription.displayName = 'DialogDescription';
