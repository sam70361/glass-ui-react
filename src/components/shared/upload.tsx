import * as React from 'react';
import { UploadCloud } from 'lucide-react';

import { cn } from 'src/lib/utils';

export interface UploadProps {
  onFiles?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  className?: string;
  hint?: string;
}

/** 拖拽上传区（演示用，不真正上传） */
export function Upload({ onFiles, accept, multiple = true, className, hint = '拖拽文件到此处，或点击选择' }: UploadProps) {
  const [dragging, setDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFiles = (list: FileList | null) => {
    if (!list) return;
    onFiles?.(Array.from(list));
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={cn(
        'flex cursor-pointer flex-col items-center justify-center gap-3 rounded-[var(--radius-lg)] border-2 border-dashed border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] px-6 py-10 text-center transition-colors',
        dragging && 'border-[rgba(var(--color-accent-cyan-rgb),0.6)] bg-[rgba(var(--color-accent-cyan-rgb),0.08)]',
        className
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-full holographic-bg text-[var(--color-holo-foreground)]">
        <UploadCloud className="size-6" />
      </div>
      <p className="text-sm text-text-tertiary">{hint}</p>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept={accept}
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
