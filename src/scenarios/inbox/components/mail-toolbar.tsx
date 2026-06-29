import { Archive, MailOpen, Tag, Trash2, Undo2 } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { Button } from 'src/components/ui/button';
import { Checkbox } from 'src/components/ui/checkbox';
import { SearchInput } from 'src/components/shared/search-input';
import { SimpleTooltip } from 'src/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';
import { toast } from 'src/components/ui/sonner';
import { mailLabels, useMailStore, type MailFilter } from 'src/store';
import { useDeleteThreadsMutation, useToggleThreadLabelMutation, useUpdateThreadsMutation } from 'src/api';
import type { MailThread } from 'src/types';

const FILTERS: { id: MailFilter; label: string }[] = [
  { id: 'all', label: '全部' },
  { id: 'unread', label: '未读' },
  { id: 'attachments', label: '附件' },
];

export function MailToolbar({ list }: { list: MailThread[] }) {
  const view = useMailStore((s) => s.view);
  const search = useMailStore((s) => s.search);
  const setSearch = useMailStore((s) => s.setSearch);
  const filter = useMailStore((s) => s.filter);
  const setFilter = useMailStore((s) => s.setFilter);
  const checkedIds = useMailStore((s) => s.checkedIds);
  const setChecked = useMailStore((s) => s.setChecked);
  const clearChecked = useMailStore((s) => s.clearChecked);
  const update = useUpdateThreadsMutation();
  const del = useDeleteThreadsMutation();
  const toggleLabel = useToggleThreadLabelMutation();

  const allChecked = list.length > 0 && checkedIds.length === list.length;
  const someChecked = checkedIds.length > 0;
  const inTrash = view === 'trash';

  const toggleAll = () => (allChecked ? clearChecked() : setChecked(list.map((t) => t.id)));

  return (
    <div className="flex flex-col gap-2.5 border-b border-[var(--color-glass-border)] p-3">
      <div className="flex items-center gap-2">
        <Checkbox checked={allChecked} onCheckedChange={toggleAll} aria-label="全选" />
        {someChecked ? (
          <div className="flex flex-1 items-center gap-1">
            <span className="me-1 text-xs text-text-tertiary">已选 {checkedIds.length}</span>
            <SimpleTooltip content="标为已读">
              <Button variant="ghost" size="icon-sm" onClick={() => { update.mutate({ ids: checkedIds, patch: { read: true } }); clearChecked(); toast.success('已标为已读'); }}>
                <MailOpen className="size-4" />
              </Button>
            </SimpleTooltip>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label="打标签"><Tag className="size-4" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>添加/移除标签</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {mailLabels.map((l) => (
                  <DropdownMenuItem key={l.id} onSelect={() => { toggleLabel.mutate({ ids: checkedIds, labelId: l.id }); toast.success(`已更新标签「${l.name}」`); }}>
                    <span className="size-2.5 rounded-full" style={{ background: l.color }} /> {l.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {inTrash ? (
              <>
                <SimpleTooltip content="恢复到收件箱">
                  <Button variant="ghost" size="icon-sm" onClick={() => { update.mutate({ ids: checkedIds, patch: { folder: 'inbox' } }); clearChecked(); toast.success('已恢复'); }}>
                    <Undo2 className="size-4" />
                  </Button>
                </SimpleTooltip>
                <SimpleTooltip content="永久删除">
                  <Button variant="ghost" size="icon-sm" className="text-danger" onClick={() => { del.mutate(checkedIds); clearChecked(); toast.success('已永久删除'); }}>
                    <Trash2 className="size-4" />
                  </Button>
                </SimpleTooltip>
              </>
            ) : (
              <>
                <SimpleTooltip content="归档">
                  <Button variant="ghost" size="icon-sm" onClick={() => { update.mutate({ ids: checkedIds, patch: { folder: 'archive' } }); clearChecked(); toast.success('已归档'); }}>
                    <Archive className="size-4" />
                  </Button>
                </SimpleTooltip>
                <SimpleTooltip content="移到垃圾箱">
                  <Button variant="ghost" size="icon-sm" className="text-danger" onClick={() => { update.mutate({ ids: checkedIds, patch: { folder: 'trash' } }); clearChecked(); toast.success('已移到垃圾箱'); }}>
                    <Trash2 className="size-4" />
                  </Button>
                </SimpleTooltip>
              </>
            )}
          </div>
        ) : (
          <SearchInput value={search} onValueChange={setSearch} placeholder="搜索邮件…" className="flex-1" />
        )}
      </div>

      {!someChecked && (
        <div className="flex items-center gap-1">
          <div className="flex rounded-[var(--radius-md)] bg-[var(--color-glass-bg)] p-0.5">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  'rounded-[calc(var(--radius-md)-2px)] px-3 py-1 text-xs font-medium transition-colors',
                  filter === f.id ? 'bg-[var(--color-glass-bg-active)] text-foreground' : 'text-text-tertiary hover:text-foreground'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
          <span className="ms-auto text-xs text-text-tertiary">{list.length} 封</span>
        </div>
      )}
    </div>
  );
}
