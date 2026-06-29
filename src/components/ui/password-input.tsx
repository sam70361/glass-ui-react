import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { Input } from './input';

export const PasswordInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    const [show, setShow] = React.useState(false);
    return (
      <div className="relative">
        <Input ref={ref} type={show ? 'text' : 'password'} className={cn('pe-10', className)} {...props} />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute end-3 top-1/2 -translate-y-1/2 text-text-tertiary transition-colors hover:text-foreground"
          aria-label={show ? '隐藏' : '显示'}
        >
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = 'PasswordInput';
