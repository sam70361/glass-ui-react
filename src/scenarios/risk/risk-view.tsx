import { Check, ShieldAlert, X } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { GaugeRing, KeyValueList, ScenarioFrame, ScenarioGate } from 'src/scenarios/_kit';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { DATA_PALETTE } from 'src/theme/palette';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { Alert } from 'src/components/ui/alert';
import { useScenarioData } from 'src/api';
import { type Rule } from './risk.mock';

type RiskData = { RULES: Rule[]; TXN_DETAIL: { label: string; value: string }[] };

export default function RiskScenario() {
  const q = useScenarioData<RiskData>('risk');
  return (
    <ScenarioFrame id="risk">
      <ScenarioGate query={q}>
        {({ RULES, TXN_DETAIL }) => {
          const score = RULES.filter((r) => r.hit).reduce((n, r) => n + r.weight, 0);
          const level = score >= 60 ? '高危' : score >= 30 ? '中风险' : '低风险';
          const color = score >= 60 ? DATA_PALETTE.red : score >= 30 ? DATA_PALETTE.amber : DATA_PALETTE.emerald;
          return (
            <>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>风险评分</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-2">
            <GaugeRing value={score} max={100} unit="分" color={color} size={140} />
            <Badge variant={score >= 60 ? 'danger' : score >= 30 ? 'amber' : 'success'}>{level}</Badge>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ShieldAlert className="size-4" /> 规则命中</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {RULES.map((r) => (
              <div key={r.rule} className="flex items-center gap-3 rounded-[var(--radius-md)] bg-[var(--color-glass-bg)] px-3 py-2.5">
                <span className={cn('flex size-6 items-center justify-center rounded-full', r.hit ? 'bg-[rgba(var(--color-danger-rgb),0.15)] text-danger' : 'bg-[rgba(var(--color-success-rgb),0.12)] text-success')}>
                  {r.hit ? <X className="size-3.5" /> : <Check className="size-3.5" />}
                </span>
                <span className="flex-1 text-sm">{r.rule}</span>
                <span className="text-xs text-text-tertiary">权重 {r.weight}</span>
                {r.hit && <Badge variant="danger">命中</Badge>}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>交易详情</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="warning" title="需人工复核" className="mb-4">
            该交易触发多条风控规则，已暂挂等待审批。
          </Alert>
          <KeyValueList items={TXN_DETAIL} />
          <div className="mt-5 flex justify-end gap-2">
            <Button variant="danger"><X className="size-4" /> 拒绝</Button>
            <Button variant="primary"><Check className="size-4" /> 放行</Button>
          </div>
        </CardContent>
      </Card>
            </>
          );
        }}
      </ScenarioGate>
    </ScenarioFrame>
  );
}
