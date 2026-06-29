import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { Button } from './button';

/** 轮播：CSS scroll-snap + 前后翻页（无第三方依赖） */
export function Carousel({ children, className, itemClassName }: { children: React.ReactNode[]; className?: string; itemClassName?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <div className={cn('group relative', className)}>
      <div ref={ref} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children.map((c, i) => (
          <div key={i} className={cn('shrink-0 snap-start', itemClassName)}>
            {c}
          </div>
        ))}
      </div>
      <Button
        variant="default"
        size="icon"
        className="absolute start-1 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
        onClick={() => scroll(-1)}
        aria-label="上一张"
      >
        <ChevronLeft className="size-5" />
      </Button>
      <Button
        variant="default"
        size="icon"
        className="absolute end-1 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
        onClick={() => scroll(1)}
        aria-label="下一张"
      >
        <ChevronRight className="size-5" />
      </Button>
    </div>
  );
}
