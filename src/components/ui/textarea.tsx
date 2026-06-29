import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from 'src/lib/utils';
import { fieldVariants, fieldStatus, fieldFocus, type FieldStatus } from 'src/theme/mixins';

const textareaVariants = cva(
  `flex min-h-20 w-full px-3.5 py-2.5 text-sm transition-all placeholder:text-text-muted disabled:cursor-not-allowed disabled:opacity-50 ${fieldFocus}`,
  {
    variants: { variant: fieldVariants },
    defaultVariants: { variant: 'glass' },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  status?: FieldStatus;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, status, ...props }, ref) => (
    <textarea ref={ref} className={cn(textareaVariants({ variant }), status && fieldStatus[status], className)} {...props} />
  )
);
Textarea.displayName = 'Textarea';

export { textareaVariants };
