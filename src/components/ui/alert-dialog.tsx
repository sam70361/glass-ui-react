import * as React from 'react';
import { AlertDialog as RadixAlertDialog } from 'radix-ui';

import { cn } from 'src/lib/utils';
import { buttonVariants } from './button';

export const AlertDialog = RadixAlertDialog.Root;
export const AlertDialogTrigger = RadixAlertDialog.Trigger;

export const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof RadixAlertDialog.Content>,
  React.ComponentPropsWithoutRef<typeof RadixAlertDialog.Content>
>(({ className, ...props }, ref) => (
  <RadixAlertDialog.Portal>
    <RadixAlertDialog.Overlay className="fixed inset-0 z-[var(--z-elevated)] bg-[var(--color-scrim)] backdrop-blur-[var(--blur-sm)] data-[state=open]:animate-fade-in" />
    <RadixAlertDialog.Content
      ref={ref}
      className={cn(
        'glass-overlay fixed left-1/2 top-1/2 z-[var(--z-elevated)] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[var(--radius-xl)] p-6 data-[state=open]:animate-fade-up',
        className
      )}
      {...props}
    />
  </RadixAlertDialog.Portal>
));
AlertDialogContent.displayName = 'AlertDialogContent';

export function AlertDialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-2 flex flex-col gap-1.5', className)} {...props} />;
}
export function AlertDialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-6 flex justify-end gap-2', className)} {...props} />;
}

export const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof RadixAlertDialog.Title>,
  React.ComponentPropsWithoutRef<typeof RadixAlertDialog.Title>
>(({ className, ...props }, ref) => (
  <RadixAlertDialog.Title ref={ref} className={cn('font-display text-lg font-semibold', className)} {...props} />
));
AlertDialogTitle.displayName = 'AlertDialogTitle';

export const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof RadixAlertDialog.Description>,
  React.ComponentPropsWithoutRef<typeof RadixAlertDialog.Description>
>(({ className, ...props }, ref) => (
  <RadixAlertDialog.Description ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
AlertDialogDescription.displayName = 'AlertDialogDescription';

export const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof RadixAlertDialog.Action>,
  React.ComponentPropsWithoutRef<typeof RadixAlertDialog.Action>
>(({ className, ...props }, ref) => (
  <RadixAlertDialog.Action ref={ref} className={cn(buttonVariants({ variant: 'primary' }), className)} {...props} />
));
AlertDialogAction.displayName = 'AlertDialogAction';

export const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof RadixAlertDialog.Cancel>,
  React.ComponentPropsWithoutRef<typeof RadixAlertDialog.Cancel>
>(({ className, ...props }, ref) => (
  <RadixAlertDialog.Cancel ref={ref} className={cn(buttonVariants({ variant: 'outline' }), className)} {...props} />
));
AlertDialogCancel.displayName = 'AlertDialogCancel';
