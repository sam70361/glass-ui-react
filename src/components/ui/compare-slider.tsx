import { useRef, useState } from 'react';
import { MoveHorizontal } from 'lucide-react';

import { cn } from 'src/lib/utils';

/** 前后对比滑块：拖动分界查看 before/after */
export function CompareSlider({
  before,
  after,
  className,
}: {
  before: React.ReactNode;
  after: React.ReactNode;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = (clientX: number) => {
    const r = ref.current!.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={ref}
      className={cn('relative aspect-video select-none overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-glass-border)]', className)}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerLeave={() => (dragging.current = false)}
    >
      <div className="absolute inset-0">{after}</div>
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <div className="h-full" style={{ width: ref.current?.clientWidth ?? '100%' }}>
          {before}
        </div>
      </div>
      <div className="absolute inset-y-0 z-10 w-0.5 bg-[var(--color-control-thumb)]" style={{ left: `${pos}%` }} />
      <button
        onPointerDown={(e) => {
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          dragging.current = true;
        }}
        className="absolute top-1/2 z-10 flex size-9 -translate-x-1/2 -translate-y-1/2 cursor-col-resize items-center justify-center rounded-full bg-[var(--color-control-thumb)] text-[var(--color-holo-foreground)] shadow-[var(--shadow-z8)]"
        style={{ left: `${pos}%` }}
        aria-label="拖动对比"
      >
        <MoveHorizontal className="size-4" />
      </button>
    </div>
  );
}
