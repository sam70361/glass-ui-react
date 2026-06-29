import { useRef } from 'react';
import { Bold, Heading1, Heading2, Italic, Link2, List, ListOrdered, Quote, Underline } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { Toolbar, ToolbarButton, ToolbarSeparator } from './toolbar';

/**
 * 轻量富文本编辑器（contentEditable + document.execCommand），无重依赖。
 * 适用于评论、文档、说明等富文本录入。
 */
export function RichTextEditor({ defaultValue = '', className }: { defaultValue?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const cmd = (command: string, value?: string) => {
    ref.current?.focus();
    document.execCommand(command, false, value);
  };

  return (
    <div className={cn('overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-glass-border)]', className)}>
      <Toolbar className="rounded-none border-0 border-b">
        <ToolbarButton onClick={() => cmd('bold')} title="加粗"><Bold /></ToolbarButton>
        <ToolbarButton onClick={() => cmd('italic')} title="斜体"><Italic /></ToolbarButton>
        <ToolbarButton onClick={() => cmd('underline')} title="下划线"><Underline /></ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton onClick={() => cmd('formatBlock', 'h2')} title="标题1"><Heading1 /></ToolbarButton>
        <ToolbarButton onClick={() => cmd('formatBlock', 'h3')} title="标题2"><Heading2 /></ToolbarButton>
        <ToolbarButton onClick={() => cmd('formatBlock', 'blockquote')} title="引用"><Quote /></ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton onClick={() => cmd('insertUnorderedList')} title="无序列表"><List /></ToolbarButton>
        <ToolbarButton onClick={() => cmd('insertOrderedList')} title="有序列表"><ListOrdered /></ToolbarButton>
        <ToolbarButton onClick={() => { const u = prompt('链接地址'); if (u) cmd('createLink', u); }} title="链接"><Link2 /></ToolbarButton>
      </Toolbar>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        className="prose-editor min-h-40 px-4 py-3 text-sm leading-relaxed outline-none [&_blockquote]:border-s-2 [&_blockquote]:border-cyan [&_blockquote]:ps-3 [&_blockquote]:text-text-tertiary [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-bold [&_h3]:font-display [&_h3]:font-semibold [&_ol]:list-decimal [&_ol]:ps-5 [&_ul]:list-disc [&_ul]:ps-5"
        dangerouslySetInnerHTML={{ __html: defaultValue }}
      />
    </div>
  );
}
