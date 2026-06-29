import { Plus, Workflow, Zap } from 'lucide-react';

import { PageHeader } from 'src/components/shared/page-header';
import { Card } from 'src/components/ui/card';
import { Switch } from 'src/components/ui/switch';
import { Badge } from 'src/components/ui/badge';
import { Button } from 'src/components/ui/button';
import { useAppStore } from 'src/store';

export default function AutomationsView() {
  const automations = useAppStore((s) => s.automations);
  const toggle = useAppStore((s) => s.toggleAutomation);

  return (
    <div className="animate-fade-up">
      <PageHeader
        title="自动化"
        description="用规则减少重复劳动，让协作更顺畅"
        actions={
          <Button variant="primary">
            <Plus className="size-4" /> 新建规则
          </Button>
        }
      />

      <div className="mb-5 flex gap-3 text-sm">
        <span className="rounded-full bg-[var(--color-glass-bg)] px-3 py-1.5">
          共 <strong>{automations.length}</strong> 条规则
        </span>
        <span className="rounded-full bg-[rgba(var(--color-success-rgb),0.12)] px-3 py-1.5 text-success">
          已启用 <strong>{automations.filter((a) => a.enabled).length}</strong>
        </span>
        <span className="rounded-full bg-[var(--color-glass-bg)] px-3 py-1.5 text-text-tertiary">
          累计执行 <strong>{automations.reduce((n, a) => n + a.runs, 0)}</strong> 次
        </span>
      </div>

      <div className="space-y-3">
        {automations.map((a) => (
          <Card key={a.id} className="flex items-center gap-4 p-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-glass-bg-active)] text-cyan">
              <Workflow className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium">{a.name}</p>
                <Badge variant="cyan" className="gap-1">
                  <Zap className="size-3" />
                  {a.runs} 次
                </Badge>
              </div>
              <p className="mt-0.5 truncate text-sm text-text-tertiary">{a.description}</p>
            </div>
            <Switch checked={a.enabled} onCheckedChange={() => toggle(a.id)} />
          </Card>
        ))}
      </div>
    </div>
  );
}
