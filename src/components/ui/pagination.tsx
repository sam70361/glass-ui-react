import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { Button } from './button';

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/** 简洁分页：首/末省略，中间窗口显示 */
export function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
  if (pageCount <= 1) return null;
  const pages = buildRange(page, pageCount);

  return (
    <nav className={cn('flex items-center gap-1', className)} aria-label="pagination">
      <Button
        variant="ghost"
        size="icon-sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="上一页"
      >
        <ChevronLeft />
      </Button>
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`gap-${i}`} className="px-2 text-text-muted">
            …
          </span>
        ) : (
          <Button
            key={p}
            variant={p === page ? 'primary' : 'ghost'}
            size="icon-sm"
            onClick={() => onPageChange(p as number)}
          >
            {p}
          </Button>
        )
      )}
      <Button
        variant="ghost"
        size="icon-sm"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        aria-label="下一页"
      >
        <ChevronRight />
      </Button>
    </nav>
  );
}

function buildRange(page: number, count: number): (number | '...')[] {
  const delta = 1;
  const range: (number | '...')[] = [];
  const left = Math.max(2, page - delta);
  const right = Math.min(count - 1, page + delta);
  range.push(1);
  if (left > 2) range.push('...');
  for (let i = left; i <= right; i++) range.push(i);
  if (right < count - 1) range.push('...');
  if (count > 1) range.push(count);
  return range;
}
