import { Plus } from 'lucide-react';

import { ScenarioFrame, ScenarioGate } from 'src/scenarios/_kit';
import { Skeleton, SkeletonCard } from 'src/components/ui/skeleton';
import { Card } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { UserAvatar } from 'src/components/shared/user-avatar';
import { team } from 'src/mocks/fixtures/core-data';
import { useScenarioData } from 'src/api';
import { type Deal, type Stage } from './crm.mock';

export default function CrmScenario() {
  const q = useScenarioData<{ STAGES: Stage[]; DEALS: Deal[] }>('crm');
  return (
    <ScenarioFrame id="crm" actions={<Button variant="primary"><Plus className="size-4" /> 新建商机</Button>}>
      <ScenarioGate
        query={q}
        skeleton={
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <Skeleton className="h-6 w-20" />
                {Array.from({ length: 3 }).map((_, j) => (
                  <SkeletonCard key={j} className="h-28" />
                ))}
              </div>
            ))}
          </div>
        }
      >
        {({ STAGES, DEALS }) => (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {STAGES.map((st) => {
          const deals = DEALS.filter((d) => d.stage === st.id);
          const sum = deals.reduce((n, d) => n + d.amount, 0);
          return (
            <div key={st.id} className="flex flex-col">
              <div className="mb-3 flex items-center gap-2 px-1">
                <span className="size-2.5 rounded-full" style={{ background: st.color }} />
                <h3 className="text-sm font-semibold">{st.label}</h3>
                <Badge className="px-1.5">{deals.length}</Badge>
                <span className="ms-auto text-xs text-text-tertiary">¥{(sum / 1000).toFixed(0)}k</span>
              </div>
              <div className="flex flex-col gap-2.5">
                {deals.map((d) => (
                  <Card key={d.id} interactive className="p-3.5">
                    <p className="text-sm font-medium">{d.name}</p>
                    <p className="mt-1 font-display text-lg font-bold text-cyan">¥{d.amount.toLocaleString()}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <UserAvatar user={team[d.owner]} size="sm" />
                      <Badge variant="cyan">{st.label}</Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
        )}
      </ScenarioGate>
    </ScenarioFrame>
  );
}
