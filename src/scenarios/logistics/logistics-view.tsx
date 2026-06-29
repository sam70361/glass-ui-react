import { useState } from 'react';
import { CheckCircle2, MapPin, Package, Truck } from 'lucide-react';

import { MasterDetail, MasterList, ScenarioFrame, ScenarioGate } from 'src/scenarios/_kit';
import { Skeleton, SkeletonCard } from 'src/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { DATA_PALETTE } from 'src/theme/palette';
import { Badge } from 'src/components/ui/badge';
import { Timeline, TimelineItem } from 'src/components/shared/timeline';
import { HorizontalTimeline } from 'src/components/ui/misc';
import { useScenarioData } from 'src/api';
import { STATUS_BADGE, type Shipment } from './logistics.mock';

function ShipmentDetail({ shipment }: { shipment: Shipment }) {
  return (
    <div className="space-y-4 p-4">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>运单 {shipment.id}</CardTitle>
          <span className="text-sm text-text-tertiary">预计 {shipment.eta}</span>
        </CardHeader>
        <CardContent>
          <HorizontalTimeline
            className="mb-6"
            items={[
              { label: '已揽收', done: true },
              { label: '运输中', done: true },
              { label: '派送中', color: DATA_PALETTE.amber },
              { label: '已签收' },
            ]}
          />
          <div className="flex h-56 items-center justify-center rounded-[var(--radius-lg)] border border-[var(--color-glass-border)] bg-[var(--color-surface-sunken)]">
            <div className="flex flex-col items-center gap-2 text-text-tertiary">
              <MapPin className="size-8 text-cyan" />
              <span className="text-sm">地图轨迹（演示占位）</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Package className="size-4" /> 物流轨迹</CardTitle>
        </CardHeader>
        <CardContent>
          <Timeline>
            <TimelineItem color="cyan" time="今天 08:12">到达【上海转运中心】</TimelineItem>
            <TimelineItem color="cyan" time="昨天 22:40">从【杭州集散中心】发出</TimelineItem>
            <TimelineItem color="success" time="昨天 16:05"><CheckCircle2 className="inline size-3.5 text-success" /> 已揽收</TimelineItem>
            <TimelineItem color="amber" time="昨天 14:30" last>商家已下单</TimelineItem>
          </Timeline>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LogisticsScenario() {
  const q = useScenarioData<{ SHIPMENTS: Shipment[] }>('logistics');
  return (
    <ScenarioFrame id="logistics">
      <ScenarioGate
        query={q}
        skeleton={
          <div className="grid grid-cols-[280px_1fr] gap-4 h-[calc(100vh-14rem)]">
            <div className="flex flex-col gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-14 rounded-lg" />
              ))}
            </div>
            <SkeletonCard className="h-full" />
          </div>
        }
      >
        {({ SHIPMENTS }) => <LogisticsInner shipments={SHIPMENTS} />}
      </ScenarioGate>
    </ScenarioFrame>
  );
}

function LogisticsInner({ shipments }: { shipments: Shipment[] }) {
  const [active, setActive] = useState<Shipment>(shipments[0]);
  return (
      <MasterDetail
        hasSelection={!!active}
        leftWidth={300}
        list={
          <MasterList
            items={shipments}
            selectedId={active?.id}
            getId={(s) => s.id}
            onSelect={setActive}
            renderItem={(s) => (
              <>
                <Truck className="size-4 shrink-0 text-cyan" />
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-sm font-medium">{s.id}</p>
                  <p className="truncate text-xs text-text-tertiary">{s.to}</p>
                </div>
                <Badge variant={STATUS_BADGE[s.status].variant}>{STATUS_BADGE[s.status].label}</Badge>
              </>
            )}
          />
        }
        detail={<ShipmentDetail shipment={active} />}
      />
  );
}
