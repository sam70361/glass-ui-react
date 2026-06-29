import { cn } from 'src/lib/utils';

/** 属性面板：分组 + 属性行（标签 + 控件），用于设计器右侧 inspector */
export function PropertyPanel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('space-y-5', className)}>{children}</div>;
}

export function PropertyGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-tertiary">{title}</p>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

export function PropertyRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="shrink-0 text-sm text-text-secondary">{label}</span>
      <div className="min-w-0 flex-1 text-end">{children}</div>
    </div>
  );
}
