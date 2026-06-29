import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { MousePointerClick } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { Card } from 'src/components/ui/card';
import { ResizablePanels } from 'src/components/ui/resizable';
import { ScenarioEmpty } from './scenario-empty';

/**
 * 场景统一主从布局：左列表可拖拽调宽，右详情区；未选中显示空态。
 * 默认高度撑满视口剩余空间（在 ScenarioFrame 内）。
 */
export function MasterDetail({
  list,
  detail,
  hasSelection,
  emptyIcon = MousePointerClick,
  emptyTitle = '选择一项查看详情',
  emptyDescription,
  leftWidth = 320,
  className,
}: {
  list: ReactNode;
  detail: ReactNode;
  hasSelection: boolean;
  emptyIcon?: LucideIcon;
  emptyTitle?: string;
  emptyDescription?: string;
  leftWidth?: number;
  className?: string;
}) {
  return (
    <ResizablePanels
      className={cn(
        'h-[calc(100vh-14rem)] rounded-[var(--radius-lg)] border border-[var(--color-glass-border)]',
        className
      )}
      left={<div className="h-full overflow-y-auto">{list}</div>}
      leftDefault={leftWidth}
    >
      {hasSelection ? (
        <div className="h-full overflow-y-auto">{detail}</div>
      ) : (
        <ScenarioEmpty icon={emptyIcon} title={emptyTitle} description={emptyDescription} />
      )}
    </ResizablePanels>
  );
}

/**
 * 主从布局左栏的可选列表：封装各场景重复的「Card + 选中态按钮行」模式。
 * 场景只需提供 items 与 renderItem，消除手写的 selected/hover className 重复。
 */
export function MasterList<T>({
  items,
  selectedId,
  getId,
  onSelect,
  renderItem,
  className,
  itemClassName = 'flex items-center gap-3',
}: {
  items: T[];
  selectedId: string | null | undefined;
  getId: (item: T) => string;
  onSelect: (item: T) => void;
  renderItem: (item: T, selected: boolean) => ReactNode;
  className?: string;
  /** 控制每个列表项按钮的内部布局（默认水平居中），多行项可传 'flex flex-col gap-1.5' */
  itemClassName?: string;
}) {
  return (
    <Card className={cn('p-2', className)}>
      {items.map((item) => {
        const id = getId(item);
        const selected = id === selectedId;
        return (
          <button
            key={id}
            onClick={() => onSelect(item)}
            className={cn(
              'w-full rounded-[var(--radius-md)] p-3 text-left transition-colors',
              itemClassName,
              selected ? 'bg-[var(--color-glass-bg-active)]' : 'hover:bg-[var(--color-glass-bg)]'
            )}
          >
            {renderItem(item, selected)}
          </button>
        );
      })}
    </Card>
  );
}
