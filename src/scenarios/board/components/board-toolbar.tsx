import { KanbanSquare, Table as TableIcon } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { SearchInput } from 'src/components/shared/search-input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select';
import { SimpleTooltip } from 'src/components/ui/tooltip';
import { PRIORITIES, TAGS } from 'src/config/constants';
import { useAppStore } from 'src/store';

export type BoardView = 'board' | 'table';
export type GroupBy = 'none' | 'assignee' | 'priority';

export interface BoardFilters {
  search: string;
  assignee: string;
  priority: string;
  tag: string;
  groupBy: GroupBy;
}

export function BoardToolbar({
  count,
  view,
  onViewChange,
  filters,
  onFilter,
}: {
  count: number;
  view: BoardView;
  onViewChange: (v: BoardView) => void;
  filters: BoardFilters;
  onFilter: (patch: Partial<BoardFilters>) => void;
}) {
  const team = useAppStore((s) => s.team);

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2.5">
      <SearchInput
        value={filters.search}
        onValueChange={(v) => onFilter({ search: v })}
        placeholder="搜索任务…"
        className="w-full max-w-56"
      />
      <span className="text-sm text-text-tertiary">{count} 个任务</span>

      <div className="ms-auto flex flex-wrap items-center gap-2">
        <FilterSelect
          value={filters.assignee}
          onChange={(v) => onFilter({ assignee: v })}
          placeholder="负责人"
          options={[{ value: 'all', label: '全部负责人' }, ...team.map((m) => ({ value: m.id, label: m.name }))]}
        />
        <FilterSelect
          value={filters.priority}
          onChange={(v) => onFilter({ priority: v })}
          placeholder="优先级"
          options={[{ value: 'all', label: '全部优先级' }, ...PRIORITIES.map((p) => ({ value: p.id, label: p.label }))]}
        />
        <FilterSelect
          value={filters.tag}
          onChange={(v) => onFilter({ tag: v })}
          placeholder="标签"
          options={[{ value: 'all', label: '全部标签' }, ...TAGS.map((t) => ({ value: t.id, label: t.label }))]}
        />
        {view === 'board' && (
          <FilterSelect
            value={filters.groupBy}
            onChange={(v) => onFilter({ groupBy: v as GroupBy })}
            placeholder="分组"
            options={[
              { value: 'none', label: '不分组' },
              { value: 'assignee', label: '按负责人' },
              { value: 'priority', label: '按优先级' },
            ]}
          />
        )}

        <div className="flex items-center gap-1 rounded-[var(--radius-md)] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] p-1">
          <ViewBtn active={view === 'board'} onClick={() => onViewChange('board')} label="看板">
            <KanbanSquare className="size-4" />
          </ViewBtn>
          <ViewBtn active={view === 'table'} onClick={() => onViewChange('table')} label="表格">
            <TableIcon className="size-4" />
          </ViewBtn>
        </div>
      </div>
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-9 w-auto min-w-28 gap-1.5 text-sm">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function ViewBtn({ active, onClick, label, children }: { active: boolean; onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <SimpleTooltip content={label}>
      <button
        onClick={onClick}
        className={cn(
          'flex size-7 items-center justify-center rounded-[var(--radius-sm)] transition-colors',
          active ? 'bg-[var(--color-glass-bg-active)] text-cyan' : 'text-text-tertiary hover:text-foreground'
        )}
        aria-label={label}
      >
        {children}
      </button>
    </SimpleTooltip>
  );
}
