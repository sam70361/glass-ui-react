import * as React from 'react';
import { Dialog as RadixDialog } from 'radix-ui';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

import { cn } from 'src/lib/utils';

export const Sheet = RadixDialog.Root;
export const SheetTrigger = RadixDialog.Trigger;
export const SheetClose = RadixDialog.Close;

const sheetVariants = cva(
  'glass-overlay fixed z-[var(--z-overlay)] flex flex-col gap-0 transition-transform data-[state=open]:animate-fade-in',
  {
    variants: {
      side: {
        right: 'inset-y-0 right-0 h-full w-full max-w-md border-l',
        left: 'inset-y-0 left-0 h-full w-full max-w-md border-r',
        top: 'inset-x-0 top-0 w-full border-b',
        bottom: 'inset-x-0 bottom-0 w-full border-t',
      },
    },
    defaultVariants: { side: 'right' },
  }
);

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixDialog.Content>,
    VariantProps<typeof sheetVariants> {
  hideClose?: boolean;
}

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  SheetContentProps
>(({ className, children, side, hideClose, ...props }, ref) => (
  <RadixDialog.Portal>
    <RadixDialog.Overlay className="fixed inset-0 z-[var(--z-overlay)] bg-[var(--color-scrim)] backdrop-blur-[var(--blur-sm)] data-[state=open]:animate-fade-in" />
    <RadixDialog.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
      {children}
      {!hideClose && (
        <RadixDialog.Close className="absolute end-4 top-4 rounded-[var(--radius-md)] p-1 text-text-tertiary transition-colors hover:bg-[var(--color-glass-bg)] hover:text-foreground">
          <X className="size-4" />
          <span className="sr-only">关闭</span>
        </RadixDialog.Close>
      )}
    </RadixDialog.Content>
  </RadixDialog.Portal>
));
SheetContent.displayName = 'SheetContent';

export function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-1 border-b border-[var(--color-glass-border)] p-5', className)} {...props} />;
}

export function SheetBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex-1 overflow-y-auto p-5', className)} {...props} />;
}

export function SheetFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex justify-end gap-2 border-t border-[var(--color-glass-border)] p-5', className)} {...props} />;
}

export const SheetTitle = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Title>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Title>
>(({ className, ...props }, ref) => (
  <RadixDialog.Title ref={ref} className={cn('font-display text-lg font-semibold', className)} {...props} />
));
SheetTitle.displayName = 'SheetTitle';

export const SheetDescription = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Description>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Description>
>(({ className, ...props }, ref) => (
  <RadixDialog.Description ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
SheetDescription.displayName = 'SheetDescription';

export { sheetVariants };
