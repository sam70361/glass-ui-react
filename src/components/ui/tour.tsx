import { useState } from 'react';
import { X } from 'lucide-react';

import { Button } from './button';

export interface TourStep {
  title: string;
  content: string;
}

/** 引导：分步浮层卡片（进度 + 上一步/下一步/跳过） */
export function Tour({ steps, open, onClose }: { steps: TourStep[]; open: boolean; onClose: () => void }) {
  const [i, setI] = useState(0);
  if (!open) return null;
  const step = steps[i];
  const last = i === steps.length - 1;

  return (
    <div className="fixed inset-0 z-[var(--z-tour)] flex items-center justify-center bg-[var(--color-scrim)] backdrop-blur-[var(--blur-sm)]">
      <div className="glass-overlay w-full max-w-sm rounded-[var(--radius-xl)] p-6">
        <div className="flex items-start justify-between">
          <span className="flex size-8 items-center justify-center rounded-full holographic-bg text-sm font-bold text-[var(--color-holo-foreground)]">{i + 1}</span>
          <button onClick={onClose} className="text-text-tertiary hover:text-foreground" aria-label="跳过">
            <X className="size-4" />
          </button>
        </div>
        <h3 className="mt-3 font-display text-lg font-semibold">{step.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{step.content}</p>
        <div className="mt-5 flex items-center justify-between">
          <div className="flex gap-1.5">
            {steps.map((_, n) => (
              <span key={n} className={n === i ? 'h-1.5 w-5 rounded-full holographic-bg' : 'size-1.5 rounded-full bg-[var(--color-glass-border)]'} />
            ))}
          </div>
          <div className="flex gap-2">
            {i > 0 && (
              <Button variant="ghost" size="sm" onClick={() => setI(i - 1)}>
                上一步
              </Button>
            )}
            <Button variant="primary" size="sm" onClick={() => (last ? onClose() : setI(i + 1))}>
              {last ? '完成' : '下一步'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
