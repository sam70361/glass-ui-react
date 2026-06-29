import { useMemo, useState } from 'react';
import { Clock, Plus, Send } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { KeyValueList, ScenarioFrame, ScenarioGate } from 'src/scenarios/_kit';
import { Card } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { Input } from 'src/components/ui/input';
import { UserAvatar } from 'src/components/shared/user-avatar';
import { Timeline, TimelineItem } from 'src/components/shared/timeline';
import { team } from 'src/mocks/fixtures/core-data';
import { FilterChips } from 'src/components/shared/filter-chips';
import { useScenarioData } from 'src/api';
import { PRI, STATUS, FILTERS, type Ticket } from './tickets.mock';

export default function TicketsScenario() {
  const q = useScenarioData<{ TICKETS: Ticket[] }>('tickets');
  return (
    <ScenarioFrame
      id="tickets"
      actions={<Button variant="primary"><Plus className="size-4" /> 新建工单</Button>}
    >
      <ScenarioGate query={q}>{({ TICKETS }) => <TicketsInner tickets={TICKETS} />}</ScenarioGate>
    </ScenarioFrame>
  );
}

function TicketsInner({ tickets }: { tickets: Ticket[] }) {
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState<Ticket>(tickets[0]);
  const list = useMemo(() => tickets.filter((t) => filter === 'all' || t.status === filter), [tickets, filter]);

  return (
    <>
      <FilterChips
        className="mb-4"
        value={filter}
        onChange={setFilter}
        options={FILTERS.map((f) => ({ ...f, count: f.id === 'all' ? tickets.length : tickets.filter((t) => t.status === f.id).length }))}
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
        {/* 工单列表 */}
        <Card className="overflow-hidden p-0">
          {list.map((t) => {
            const st = STATUS[t.status];
            return (
              <button
                key={t.id}
                onClick={() => setActive(t)}
                className={cn(
                  'flex w-full items-center gap-3 border-b border-[var(--color-glass-border)] p-4 text-left transition-colors last:border-0',
                  active.id === t.id ? 'bg-[var(--color-glass-bg-active)]' : 'hover:bg-[var(--color-glass-bg)]'
                )}
              >
                <span className="mt-1 size-2 shrink-0 self-start rounded-full" style={{ background: PRI[t.priority] }} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-text-tertiary">{t.id}</span>
                    <Badge variant={st.variant}>{st.label}</Badge>
                    {t.slaWarn && (
                      <span className="flex items-center gap-1 text-xs text-danger">
                        <Clock className="size-3" /> {t.sla}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-1 text-sm font-medium">{t.subject}</p>
                  <p className="mt-0.5 text-xs text-text-tertiary">
                    {t.requester} · 指派给 {t.assignee} · {t.updated}
                  </p>
                </div>
              </button>
            );
          })}
        </Card>

        {/* 工单详情 */}
        <Card className="p-5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-text-tertiary">{active.id}</span>
            <Badge variant={STATUS[active.status].variant}>{STATUS[active.status].label}</Badge>
          </div>
          <h2 className="mt-1 font-display text-lg font-semibold">{active.subject}</h2>

          <KeyValueList
            className="my-4"
            items={[
              { label: '提交人', value: active.requester },
              { label: '负责人', value: active.assignee },
              { label: '优先级', value: <span style={{ color: PRI[active.priority] }}>{active.priority === 'high' ? '高' : active.priority === 'medium' ? '中' : '低'}</span> },
              { label: 'SLA', value: active.sla },
            ]}
          />

          <p className="mb-2 text-sm font-semibold">处理记录</p>
          <Timeline>
            <TimelineItem color="cyan" time="10 分钟前">
              <span className="font-medium">{active.requester}</span> 提交了工单
            </TimelineItem>
            <TimelineItem color="amber" time="8 分钟前">
              系统按优先级路由给 <span className="text-cyan">{active.assignee}</span>
            </TimelineItem>
            <TimelineItem color="success" time="5 分钟前" last>
              <span className="font-medium">{active.assignee}</span> 已接单，开始排查
            </TimelineItem>
          </Timeline>

          <form className="mt-4 flex items-center gap-2" onSubmit={(e) => e.preventDefault()}>
            <UserAvatar user={team.find((m) => m.name === active.assignee)} size="sm" fallback="我" />
            <Input placeholder="回复工单…" />
            <Button type="submit" variant="primary" size="icon" aria-label="发送">
              <Send className="size-4" />
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}
