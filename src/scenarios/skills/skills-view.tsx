import { useState } from 'react';
import { Boxes, Download, Plus } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { ScenarioFrame, ScenarioGate, CodeBlock } from 'src/scenarios/_kit';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { Switch } from 'src/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/components/ui/tabs';
import { Markdown } from 'src/components/shared/markdown';
import { useScenarioData } from 'src/api';
import { SAMPLE, type Skill } from './skills.mock';

export default function SkillsScenario() {
  const q = useScenarioData<{ SKILLS: Skill[] }>('skills');
  return (
    <ScenarioFrame
      id="skills"
      actions={<Button variant="primary"><Plus className="size-4" /> 安装 Skill</Button>}
    >
      <ScenarioGate query={q}>{({ SKILLS }) => <SkillsInner initial={SKILLS} />}</ScenarioGate>
    </ScenarioFrame>
  );
}

function SkillsInner({ initial }: { initial: Skill[] }) {
  const [skills, setSkills] = useState(initial);
  const [active, setActive] = useState(initial[0]);
  const toggle = (id: string) => setSkills((ss) => ss.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)));

  return (
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-4 sm:grid-cols-2">
          {skills.map((s) => (
            <Card
              key={s.id}
              interactive
              className={cn('p-4', active.id === s.id && 'border-[rgba(var(--color-accent-cyan-rgb),0.4)]')}
              onClick={() => setActive(s)}
            >
              <CardContent className="p-0">
                <div className="flex items-start justify-between">
                  <span className="flex size-9 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-glass-bg-active)] text-cyan">
                    <Boxes className="size-4" />
                  </span>
                  <Switch checked={s.enabled} onClick={(e) => e.stopPropagation()} onCheckedChange={() => toggle(s.id)} />
                </div>
                <p className="mt-3 font-display font-semibold">{s.name}</p>
                <p className="mt-1 line-clamp-2 min-h-[2.5em] text-sm text-text-tertiary">{s.desc}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-text-tertiary">
                  <Badge variant="cyan">{s.category}</Badge>
                  <span>v{s.version}</span>
                  <span className="ms-auto">{s.runs} 次调用</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 详情 */}
        <Card className="h-fit">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>{active.name}</CardTitle>
            <Badge variant={active.enabled ? 'success' : 'default'}>{active.enabled ? '已启用' : '未启用'}</Badge>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="about">
              <TabsList>
                <TabsTrigger value="about">说明</TabsTrigger>
                <TabsTrigger value="code">代码</TabsTrigger>
              </TabsList>
              <TabsContent value="about">
                <Markdown content={`**${active.name}** v${active.version}\n\n${active.desc}\n\n- 分类：${active.category}\n- 累计调用：${active.runs} 次\n- 支持流式输出与重试`} />
                <Button variant="secondary" className="mt-4 w-full">
                  <Download className="size-4" /> 检查更新
                </Button>
              </TabsContent>
              <TabsContent value="code">
                <CodeBlock code={SAMPLE} lang="ts" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
  );
}
