import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { PageHeader } from 'src/components/shared/page-header';
import { Card } from 'src/components/ui/card';
import { Badge } from 'src/components/ui/badge';
import { scenarioPath } from 'src/routes/paths';
import { SCENARIOS, SCENARIO_CATEGORIES } from 'src/scenarios/registry';

export default function ScenariosHubView() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-up">
      <PageHeader
        title="场景库"
        description="同一套设计令牌与梯度组件，适配千行百业 —— 每个场景一个主题，点击进入查看代表性组件组合"
        actions={<Badge variant="solid">{SCENARIOS.filter((s) => s.tier === 'demo').length} 个综合场景</Badge>}
      />

      <div className="space-y-8">
        {SCENARIO_CATEGORIES.map((cat) => {
          const items = SCENARIOS.filter((s) => s.category === cat.id);
          return (
            <section key={cat.id}>
              <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold">
                {cat.label}
                <span className="text-sm font-normal text-text-tertiary">{items.length}</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((s) => {
                  const Icon = s.icon;
                  return (
                    <Card
                      key={s.id}
                      interactive
                      onClick={() => navigate(scenarioPath(s.id))}
                      className="group flex flex-col items-start gap-3 p-5 text-left"
                    >
                      <div className="flex w-full items-start justify-between">
                        <span
                          className="flex size-11 items-center justify-center rounded-[var(--radius-md)]"
                          style={{ background: `${s.accent}1f`, color: s.accent }}
                        >
                          <Icon className="size-5" />
                        </span>
                        <ArrowRight className="size-4 -translate-x-1 text-text-muted opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                      </div>
                      <div>
                        <p className="font-display font-semibold">{s.title}</p>
                        <p className="mt-1 line-clamp-2 min-h-[2.5em] text-sm text-text-tertiary">{s.desc}</p>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
