import * as React from 'react';
import { Slot } from 'radix-ui';
import { ChevronRight } from 'lucide-react';

import { cn } from 'src/lib/utils';

export function Breadcrumb({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <nav aria-label="breadcrumb" className={className} {...props} />;
}

export function BreadcrumbList({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) {
  return <ol className={cn('flex flex-wrap items-center gap-1.5 text-sm text-text-tertiary', className)} {...props} />;
}

export function BreadcrumbItem({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn('inline-flex items-center gap-1.5', className)} {...props} />;
}

export const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { asChild?: boolean }
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot.Root : 'a';
  return <Comp ref={ref} className={cn('transition-colors hover:text-foreground', className)} {...props} />;
});
BreadcrumbLink.displayName = 'BreadcrumbLink';

export function BreadcrumbPage({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('font-medium text-foreground', className)} {...props} />;
}

export function BreadcrumbSeparator({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  return (
    <li role="presentation" className={cn('[&_svg]:size-3.5', className)} {...props}>
      <ChevronRight />
    </li>
  );
}
