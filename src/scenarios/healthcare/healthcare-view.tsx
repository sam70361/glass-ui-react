import { useMemo, useState } from 'react';
import { Activity, FlaskConical, HeartPulse, Stethoscope } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { ScenarioEmpty, GaugeRing, KeyValueList, ScenarioFrame, ScenarioGate } from 'src/scenarios/_kit';
import { DATA_PALETTE } from 'src/theme/palette';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Badge } from 'src/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import { SearchInput } from 'src/components/shared/search-input';
import { Timeline, TimelineItem } from 'src/components/shared/timeline';
import { useScenarioData } from 'src/api';
import { FLAG, type Patient } from './healthcare.mock';

export default function HealthcareScenario() {
  const q = useScenarioData<{ PATIENTS: Patient[] }>('healthcare');
  return (
    <ScenarioFrame id="healthcare" surface="outline">
      <ScenarioGate query={q}>{({ PATIENTS }) => <HealthcareInner patients={PATIENTS} />}</ScenarioGate>
    </ScenarioFrame>
  );
}

function HealthcareInner({ patients }: { patients: Patient[] }) {
  const [activeId, setActiveId] = useState(patients[0].id);
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => patients.filter((p) => `${p.name}${p.id}${p.dept}`.includes(search)), [patients, search]);
  const active = patients.find((p) => p.id === activeId);

  return (
      <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
        <div className="space-y-3">
          <SearchInput value={search} onValueChange={setSearch} placeholder="搜索患者 / 编号 / 科室" />
          <Card variant="outline" className="p-2">
            {filtered.length === 0 ? (
              <ScenarioEmpty title="无匹配患者" className="min-h-32" />
            ) : (
              filtered.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActiveId(p.id)}
                  className={cn('flex w-full items-center gap-3 rounded-[var(--radius-md)] p-3 text-left transition-colors', activeId === p.id ? 'bg-[var(--color-glass-bg-active)]' : 'hover:bg-[var(--color-glass-bg)]')}
                >
                  <span className={cn('size-2.5 rounded-full', p.risk === 'high' ? 'bg-danger' : p.risk === 'mid' ? 'bg-warning' : 'bg-success')} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{p.name} · {p.age}</p>
                    <p className="text-xs text-text-tertiary">{p.id} · {p.dept}</p>
                  </div>
                  <Badge variant={p.status === '住院' ? 'cyan' : p.status === '观察' ? 'amber' : 'default'}>{p.status}</Badge>
                </button>
              ))
            )}
          </Card>
        </div>

        {active && (
          <Tabs defaultValue="overview" key={active.id}>
            <TabsList>
              <TabsTrigger value="overview"><HeartPulse className="size-4" /> 体征</TabsTrigger>
              <TabsTrigger value="labs"><FlaskConical className="size-4" /> 检验</TabsTrigger>
              <TabsTrigger value="visits"><Activity className="size-4" /> 就诊</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card variant="outline">
                <CardHeader><CardTitle>生命体征 · {active.name}</CardTitle></CardHeader>
                <CardContent className="flex flex-wrap justify-around gap-4">
                  <GaugeRing value={active.vitals.hr} max={140} unit="bpm" label="心率" color={DATA_PALETTE.magenta} />
                  <GaugeRing value={active.vitals.spo2} max={100} unit="%" label="血氧" color={DATA_PALETTE.cyan} />
                  <GaugeRing value={active.vitals.temp} max={42} unit="°C" label="体温" color={DATA_PALETTE.amber} />
                  <GaugeRing value={active.vitals.sbp} max={180} unit="mmHg" label="收缩压" color={DATA_PALETTE.emerald} />
                </CardContent>
              </Card>
              <Card variant="outline">
                <CardHeader><CardTitle className="flex items-center gap-2"><Stethoscope className="size-4" /> 基本信息</CardTitle></CardHeader>
                <CardContent>
                  <KeyValueList
                    items={[
                      { label: '患者编号', value: active.id },
                      { label: '科室', value: active.dept },
                      { label: '主治医师', value: active.doctor },
                      { label: '入院日期', value: active.admitted },
                      { label: '过敏史', value: active.allergy },
                    ]}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="labs">
              <Card variant="outline" className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow><TableHead>检验项目</TableHead><TableHead>结果</TableHead><TableHead>参考范围</TableHead><TableHead className="w-20">标记</TableHead></TableRow>
                  </TableHeader>
                  <TableBody>
                    {active.labs.map((l) => (
                      <TableRow key={l.name}>
                        <TableCell className="font-medium">{l.name}</TableCell>
                        <TableCell className="font-mono tabular-nums">{l.value}</TableCell>
                        <TableCell className="text-text-tertiary">{l.ref}</TableCell>
                        <TableCell><Badge variant={FLAG[l.flag].v}>{FLAG[l.flag].t}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="visits">
              <Card variant="outline">
                <CardHeader><CardTitle>就诊记录</CardTitle></CardHeader>
                <CardContent>
                  <Timeline>
                    {active.visits.map((v, i) => (
                      <TimelineItem key={i} color={v.color} time={v.time} last={i === active.visits.length - 1}>{v.text}</TimelineItem>
                    ))}
                  </Timeline>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
  );
}
