import { useState } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { MasterList, ScenarioFrame, ScenarioGate } from 'src/scenarios/_kit';
import { Skeleton, SkeletonCard } from 'src/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { DATA_PALETTE } from 'src/theme/palette';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { Input } from 'src/components/ui/input';
import { Segmented } from 'src/components/ui/toggle';
import { AreaTrend } from 'src/components/charts';
import { useScenarioData } from 'src/api';
import { type Ticker } from './trading.mock';

type TradingData = { WATCH: Ticker[]; TREND: { label: string; value: number }[] };

export default function TradingScenario() {
  const q = useScenarioData<TradingData>('trading');
  return (
    <ScenarioFrame id="trading">
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
        {(d) => <TradingInner {...d} />}
      </ScenarioGate>
    </ScenarioFrame>
  );
}

function TradingInner({ WATCH, TREND }: TradingData) {
  const [active, setActive] = useState<Ticker>(WATCH[0]);
  const [side, setSide] = useState<'buy' | 'sell'>('buy');

  return (
    <div className="grid gap-4 lg:grid-cols-[260px_1fr_280px]">
        {/* 自选 */}
        <MasterList
          items={WATCH}
          selectedId={active.sym}
          getId={(w) => w.sym}
          onSelect={setActive}
          itemClassName="flex items-center justify-between"
          renderItem={(w) => (
            <>
              <div>
                <p className="font-mono text-sm font-semibold">{w.sym}</p>
                <p className="text-xs text-text-tertiary">{w.name}</p>
              </div>
              <div className="text-end">
                <p className="text-sm font-medium tabular-nums">{w.price}</p>
                <p className={cn('flex items-center gap-0.5 text-xs', w.chg >= 0 ? 'text-success' : 'text-danger')}>
                  {w.chg >= 0 ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                  {Math.abs(w.chg)}%
                </p>
              </div>
            </>
          )}
        />

        {/* 行情图 */}
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>
              {active.sym} · {active.name}
            </CardTitle>
            <span className={cn('font-display text-xl font-bold tabular-nums', active.chg >= 0 ? 'text-success' : 'text-danger')}>
              {active.price} <span className="text-sm">({active.chg >= 0 ? '+' : ''}{active.chg}%)</span>
            </span>
          </CardHeader>
          <CardContent>
            <AreaTrend data={TREND} color={active.chg >= 0 ? DATA_PALETTE.emerald : DATA_PALETTE.red} height={300} />
          </CardContent>
        </Card>

        {/* 下单 */}
        <Card>
          <CardHeader>
            <CardTitle>下单</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Segmented value={side} onValueChange={(v) => setSide(v as typeof side)} options={[{ value: 'buy', label: '买入' }, { value: 'sell', label: '卖出' }]} className="w-full [&>*]:flex-1" />
            <div className="space-y-1.5">
              <label className="text-xs text-text-tertiary">价格</label>
              <Input defaultValue={active.price} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-text-tertiary">数量</label>
              <Input defaultValue={100} />
            </div>
            <div className="flex justify-between rounded-[var(--radius-md)] bg-[var(--color-glass-bg)] px-3 py-2 text-sm">
              <span className="text-text-tertiary">预估金额</span>
              <span className="font-medium tabular-nums">¥{(active.price * 100).toLocaleString()}</span>
            </div>
            <Button variant={side === 'buy' ? 'primary' : 'danger'} className="w-full">
              {side === 'buy' ? '买入' : '卖出'} {active.sym}
            </Button>
            <Badge variant="amber" className="w-full justify-center">演示行情，非真实交易</Badge>
          </CardContent>
        </Card>
      </div>
  );
}
