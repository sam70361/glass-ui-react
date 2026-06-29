import { DollarSign, Package, ShoppingCart, Truck } from 'lucide-react';

import { ScenarioFrame, ScenarioGate } from 'src/scenarios/_kit';
import { StatCard } from 'src/components/shared/stat-card';
import { DATA_PALETTE } from 'src/theme/palette';
import { Card } from 'src/components/ui/card';
import { Badge } from 'src/components/ui/badge';
import { DataTable, type Column } from 'src/components/ui/data-table';
import { SkeletonTable } from 'src/components/ui/skeleton';
import { useScenarioData } from 'src/api';
import { STATUS, type Customer, type Order } from './orders.mock';

interface OrdersPayload { orders: Order[]; customers: Customer[] }

const columns: Column<Order>[] = [
  { key: 'id', header: '订单号', sortable: true, className: 'font-mono' },
  { key: 'customer', header: '客户' },
  { key: 'items', header: '商品数', align: 'end', sortable: true },
  { key: 'amount', header: '金额', align: 'end', sortable: true, render: (o) => `¥${o.amount.toLocaleString()}` },
  { key: 'status', header: '状态', render: (o) => <Badge variant={STATUS[o.status].v}>{STATUS[o.status].t}</Badge> },
  { key: 'date', header: '日期', sortable: true },
];

export default function OrdersScenario() {
  const query = useScenarioData<OrdersPayload>('orders');

  return (
    <ScenarioFrame id="orders" surface="outline">
      <ScenarioGate query={query} skeleton={<SkeletonTable rows={8} cols={6} />}>
        {({ orders }) => {
          const total = orders.reduce((n, o) => n + o.amount, 0);
          return (
            <>
              <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                <StatCard label="今日订单" value={orders.length} change={12} icon={ShoppingCart} color={DATA_PALETTE.cyan} />
                <StatCard label="销售额" value={`¥${(total / 1000).toFixed(1)}k`} change={8} icon={DollarSign} color={DATA_PALETTE.emerald} />
                <StatCard label="待发货" value={orders.filter((o) => o.status === 'paid').length} icon={Package} color={DATA_PALETTE.amber} />
                <StatCard label="已发货" value={orders.filter((o) => o.status === 'shipped').length} icon={Truck} color={DATA_PALETTE.magenta} />
              </div>
              <Card className="p-4">
                <DataTable data={orders} columns={columns} selectable pageSize={8} />
              </Card>
            </>
          );
        }}
      </ScenarioGate>
    </ScenarioFrame>
  );
}
