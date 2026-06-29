import { ChevronDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger } from './popover';

export interface MegaMenuColumn {
  title: string;
  items: { label: string; desc?: string; icon?: LucideIcon }[];
}

/** 大菜单：触发后展开多列分组面板（基于 Popover，稳定可靠） */
export function MegaMenu({ label, columns }: { label: string; columns: MegaMenuColumn[] }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1 rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-[var(--color-glass-bg)] hover:text-foreground data-[state=open]:text-cyan">
          {label}
          <ChevronDown className="size-3.5" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto max-w-2xl">
        <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(180px,1fr))` }}>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-tertiary">{col.title}</p>
              <div className="space-y-0.5">
                {col.items.map((it) => {
                  const Icon = it.icon;
                  return (
                    <button key={it.label} className="flex w-full items-start gap-2.5 rounded-[var(--radius-md)] p-2 text-left transition-colors hover:bg-[var(--color-glass-bg)]">
                      {Icon && (
                        <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-glass-bg-active)] text-cyan">
                          <Icon className="size-4" />
                        </span>
                      )}
                      <span className="min-w-0">
                        <span className="block text-sm font-medium">{it.label}</span>
                        {it.desc && <span className="block truncate text-xs text-text-tertiary">{it.desc}</span>}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
