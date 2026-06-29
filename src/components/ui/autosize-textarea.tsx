import * as React from 'react';

import { cn } from 'src/lib/utils';
import { fieldVariants, fieldFocus } from 'src/theme/mixins';

/** 自动增高文本域 */
export const AutosizeTextarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, onInput, ...props }, ref) => {
    const innerRef = React.useRef<HTMLTextAreaElement | null>(null);
    const resize = (el: HTMLTextAreaElement | null) => {
      if (!el) return;
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    };
    React.useEffect(() => resize(innerRef.current), []);
    return (
      <textarea
        ref={(el) => {
          innerRef.current = el;
          if (typeof ref === 'function') ref(el);
          else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
        }}
        rows={2}
        onInput={(e) => {
          resize(e.currentTarget);
          onInput?.(e);
        }}
        className={cn(
          'flex w-full resize-none overflow-hidden px-3.5 py-2.5 text-sm transition-all placeholder:text-text-muted',
          fieldVariants.glass,
          fieldFocus,
          className
        )}
        {...props}
      />
    );
  }
);
AutosizeTextarea.displayName = 'AutosizeTextarea';
