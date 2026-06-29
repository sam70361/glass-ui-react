import { useState } from 'react';
import { ChevronRight, File as FileIcon, Folder, FolderOpen } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { cn } from 'src/lib/utils';

export interface TreeNode {
  id: string;
  label: string;
  icon?: LucideIcon;
  children?: TreeNode[];
  badge?: React.ReactNode;
}

/** 递归树形视图 */
export function TreeView({
  nodes,
  selectedId,
  onSelect,
  defaultExpanded = [],
  className,
}: {
  nodes: TreeNode[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  defaultExpanded?: string[];
  className?: string;
}) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(defaultExpanded));
  const toggle = (id: string) =>
    setExpanded((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const render = (node: TreeNode, depth: number) => {
    const hasChildren = !!node.children?.length;
    const isOpen = expanded.has(node.id);
    const Icon = node.icon ?? (hasChildren ? (isOpen ? FolderOpen : Folder) : FileIcon);
    const active = selectedId === node.id;
    return (
      <div key={node.id}>
        <button
          onClick={() => {
            if (hasChildren) toggle(node.id);
            onSelect?.(node.id);
          }}
          className={cn(
            'flex w-full items-center gap-1.5 rounded-[var(--radius-sm)] py-1.5 pe-2 text-sm transition-colors',
            active ? 'bg-[var(--color-glass-bg-active)] text-foreground' : 'text-text-secondary hover:bg-[var(--color-glass-bg)]'
          )}
          style={{ paddingInlineStart: 8 + depth * 16 }}
        >
          {hasChildren ? (
            <ChevronRight className={cn('size-3.5 shrink-0 transition-transform', isOpen && 'rotate-90')} />
          ) : (
            <span className="w-3.5 shrink-0" />
          )}
          <Icon className={cn('size-4 shrink-0', active ? 'text-cyan' : 'text-text-tertiary')} />
          <span className="flex-1 truncate text-start">{node.label}</span>
          {node.badge}
        </button>
        {hasChildren && isOpen && <div>{node.children!.map((c) => render(c, depth + 1))}</div>}
      </div>
    );
  };

  return <div className={cn('space-y-0.5', className)}>{nodes.map((n) => render(n, 0))}</div>;
}
