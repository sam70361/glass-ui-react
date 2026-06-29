import { cn } from 'src/lib/utils';

/**
 * 极简 Markdown 渲染（支持标题/粗体/列表/代码行内/段落）。
 * 不引入重型 markdown 库，满足 Copilot 回复/笔记展示等轻量场景。
 */
export function Markdown({ content, className }: { content: string; className?: string }) {
  const blocks = content.trim().split(/\n{2,}/);
  return (
    <div className={cn('space-y-2 text-sm leading-relaxed text-text-secondary', className)}>
      {blocks.map((block, i) => renderBlock(block, i))}
    </div>
  );
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    if (part.startsWith('`') && part.endsWith('`'))
      return (
        <code key={i} className="rounded bg-[var(--color-glass-bg-active)] px-1.5 py-0.5 font-mono text-xs text-cyan">
          {part.slice(1, -1)}
        </code>
      );
    return part;
  });
}

function renderBlock(block: string, key: number): React.ReactNode {
  if (block.startsWith('### ')) return <h4 key={key} className="font-display font-semibold text-foreground">{renderInline(block.slice(4))}</h4>;
  if (block.startsWith('## ')) return <h3 key={key} className="font-display text-base font-semibold text-foreground">{renderInline(block.slice(3))}</h3>;
  if (block.startsWith('# ')) return <h2 key={key} className="font-display text-lg font-bold text-foreground">{renderInline(block.slice(2))}</h2>;

  const lines = block.split('\n');
  if (lines.every((l) => /^[-*] /.test(l)))
    return (
      <ul key={key} className="list-disc space-y-1 pl-5">
        {lines.map((l, i) => (
          <li key={i}>{renderInline(l.slice(2))}</li>
        ))}
      </ul>
    );

  return <p key={key}>{renderInline(block)}</p>;
}
