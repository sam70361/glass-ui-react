import { useState } from 'react';

import { cn } from 'src/lib/utils';
import { Markdown } from 'src/components/shared/markdown';
import { useTranslation } from 'src/i18n';
import { Segmented } from './toggle';

/** Markdown 编辑器：编辑/预览/分屏 */
export function MarkdownEditor({ defaultValue = '', className }: { defaultValue?: string; className?: string }) {
  const { t } = useTranslation();
  const [value, setValue] = useState(defaultValue);
  const [mode, setMode] = useState<'edit' | 'split' | 'preview'>('split');

  return (
    <div className={cn('overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-glass-border)]', className)}>
      <div className="flex items-center justify-between border-b border-[var(--color-glass-border)] px-2 py-1.5">
        <span className="ps-1 text-xs font-medium text-text-tertiary">Markdown</span>
        <Segmented
          value={mode}
          onValueChange={(v) => setMode(v as typeof mode)}
          options={[
            { value: 'edit', label: t('common.edit') },
            { value: 'split', label: t('common.splitView') },
            { value: 'preview', label: t('common.preview') },
          ]}
        />
      </div>
      <div className={cn('grid', mode === 'split' ? 'grid-cols-2 divide-x divide-[var(--color-glass-border)]' : 'grid-cols-1')}>
        {mode !== 'preview' && (
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            spellCheck={false}
            className="min-h-56 resize-none bg-transparent p-4 font-mono text-sm leading-relaxed outline-none"
          />
        )}
        {mode !== 'edit' && (
          <div className="min-h-56 overflow-y-auto p-4">
            <Markdown content={value} />
          </div>
        )}
      </div>
    </div>
  );
}
