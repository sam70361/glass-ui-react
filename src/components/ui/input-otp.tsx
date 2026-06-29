import { useRef } from 'react';

import { cn } from 'src/lib/utils';
import { fieldFocus } from 'src/theme/mixins';

/** 验证码输入：N 位独立格子，自动跳转 */
export function InputOTP({
  length = 6,
  value,
  onChange,
  className,
}: {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const chars = value.padEnd(length, ' ').slice(0, length).split('');

  const setChar = (i: number, c: string) => {
    const next = value.split('');
    next[i] = c;
    onChange(next.join('').slice(0, length));
    if (c && i < length - 1) refs.current[i + 1]?.focus();
  };

  return (
    <div className={cn('flex gap-2', className)}>
      {chars.map((c, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={c.trim()}
          inputMode="numeric"
          maxLength={1}
          onChange={(e) => setChar(i, e.target.value.replace(/\D/g, '').slice(-1))}
          onKeyDown={(e) => {
            if (e.key === 'Backspace' && !c.trim() && i > 0) refs.current[i - 1]?.focus();
          }}
          className={cn(
            'size-11 rounded-[var(--radius-md)] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] text-center font-mono text-lg outline-none transition-colors',
            fieldFocus
          )}
        />
      ))}
    </div>
  );
}
