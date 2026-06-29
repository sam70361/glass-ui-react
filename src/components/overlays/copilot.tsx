import { useState } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';

import { Sheet, SheetBody, SheetContent, SheetFooter, SheetHeader, SheetTitle } from 'src/components/ui/sheet';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Markdown } from 'src/components/shared/markdown';
import { ColorPalette } from 'src/components/shared/color-palette';
import { useUIStore } from 'src/store';
import { DATA_PALETTE } from 'src/theme/palette';

interface Msg {
  role: 'user' | 'assistant';
  text: string;
  palette?: { name: string; value: string; ratio: number }[];
}

const SUGGESTIONS = ['给我一套全息风配色', '总结今天的任务', '帮我写一段项目介绍'];

function reply(input: string): Msg {
  const q = input.toLowerCase();
  if (q.includes('配色') || q.includes('palette') || q.includes('color')) {
    return {
      role: 'assistant',
      text: '基于品牌全息风，建议按 **60/25/10/5** 比例使用以下主色：',
      palette: [
        { name: '主色 青蓝', value: DATA_PALETTE.cyan, ratio: 60 },
        { name: '辅色 品红', value: DATA_PALETTE.magenta, ratio: 25 },
        { name: '点缀 琥珀', value: DATA_PALETTE.amber, ratio: 10 },
        { name: '强调 翡翠', value: DATA_PALETTE.emerald, ratio: 5 },
      ],
    };
  }
  if (q.includes('任务') || q.includes('总结')) {
    return {
      role: 'assistant',
      text: '今日重点：\n- **设计首页Hero区域视觉方案**（高优先级，今天到期）\n- 完成用户调研报告（审核中）\n- 支付流程用户测试（待办）\n\n建议优先推进 Hero 视觉方案。',
    };
  }
  return {
    role: 'assistant',
    text: '我是 Glass Copilot（演示版）。我可以帮你 **生成配色**、**梳理任务**、**起草文案**。试试左侧的快捷建议吧。',
  };
}

export function CopilotPanel() {
  const open = useUIStore((s) => s.copilotOpen);
  const setOpen = useUIStore((s) => s.setCopilotOpen);
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', text: '你好 👋 我是 **Glass Copilot**，有什么可以帮你的？' },
  ]);
  const [input, setInput] = useState('');

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: 'user', text }, reply(text)]);
    setInput('');
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full max-w-md flex-col">
        <SheetHeader className="flex-row items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-full holographic-bg text-[var(--color-holo-foreground)]">
            <Sparkles className="size-4" />
          </div>
          <SheetTitle>AI Copilot</SheetTitle>
        </SheetHeader>
        <SheetBody className="space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex gap-2.5'}>
              {m.role === 'assistant' && (
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-glass-bg-active)] text-cyan">
                  <Bot className="size-4" />
                </div>
              )}
              <div
                className={
                  m.role === 'user'
                    ? 'max-w-[80%] rounded-[var(--radius-lg)] holographic-bg px-3.5 py-2.5 text-sm text-[var(--color-holo-foreground)]'
                    : 'max-w-[85%] space-y-3 rounded-[var(--radius-lg)] bg-[var(--color-glass-bg)] px-3.5 py-2.5'
                }
              >
                {m.role === 'assistant' ? <Markdown content={m.text} /> : m.text}
                {m.palette && <ColorPalette swatches={m.palette} className="grid-cols-2" />}
              </div>
            </div>
          ))}
          <div className="flex flex-wrap gap-2 pt-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] px-3 py-1.5 text-xs transition-colors hover:bg-[var(--color-glass-bg-hover)]"
              >
                {s}
              </button>
            ))}
          </div>
        </SheetBody>
        <SheetFooter>
          <form
            className="flex w-full gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="问点什么…" />
            <Button type="submit" variant="primary" size="icon" aria-label="发送">
              <Send className="size-4" />
            </Button>
          </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
