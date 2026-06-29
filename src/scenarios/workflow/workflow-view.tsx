import { useRef, useState } from 'react';
import { Play, Plus } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { KeyValueList, ScenarioFrame } from 'src/scenarios/_kit';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { Input } from 'src/components/ui/input';
import { INIT_NODES, EDGES, PALETTE, NODE_W, NODE_H, type Node } from './workflow.mock';

export default function WorkflowScenario() {
  const [nodes, setNodes] = useState(INIT_NODES);
  const [active, setActive] = useState(INIT_NODES[0]);
  const drag = useRef<{ id: string; ox: number; oy: number; sx: number; sy: number } | null>(null);

  const onDown = (e: React.PointerEvent, n: Node) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { id: n.id, ox: n.x, oy: n.y, sx: e.clientX, sy: e.clientY };
    setActive(n);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const d = drag.current;
    setNodes((ns) => ns.map((n) => (n.id === d.id ? { ...n, x: Math.max(0, d.ox + (e.clientX - d.sx)), y: Math.max(0, d.oy + (e.clientY - d.sy)) } : n)));
  };
  const onUp = () => (drag.current = null);

  return (
    <ScenarioFrame
      id="workflow"
      actions={<Button variant="primary"><Play className="size-4" /> 运行流程</Button>}
    >
      <div className="grid gap-4 lg:grid-cols-[180px_1fr_280px]">
        {/* 节点面板 */}
        <Card className="h-fit p-3">
          <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-text-tertiary">节点</p>
          <div className="space-y-1.5">
            {PALETTE.map((p) => (
              <div key={p.label} className="flex cursor-grab items-center gap-2.5 rounded-[var(--radius-md)] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] px-2.5 py-2 text-sm transition-colors hover:bg-[var(--color-glass-bg-hover)]">
                <span className="flex size-7 items-center justify-center rounded-[var(--radius-sm)]" style={{ background: `${p.color}1f`, color: p.color }}>
                  <p.icon className="size-3.5" />
                </span>
                {p.label}
              </div>
            ))}
          </div>
        </Card>

        {/* 画布 */}
        <Card className="relative h-[460px] overflow-hidden p-0" onPointerMove={onMove} onPointerUp={onUp}>
          <div
            className="absolute inset-0"
            style={{ backgroundImage: 'radial-gradient(var(--color-glass-border) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
          />
          <svg className="pointer-events-none absolute inset-0 size-full">
            {EDGES.map(([from, to], i) => {
              const a = nodes.find((n) => n.id === from)!;
              const b = nodes.find((n) => n.id === to)!;
              const ac = { x: a.x + NODE_W, y: a.y + NODE_H / 2 };
              const bc = { x: b.x, y: b.y + NODE_H / 2 };
              const mid = (ac.x + bc.x) / 2;
              return (
                <path
                  key={i}
                  d={`M ${ac.x} ${ac.y} C ${mid} ${ac.y}, ${mid} ${bc.y}, ${bc.x} ${bc.y}`}
                  fill="none"
                  stroke="rgba(var(--color-accent-cyan-rgb),0.5)"
                  strokeWidth={2}
                />
              );
            })}
          </svg>

          {nodes.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                onPointerDown={(e) => onDown(e, n)}
                className={cn(
                  'absolute flex cursor-grab touch-none items-center gap-2.5 rounded-[var(--radius-lg)] border bg-[var(--color-surface-solid)] px-3 shadow-[var(--shadow-card)] active:cursor-grabbing',
                  active.id === n.id ? 'border-[rgba(var(--color-accent-cyan-rgb),0.6)]' : 'border-[var(--color-glass-border)]'
                )}
                style={{ left: n.x, top: n.y, width: NODE_W, height: NODE_H }}
              >
                <span className="flex size-8 items-center justify-center rounded-[var(--radius-md)]" style={{ background: `${n.color}1f`, color: n.color }}>
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{n.title}</p>
                  <p className="text-[10px] uppercase text-text-muted">{n.type}</p>
                </div>
              </div>
            );
          })}
        </Card>

        {/* 属性面板 */}
        <Card className="h-fit">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>节点属性</CardTitle>
            <Badge variant="cyan">{active.type}</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-text-tertiary">节点名称</label>
              <Input value={active.title} onChange={(e) => setNodes((ns) => ns.map((n) => (n.id === active.id ? { ...n, title: e.target.value } : n)))} />
            </div>
            <KeyValueList
              items={[
                { label: '类型', value: active.type },
                { label: '入连接', value: active.type === 'trigger' ? '0' : '1' },
                { label: '出连接', value: active.type === 'condition' ? '2' : '1' },
                { label: '状态', value: <Badge variant="success">已配置</Badge> },
              ]}
            />
            <Button variant="secondary" className="w-full">
              <Plus className="size-4" /> 添加连接
            </Button>
          </CardContent>
        </Card>
      </div>
    </ScenarioFrame>
  );
}
