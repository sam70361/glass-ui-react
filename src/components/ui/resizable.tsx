import { useRef, useState } from 'react';

import { cn } from 'src/lib/utils';

export interface ResizablePanelDef {
  content: React.ReactNode;
  defaultSize?: number;
  min?: number;
  max?: number;
}

/**
 * 可拖拽分栏（水平），承载 palette｜canvas｜inspector。
 * 中间面板自适应，两侧固定像素并可拖拽改变宽度。
 */
export function ResizablePanels({
  left,
  right,
  children,
  leftDefault = 200,
  rightDefault = 280,
  className,
}: {
  left?: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
  leftDefault?: number;
  rightDefault?: number;
  className?: string;
}) {
  const [leftW, setLeftW] = useState(leftDefault);
  const [rightW, setRightW] = useState(rightDefault);
  const drag = useRef<{ side: 'l' | 'r'; startX: number; startW: number } | null>(null);

  const onDown = (side: 'l' | 'r') => (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { side, startX: e.clientX, startW: side === 'l' ? leftW : rightW };
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const d = drag.current;
    const delta = e.clientX - d.startX;
    if (d.side === 'l') setLeftW(Math.max(140, Math.min(360, d.startW + delta)));
    else setRightW(Math.max(180, Math.min(420, d.startW - delta)));
  };
  const onUp = () => (drag.current = null);

  const Handle = ({ side }: { side: 'l' | 'r' }) => (
    <div
      onPointerDown={onDown(side)}
      className="group/handle relative w-1 shrink-0 cursor-col-resize touch-none"
    >
      <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[var(--color-glass-border)] transition-colors group-hover/handle:bg-cyan" />
    </div>
  );

  return (
    <div className={cn('flex min-h-0 overflow-hidden', className)} onPointerMove={onMove} onPointerUp={onUp}>
      {left && (
        <>
          <div className="min-w-0 shrink-0 overflow-y-auto" style={{ width: leftW }}>
            {left}
          </div>
          <Handle side="l" />
        </>
      )}
      <div className="min-w-0 flex-1 overflow-auto">{children}</div>
      {right && (
        <>
          <Handle side="r" />
          <div className="min-w-0 shrink-0 overflow-y-auto" style={{ width: rightW }}>
            {right}
          </div>
        </>
      )}
    </div>
  );
}
