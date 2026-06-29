import { AlertTriangle, Cpu, Power, Radio, Thermometer } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { GaugeRing, ScenarioFrame, ScenarioGate, notify } from 'src/scenarios/_kit';
import { DATA_PALETTE } from 'src/theme/palette';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { StatCard } from 'src/components/shared/stat-card';
import { Timeline, TimelineItem } from 'src/components/shared/timeline';
import { useScenarioData } from 'src/api';
import { STATUS, type DevStatus } from './iot.mock';

type IotData = {
  GAUGES: { label: string; value: number; unit: string; color: string }[];
  DEVICES: { id: string; name: string; status: DevStatus; temp: number; load: number }[];
};

export default function IotScenario() {
  const q = useScenarioData<IotData>('iot');
  return (
    <ScenarioFrame
      id="iot"
      surface="flat"
      actions={
        <Button variant="primary" onClick={() => notify.success('已刷新设备数据')}>
          <Radio className="size-4" /> 实时刷新
        </Button>
      }
    >
      <ScenarioGate query={q}>
        {({ GAUGES, DEVICES }) => (
          <>
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="设备总数" value={42} icon={Cpu} color={DATA_PALETTE.cyan} />
        <StatCard label="在线" value={38} icon={Power} color={DATA_PALETTE.emerald} />
        <StatCard label="告警" value={3} icon={AlertTriangle} color={DATA_PALETTE.amber} />
        <StatCard label="平均温度" value="43°C" icon={Thermometer} color={DATA_PALETTE.magenta} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>实时传感器</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap justify-around gap-4">
            {GAUGES.map((g) => (
              <GaugeRing key={g.label} value={g.value} unit={g.unit} label={g.label} color={g.color} />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="size-4 text-warning" /> 告警事件
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Timeline>
              <TimelineItem color="danger" time="2 分钟前">
                焊接臂 C3 温度超阈值 <span className="text-danger">67°C</span>
              </TimelineItem>
              <TimelineItem color="amber" time="15 分钟前">
                包装机 E5 失去连接
              </TimelineItem>
              <TimelineItem color="cyan" time="1 小时前" last>
                注塑机 A1 完成保养
              </TimelineItem>
            </Timeline>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>设备状态</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {DEVICES.map((d) => {
            const st = STATUS[d.status];
            return (
              <div key={d.id} className="rounded-[var(--radius-md)] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] p-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-text-tertiary">{d.id}</span>
                  <span className="size-2.5 rounded-full" style={{ background: st.color, boxShadow: `0 0 6px ${st.color}` }} />
                </div>
                <p className="mt-1 truncate text-sm font-medium">{d.name}</p>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className={cn(d.temp > 60 ? 'text-danger' : 'text-text-tertiary')}>{d.status === 'offline' ? '—' : `${d.temp}°C`}</span>
                  <Badge variant={st.variant}>{st.label}</Badge>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
          </>
        )}
      </ScenarioGate>
    </ScenarioFrame>
  );
}
