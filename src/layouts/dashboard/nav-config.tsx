import { LayoutGrid } from 'lucide-react';

import type { NavGroup } from 'src/components/nav-section';
import { paths } from 'src/routes/paths';
import { SCENARIOS, SCENARIO_CATEGORIES, scenarioNavPath } from 'src/scenarios/registry';
import { i18n } from 'src/i18n';

const t = (key: string) => i18n.t(key);

/** 收件箱未读角标（核心页元数据未含 badge，单独维护） */
const CORE_BADGES: Record<string, number> = { inbox: 3 };

/** 工作区（core 业务页）：由 registry tier:core 派生 */
function buildCoreGroup(): NavGroup {
  return {
    subheader: t('nav.workspace'),
    collapsible: true,
    items: SCENARIOS.filter((s) => s.tier === 'core').map((s) => ({
      title: t(`scenarios.items.${s.id}.title`),
      path: scenarioNavPath(s),
      icon: s.icon,
      badge: CORE_BADGES[s.id],
    })),
  };
}

/** 6 大场景分类：由 registry demo 分类派生 */
function buildScenarioGroups(): NavGroup[] {
  return SCENARIO_CATEGORIES.map((cat) => ({
    subheader: t(`scenarios.category.${cat.id}`),
    collapsible: true,
    items: SCENARIOS.filter((s) => s.tier === 'demo' && s.category === cat.id).map((s) => ({
      title: t(`scenarios.items.${s.id}.title`),
      path: scenarioNavPath(s),
      icon: s.icon,
    })),
  }));
}

/** 数据驱动导航配置：核心工作区 + 6 大综合场景分类 + 系统入口 */
export function getDashboardNav(): NavGroup[] {
  return [
    buildCoreGroup(),
    ...buildScenarioGroups(),
    {
      subheader: t('nav.system'),
      collapsible: true,
      items: [
        { title: t('nav.scenarioHub'), path: paths.scenarios, icon: LayoutGrid },
      ],
    },
  ];
}
