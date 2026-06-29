import * as React from 'react';
import { X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from 'src/lib/utils';
import { fieldVariants, fieldSizes, fieldStatus, fieldFocus, fieldFocusWithin, type FieldStatus } from 'src/theme/mixins';

const inputVariants = cva(
  `flex w-full text-sm transition-all placeholder:text-text-muted disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-medium ${fieldFocus}`,
  {
    variants: {
      variant: fieldVariants,
      inputSize: fieldSizes,
    },
    defaultVariants: { variant: 'glass', inputSize: 'md' },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'>,
    VariantProps<typeof inputVariants> {
  status?: FieldStatus;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  /** 传入则在有值时显示清除按钮 */
  onClear?: () => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, type, status, prefix, suffix, onClear, value, ...props }, ref) => {
    const statusCls = status ? fieldStatus[status] : '';
    const hasAdornment = prefix != null || suffix != null || onClear != null;

    if (hasAdornment) {
      return (
        <div className={cn(inputVariants({ variant, inputSize }), 'flex items-center gap-2', fieldFocusWithin, statusCls, className)}>
          {prefix != null && <span className="flex shrink-0 items-center text-text-tertiary [&_svg]:size-4">{prefix}</span>}
          <input
            ref={ref}
            type={type}
            value={value}
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-text-muted disabled:cursor-not-allowed"
            {...props}
          />
          {onClear != null && value ? (
            <button type="button" onClick={onClear} className="shrink-0 text-text-tertiary transition-colors hover:text-foreground" aria-label="清除">
              <X className="size-4" />
            </button>
          ) : (
            suffix != null && <span className="flex shrink-0 items-center text-text-tertiary [&_svg]:size-4">{suffix}</span>
          )}
        </div>
      );
    }

    return (
      <input
        ref={ref}
        type={type}
        value={value}
        className={cn(inputVariants({ variant, inputSize }), 'py-2', statusCls, className)}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { inputVariants };
