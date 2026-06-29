import { Share2 } from 'lucide-react';

import { ScenarioFrame, ScenarioGate, notify } from 'src/scenarios/_kit';
import { SkeletonCard } from 'src/components/ui/skeleton';
import { Card } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { RichTextEditor } from 'src/components/ui/rich-text-editor';
import { UserAvatar } from 'src/components/shared/user-avatar';
import { team } from 'src/mocks/fixtures/core-data';
import { useScenarioData } from 'src/api';

export default function DocEditorScenario() {
  const q = useScenarioData<{ OUTLINE: string[]; DOC: string }>('doc-editor');
  return (
    <ScenarioFrame id="doc-editor" actions={<Button variant="primary" onClick={() => notify.success('已复制分享链接')}><Share2 className="size-4" /> 分享</Button>}>
      <ScenarioGate query={q} skeleton={<SkeletonCard className="h-[600px]" />}>
        {({ OUTLINE, DOC }) => (
      <div className="grid gap-4 lg:grid-cols-[200px_1fr]">
        <Card className="h-fit p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-tertiary">大纲</p>
          <div className="space-y-0.5">
            {OUTLINE.map((o, i) => (
              <button key={o} className="block w-full rounded-[var(--radius-sm)] px-2 py-1.5 text-start text-sm text-text-secondary transition-colors hover:bg-[var(--color-glass-bg)]">
                <span className="me-1.5 text-text-muted">{i + 1}.</span>
                {o}
              </button>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 border-t border-[var(--color-glass-border)] pt-3">
            <div className="flex -space-x-2">
              {team.slice(0, 3).map((m) => (
                <UserAvatar key={m.id} user={m} size="sm" className="ring-2 ring-[var(--color-bg-primary)]" />
              ))}
            </div>
            <span className="text-xs text-text-tertiary">3 人协作中</span>
          </div>
        </Card>
        <RichTextEditor defaultValue={DOC} />
      </div>
        )}
      </ScenarioGate>
    </ScenarioFrame>
  );
}
