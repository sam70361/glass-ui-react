import { useRef, useState } from 'react';
import { Grid3x3, Eye } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { ScenarioFrame, ScenarioGate } from 'src/scenarios/_kit';
import { SkeletonCard } from 'src/components/ui/skeleton';
import { Button } from 'src/components/ui/button';
import { Toolbar, ToolbarButton, ToolbarSeparator } from 'src/components/ui/toolbar';
import { ZoomControl } from 'src/components/ui/zoom-control';
import { Ruler } from 'src/components/ui/ruler';
import { PaperSurface, PAPER } from 'src/components/ui/paper-surface';
import { ResizablePanels } from 'src/components/ui/resizable';
import { PropertyPanel, PropertyGroup, PropertyRow } from 'src/components/ui/property-panel';
import { Input } from 'src/components/ui/input';
import { Segmented } from 'src/components/ui/toggle';
import { ColorPicker } from 'src/components/ui/color-picker';
import { QRCode, Stamp } from 'src/components/ui/doc-elements';
import { Badge } from 'src/components/ui/badge';
import { useScenarioData } from 'src/api';
import { PALETTE, type El, type ElType } from './report-designer.mock';

export default function ReportDesignerScenario() {
  const q = useScenarioData<{ INITIAL: El[] }>('report-designer');
  return (
    <ScenarioFrame id="report-designer" actions={<Button variant="primary"><Eye className="size-4" /> 预览导出</Button>}>
      <ScenarioGate query={q} skeleton={<SkeletonCard className="h-[600px]" />}>
        {({ INITIAL }) => <ReportDesignerInner initial={INITIAL} />}
      </ScenarioGate>
    </ScenarioFrame>
  );
}

function ReportDesignerInner({ initial }: { initial: El[] }) {
  const [els, setEls] = useState(initial);
  const [activeId, setActiveId] = useState<string | null>('e1');
  const [zoom, setZoom] = useState(0.7);
  const [grid, setGrid] = useState(true);
  const drag = useRef<{ id: string; ox: number; oy: number; sx: number; sy: number } | null>(null);

  const active = els.find((e) => e.id === activeId);
  const patch = (id: string, p: Partial<El>) => setEls((s) => s.map((e) => (e.id === id ? { ...e, ...p } : e)));

  const onDown = (e: React.PointerEvent, el: El) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { id: el.id, ox: el.x, oy: el.y, sx: e.clientX, sy: e.clientY };
    setActiveId(el.id);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const d = drag.current;
    patch(d.id, { x: Math.max(0, d.ox + (e.clientX - d.sx) / zoom), y: Math.max(0, d.oy + (e.clientY - d.sy) / zoom) });
  };
  const onUp = () => (drag.current = null);

  const addEl = (type: ElType) => {
    const id = `el-${Date.now()}`;
    setEls((s) => [...s, { id, type, x: 80, y: 80, w: type === 'qr' || type === 'stamp' ? 90 : 200, h: type === 'divider' ? 2 : type === 'table' ? 160 : 28, text: type === 'heading' ? '标题' : type === 'text' ? '文本内容' : '字段：值', size: type === 'heading' ? 22 : 13, color: PAPER.ink, align: 'left' }]);
    setActiveId(id);
  };

  return (
    <>
      <Toolbar className="mb-3">
        <ZoomControl zoom={zoom} onZoom={setZoom} />
        <ToolbarSeparator />
        <span className="px-1 text-xs text-text-tertiary">页面</span>
        <Badge variant="cyan">A4</Badge>
        <ToolbarSeparator />
        <ToolbarButton active={grid} onClick={() => setGrid((g) => !g)} title="网格">
          <Grid3x3 />
        </ToolbarButton>
      </Toolbar>

      <ResizablePanels
        className="h-[600px] rounded-[var(--radius-lg)] border border-[var(--color-glass-border)]"
        left={
          <div className="p-3">
            <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-text-tertiary">元件库</p>
            <div className="grid grid-cols-2 gap-2">
              {PALETTE.map((p) => (
                <button
                  key={p.type}
                  onClick={() => addEl(p.type)}
                  className="flex flex-col items-center gap-1.5 rounded-[var(--radius-md)] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] py-3 text-xs transition-colors hover:bg-[var(--color-glass-bg-hover)]"
                >
                  <p.icon className="size-4 text-cyan" />
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        }
        right={
          active ? (
            <div className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold">元件属性</span>
                <Badge>{active.type}</Badge>
              </div>
              <PropertyPanel>
                <PropertyGroup title="位置与尺寸">
                  <PropertyRow label="X"><Input className="h-8" value={Math.round(active.x)} onChange={(e) => patch(active.id, { x: +e.target.value || 0 })} /></PropertyRow>
                  <PropertyRow label="Y"><Input className="h-8" value={Math.round(active.y)} onChange={(e) => patch(active.id, { y: +e.target.value || 0 })} /></PropertyRow>
                  <PropertyRow label="宽"><Input className="h-8" value={Math.round(active.w)} onChange={(e) => patch(active.id, { w: +e.target.value || 0 })} /></PropertyRow>
                </PropertyGroup>
                {(active.type === 'heading' || active.type === 'text' || active.type === 'field') && (
                  <PropertyGroup title="文字">
                    <PropertyRow label="内容"><Input className="h-8" value={active.text} onChange={(e) => patch(active.id, { text: e.target.value })} /></PropertyRow>
                    <PropertyRow label="字号"><Input className="h-8" value={active.size} onChange={(e) => patch(active.id, { size: +e.target.value || 12 })} /></PropertyRow>
                    <PropertyRow label="对齐">
                      <Segmented value={active.align ?? 'left'} onValueChange={(v) => patch(active.id, { align: v as El['align'] })} options={[{ value: 'left', label: '左' }, { value: 'center', label: '中' }, { value: 'right', label: '右' }]} />
                    </PropertyRow>
                    <PropertyRow label="颜色"><ColorPicker value={active.color ?? PAPER.ink} onChange={(c) => patch(active.id, { color: c })} /></PropertyRow>
                  </PropertyGroup>
                )}
                <Button variant="danger" size="sm" className="w-full" onClick={() => { setEls((s) => s.filter((e) => e.id !== active.id)); setActiveId(null); }}>
                  删除元件
                </Button>
              </PropertyPanel>
            </div>
          ) : (
            <div className="p-6 text-center text-sm text-text-tertiary">从画布选择一个元件以编辑属性</div>
          )
        }
      >
        {/* 画布：刻度尺 + 纸张 */}
        <div className="flex h-full flex-col bg-[var(--color-surface-sunken)]">
          <div className="flex">
            <div className="size-6 shrink-0 border-b border-e border-[var(--color-glass-border)] bg-[var(--color-surface-sunken)]" />
            <Ruler orientation="horizontal" length={2000} zoom={zoom} />
          </div>
          <div className="flex min-h-0 flex-1">
            <Ruler orientation="vertical" length={2000} zoom={zoom} />
            <div className="flex-1 overflow-auto p-8" onPointerMove={onMove} onPointerUp={onUp}>
              <PaperSurface size="A4" zoom={zoom} grid={grid} onPointerDown={() => setActiveId(null)}>
                {els.map((el) => (
                  <div
                    key={el.id}
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      onDown(e, el);
                    }}
                    className={cn('absolute cursor-move touch-none', activeId === el.id && 'outline outline-2 outline-cyan')}
                    style={{ left: el.x * zoom, top: el.y * zoom, width: el.w * zoom, height: el.h * zoom }}
                  >
                    <ElementView el={el} zoom={zoom} />
                  </div>
                ))}
              </PaperSurface>
            </div>
          </div>
        </div>
      </ResizablePanels>
    </>
  );
}

function ElementView({ el, zoom }: { el: El; zoom: number }) {
  const style = { fontSize: (el.size ?? 13) * zoom, color: el.color ?? PAPER.ink, textAlign: el.align ?? 'left' } as React.CSSProperties;
  switch (el.type) {
    case 'heading':
      return <div className="font-bold" style={{ ...style, width: '100%' }}>{el.text}</div>;
    case 'text':
    case 'field':
      return <div style={{ ...style, width: '100%' }}>{el.text}</div>;
    case 'divider':
      return <div className="w-full" style={{ height: Math.max(1, 2 * zoom), backgroundColor: PAPER.ink }} />;
    case 'qr':
      return <QRCode size={el.w * zoom} value="report-018" />;
    case 'stamp':
      return <Stamp size={el.w * zoom} text="已审核" />;
    case 'image':
      return <div className="holographic-bg size-full rounded opacity-70" />;
    case 'table':
      return (
        <table className="w-full border-collapse" style={{ fontSize: 11 * zoom, color: PAPER.ink }}>
          <thead>
            <tr style={{ backgroundColor: PAPER.tableHeader }}>
              {['项目', '结果', '单位', '参考区间'].map((h) => (
                <th key={h} className="px-2 py-1 text-left" style={{ border: `1px solid ${PAPER.tableBorder}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['白细胞 WBC', '6.2', '10^9/L', '4.0-10.0'],
              ['红细胞 RBC', '4.8', '10^12/L', '4.0-5.5'],
              ['血红蛋白 HGB', '112 ↓', 'g/L', '120-160'],
              ['血小板 PLT', '230', '10^9/L', '100-300'],
            ].map((row) => (
              <tr key={row[0]}>
                {row.map((c, i) => (
                  <td key={i} className={cn('px-2 py-1', c.includes('↓') && 'font-semibold text-danger')} style={{ border: `1px solid ${PAPER.tableBorder}` }}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    default:
      return null;
  }
}
