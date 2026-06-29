import { useState } from 'react';

import { cn } from 'src/lib/utils';

/** 轻量代码编辑器：行号 + 等宽（textarea 叠加行号槽） */
export function CodeEditor({
  defaultValue = '',
  lang = 'ts',
  className,
  onChange,
}: {
  defaultValue?: string;
  lang?: string;
  className?: string;
  onChange?: (v: string) => void;
}) {
  const [value, setValue] = useState(defaultValue);
  const lines = value.split('\n');

  return (
    <div className={cn('overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-glass-border)] bg-[var(--color-surface-sunken)]', className)}>
      <div className="flex items-center justify-between border-b border-[var(--color-glass-border)] px-3 py-1.5">
        <span className="font-mono text-[11px] uppercase text-text-tertiary">{lang}</span>
        <span className="text-[11px] text-text-muted">{lines.length} 行</span>
      </div>
      <div className="flex max-h-80 overflow-auto">
        <div aria-hidden className="select-none border-e border-[var(--color-glass-border)] px-3 py-3 text-end font-mono text-xs leading-relaxed text-text-muted">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <textarea
          value={value}
          spellCheck={false}
          onChange={(e) => {
            setValue(e.target.value);
            onChange?.(e.target.value);
          }}
          className="min-h-40 flex-1 resize-none bg-transparent px-3 py-3 font-mono text-xs leading-relaxed text-text-secondary outline-none"
        />
      </div>
    </div>
  );
}
