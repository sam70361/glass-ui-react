import type { LucideIcon } from 'lucide-react';
import { SearchX } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { EmptyState } from 'src/components/ui/empty-state';

/** 场景统一空态/零结果：居中铺满父容器 */
export function ScenarioEmpty({
  icon = SearchX,
  title,
  message,
  description,
  action,
  className,
}: {
  icon?: LucideIcon;
  title?: string;
  message?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex h-full min-h-48 items-center justify-center', className)}>
      <EmptyState icon={icon} title={message ?? title ?? '暂无内容'} description={description} action={action} />
    </div>
  );
}
