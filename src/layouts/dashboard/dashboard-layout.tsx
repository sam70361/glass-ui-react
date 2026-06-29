import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AmbientBackground } from 'src/components/system/ambient-background';
import { CommandPalette } from 'src/components/overlays/command-palette';
import { SettingsDrawer } from 'src/components/settings-drawer';
import { NotificationsDrawer } from 'src/components/overlays/notifications-drawer';
import { CopilotPanel } from 'src/components/overlays/copilot';
import { LoadingScreen } from 'src/components/system/loading-screen';
import { useKeyboardShortcuts } from 'src/hooks/use-keyboard-shortcuts';
import { useSettingsStore } from 'src/theme/settings';
import { IconSidebar } from './icon-sidebar';
import { TopBar } from './top-bar';
import { TopNav } from './top-nav';

export function DashboardLayout() {
  const horizontal = useSettingsStore((s) => s.navLayout) === 'horizontal';
  useKeyboardShortcuts();

  const content = (
    <main
      className="flex-1 overflow-y-auto py-6"
      style={{ paddingInline: 'var(--content-gutter, 24px)', scrollbarGutter: 'stable both-edges' }}
    >
      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
      </Suspense>
    </main>
  );

  return (
    <>
      <AmbientBackground />
      {horizontal ? (
        <div className="relative z-10 flex h-screen flex-col overflow-hidden">
          <TopNav />
          <div className="flex min-h-0 flex-1 overflow-hidden">
            <div className="flex min-w-0 flex-1 flex-col">{content}</div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex h-screen overflow-hidden">
          <IconSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <TopBar />
            {content}
          </div>
        </div>
      )}

      {/* 全局浮层 */}
      <CommandPalette />
      <SettingsDrawer />
      <NotificationsDrawer />
      <CopilotPanel />
    </>
  );
}
