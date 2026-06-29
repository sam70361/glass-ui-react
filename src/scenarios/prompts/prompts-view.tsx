import { useState } from 'react';
import { Plus, Variable } from 'lucide-react';

import { ScenarioFrame, ScenarioGate, MasterDetail, MasterList } from 'src/scenarios/_kit';
import { Skeleton, SkeletonCard } from 'src/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { CodeEditor } from 'src/components/ui/code-editor';
import { TagsInput } from 'src/components/ui/tags-input';
import { useScenarioData } from 'src/api';
import { type PromptTemplate } from './prompts.mock';

function PromptDetail({ prompt }: { prompt: PromptTemplate }) {
  const [vars, setVars] = useState<string[]>(prompt.vars);
  return (
    <div className="p-4">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>{prompt.name}</CardTitle>
          <div className="flex gap-2">
            <Badge>{prompt.category}</Badge>
            <Badge variant="cyan">{prompt.version}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <CodeEditor key={prompt.id} defaultValue={prompt.body} lang="prompt" />
          <div>
            <p className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
              <Variable className="size-4 text-cyan" /> 变量
            </p>
            <TagsInput value={vars} onChange={setVars} placeholder="添加变量…" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline">测试运行</Button>
            <Button variant="primary">保存版本</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PromptsScenario() {
  const q = useScenarioData<{ PROMPTS: PromptTemplate[] }>('prompts');
  return (
    <ScenarioFrame
      id="prompts"
      actions={<Button variant="primary"><Plus className="size-4" /> 新建模板</Button>}
    >
      <ScenarioGate
        query={q}
        skeleton={
          <div className="grid grid-cols-[280px_1fr] gap-4 h-[calc(100vh-14rem)]">
            <div className="flex flex-col gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-14 rounded-lg" />
              ))}
            </div>
            <SkeletonCard className="h-full" />
          </div>
        }
      >
        {({ PROMPTS }) => <PromptsInner prompts={PROMPTS} />}
      </ScenarioGate>
    </ScenarioFrame>
  );
}

function PromptsInner({ prompts }: { prompts: PromptTemplate[] }) {
  const [active, setActive] = useState<PromptTemplate>(prompts[0]);
  return (
      <MasterDetail
        hasSelection={!!active}
        leftWidth={300}
        list={
          <MasterList
            items={prompts}
            selectedId={active?.id}
            getId={(p) => p.id}
            onSelect={setActive}
            renderItem={(p) => (
              <>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-text-tertiary">{p.body.slice(0, 24)}…</p>
                </div>
                <Badge variant="cyan">{p.version}</Badge>
              </>
            )}
          />
        }
        detail={<PromptDetail key={active.id} prompt={active} />}
      />
  );
}
