import { useState } from 'react';
import { Bot, Paperclip, Plus, Send, Sparkles } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { ScenarioFrame, ScenarioGate } from 'src/scenarios/_kit';
import { Card } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Badge } from 'src/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select';
import { Markdown } from 'src/components/shared/markdown';
import { useScenarioData } from 'src/api';
import { type Msg } from './chat.mock';

type Conv = { id: string; title: string; preview: string; time: string; active?: boolean };
type ChatData = { CONVERSATIONS: Conv[]; INIT: Msg[] };

export default function ChatScenario() {
  const q = useScenarioData<ChatData>('chat');
  return (
    <ScenarioFrame
      id="chat"
      actions={<Button variant="primary"><Plus className="size-4" /> 新对话</Button>}
    >
      <ScenarioGate query={q}>{(d) => <ChatInner {...d} />}</ScenarioGate>
    </ScenarioFrame>
  );
}

function ChatInner({ CONVERSATIONS, INIT }: ChatData) {
  const [messages, setMessages] = useState<Msg[]>(INIT);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { role: 'user', text: input }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'assistant', text: '这是一段**演示回复**：实际项目中可对接任意大模型 API（见“模型 API 配置”场景）。' }]);
      setTyping(false);
    }, 900);
  };

  return (
      <div className="grid h-[calc(100vh-13rem)] gap-4 lg:grid-cols-[280px_1fr]">
        {/* 会话列表 */}
        <Card className="hidden flex-col overflow-hidden p-0 lg:flex">
          <div className="border-b border-[var(--color-glass-border)] p-3">
            <Input placeholder="搜索对话…" />
          </div>
          <div className="flex-1 space-y-1 overflow-y-auto p-2">
            {CONVERSATIONS.map((c) => (
              <button
                key={c.id}
                className={cn(
                  'w-full rounded-[var(--radius-md)] p-2.5 text-left transition-colors',
                  c.active ? 'bg-[var(--color-glass-bg-active)]' : 'hover:bg-[var(--color-glass-bg)]'
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-medium">{c.title}</span>
                  <span className="shrink-0 text-[10px] text-text-muted">{c.time}</span>
                </div>
                <p className="mt-0.5 truncate text-xs text-text-tertiary">{c.preview}</p>
              </button>
            ))}
          </div>
        </Card>

        {/* 对话区 */}
        <Card className="flex flex-col overflow-hidden p-0">
          <div className="flex items-center justify-between border-b border-[var(--color-glass-border)] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-full holographic-bg text-[var(--color-holo-foreground)]">
                <Sparkles className="size-3.5" />
              </span>
              <span className="font-display text-sm font-semibold">Glass Assistant</span>
            </div>
            <Select defaultValue="gpt">
              <SelectTrigger className="h-8 w-auto min-w-32 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt">GPT-4o</SelectItem>
                <SelectItem value="claude">Claude 3.5</SelectItem>
                <SelectItem value="gemini">Gemini 1.5</SelectItem>
                <SelectItem value="local">本地模型</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto p-5">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex gap-3'}>
                {m.role === 'assistant' && (
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-glass-bg-active)] text-cyan">
                    <Bot className="size-4" />
                  </span>
                )}
                <div
                  className={cn(
                    'max-w-[78%] rounded-[var(--radius-lg)] px-4 py-2.5 text-sm',
                    m.role === 'user' ? 'holographic-bg text-[var(--color-holo-foreground)]' : 'bg-[var(--color-glass-bg)]'
                  )}
                >
                  {m.role === 'assistant' ? <Markdown content={m.text} /> : m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-glass-bg-active)] text-cyan">
                  <Bot className="size-4" />
                </span>
                <div className="flex items-center gap-1 rounded-[var(--radius-lg)] bg-[var(--color-glass-bg)] px-4 py-3">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="size-1.5 animate-pulse rounded-full bg-cyan" style={{ animationDelay: `${i * 150}ms` }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-[var(--color-glass-border)] p-3">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {['总结要点', '继续扩写', '翻译为英文'].map((q) => (
                <Badge key={q} variant="cyan" className="cursor-pointer" onClick={() => setInput(q)}>
                  {q}
                </Badge>
              ))}
            </div>
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
            >
              <Button type="button" variant="ghost" size="icon" aria-label="附件">
                <Paperclip className="size-4" />
              </Button>
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="给 Glass Assistant 发消息…" />
              <Button type="submit" variant="primary" size="icon" aria-label="发送">
                <Send className="size-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
  );
}
