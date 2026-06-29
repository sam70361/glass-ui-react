import { Check, Download } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { ScenarioFrame, ScenarioGate } from 'src/scenarios/_kit';
import { SkeletonCard } from 'src/components/ui/skeleton';
import { DATA_PALETTE } from 'src/theme/palette';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { Progress } from 'src/components/ui/progress';
import { ComposedTrend, type MultiRow } from 'src/components/charts';
import { DataTable, type Column } from 'src/components/ui/data-table';
import { useScenarioData } from 'src/api';
import { type Invoice, type Plan, type Usage } from './billing.mock';

type BillingData = { PLANS: Plan[]; USAGE: Usage[]; INVOICES: Invoice[]; REVENUE_TREND: MultiRow[] };

const columns: Column<Invoice>[] = [
  { key: 'id', header: '发票号', className: 'font-mono text-sm' },
  { key: 'date', header: '日期', className: 'text-text-tertiary' },
  { key: 'amount', header: '金额', align: 'end', className: 'tabular-nums', render: (inv) => `¥${inv.amount}` },
  { key: 'status', header: '状态', className: 'w-24', render: () => <Badge variant="success">已支付</Badge> },
  {
    key: 'action',
    header: '',
    className: 'w-16',
    render: () => (
      <button className="text-text-tertiary hover:text-foreground" aria-label="下载">
        <Download className="size-4" />
      </button>
    ),
  },
];

export default function BillingScenario() {
  const q = useScenarioData<BillingData>('billing');
  return (
    <ScenarioFrame id="billing" surface="outline">
      <ScenarioGate
        query={q}
        skeleton={
          <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} className="h-32" />
            ))}
          </div>
        }
      >
        {({ PLANS, USAGE, INVOICES, REVENUE_TREND }) => (
          <>
      <div className="grid gap-4 lg:grid-cols-3">
        {PLANS.map((p) => (
          <Card key={p.name} className={cn('p-6', p.current && 'border-[rgba(var(--color-accent-cyan-rgb),0.5)] shadow-[var(--shadow-glow-cyan)]')}>
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold">{p.name}</h3>
              {p.current && <Badge variant="cyan">当前</Badge>}
            </div>
            <p className="mt-2 font-display text-3xl font-bold">
              ¥{p.price}
              <span className="text-sm font-normal text-text-tertiary">/月</span>
            </p>
            <ul className="mt-4 space-y-2">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className="size-4 text-success" /> {f}
                </li>
              ))}
            </ul>
            <Button variant={p.current ? 'outline' : 'primary'} className="mt-5 w-full">
              {p.current ? '当前套餐' : '升级'}
            </Button>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>收入趋势</CardTitle>
        </CardHeader>
        <CardContent>
          <ComposedTrend
            data={REVENUE_TREND}
            bar={{ key: 'revenue', name: '收入(千元)', color: DATA_PALETTE.cyan }}
            line={{ key: 'mrr', name: 'MRR(千元)', color: DATA_PALETTE.amber }}
          />
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>本月用量</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {USAGE.map((u) => (
              <div key={u.label}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-text-tertiary">{u.label}</span>
                  <span className="tabular-nums">{u.used} / {u.cap}</span>
                </div>
                <Progress value={(u.used / u.cap) * 100} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="p-0 lg:col-span-2">
          <CardHeader>
            <CardTitle>发票</CardTitle>
          </CardHeader>
          <div className="px-4 pb-4">
            <DataTable data={INVOICES} columns={columns} pageSize={5} />
          </div>
        </Card>
      </div>
          </>
        )}
      </ScenarioGate>
    </ScenarioFrame>
  );
}
