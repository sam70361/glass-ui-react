import { useRef, useState } from 'react';
import { Image as ImageIcon, Plus, StickyNote, Trash2 } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { ScenarioEmpty } from 'src/scenarios/_kit';
import { PageHeader } from 'src/components/shared/page-header';
import { Button } from 'src/components/ui/button';
import { useAppStore } from 'src/store';
import { DATA_PALETTE } from 'src/theme/palette';
import type { MoodboardElement } from 'src/types';

export default function MoodboardView() {
  const boards = useAppStore((s) => s.moodboards);
  const activeId = useAppStore((s) => s.activeMoodboardId);
  const setActive = useAppStore((s) => s.setActiveMoodboard);
  const elements = useAppStore((s) => s.moodboardElements);
  const addElement = useAppStore((s) => s.addMoodboardElement);
  const updateElement = useAppStore((s) => s.updateMoodboardElement);
  const deleteElement = useAppStore((s) => s.deleteMoodboardElement);

  const boardElements = elements.filter((e) => e.boardId === activeId);

  return (
    <div className="flex h-full flex-col animate-fade-up">
      <PageHeader
        title="灵感画板"
        description="自由拖拽，汇聚创意碎片"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => addElement({ type: 'note', content: '新便签…', color: DATA_PALETTE.cyan })}>
              <StickyNote className="size-4" /> 便签
            </Button>
            <Button variant="primary" onClick={() => addElement({ type: 'image', content: DATA_PALETTE.magenta })}>
              <ImageIcon className="size-4" /> 图块
            </Button>
          </div>
        }
      />

      <div className="mb-4 flex gap-1.5">
        {boards.map((b) => (
          <button
            key={b.id}
            onClick={() => setActive(b.id)}
            className={cn(
              'rounded-full px-3.5 py-1.5 text-sm transition-colors',
              activeId === b.id ? 'holographic-bg text-[var(--color-holo-foreground)]' : 'bg-[var(--color-glass-bg)] hover:bg-[var(--color-glass-bg-hover)]'
            )}
          >
            {b.name}
          </button>
        ))}
        <Button variant="ghost" size="icon-sm" aria-label="新建画板">
          <Plus className="size-4" />
        </Button>
      </div>

      <div className="relative flex-1 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-glass-border)] bg-[var(--color-surface-sunken)]">
        {boardElements.map((el) => (
          <DraggableElement key={el.id} el={el} onMove={(x, y) => updateElement(el.id, { x, y })} onDelete={() => deleteElement(el.id)} />
        ))}
        {boardElements.length === 0 && (
          <div className="absolute inset-0">
            <ScenarioEmpty message="点击上方按钮添加元素" />
          </div>
        )}
      </div>
    </div>
  );
}

function DraggableElement({ el, onMove, onDelete }: { el: MoodboardElement; onMove: (x: number, y: number) => void; onDelete: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: el.x, y: el.y });
  const drag = useRef<{ ox: number; oy: number; sx: number; sy: number } | null>(null);

  function onPointerDown(e: React.PointerEvent) {
    if ((e.target as HTMLElement).dataset.noDrag) return;
    ref.current?.setPointerCapture(e.pointerId);
    drag.current = { ox: pos.x, oy: pos.y, sx: e.clientX, sy: e.clientY };
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!drag.current) return;
    setPos({ x: drag.current.ox + (e.clientX - drag.current.sx), y: drag.current.oy + (e.clientY - drag.current.sy) });
  }
  function onPointerUp(e: React.PointerEvent) {
    if (!drag.current) return;
    ref.current?.releasePointerCapture(e.pointerId);
    drag.current = null;
    onMove(pos.x, pos.y);
  }

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className="group absolute cursor-grab touch-none rounded-[var(--radius-md)] shadow-[var(--shadow-z8)] active:cursor-grabbing"
      style={{ left: pos.x, top: pos.y, width: el.width, height: el.height, transform: `rotate(${el.rotation}deg)` }}
    >
      {el.type === 'note' ? (
        <div className="flex size-full flex-col rounded-[var(--radius-md)] p-3 text-sm text-[var(--color-holo-foreground)]" style={{ background: el.color ?? DATA_PALETTE.amber }}>
          {el.content}
        </div>
      ) : (
        <div className="size-full rounded-[var(--radius-md)]" style={{ background: `linear-gradient(135deg, ${el.content}, ${DATA_PALETTE.cyan})` }} />
      )}
      <button
        data-no-drag
        onClick={onDelete}
        className="absolute -right-2 -top-2 hidden size-6 items-center justify-center rounded-full bg-danger text-foreground group-hover:flex"
        aria-label="删除"
      >
        <Trash2 className="size-3" data-no-drag />
      </button>
    </div>
  );
}
