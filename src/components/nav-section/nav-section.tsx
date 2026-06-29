import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { Badge } from 'src/components/ui/badge';
import { SimpleTooltip } from 'src/components/ui/tooltip';
import type { NavGroup, NavItem } from './types';

export interface NavSectionProps {
  data: NavGroup[];
  variant?: 'vertical' | 'mini';
  className?: string;
}

/** 数据驱动导航：vertical 横向行（一级分类可折叠），mini 纵向居中（图标+小标签） */
export function NavSection({ data, variant = 'vertical', className }: NavSectionProps) {
  const mini = variant === 'mini';
  return (
    <nav className={cn('flex flex-col', mini ? 'gap-2' : 'gap-1.5', className)}>
      {data.map((group, gi) => (
        <NavGroupBlock key={gi} group={group} groupIndex={gi} mini={mini} />
      ))}
    </nav>
  );
}

function NavGroupBlock({ group, groupIndex, mini }: { group: NavGroup; groupIndex: number; mini: boolean }) {
  const collapsible = !mini && !!group.collapsible && !!group.subheader;
  const [open, setOpen] = useState(true);

  return (
    <div className="flex flex-col gap-1">
      {group.subheader &&
        (mini ? (
          groupIndex > 0 && <span className="mx-auto my-1 h-px w-6 bg-[var(--color-glass-border)]" />
        ) : collapsible ? (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-1 px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-text-muted transition-colors hover:text-text-secondary"
          >
            <ChevronDown className={cn('size-3 transition-transform', !open && '-rotate-90')} />
            <span className="flex-1 text-start">{group.subheader}</span>
          </button>
        ) : (
          <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            {group.subheader}
          </p>
        ))}

      {(!collapsible || open) &&
        group.items.map((item) => <NavRow key={item.path} item={item} mini={mini} />)}
    </div>
  );
}

function NavRow({ item, mini }: { item: NavItem; mini: boolean }) {
  const Icon = item.icon;
  const link = (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        cn(
          'group relative flex items-center rounded-[var(--radius-md)] font-medium transition-all',
          mini ? 'w-full flex-col justify-center gap-1 px-1 py-2' : 'gap-3 px-3 py-2.5 text-sm',
          isActive
            ? 'bg-[var(--color-glass-bg-active)] text-foreground'
            : 'text-text-tertiary hover:bg-[var(--color-glass-bg)] hover:text-foreground'
        )
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span
              className={cn(
                'absolute rounded-full holographic-bg',
                mini ? 'inset-x-3 bottom-0.5 h-0.5' : 'inset-y-1/2 start-0 h-5 w-0.5 -translate-y-1/2'
              )}
            />
          )}
          <span className="relative">
            <Icon className={cn('size-[18px] shrink-0', isActive && 'text-cyan')} />
            {mini && item.badge !== undefined && (
              <span className="absolute -right-1.5 -top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full holographic-bg px-1 text-[9px] font-bold text-[var(--color-holo-foreground)]">
                {item.badge}
              </span>
            )}
          </span>
          {mini ? (
            <span className={cn('w-full truncate text-center text-[10px] leading-none', isActive && 'text-cyan')}>
              {item.title}
            </span>
          ) : (
            <>
              <span className="flex-1 truncate">{item.title}</span>
              {item.badge !== undefined && (
                <Badge variant="cyan" className="px-1.5">
                  {item.badge}
                </Badge>
              )}
            </>
          )}
        </>
      )}
    </NavLink>
  );
  return mini ? <SimpleTooltip content={item.title} side="right">{link}</SimpleTooltip> : link;
}
