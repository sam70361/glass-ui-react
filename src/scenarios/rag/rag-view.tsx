import { useState } from 'react';
import { Database, FileText, Search, Upload } from 'lucide-react';

import { ScenarioFrame, notify } from 'src/scenarios/_kit';
import { DATA_PALETTE } from 'src/theme/palette';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { Input } from 'src/components/ui/input';
import { Progress } from 'src/components/ui/progress';
import { Skeleton } from 'src/components/ui/skeleton';
import { EmptyState } from 'src/components/ui/empty-state';
import { StatCard } from 'src/components/shared/stat-card';
import { useRagQuery, useUploadRagDocMutation } from 'src/api';

export default function RagScenario() {
  const [q, setQ] = useState('品牌配色规范是什么？');
  const { data, isPending, isError } = useRagQuery();
  const upload = useUploadRagDocMutation();

  const docs = data?.docs ?? [];
  const results = data?.results ?? [];
  const chunks = docs.reduce((n, d) => n + d.chunks, 0);

  function handleUpload() {
    const name = `新增文档-${Date.now().toString().slice(-4)}.pdf`;
    upload.mutate(name, {
      onSuccess: () => notify.success('文档已上传', '开始向量化与索引'),
      onError: () => notify.error('上传失败', '请稍后重试'),
    });
  }

  return (
    <ScenarioFrame
      id="rag"
      actions={
        <Button variant="primary" onClick={handleUpload} disabled={upload.isPending}>
          <Upload className="size-4" /> {upload.isPending ? '上传中…' : '上传文档'}
        </Button>
      }
    >
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="文档" value={isPending ? '—' : docs.length} icon={FileText} color={DATA_PALETTE.blue} />
        <StatCard label="向量块" value={isPending ? '—' : chunks} icon={Database} color={DATA_PALETTE.cyan} />
        <StatCard label="维度" value={1536} icon={Database} color={DATA_PALETTE.violet} />
        <StatCard label="平均召回" value="0.87" icon={Search} color={DATA_PALETTE.emerald} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>知识库文档</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {isError ? (
              <EmptyState icon={FileText} title="文档加载失败" description="请稍后重试" />
            ) : isPending ? (
              Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-12" />)
            ) : (
              docs.map((d) => (
                <div key={d.id} className="flex items-center gap-3 rounded-[var(--radius-md)] bg-[var(--color-glass-bg)] p-3">
                  <FileText className="size-4 shrink-0 text-cyan" />
                  <span className="flex-1 truncate text-sm">{d.name}</span>
                  <span className="text-xs text-text-tertiary">{d.chunks} 块</span>
                  <Badge variant={d.status === '已索引' ? 'success' : 'amber'}>{d.status}</Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>检索召回</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-3 flex gap-2">
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="输入查询…" />
              <Button variant="primary" size="icon" aria-label="检索"><Search className="size-4" /></Button>
            </div>
            <div className="space-y-2.5">
              {isPending ? (
                Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20" />)
              ) : (
                results.map((r, i) => (
                  <div key={i} className="rounded-[var(--radius-md)] border border-[var(--color-glass-border)] p-3">
                    <p className="text-sm text-text-secondary">{r.text}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="cyan">{r.source}</Badge>
                      <Progress value={r.score * 100} className="flex-1" />
                      <span className="text-xs tabular-nums text-text-tertiary">{r.score.toFixed(2)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </ScenarioFrame>
  );
}
