import { X } from 'lucide-react';

import { Dialog, DialogContent } from 'src/components/ui/dialog';

export interface LightboxProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  src?: string;
  alt?: string;
  caption?: React.ReactNode;
}

/** 轻量图片放大查看 */
export function Lightbox({ open, onOpenChange, src, alt, caption }: LightboxProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent hideClose className="max-w-3xl border-none bg-transparent p-0 shadow-none backdrop-blur-none">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute -right-2 -top-10 rounded-full bg-[var(--color-glass-bg)] p-2 text-foreground hover:bg-[var(--color-glass-bg-hover)]"
          aria-label="关闭"
        >
          <X className="size-5" />
        </button>
        {src ? (
          <img src={src} alt={alt} className="max-h-[80vh] w-full rounded-[var(--radius-lg)] object-contain" />
        ) : (
          <div className="aspect-video w-full rounded-[var(--radius-lg)] holographic-bg opacity-30" />
        )}
        {caption && <p className="mt-3 text-center text-sm text-text-tertiary">{caption}</p>}
      </DialogContent>
    </Dialog>
  );
}
