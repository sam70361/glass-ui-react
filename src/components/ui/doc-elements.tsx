import { useRef } from 'react';
import { Eraser } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { DATA_PALETTE } from 'src/theme/palette';
import { PAPER } from './paper-surface';

/**
 * 文档元件（签名/二维码/条码/印章）：纸面色（PAPER.surface / PAPER.ink）为"模拟纸面凭证"
 * 的刻意硬编码，不随明暗主题切换（凭证需黑白稳定、可打印），因此不令牌化；集中引用 PAPER。
 */

/** 签名板：canvas 指针绘制 */
export function Signature({ className, color = PAPER.ink }: { className?: string; color?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  const pos = (e: React.PointerEvent) => {
    const c = ref.current!;
    const r = c.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * c.width, y: ((e.clientY - r.top) / r.height) * c.height };
  };
  const start = (e: React.PointerEvent) => {
    drawing.current = true;
    const ctx = ref.current!.getContext('2d')!;
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  };
  const move = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const ctx = ref.current!.getContext('2d')!;
    const p = pos(e);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  };
  const end = () => (drawing.current = false);
  const clear = () => {
    const c = ref.current!;
    c.getContext('2d')!.clearRect(0, 0, c.width, c.height);
  };

  return (
    <div className={cn('relative overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-glass-border)]', className)} style={{ backgroundColor: PAPER.surface }}>
      <canvas ref={ref} width={360} height={140} className="w-full touch-none" onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerLeave={end} />
      <button onClick={clear} className="absolute end-2 top-2 flex items-center gap-1 rounded-full px-2 py-1 text-xs" style={{ backgroundColor: PAPER.grid, color: PAPER.ink }} aria-label="清除">
        <Eraser className="size-3" /> 清除
      </button>
    </div>
  );
}

/** 二维码（演示用确定性图案，非真实编码） */
export function QRCode({ size = 96, value = '', className }: { size?: number; value?: string; className?: string }) {
  const n = 21;
  const seed = Array.from(value || 'glass').reduce((a, c) => a + c.charCodeAt(0), 0);
  const cells = Array.from({ length: n * n }, (_, i) => {
    const r = Math.floor(i / n);
    const c = i % n;
    // 三个定位角
    const corner = (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);
    if (corner) {
      const rr = r % (n - 7 < r ? n : 7);
      const cc = c % (n - 7 < c ? n : 7);
      const inEye = (x: number) => x === 0 || x === 6 || (x >= 2 && x <= 4);
      return inEye(Math.min(rr, 6)) && inEye(Math.min(cc, 6)) ? 1 : 0;
    }
    return (seed * (i + 1)) % 3 === 0 ? 1 : 0;
  });
  return (
    <div className={cn('inline-grid p-1', className)} style={{ backgroundColor: PAPER.surface, width: size, height: size, gridTemplateColumns: `repeat(${n}, 1fr)` }}>
      {cells.map((v, i) => (
        <span key={i} style={{ background: v ? PAPER.ink : 'transparent' }} />
      ))}
    </div>
  );
}

/** 条形码（演示用竖线） */
export function Barcode({ value = '', height = 48, className }: { value?: string; height?: number; className?: string }) {
  const seed = Array.from(value || '6901234567892').map((c) => c.charCodeAt(0));
  const bars = Array.from({ length: 48 }, (_, i) => (seed[i % seed.length] + i) % 4);
  return (
    <div className={cn('inline-flex flex-col items-center gap-1 p-2', className)} style={{ backgroundColor: PAPER.surface }}>
      <div className="flex items-end gap-px" style={{ height }}>
        {bars.map((b, i) => (
          <span key={i} style={{ backgroundColor: PAPER.ink, width: b === 0 ? 2 : 1, height: '100%', opacity: b === 3 ? 0.15 : 1 }} />
        ))}
      </div>
      <span className="font-mono text-[10px]" style={{ color: PAPER.ink }}>{value || '6901234567892'}</span>
    </div>
  );
}

/** 水印：重复斜向文字覆盖层 */
export function Watermark({ text = 'LUMINA', className }: { text?: string; className?: string }) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-0 select-none overflow-hidden opacity-[0.06]', className)}
      style={{
        backgroundImage: `repeating-linear-gradient(-30deg, transparent, transparent 120px, currentColor 120px, currentColor 121px)`,
      }}
      aria-hidden
    >
      <div className="flex size-full flex-wrap content-start gap-x-16 gap-y-12 p-8 text-2xl font-bold -rotate-[30deg]">
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i}>{text}</span>
        ))}
      </div>
    </div>
  );
}

/** 印章：圆形红章 SVG */
export function Stamp({ text = '已审核', size = 96, color = DATA_PALETTE.red, className }: { text?: string; size?: number; color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={cn('opacity-90', className)} style={{ transform: 'rotate(-12deg)' }}>
      <circle cx="50" cy="50" r="44" fill="none" stroke={color} strokeWidth="3.5" />
      <circle cx="50" cy="50" r="36" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M50 18 L54 28 L46 28 Z" fill={color} />
      <text x="50" y="58" textAnchor="middle" fill={color} fontSize="20" fontWeight="700">
        {text}
      </text>
    </svg>
  );
}
