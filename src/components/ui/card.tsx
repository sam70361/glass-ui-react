import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from 'src/lib/utils';
import { surfaceVariants, surfaceTones } from 'src/theme/mixins';

const cardVariants = cva('relative transition-all', {
  variants: {
    variant: surfaceVariants,
    tone: surfaceTones,
    padding: {
      none: 'p-0',
      sm: 'p-3',
      md: 'p-5',
      lg: 'p-6',
    },
  },
  defaultVariants: { variant: 'glass', tone: 'default', padding: 'none' },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, tone, padding, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        cardVariants({ variant, tone, padding }),
        interactive && 'glass-card--interactive cursor-pointer',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-1.5 p-5 pb-0', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('font-display text-base font-semibold tracking-tight', className)} {...props} />
  )
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-muted-foreground text-sm', className)} {...props} />
  )
);
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('p-5', className)} {...props} />
);
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-2 p-5 pt-0', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export { cardVariants };
