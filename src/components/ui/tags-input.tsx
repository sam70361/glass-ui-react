import { useState } from 'react';
import { X } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { fieldVariants } from 'src/theme/mixins';
import { Badge } from './badge';

/** 标签输入：回车/逗号添加，退格删除 */
export function TagsInput({
  value,
  onChange,
  placeholder = '输入后回车添加…',
  className,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}) {
  const [input, setInput] = useState('');

  const add = (t: string) => {
    const v = t.trim().replace(/,$/, '');
    if (v && !value.includes(v)) onChange([...value, v]);
    setInput('');
  };

  return (
    <div
      className={cn(
        'flex min-h-10 flex-wrap items-center gap-1.5 px-2.5 py-1.5 focus-within:border-[rgba(var(--color-accent-cyan-rgb),0.5)]',
        fieldVariants.glass,
        className
      )}
    >
      {value.map((t) => (
        <Badge key={t} variant="cyan" className="gap-1">
          {t}
          <X className="size-3 cursor-pointer" onClick={() => onChange(value.filter((x) => x !== t))} />
        </Badge>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
            e.preventDefault();
            add(input);
          } else if (e.key === 'Backspace' && !input && value.length) {
            onChange(value.slice(0, -1));
          }
        }}
        placeholder={value.length === 0 ? placeholder : ''}
        className="min-w-24 flex-1 bg-transparent text-sm outline-none placeholder:text-text-muted"
      />
    </div>
  );
}
