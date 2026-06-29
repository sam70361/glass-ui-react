import { useState } from 'react';
import { Check, Eye, EyeOff, Plus, RotateCw } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { ScenarioFrame, ScenarioGate, KeyValueList, notify } from 'src/scenarios/_kit';
import { SkeletonCard } from 'src/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { Switch } from 'src/components/ui/switch';
import { Progress } from 'src/components/ui/progress';
import { Slider } from 'src/components/ui/slider';
import { useScenarioData } from 'src/api';
import { type Provider } from './api-keys.mock';

export default function ApiKeysScenario() {
  const q = useScenarioData<{ PROVIDERS: Provider[] }>('api-keys');
  return (
    <ScenarioFrame
      id="api-keys"
      surface="outline"
      actions={<Button variant="primary" onClick={() => notify.info('添加供应商', '演示：可在此弹出密钥配置表单')}><Plus className="size-4" /> 添加供应商</Button>}
    >
      <ScenarioGate
        query={q}
        skeleton={
          <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} className="h-32" />
            ))}
          </div>
        }
      >
        {({ PROVIDERS }) => <ApiKeysInner initial={PROVIDERS} />}
      </ScenarioGate>
    </ScenarioFrame>
  );
}

function ApiKeysInner({ initial }: { initial: Provider[] }) {
  const [providers, setProviders] = useState(initial);
  const [reveal, setReveal] = useState<string | null>(null);
  const [temp, setTemp] = useState([70]);
  const [maxTokens, setMaxTokens] = useState([40]);

  const toggle = (id: string) => setProviders((ps) => ps.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)));

  return (
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {providers.map((p) => {
            const pct = p.quota ? Math.round((p.used / p.quota) * 100) : 0;
            return (
              <Card key={p.id} className="p-5">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-[var(--radius-md)] font-display text-lg font-bold" style={{ background: `${p.color}1f`, color: p.color }}>
                    {p.letter}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-display font-semibold">{p.name}</p>
                      <Badge variant={p.enabled ? 'success' : 'default'}>{p.enabled ? '已启用' : '已停用'}</Badge>
                    </div>
                    <p className="text-xs text-text-tertiary">{p.models} 个可用模型</p>
                  </div>
                  <Switch checked={p.enabled} onCheckedChange={() => toggle(p.id)} />
                </div>

                <div className="mt-4 flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-glass-border)] bg-[var(--color-surface-sunken)] px-3 py-2 font-mono text-sm">
                  <span className="flex-1 truncate text-text-secondary">{reveal === p.id ? p.key : p.key.replace(/.(?=.{4})/g, '•')}</span>
                  <button onClick={() => setReveal(reveal === p.id ? null : p.id)} className="text-text-tertiary hover:text-foreground" aria-label="显示/隐藏">
                    {reveal === p.id ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                  <button className="text-text-tertiary hover:text-foreground" aria-label="轮换密钥">
                    <RotateCw className="size-4" />
                  </button>
                </div>

                {p.quota > 0 && (
                  <div className="mt-4 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-text-tertiary">本月用量</span>
                      <span className={cn('tabular-nums', pct > 80 ? 'text-danger' : 'text-text-secondary')}>
                        {p.used.toLocaleString()} / {p.quota.toLocaleString()} 次
                      </span>
                    </div>
                    <Progress value={pct} />
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* 模型参数 */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>默认模型参数</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-text-tertiary">Temperature</span>
                  <span className="font-medium tabular-nums">{(temp[0] / 100).toFixed(2)}</span>
                </div>
                <Slider value={temp} onValueChange={setTemp} max={100} />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-text-tertiary">Max Tokens</span>
                  <span className="font-medium tabular-nums">{maxTokens[0] * 100}</span>
                </div>
                <Slider value={maxTokens} onValueChange={setMaxTokens} max={80} />
              </div>
              <KeyValueList
                items={[
                  { label: '默认模型', value: 'GPT-4o' },
                  { label: '超时', value: '30s' },
                  { label: '重试', value: '2 次' },
                  { label: '流式输出', value: <Check className="size-4 text-success" /> },
                ]}
              />
            </CardContent>
          </Card>
        </div>
      </div>
  );
}
