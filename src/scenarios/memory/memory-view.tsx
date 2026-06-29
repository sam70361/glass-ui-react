import { useMemo, useState } from 'react';
import { Brain, Pin, Plus, Trash2 } from 'lucide-react';

import { ScenarioFrame, ScenarioGate, notify } from 'src/scenarios/_kit';
import { DATA_PALETTE } from 'src/theme/palette';
import { Card, CardContent } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { SearchInput } from 'src/components/shared/search-input';
import { FilterChips } from 'src/components/shared/filter-chips';
import { StatCard } from 'src/components/shared/stat-card';
import { useScenarioData } from 'src/api';
import { CAT_LABEL, FILTERS, type Memory } from './memory.mock';

export default function MemoryScenario() {
  const q = useScenarioData<{ MEMORIES: Memory[] }>('memory');
  return (
    <ScenarioFrame
      id="memory"
      actions={<Button variant="primary" onClick={() => notify.info('新增记忆', '演示：可在此弹出记忆录入表单')}><Plus className="size-4" /> 新增记忆</Button>}
    >
      <ScenarioGate query={q}>{({ MEMORIES }) => <MemoryInner initial={MEMORIES} />}</ScenarioGate>
    </ScenarioFrame>
  );
}

function MemoryInner({ initial }: { initial: Memory[] }) {
  const [memories, setMemories] = useState(initial);
  const [cat, setCat] = useState('all');
  const [search, setSearch] = useState('');

  const list = useMemo(
    () => memories.filter((m) => (cat === 'all' || m.category === cat) && (!search || m.text.includes(search))),
    [memories, cat, search]
  );

  const togglePin = (id: string) => setMemories((ms) => ms.map((m) => (m.id === id ? { ...m, pinned: !m.pinned } : m)));
  const remove = (id: string) => setMemories((ms) => ms.filter((m) => m.id !== id));

  return (
    <>
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="记忆条目" value={memories.length} icon={Brain} color={DATA_PALETTE.emerald} />
        <StatCard label="高相关 (>80)" value={memories.filter((m) => m.relevance > 80).length} icon={Brain} color={DATA_PALETTE.cyan} />
        <StatCard label="已固定" value={memories.filter((m) => m.pinned).length} icon={Pin} color={DATA_PALETTE.magenta} />
        <StatCard label="平均相关度" value={`${Math.round(memories.reduce((n, m) => n + m.relevance, 0) / memories.length)}%`} icon={Brain} color={DATA_PALETTE.amber} />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2.5">
        <FilterChips value={cat} onChange={setCat} options={FILTERS} />
        <SearchInput value={search} onValueChange={setSearch} placeholder="搜索记忆…" className="ms-auto w-full max-w-xs" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {list.map((m) => {
          const meta = CAT_LABEL[m.category];
          return (
            <Card key={m.id} className="p-4">
              <CardContent className="p-0">
                <div className="mb-2 flex items-center justify-between">
                  <Badge variant={meta.variant}>{meta.label}</Badge>
                  <div className="flex items-center gap-1">
                    <button onClick={() => togglePin(m.id)} className={m.pinned ? 'text-cyan' : 'text-text-tertiary hover:text-foreground'} aria-label="固定">
                      <Pin className="size-4" />
                    </button>
                    <button onClick={() => remove(m.id)} className="text-text-tertiary hover:text-danger" aria-label="删除">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
                <p className="line-clamp-3 min-h-[3.6em] text-sm leading-relaxed text-text-secondary">{m.text}</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--color-track)]">
                    <div className="h-full rounded-full holographic-bg" style={{ width: `${m.relevance}%` }} />
                  </div>
                  <span className="text-xs tabular-nums text-text-tertiary">{m.relevance}%</span>
                </div>
                <p className="mt-2 text-xs text-text-muted">
                  来源：{m.source} · {m.time}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
