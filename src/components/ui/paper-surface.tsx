import * as React from 'react';

import { cn } from 'src/lib/utils';

const SIZES: Record<string, { w: number; h: number }> = {
  A4: { w: 794, h: 1123 },
  A5: { w: 559, h: 794 },
  Letter: { w: 816, h: 1056 },
  Card: { w: 600, h: 380 },
};

/**
 * 纸面凭证模拟色（内容域）。这是"模拟真实纸张/打印凭证"的刻意硬编码——
 * 纸张需黑白稳定、所见即所得，不随 data-theme/data-mode 切换。集中于此统一管理，
 * 任何纸面元件（report-designer / doc-elements / 设计指南纸张示例）均引用这里，勿再散落内联。
 */
export const PAPER = {
  surface: '#ffffff',
  ink: '#10131c',
  grid: 'rgba(20, 24, 40, 0.06)',
  tableHeader: '#f0f2f7',
  tableBorder: '#d7dbe6',
} as const;

/**
 * 纸张画布：固定尺寸 + 阴影 + 可选网格，用于排版设计器。
 * 注意：纸面色（PAPER）为"模拟真实纸张"的刻意硬编码，
 * 不随明暗主题切换（打印/导出所见即所得），因此不令牌化。
 */
export function PaperSurface({
  size = 'A4',
  zoom = 1,
  grid,
  className,
  children,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { size?: keyof typeof SIZES | 'A4' | 'A5' | 'Letter' | 'Card'; zoom?: number; grid?: boolean }) {
  const dim = SIZES[size] ?? SIZES.A4;
  return (
    <div
      className={cn('relative shrink-0 overflow-hidden rounded-sm shadow-[var(--shadow-z24)]', className)}
      style={{
        backgroundColor: PAPER.surface,
        color: PAPER.ink,
        width: dim.w * zoom,
        height: dim.h * zoom,
        backgroundImage: grid ? `linear-gradient(${PAPER.grid} 1px, transparent 1px), linear-gradient(90deg, ${PAPER.grid} 1px, transparent 1px)` : undefined,
        backgroundSize: grid ? `${20 * zoom}px ${20 * zoom}px` : undefined,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
