import { SearchTrigger, TopActions } from './top-actions';

/** 竖向布局下的顶栏：搜索 + 通用操作 */
export function TopBar() {
  return (
    <header
      className="glass-topbar z-[var(--z-sticky)] flex shrink-0 items-center gap-3 border-b px-4"
      style={{ height: 'var(--topbar-height)' }}
    >
      <SearchTrigger className="w-full max-w-md" />
      <div className="ms-auto">
        <TopActions />
      </div>
    </header>
  );
}
