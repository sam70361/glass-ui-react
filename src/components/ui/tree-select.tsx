import { useState } from 'react';
import { ChevronsUpDown } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { TreeView, type TreeNode } from './tree-view';

function findLabel(nodes: TreeNode[], id?: string): string | undefined {
  for (const n of nodes) {
    if (n.id === id) return n.label;
    if (n.children) {
      const f = findLabel(n.children, id);
      if (f) return f;
    }
  }
}

/** 树形选择器：Popover + TreeView */
export function TreeSelect({
  nodes,
  value,
  onChange,
  placeholder = '请选择…',
  className,
}: {
  nodes: TreeNode[];
  value?: string;
  onChange: (id: string) => void;
  placeholder?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const label = findLabel(nodes, value);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            'flex h-10 w-full items-center justify-between gap-2 rounded-[var(--radius-md)] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] px-3.5 text-sm transition-colors hover:bg-[var(--color-glass-bg-hover)]',
            className
          )}
        >
          <span className={cn('truncate', !label && 'text-text-muted')}>{label ?? placeholder}</span>
          <ChevronsUpDown className="size-4 shrink-0 opacity-60" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-2" align="start">
        <TreeView
          nodes={nodes}
          selectedId={value}
          onSelect={(id) => {
            onChange(id);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
