import { getScenario } from 'src/scenarios/registry';
import type { Surface } from 'src/theme/theme-config';

/** 场景页统一外壳（精简版）：标题 + 一句描述 +（右侧）动作区 + 下方内容。
 *  标题/描述默认取自 getScenario(id)，也可由 title/desc 覆盖。
 *  surface 可为该场景局部指定表面风格（场景级覆盖，非全局设置），用于差异化展示。 */
export function ScenarioFrame({
  id,
  title,
  desc,
  actions,
  surface,
  children,
}: {
  id?: string;
  title?: string;
  desc?: string;
  actions?: React.ReactNode;
  surface?: Surface;
  children: React.ReactNode;
}) {
  const s = id ? getScenario(id) : undefined;
  const heading = title ?? s?.title;
  const description = desc ?? s?.desc;

  return (
    <div className="animate-fade-up" data-surface={surface}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-bold tracking-tight">{heading}</h1>
          {description && <p className="mt-1 text-sm text-text-tertiary">{description}</p>}
        </div>
        {actions && <div className="flex flex-shrink-0 items-center gap-2">{actions}</div>}
      </div>

      {children}
    </div>
  );
}
