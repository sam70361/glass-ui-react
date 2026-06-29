import { useState } from 'react';

import { cn } from 'src/lib/utils';
import { Lightbox } from 'src/components/overlays/lightbox';
import { DATA_PALETTE } from 'src/theme/palette';

export interface GalleryItem {
  id: string;
  /** 真实图片 src，缺省时用渐变占位 */
  src?: string;
  gradient?: [string, string];
  caption?: string;
}

/** 图片画廊：瀑布流网格 + 点击放大 */
export function ImageGallery({ items, className }: { items: GalleryItem[]; className?: string }) {
  const [preview, setPreview] = useState<GalleryItem | null>(null);
  return (
    <>
      <div className={cn('columns-2 gap-3 sm:columns-3 [&>*]:mb-3', className)}>
        {items.map((it, i) => (
          <button
            key={it.id}
            onClick={() => setPreview(it)}
            className="block w-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-glass-border)]"
            style={{ aspectRatio: i % 3 === 0 ? '3/4' : i % 2 === 0 ? '1/1' : '4/3' }}
          >
            {it.src ? (
              <img src={it.src} alt={it.caption} className="size-full object-cover transition-transform hover:scale-105" />
            ) : (
              <span
                className="block size-full transition-transform hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${it.gradient?.[0] ?? DATA_PALETTE.cyan}, ${it.gradient?.[1] ?? DATA_PALETTE.magenta})` }}
              />
            )}
          </button>
        ))}
      </div>
      <Lightbox open={!!preview} onOpenChange={(o) => !o && setPreview(null)} src={preview?.src} caption={preview?.caption} />
    </>
  );
}
