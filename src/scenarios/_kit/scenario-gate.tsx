import type { ReactNode } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import { Inbox } from 'lucide-react';

import { Skeleton } from 'src/components/ui/skeleton';
import { ScenarioEmpty } from './scenario-empty';

/**
 * 场景数据加载门：统一所有场景「加载中 → 骨架 / 失败 → 空态 / 成功 → 内容」的过渡，
 * 与基准场景（orders/observability/rag）的 isPending/isError 行为对齐。
 * 成功时以 render-prop 把已就绪的数据交给子树，便于内层安全地初始化本地 state。
 */
export function ScenarioGate<T>({
  query,
  children,
  skeleton,
}: {
  query: UseQueryResult<T>;
  children: (data: T) => ReactNode;
  skeleton?: ReactNode;
}) {
  if (query.isPending) return <>{skeleton ?? <ScenarioSkeleton />}</>;
  if (query.isError || query.data == null)
    return <ScenarioEmpty icon={Inbox} title="数据加载失败" description="请稍后重试" />;
  return <>{children(query.data)}</>;
}

/** 默认场景骨架：四联指标 + 主区块，覆盖大多数场景的首屏结构 */
export function ScenarioSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
      <Skeleton className="h-72" />
    </div>
  );
}
