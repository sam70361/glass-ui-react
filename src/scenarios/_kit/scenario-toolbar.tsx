import { cn } from 'src/lib/utils';
import { SearchInput } from 'src/components/shared/search-input';

export interface ToolbarFilter {
  id: string;
  label: string;
  count?: number;
}

/** 场景统一工具栏：搜索 + 过滤 chips + 自定义控件 + 右侧动作槽 */
export function ScenarioToolbar({
  search,
  onSearch,
  searchPlaceholder = '搜索…',
  filters,
  activeFilter,
  onFilter,
  children,
  actions,
  className,
}: {
  search?: string;
  onSearch?: (v: string) => void;
  searchPlaceholder?: string;
  filters?: ToolbarFilter[];
  activeFilter?: string;
  onFilter?: (id: string) => void;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mb-4 flex flex-wrap items-center gap-2.5', className)}>
      {onSearch && (
        <SearchInput value={search ?? ''} onValueChange={onSearch} placeholder={searchPlaceholder} className="w-full sm:w-64" />
      )}

      {filters && filters.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {filters.map((f) => {
            const active = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => onFilter?.(f.id)}
                className={cn(
                  'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                  active
                    ? 'holographic-bg text-[var(--color-holo-foreground)]'
                    : 'bg-[var(--color-glass-bg)] text-text-secondary hover:bg-[var(--color-glass-bg-hover)]'
                )}
              >
                {f.label}
                {f.count != null && (
                  <span className={cn('text-xs tabular-nums', active ? 'text-[var(--color-holo-foreground)]/70' : 'text-text-tertiary')}>{f.count}</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {children}

      {actions && <div className="ms-auto flex items-center gap-2">{actions}</div>}
    </div>
  );
}
