import * as React from 'react';
import { Search, X } from 'lucide-react';

import { cn } from 'src/lib/utils';

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onValueChange: (value: string) => void;
  onClear?: () => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onValueChange, onClear, placeholder = '搜索…', ...props }, ref) => (
    <div className={cn('relative flex items-center', className)}>
      <Search className="pointer-events-none absolute left-3 size-4 text-text-tertiary" />
      <input
        ref={ref}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-full border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] pl-9 pr-9 text-sm backdrop-blur-[var(--blur-sm)] transition-colors placeholder:text-text-muted focus-visible:border-[rgba(var(--color-accent-cyan-rgb),0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--color-accent-cyan-rgb),0.15)]"
        {...props}
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onValueChange('');
            onClear?.();
          }}
          className="absolute right-3 text-text-tertiary transition-colors hover:text-foreground"
          aria-label="清除"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
);
SearchInput.displayName = 'SearchInput';
