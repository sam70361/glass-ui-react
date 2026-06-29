import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, LayoutGrid, List, Plus, Star } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { ScenarioToolbar, ScenarioGate, ScenarioEmpty, notify, ScenarioFrame } from 'src/scenarios/_kit';
import { Skeleton, SkeletonCard } from 'src/components/ui/skeleton';
import { Card } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { Input } from 'src/components/ui/input';
import { Rating } from 'src/components/ui/rating';
import { DataTable, type Column } from 'src/components/ui/data-table';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from 'src/components/ui/dialog';
import { Sheet, SheetBody, SheetContent, SheetFooter, SheetHeader, SheetTitle } from 'src/components/ui/sheet';
import { UserAvatar } from 'src/components/shared/user-avatar';
import { AVATAR_POOL } from 'src/mocks/fixtures/core-data';
import { useScenarioData } from 'src/api';
import { STAGE_LABEL, type Candidate } from './recruiting.mock';

type RecruitingData = { INITIAL: Candidate[]; STAGES: { id: string; label: string; color: string }[] };

export default function RecruitingScenario() {
  const q = useScenarioData<RecruitingData>('recruiting');
  return (
    <ScenarioGate
      query={q}
      skeleton={
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <Skeleton className="h-6 w-20" />
              {Array.from({ length: 3 }).map((_, j) => (
                <SkeletonCard key={j} className="h-28" />
              ))}
            </div>
          ))}
        </div>
      }
    >
      {(d) => <RecruitingInner {...d} />}
    </ScenarioGate>
  );
}

function RecruitingInner({ INITIAL, STAGES }: RecruitingData) {
  const [list, setList] = useState<Candidate[]>(INITIAL);
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [search, setSearch] = useState('');
  const [active, setActive] = useState<Candidate | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: '', role: '' });

  const filtered = useMemo(() => list.filter((c) => `${c.name}${c.role}`.includes(search)), [list, search]);

  const move = (id: string, dir: 1 | -1) => {
    setList((s) =>
      s.map((c) => {
        if (c.id !== id) return c;
        const idx = STAGES.findIndex((st) => st.id === c.stage);
        const next = Math.min(STAGES.length - 1, Math.max(0, idx + dir));
        return { ...c, stage: STAGES[next].id };
      })
    );
    setActive((a) => {
      if (!a || a.id !== id) return a;
      const idx = STAGES.findIndex((st) => st.id === a.stage);
      const next = Math.min(STAGES.length - 1, Math.max(0, idx + dir));
      return { ...a, stage: STAGES[next].id };
    });
    notify.success('已更新阶段');
  };

  const add = () => {
    if (!form.name.trim()) return;
    const c: Candidate = { id: `c-${Date.now()}`, name: form.name, role: form.role || '待定', stage: 'applied', score: 0, av: list.length + 3 };
    setList((s) => [c, ...s]);
    setAdding(false);
    setForm({ name: '', role: '' });
    notify.success('已添加候选人', c.name);
  };

  const columns: Column<Candidate>[] = [
    { key: 'name', header: '姓名', sortable: true, render: (c) => <span className="flex items-center gap-2"><UserAvatar user={{ name: c.name, avatar: AVATAR_POOL[c.av % AVATAR_POOL.length] }} size="sm" />{c.name}</span> },
    { key: 'role', header: '岗位' },
    { key: 'stage', header: '阶段', render: (c) => <Badge variant="cyan">{STAGE_LABEL[c.stage]}</Badge> },
    { key: 'score', header: '评分', align: 'end', sortable: true, render: (c) => (c.score > 0 ? <Rating value={c.score} readOnly size={12} /> : <span className="text-xs text-text-muted">待评</span>) },
    { key: 'id', header: '操作', render: (c) => <Button variant="ghost" size="sm" onClick={() => setActive(c)}>查看</Button> },
  ];

  return (
    <ScenarioFrame
      id="recruiting"
      actions={<Button variant="primary" onClick={() => setAdding(true)}><Plus className="size-4" /> 添加候选人</Button>}
    >
      <ScenarioToolbar
        search={search}
        onSearch={setSearch}
        searchPlaceholder="搜索候选人 / 岗位"
        actions={
          <div className="flex rounded-[var(--radius-md)] border border-[var(--color-glass-border)] p-0.5">
            <button onClick={() => setView('kanban')} className={cn('rounded-[calc(var(--radius-md)-2px)] p-1.5', view === 'kanban' ? 'bg-[var(--color-glass-bg-active)] text-cyan' : 'text-text-tertiary')} aria-label="看板"><LayoutGrid className="size-4" /></button>
            <button onClick={() => setView('list')} className={cn('rounded-[calc(var(--radius-md)-2px)] p-1.5', view === 'list' ? 'bg-[var(--color-glass-bg-active)] text-cyan' : 'text-text-tertiary')} aria-label="列表"><List className="size-4" /></button>
          </div>
        }
      />

      {view === 'kanban' ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {STAGES.map((st) => {
            const col = filtered.filter((c) => c.stage === st.id);
            return (
              <div key={st.id} className="flex flex-col">
                <div className="mb-3 flex items-center gap-2 px-1">
                  <span className="size-2.5 rounded-full" style={{ background: st.color }} />
                  <h3 className="text-sm font-semibold">{st.label}</h3>
                  <Badge className="px-1.5">{col.length}</Badge>
                </div>
                <div className="flex min-h-16 flex-col gap-2.5">
                  {col.length === 0 && <ScenarioEmpty message="暂无候选人" />}
                  {col.map((c) => (
                    <Card key={c.id} interactive onClick={() => setActive(c)} className="p-3.5 text-left">
                      <div className="flex items-center gap-2.5">
                        <UserAvatar user={{ name: c.name, avatar: AVATAR_POOL[c.av % AVATAR_POOL.length] }} size="md" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{c.name}</p>
                          <p className="truncate text-xs text-text-tertiary">{c.role}</p>
                        </div>
                      </div>
                      {c.score > 0 ? (
                        <div className="mt-2.5 flex items-center gap-1.5"><Rating value={c.score} readOnly size={14} /><span className="text-xs text-text-tertiary">{c.score}.0</span></div>
                      ) : (
                        <p className="mt-2.5 flex items-center gap-1 text-xs text-text-muted"><Star className="size-3.5" /> 待评估</p>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Card className="p-4">
          <DataTable data={filtered} columns={columns} pageSize={8} />
        </Card>
      )}

      {/* 候选人详情 */}
      <Sheet open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <SheetContent side="right">
          {active && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-3">
                  <UserAvatar user={{ name: active.name, avatar: AVATAR_POOL[active.av % AVATAR_POOL.length] }} size="lg" />
                  <div>
                    <SheetTitle>{active.name}</SheetTitle>
                    <p className="text-sm text-text-tertiary">{active.role}</p>
                  </div>
                </div>
              </SheetHeader>
              <SheetBody className="space-y-4">
                <div className="flex items-center gap-2"><span className="text-sm text-text-tertiary">当前阶段</span><Badge variant="cyan">{STAGE_LABEL[active.stage]}</Badge></div>
                <div className="flex items-center gap-2"><span className="text-sm text-text-tertiary">评分</span>{active.score > 0 ? <Rating value={active.score} readOnly /> : <span className="text-sm text-text-muted">待评估</span>}</div>
                <p className="rounded-[var(--radius-md)] bg-[var(--color-glass-bg)] p-3 text-sm text-text-secondary">候选人简历摘要：5 年相关经验，主导过多个核心项目，沟通与协作能力强。</p>
              </SheetBody>
              <SheetFooter>
                <Button variant="outline" onClick={() => move(active.id, -1)}><ChevronLeft className="size-4" /> 退回</Button>
                <Button variant="primary" onClick={() => move(active.id, 1)}>推进 <ChevronRight className="size-4" /></Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* 新建候选人 */}
      <Dialog open={adding} onOpenChange={setAdding}>
        <DialogContent>
          <DialogHeader><DialogTitle>添加候选人</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="姓名" />
            <Input value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} placeholder="应聘岗位" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAdding(false)}>取消</Button>
            <Button variant="primary" onClick={add} disabled={!form.name.trim()}>添加</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ScenarioFrame>
  );
}
