import { useMemo, useState } from 'react';
import {
  Download,
  Folder,
  Grid2x2,
  HardDrive,
  List,
  Pencil,
  Trash2,
  Upload,
} from 'lucide-react';

import { cn } from 'src/lib/utils';
import { ScenarioFrame, ScenarioGate, ScenarioSkeleton, ScenarioToolbar, ScenarioEmpty, notify } from 'src/scenarios/_kit';
import { Card } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Progress } from 'src/components/ui/progress';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from 'src/components/ui/context-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import { useScenarioData } from 'src/api';
import { COLORS, FOLDERS, ICONS, type FileNode } from './files.mock';

export default function FilesScenario() {
  const q = useScenarioData<{ INITIAL: FileNode[] }>('files');
  return (
    <ScenarioGate query={q} skeleton={<ScenarioFrame id="files" surface="flat"><ScenarioSkeleton /></ScenarioFrame>}>
      {({ INITIAL }) => <FilesInner initial={INITIAL} />}
    </ScenarioGate>
  );
}

function FilesInner({ initial }: { initial: FileNode[] }) {
  const [files, setFiles] = useState<FileNode[]>(initial);
  const [folder, setFolder] = useState('design');
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const list = useMemo(
    () => files.filter((f) => f.folder === folder && f.name.toLowerCase().includes(search.toLowerCase())),
    [files, folder, search]
  );

  const upload = () => {
    const n = files.filter((f) => f.folder === folder).length + 1;
    setFiles((s) => [{ id: `up-${Date.now()}`, name: `上传文件-${n}.png`, type: 'image', size: '1.0 MB', modified: '刚刚', folder }, ...s]);
    notify.success('上传成功', `已添加到「${FOLDERS.find((f) => f.id === folder)?.label}」`);
  };
  const remove = (id: string, name: string) => { setFiles((s) => s.filter((f) => f.id !== id)); notify.success(`已删除 ${name}`); };

  return (
    <ScenarioFrame id="files" surface="flat" actions={<Button variant="primary" onClick={upload}><Upload className="size-4" /> 上传</Button>}>
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="space-y-4">
          <div className="space-y-1">
            <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-text-tertiary">目录</p>
            {FOLDERS.map((t) => {
              const count = files.filter((f) => f.folder === t.id).length;
              return (
                <button
                  key={t.id}
                  onClick={() => setFolder(t.id)}
                  className={cn(
                    'flex w-full items-center gap-2.5 rounded-[var(--radius-md)] px-2.5 py-2 text-sm transition-colors',
                    folder === t.id ? 'bg-[var(--color-glass-bg-active)] text-foreground' : 'text-text-secondary hover:bg-[var(--color-glass-bg)]'
                  )}
                >
                  <Folder className={cn('size-4', folder === t.id && 'text-cyan')} />
                  <span className="flex-1 text-left">{t.label}</span>
                  <span className="text-xs text-text-tertiary">{count}</span>
                </button>
              );
            })}
          </div>
          <Card variant="solid" className="p-4">
            <div className="mb-2 flex items-center gap-2 text-sm">
              <HardDrive className="size-4 text-cyan" />
              <span className="font-medium">存储用量</span>
            </div>
            <Progress value={64} className="mb-1.5" />
            <p className="text-xs text-text-tertiary">64 GB / 100 GB</p>
          </Card>
        </aside>

        <div>
          <ScenarioToolbar
            search={search}
            onSearch={setSearch}
            searchPlaceholder="搜索当前目录…"
            actions={
              <div className="flex rounded-[var(--radius-md)] border border-[var(--color-glass-border)] p-0.5">
                <button onClick={() => setView('grid')} className={cn('rounded-[calc(var(--radius-md)-2px)] p-1.5', view === 'grid' ? 'bg-[var(--color-glass-bg-active)] text-cyan' : 'text-text-tertiary')} aria-label="网格"><Grid2x2 className="size-4" /></button>
                <button onClick={() => setView('list')} className={cn('rounded-[calc(var(--radius-md)-2px)] p-1.5', view === 'list' ? 'bg-[var(--color-glass-bg-active)] text-cyan' : 'text-text-tertiary')} aria-label="列表"><List className="size-4" /></button>
              </div>
            }
          />

          {list.length === 0 ? (
            <ScenarioEmpty title="该目录为空" description="点击右上角「上传」添加文件，或更换目录" action={<Button variant="outline" size="sm" onClick={upload}><Upload className="size-4" /> 上传</Button>} />
          ) : view === 'grid' ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {list.map((f) => {
                const Icon = ICONS[f.type];
                return (
                  <ContextMenu key={f.id}>
                    <ContextMenuTrigger asChild>
                      <button className="group flex flex-col items-center gap-2 rounded-[var(--radius-lg)] border border-[var(--color-glass-border)] bg-[var(--color-surface-card)] p-4 text-center transition-colors hover:border-[var(--color-glass-border-hover)]">
                        <span className="flex size-12 items-center justify-center rounded-[var(--radius-md)] transition-transform group-hover:scale-110" style={{ background: `${COLORS[f.type]}1f`, color: COLORS[f.type] }}>
                          <Icon className="size-6" />
                        </span>
                        <span className="w-full truncate text-sm font-medium">{f.name}</span>
                        <span className="text-xs text-text-tertiary">{f.size === '—' ? '文件夹' : f.size} · {f.modified}</span>
                      </button>
                    </ContextMenuTrigger>
                    <FileMenu name={f.name} onDelete={() => remove(f.id, f.name)} />
                  </ContextMenu>
                );
              })}
            </div>
          ) : (
            <Card variant="solid" className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>名称</TableHead>
                    <TableHead className="w-28">大小</TableHead>
                    <TableHead className="w-28">修改时间</TableHead>
                    <TableHead className="w-16" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {list.map((f) => {
                    const Icon = ICONS[f.type];
                    return (
                      <TableRow key={f.id}>
                        <TableCell className="font-medium">
                          <span className="flex items-center gap-2">
                            <Icon className="size-4 shrink-0" style={{ color: COLORS[f.type] }} />
                            <span className="truncate">{f.name}</span>
                          </span>
                        </TableCell>
                        <TableCell className="text-text-tertiary">{f.size}</TableCell>
                        <TableCell className="text-text-tertiary">{f.modified}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon-sm" onClick={() => remove(f.id, f.name)} aria-label="删除"><Trash2 className="size-4" /></Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          )}
        </div>
      </div>
    </ScenarioFrame>
  );
}

function FileMenu({ name, onDelete }: { name: string; onDelete: () => void }) {
  return (
    <ContextMenuContent>
      <ContextMenuItem onSelect={() => notify.success(`开始下载 ${name}`)}><Download className="size-4" /> 下载</ContextMenuItem>
      <ContextMenuItem onSelect={() => notify.info('重命名', '演示场景：重命名面板可在此弹出')}><Pencil className="size-4" /> 重命名</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem destructive onSelect={onDelete}><Trash2 className="size-4" /> 删除</ContextMenuItem>
    </ContextMenuContent>
  );
}
