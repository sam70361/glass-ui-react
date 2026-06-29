import { useState } from 'react';
import { Bot, CircleStop, Play, Wrench } from 'lucide-react';

import { ScenarioFrame, ScenarioGate, MasterDetail, MasterList, KeyValueList, CodeBlock, notify } from 'src/scenarios/_kit';
import { Skeleton, SkeletonCard } from 'src/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { Timeline, TimelineItem, type TimelineColor } from 'src/components/shared/timeline';
import { useScenarioData } from 'src/api';
import { STATUS, type AgentRun } from './agents.mock';

type AgentStep = { tool: string; color: TimelineColor; detail: string; time: string };
type AgentsData = { RUNS: AgentRun[]; STEPS: AgentStep[] };

function RunDetail({ run, steps }: { run: AgentRun; steps: AgentStep[] }) {
  return (
    <div className="space-y-4 p-4">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>{run.name}</CardTitle>
          <div className="flex gap-2">
            <Badge variant={STATUS[run.status].variant}>{STATUS[run.status].label}</Badge>
            <Button variant="danger" size="sm">
              <CircleStop className="size-4" /> 终止
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <KeyValueList
            items={[
              { label: '模型', value: run.model },
              { label: '步数', value: run.steps },
              { label: '耗时', value: run.took },
              { label: '工具调用', value: '5 次' },
            ]}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="size-4" /> 工具调用时间线
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Timeline>
            {steps.map((s, i) => (
              <TimelineItem key={i} color={s.color} time={s.time} last={i === steps.length - 1}>
                <code className="rounded bg-[var(--color-glass-bg-active)] px-1.5 py-0.5 font-mono text-xs text-cyan">{s.tool}</code>
                <span className="ms-2 text-text-secondary">{s.detail}</span>
              </TimelineItem>
            ))}
          </Timeline>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>运行日志</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock
            lang="log"
            code={`[06:42:01] agent started · model=${run.model}\n[06:42:01] → tool web.search("2026 设计趋势")\n[06:42:02] ← 8 results\n[06:42:03] → tool browser.open(top=3)\n[06:42:05] ← extracted 1.2k tokens\n[06:42:07] → memory.write(5 entries)\n[06:42:07] composing report…`}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default function AgentsScenario() {
  const q = useScenarioData<AgentsData>('agents');
  return (
    <ScenarioFrame
      id="agents"
      actions={
        <Button variant="primary" onClick={() => notify.success('Agent 已启动', '开始执行工具调用链')}>
          <Play className="size-4" /> 运行 Agent
        </Button>
      }
    >
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
        {(d) => <AgentsInner {...d} />}
      </ScenarioGate>
    </ScenarioFrame>
  );
}

function AgentsInner({ RUNS, STEPS }: AgentsData) {
  const [active, setActive] = useState<AgentRun>(RUNS[0]);
  return (
    <MasterDetail
      hasSelection={!!active}
      list={
        <MasterList
          items={RUNS}
          selectedId={active?.id}
          getId={(r) => r.id}
          onSelect={setActive}
          renderItem={(r) => (
            <>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-glass-bg-active)] text-cyan">
                <Bot className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{r.name}</p>
                <p className="text-xs text-text-tertiary">{r.model} · {r.steps} 步</p>
              </div>
              <Badge variant={STATUS[r.status].variant}>{STATUS[r.status].label}</Badge>
            </>
          )}
        />
      }
      detail={<RunDetail run={active} steps={STEPS} />}
    />
  );
}
