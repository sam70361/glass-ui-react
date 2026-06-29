import { useMemo, useState } from 'react';
import { ChevronRight, FileText, FolderOpen, Pencil, Plus } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { ScenarioFrame, ScenarioGate, ScenarioSkeleton, ScenarioToolbar, notify } from 'src/scenarios/_kit';
import { Card } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { Input } from 'src/components/ui/input';
import { DataTable, type Column } from 'src/components/ui/data-table';
import { Sheet, SheetBody, SheetContent, SheetFooter, SheetHeader, SheetTitle } from 'src/components/ui/sheet';
import { RichTextEditor } from 'src/components/ui/rich-text-editor';
import { UserAvatar } from 'src/components/shared/user-avatar';
import { team } from 'src/mocks/fixtures/core-data';
import { useScenarioData } from 'src/api';
import { CATEGORIES, CAT_LABEL, STATUS, type Article } from './cms.mock';

export default function CmsScenario() {
  const q = useScenarioData<{ INITIAL: Article[] }>('cms');
  return (
    <ScenarioGate query={q} skeleton={<ScenarioFrame id="cms" surface="outline"><ScenarioSkeleton /></ScenarioFrame>}>
      {({ INITIAL }) => <CmsInner initial={INITIAL} />}
    </ScenarioGate>
  );
}

function CmsInner({ initial }: { initial: Article[] }) {
  const [articles, setArticles] = useState<Article[]>(initial);
  const [cat, setCat] = useState('all');
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Article | null>(null);

  const list = useMemo(
    () =>
      articles.filter(
        (a) =>
          (cat === 'all' || a.category === cat) &&
          (status === 'all' || a.status === status) &&
          a.title.toLowerCase().includes(search.toLowerCase())
      ),
    [articles, cat, status, search]
  );

  const columns: Column<Article>[] = [
    {
      key: 'title',
      header: '标题',
      sortable: true,
      render: (a) => (
        <span className="flex items-center gap-2">
          <FileText className="size-4 shrink-0 text-text-tertiary" />
          <span className="line-clamp-1">{a.title}</span>
        </span>
      ),
    },
    { key: 'category', header: '栏目', render: (a) => <span className="text-text-tertiary">{CAT_LABEL[a.category]}</span> },
    {
      key: 'author',
      header: '作者',
      render: (a) => (
        <span className="flex items-center gap-2">
          <UserAvatar user={team.find((m) => m.name === a.author) ?? { name: a.author }} size="sm" />
          <span className="truncate text-sm">{a.author}</span>
        </span>
      ),
    },
    { key: 'status', header: '状态', render: (a) => <Badge variant={STATUS[a.status].variant}>{STATUS[a.status].label}</Badge> },
    { key: 'views', header: '浏览', sortable: true, align: 'end', render: (a) => <span className="tabular-nums text-text-secondary">{a.views.toLocaleString()}</span> },
    { key: 'id', header: '操作', render: (a) => <Button variant="ghost" size="icon-sm" onClick={() => setEditing(a)} aria-label="编辑"><Pencil className="size-4" /></Button> },
  ];

  const save = () => { notify.success('已保存', editing?.title); setEditing(null); };
  const publish = () => {
    if (!editing) return;
    setArticles((s) => s.map((a) => (a.id === editing.id ? { ...a, status: 'published' } : a)));
    notify.success('已发布', editing.title);
    setEditing(null);
  };
  const newArticle = () => {
    const a: Article = { id: `a-${Date.now()}`, title: '未命名文章', category: 'news', author: '小鱼儿', status: 'draft', views: 0, date: '今天' };
    setArticles((s) => [a, ...s]);
    setEditing(a);
  };

  return (
    <ScenarioFrame id="cms" surface="outline" actions={<Button variant="primary" onClick={newArticle}><Plus className="size-4" /> 新建文章</Button>}>
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="space-y-1">
          <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-text-tertiary">栏目</p>
          {CATEGORIES.map((c) => {
            const count = c.id === 'all' ? articles.length : articles.filter((a) => a.category === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={cn('flex w-full items-center gap-2.5 rounded-[var(--radius-md)] px-2.5 py-2 text-sm transition-colors', cat === c.id ? 'bg-[var(--color-glass-bg-active)] text-foreground' : 'text-text-secondary hover:bg-[var(--color-glass-bg)]')}
              >
                {cat === c.id ? <FolderOpen className="size-4 text-cyan" /> : <ChevronRight className="size-4" />}
                <span className="flex-1 text-left">{c.label}</span>
                <span className="text-xs text-text-tertiary">{count}</span>
              </button>
            );
          })}
        </aside>

        <div>
          <ScenarioToolbar
            search={search}
            onSearch={setSearch}
            searchPlaceholder="搜索标题…"
            filters={[
              { id: 'all', label: '全部' },
              { id: 'published', label: '已发布' },
              { id: 'review', label: '审核中' },
              { id: 'draft', label: '草稿' },
            ]}
            activeFilter={status}
            onFilter={setStatus}
          />
          <Card variant="outline" className="p-4">
            <DataTable data={list} columns={columns} pageSize={6} />
          </Card>
        </div>
      </div>

      <Sheet open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <SheetContent side="right" className="max-w-xl">
          <SheetHeader><SheetTitle>编辑文章</SheetTitle></SheetHeader>
          <SheetBody className="space-y-4">
            <Input defaultValue={editing?.title} placeholder="文章标题" />
            <RichTextEditor defaultValue={`<p>${editing?.title ?? ''} 的正文内容…</p>`} />
          </SheetBody>
          <SheetFooter>
            <Button variant="outline" onClick={save}>保存草稿</Button>
            <Button variant="primary" onClick={publish}>发布</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </ScenarioFrame>
  );
}
