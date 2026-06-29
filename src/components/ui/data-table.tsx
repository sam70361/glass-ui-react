import { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';
import { Checkbox } from './checkbox';
import { Pagination } from './pagination';

export interface Column<T> {
  key: keyof T & string;
  header: string;
  sortable?: boolean;
  align?: 'start' | 'end';
  render?: (row: T) => React.ReactNode;
  className?: string;
}

/** 数据表：排序 + 多选 + 分页 */
export function DataTable<T extends { id: string }>({
  data,
  columns,
  pageSize = 8,
  selectable,
  className,
}: {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  selectable?: boolean;
  className?: string;
}) {
  const [sort, setSort] = useState<{ key: string; dir: 'asc' | 'desc' } | null>(null);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const sorted = useMemo(() => {
    if (!sort) return data;
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return data;
    return [...data].sort((a, b) => {
      const av = a[col.key] as unknown as number | string;
      const bv = b[col.key] as unknown as number | string;
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sort.dir === 'asc' ? cmp : -cmp;
    });
  }, [data, sort, columns]);

  const pageCount = Math.ceil(sorted.length / pageSize);
  const rows = sorted.slice((page - 1) * pageSize, page * pageSize);
  const allOnPage = rows.length > 0 && rows.every((r) => selected.has(r.id));

  const toggleSort = (key: string) =>
    setSort((s) => (s?.key === key ? (s.dir === 'asc' ? { key, dir: 'desc' } : null) : { key, dir: 'asc' }));

  const toggleRow = (id: string) =>
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className={cn('space-y-3', className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {selectable && (
              <TableHead className="w-10">
                <Checkbox
                  checked={allOnPage}
                  onCheckedChange={(v) =>
                    setSelected((s) => {
                      const next = new Set(s);
                      rows.forEach((r) => (v ? next.add(r.id) : next.delete(r.id)));
                      return next;
                    })
                  }
                />
              </TableHead>
            )}
            {columns.map((c) => (
              <TableHead key={c.key} className={cn(c.align === 'end' && 'text-end', c.className)}>
                {c.sortable ? (
                  <button onClick={() => toggleSort(c.key)} className={cn('inline-flex items-center gap-1 hover:text-foreground', c.align === 'end' && 'flex-row-reverse')}>
                    {c.header}
                    {sort?.key === c.key ? (
                      sort.dir === 'asc' ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />
                    ) : (
                      <ChevronsUpDown className="size-3 opacity-40" />
                    )}
                  </button>
                ) : (
                  c.header
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} data-state={selected.has(row.id) ? 'selected' : undefined}>
              {selectable && (
                <TableCell>
                  <Checkbox checked={selected.has(row.id)} onCheckedChange={() => toggleRow(row.id)} />
                </TableCell>
              )}
              {columns.map((c) => (
                <TableCell key={c.key} className={cn(c.align === 'end' && 'text-end', c.className)}>
                  {c.render ? c.render(row) : (row[c.key] as React.ReactNode)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between px-1">
        <span className="text-xs text-text-tertiary">
          {selectable && selected.size > 0 ? `已选 ${selected.size} 项 · ` : ''}
          共 {sorted.length} 条
        </span>
        <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
      </div>
    </div>
  );
}
