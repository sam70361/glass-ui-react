import { useState } from 'react';
import { Check, FileCode, GitMerge, MessageSquarePlus, X } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { notify, ScenarioEmpty, ScenarioFrame, ScenarioGate, ScenarioSkeleton } from 'src/scenarios/_kit';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { AutosizeTextarea } from 'src/components/ui/autosize-textarea';
import { Timeline, TimelineItem } from 'src/components/shared/timeline';
import { UserAvatar } from 'src/components/shared/user-avatar';
import { team } from 'src/mocks/fixtures/core-data';
import { useScenarioData } from 'src/api';
import { type DiffFile, type ReviewState } from './code-review.mock';

type CodeReviewData = { FILES: DiffFile[]; CHECKS: { label: string; ok: boolean }[] };

export default function CodeReviewScenario() {
  const q = useScenarioData<CodeReviewData>('code-review');
  return (
    <ScenarioGate query={q} skeleton={<ScenarioFrame id="code-review" surface="flat"><ScenarioSkeleton /></ScenarioFrame>}>
      {(d) => <CodeReviewInner {...d} />}
    </ScenarioGate>
  );
}

function CodeReviewInner({ FILES, CHECKS }: CodeReviewData) {
  const [active, setActive] = useState(FILES[0].path);
  const [comments, setComments] = useState<Record<string, { by: string; text: string }[]>>({});
  const [draft, setDraft] = useState('');
  const [review, setReview] = useState<ReviewState>('pending');

  const file = FILES.find((f) => f.path === active)!;
  const fileComments = comments[active] ?? [];

  const addComment = () => {
    if (!draft.trim()) return;
    setComments((c) => ({ ...c, [active]: [...(c[active] ?? []), { by: '小鱼儿', text: draft.trim() }] }));
    setDraft('');
    notify.success('评论已添加');
  };

  const reviewBadge =
    review === 'approved' ? <Badge variant="success">已批准</Badge> : review === 'changes' ? <Badge variant="danger">请求修改</Badge> : <Badge variant="amber">待评审</Badge>;

  return (
    <ScenarioFrame
      id="code-review"
      surface="flat"
      actions={<Button variant="primary" disabled={review !== 'approved'} onClick={() => notify.success('PR 已合并', 'refactor(ui): Button 变体改用 CVA')}><GitMerge className="size-4" /> 合并 PR</Button>}
    >
      <Card variant="solid" className="mb-4">
        <CardContent className="flex flex-wrap items-center gap-3">
          <Badge variant="cyan">#284</Badge>
          <span className="font-medium">refactor(ui): Button 变体改用 CVA</span>
          {reviewBadge}
          <span className="ms-auto flex items-center gap-2 text-sm text-text-tertiary">
            <UserAvatar user={team[1]} size="sm" /> 陈星辰 · {FILES.length} 文件 · +{FILES.reduce((n, f) => n + f.add, 0)} -{FILES.reduce((n, f) => n + f.del, 0)}
          </span>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[240px_1fr_280px]">
        {/* 文件树 */}
        <Card variant="solid" className="p-2">
          <p className="mb-1 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-text-tertiary">变更文件</p>
          {FILES.map((f) => (
            <button
              key={f.path}
              onClick={() => setActive(f.path)}
              className={cn('flex w-full items-center gap-2 rounded-[var(--radius-md)] px-2 py-2 text-left text-sm transition-colors', active === f.path ? 'bg-[var(--color-glass-bg-active)]' : 'hover:bg-[var(--color-glass-bg)]')}
            >
              <FileCode className="size-4 shrink-0 text-text-tertiary" />
              <span className="min-w-0 flex-1 truncate text-xs">{f.path.split('/').pop()}</span>
              <span className="shrink-0 text-[10px] tabular-nums"><span className="text-success">+{f.add}</span> <span className="text-danger">-{f.del}</span></span>
              {(comments[f.path]?.length ?? 0) > 0 && <span className="size-1.5 rounded-full bg-cyan" />}
            </button>
          ))}
        </Card>

        {/* diff + 评论 */}
        <div className="space-y-4">
          <Card variant="solid" className="p-0">
            <CardHeader><CardTitle><span className="font-mono text-sm">{file.path}</span></CardTitle></CardHeader>
            <div className="overflow-x-auto font-mono text-xs">
              {file.diff.map((l, i) => (
                <div key={i} className={cn('flex gap-3 px-4 py-1', l.type === 'add' && 'bg-[rgba(var(--color-success-rgb),0.1)]', l.type === 'del' && 'bg-[rgba(var(--color-danger-rgb),0.1)]')}>
                  <span className="w-6 select-none text-text-muted">{l.type === 'add' ? '+' : l.type === 'del' ? '-' : ''}</span>
                  <span className={cn(l.type === 'add' && 'text-success', l.type === 'del' && 'text-danger', l.type === 'ctx' && 'text-text-secondary')}>{l.text}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="solid">
            <CardHeader><CardTitle className="text-sm">行内评论 · {file.path.split('/').pop()}</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {fileComments.length === 0 && <ScenarioEmpty />}
              {fileComments.map((c, i) => (
                <div key={i} className="flex gap-2.5">
                  <UserAvatar user={team[0]} size="sm" />
                  <div className="min-w-0 flex-1 rounded-[var(--radius-md)] bg-[var(--color-glass-bg)] p-2.5">
                    <p className="text-xs font-medium">{c.by}</p>
                    <p className="text-sm text-text-secondary">{c.text}</p>
                  </div>
                </div>
              ))}
              <div className="flex items-end gap-2">
                <AutosizeTextarea value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="添加评论…" />
                <Button variant="outline" size="sm" onClick={addComment} disabled={!draft.trim()}><MessageSquarePlus className="size-4" /> 评论</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 检查 + 评审 */}
        <div className="space-y-4">
          <Card variant="solid">
            <CardHeader><CardTitle>合并检查</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {CHECKS.map((c) => (
                <div key={c.label} className="flex items-center gap-2 text-sm">
                  <span className="flex size-5 items-center justify-center rounded-full bg-[rgba(var(--color-success-rgb),0.15)] text-success"><Check className="size-3" /></span>
                  {c.label}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card variant="solid">
            <CardHeader><CardTitle>评审决定</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <Button variant="primary" className="w-full" onClick={() => { setReview('approved'); notify.success('已批准该 PR'); }}><Check className="size-4" /> 批准</Button>
              <Button variant="outline" className="w-full" onClick={() => { setReview('changes'); notify.info('已请求修改'); }}><X className="size-4" /> 请求修改</Button>
            </CardContent>
          </Card>

          <Card variant="solid">
            <CardHeader><CardTitle>评审记录</CardTitle></CardHeader>
            <CardContent>
              <Timeline>
                <TimelineItem color="cyan" time="1 小时前">小鱼儿 发起评审</TimelineItem>
                <TimelineItem color="amber" time="40 分钟前">苏墨言 建议补充测试</TimelineItem>
                <TimelineItem color={review === 'approved' ? 'success' : review === 'changes' ? 'magenta' : 'cyan'} time="刚刚" last>
                  {review === 'approved' ? '你 批准 ✓' : review === 'changes' ? '你 请求修改' : '等待你的评审'}
                </TimelineItem>
              </Timeline>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScenarioFrame>
  );
}
