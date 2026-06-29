import { ResizablePanels } from 'src/components/ui/resizable';
import { useMailStore } from 'src/store';
import { FolderRail } from './components/folder-rail';
import { MessageList } from './components/message-list';
import { MessageThread } from './components/message-thread';
import { ComposeDialog } from './components/compose-dialog';

export default function InboxView() {
  const selectedId = useMailStore((s) => s.selectedThreadId);
  const selectThread = useMailStore((s) => s.selectThread);

  return (
    <div className="flex h-full min-h-0 animate-fade-up overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-glass-border)] bg-[var(--color-surface-card)]">
      <FolderRail className="hidden md:flex" />

      {/* 桌面：列表 + 阅读窗格（可调宽） */}
      <div className="hidden min-w-0 flex-1 md:block">
        <ResizablePanels className="h-full" left={<MessageList />} leftDefault={360}>
          <MessageThread />
        </ResizablePanels>
      </div>

      {/* 移动端：列表 ↔ 详情 单列切换 */}
      <div className="flex min-w-0 flex-1 flex-col md:hidden">
        {selectedId ? <MessageThread onBack={() => selectThread(null)} /> : <MessageList />}
      </div>

      <ComposeDialog />
    </div>
  );
}
