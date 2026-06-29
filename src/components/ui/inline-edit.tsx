import { useState } from 'react';
import { Check, Pencil, X } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { Input } from './input';

/** 行内编辑：点击切换为输入框，回车/确认提交 */
export function InlineEdit({
  value,
  onSave,
  className,
}: {
  value: string;
  onSave: (v: string) => void;
  className?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  if (editing) {
    return (
      <span className="inline-flex items-center gap-1.5">
        <Input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSave(draft);
              setEditing(false);
            } else if (e.key === 'Escape') {
              setDraft(value);
              setEditing(false);
            }
          }}
          className="h-8 w-40"
        />
        <button onClick={() => { onSave(draft); setEditing(false); }} className="text-success" aria-label="保存">
          <Check className="size-4" />
        </button>
        <button onClick={() => { setDraft(value); setEditing(false); }} className="text-text-tertiary" aria-label="取消">
          <X className="size-4" />
        </button>
      </span>
    );
  }

  return (
    <button onClick={() => setEditing(true)} className={cn('group inline-flex items-center gap-1.5 text-start', className)}>
      <span>{value}</span>
      <Pencil className="size-3.5 text-text-muted opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  );
}
