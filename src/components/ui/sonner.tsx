import { Toaster as SonnerToaster, toast } from 'sonner';

import { useSettings } from 'src/theme/settings';

/**
 * 全局 Toast（基于 sonner），样式贴合毛玻璃风格。
 */
export function Toaster() {
  const { mode } = useSettings();
  return (
    <SonnerToaster
      theme={mode}
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            'glass-overlay !rounded-[var(--radius-lg)] !text-foreground !border-[var(--color-glass-border)] !bg-[var(--color-surface-solid)]/90',
          description: '!text-muted-foreground',
          actionButton: '!bg-cyan !text-[var(--color-holo-foreground)]',
          cancelButton: '!bg-[var(--color-glass-bg)] !text-foreground',
        },
      }}
    />
  );
}

export { toast };
