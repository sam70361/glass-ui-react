import { AlertTriangle, Boxes, PackageCheck, Warehouse } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { ScenarioFrame, ScenarioGate } from 'src/scenarios/_kit';
import { StatCard } from 'src/components/shared/stat-card';
import { DATA_PALETTE } from 'src/theme/palette';
import { Card, CardHeader, CardTitle } from 'src/components/ui/card';
import { Badge } from 'src/components/ui/badge';
import { Progress } from 'src/components/ui/progress';
import { Alert } from 'src/components/ui/alert';
import { DataTable, type Column } from 'src/components/ui/data-table';
import { useScenarioData } from 'src/api';
import { type Sku } from './inventory.mock';

const columns: Column<Sku>[] = [
  { key: 'sku', header: 'SKU', className: 'font-mono text-sm' },
  { key: 'name', header: '名称' },
  {
    key: 'stock',
    header: '库存水位',
    className: 'w-48',
    render: (s) => <Progress value={Math.round((s.stock / s.cap) * 100)} className={cn(s.status === 'out' && 'opacity-40')} />,
  },
  { key: 'cap', header: '库存', align: 'end', className: 'tabular-nums', render: (s) => `${s.stock}/${s.cap}` },
  {
    key: 'status',
    header: '状态',
    className: 'w-24',
    render: (s) => (
      <Badge variant={s.status === 'ok' ? 'success' : s.status === 'low' ? 'amber' : 'danger'}>
        {s.status === 'ok' ? '充足' : s.status === 'low' ? '偏低' : '缺货'}
      </Badge>
    ),
  },
];

export default function InventoryScenario() {
  const q = useScenarioData<{ SKUS: Sku[] }>('inventory');
  return (
    <ScenarioFrame id="inventory" surface="outline">
      <ScenarioGate query={q}>
        {({ SKUS }) => {
          const low = SKUS.filter((s) => s.status !== 'ok');
          const totalStock = SKUS.reduce((n, s) => n + s.stock, 0);
          return (
            <>
              <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                <StatCard label="SKU 总数" value={SKUS.length} icon={Boxes} color={DATA_PALETTE.amber} />
                <StatCard label="在库总量" value={totalStock} icon={Warehouse} color={DATA_PALETTE.cyan} />
                <StatCard label="充足" value={SKUS.filter((s) => s.status === 'ok').length} icon={PackageCheck} color={DATA_PALETTE.emerald} />
                <StatCard label="预警" value={low.length} icon={AlertTriangle} color={DATA_PALETTE.magenta} />
              </div>

              {low.length > 0 && (
                <Alert variant="warning" title="补货预警" className="mb-4">
                  有 {low.length} 个 SKU 低于安全库存，建议尽快补货。
                </Alert>
              )}

              <Card className="p-0">
                <CardHeader>
                  <CardTitle>库存水位</CardTitle>
                </CardHeader>
                <div className="px-4 pb-4">
                  <DataTable data={SKUS} columns={columns} pageSize={5} />
                </div>
              </Card>
            </>
          );
        }}
      </ScenarioGate>
    </ScenarioFrame>
  );
}
