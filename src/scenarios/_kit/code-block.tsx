import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

import { cn } from 'src/lib/utils';

/** 代码块（mono + 复制），用于 Skills / API 等场景 */
export function CodeBlock({ code, lang = 'ts', className }: { code: string; lang?: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className={cn('group relative overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-glass-border)] bg-[var(--color-surface-sunken)]', className)}>
      <div className="flex items-center justify-between border-b border-[var(--color-glass-border)] px-3 py-1.5">
        <span className="font-mono text-[11px] uppercase text-text-tertiary">{lang}</span>
        <button
          onClick={() => {
            navigator.clipboard?.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="text-text-tertiary transition-colors hover:text-foreground"
          aria-label="复制"
        >
          {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
        </button>
      </div>
      <pre className="overflow-x-auto p-3 text-xs leading-relaxed">
        <code className="font-mono text-text-secondary">{code}</code>
      </pre>
    </div>
  );
}
