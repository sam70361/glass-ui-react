import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { Button } from './button';
import { Checkbox } from './checkbox';

export interface TransferItem {
  id: string;
  label: string;
}

/** 穿梭框：左右两列互相移动 */
export function TransferList({
  items,
  selected,
  onChange,
  titles = ['可选', '已选'],
  className,
}: {
  items: TransferItem[];
  selected: string[];
  onChange: (selected: string[]) => void;
  titles?: [string, string] | string[];
  className?: string;
}) {
  const left = items.filter((i) => !selected.includes(i.id));
  const right = items.filter((i) => selected.includes(i.id));

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Panel title={titles[0]} items={left} onItem={(id) => onChange([...selected, id])} />
      <div className="flex flex-col gap-2">
        <Button variant="outline" size="icon-sm" onClick={() => onChange(items.map((i) => i.id))} aria-label="全部右移">
          <ChevronRight className="size-4" />
        </Button>
        <Button variant="outline" size="icon-sm" onClick={() => onChange([])} aria-label="全部左移">
          <ChevronLeft className="size-4" />
        </Button>
      </div>
      <Panel title={titles[1]} items={right} onItem={(id) => onChange(selected.filter((s) => s !== id))} />
    </div>
  );
}

function Panel({ title, items, onItem }: { title: string; items: TransferItem[]; onItem: (id: string) => void }) {
  return (
    <div className="flex-1 rounded-[var(--radius-md)] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)]">
      <div className="border-b border-[var(--color-glass-border)] px-3 py-2 text-xs font-semibold text-text-tertiary">
        {title} ({items.length})
      </div>
      <div className="max-h-56 space-y-0.5 overflow-y-auto p-1.5">
        {items.map((it) => (
          <label key={it.id} className="flex cursor-pointer items-center gap-2.5 rounded-[var(--radius-sm)] px-2 py-1.5 text-sm hover:bg-[var(--color-glass-bg-hover)]">
            <Checkbox checked={false} onCheckedChange={() => onItem(it.id)} />
            {it.label}
          </label>
        ))}
        {items.length === 0 && <p className="px-2 py-3 text-center text-xs text-text-muted">空</p>}
      </div>
    </div>
  );
}
