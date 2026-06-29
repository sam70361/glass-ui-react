import { Bell, Search, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { cn } from 'src/lib/utils';
import { MOD_KEY } from 'src/lib/platform';
import { Button } from 'src/components/ui/button';
import { UserAvatar } from 'src/components/shared/user-avatar';
import { Badge } from 'src/components/ui/badge';
import { SimpleTooltip } from 'src/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';
import { useAppStore } from 'src/store';
import { useUIStore } from 'src/store';
import { useTranslation } from 'src/i18n';
import { paths } from 'src/routes/paths';

/** 顶部通用：搜索唤起 + 通知 + 设置 + 用户菜单（供竖向 TopBar 与横向 TopNav 复用） */
export function SearchTrigger({ className }: { className?: string }) {
  const { t } = useTranslation();
  const setCommandOpen = useUIStore((s) => s.setCommandOpen);
  return (
    <button
      onClick={() => setCommandOpen(true)}
      className={cn(
        'flex h-9 items-center gap-2 rounded-full border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] px-3.5 text-sm text-text-tertiary transition-colors hover:bg-[var(--color-glass-bg-hover)]',
        className
      )}
    >
      <Search className="size-4" />
      <span>{t('topbar.searchPlaceholder')}</span>
      <kbd className="ms-auto rounded bg-[var(--color-glass-bg-active)] px-1.5 py-0.5 font-mono text-[10px]">{MOD_KEY} K</kbd>
    </button>
  );
}

export function TopActions() {
  const { t } = useTranslation();
  const currentUser = useAppStore((s) => s.currentUser);
  const unread = useAppStore((s) => s.notifications.filter((n) => !n.read).length);
  const { setNotifOpen, setSettingsOpen } = useUIStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    useAppStore.getState().resetData();
    navigate('/auth/login');
  };

  return (
    <div className="flex items-center gap-1">
      <SimpleTooltip content={t('topbar.notifications')}>
        <Button variant="ghost" size="icon" className="relative" onClick={() => setNotifOpen(true)} aria-label={t('topbar.notifications')}>
          <Bell className="size-[18px]" />
          {unread > 0 && <span className="absolute end-2 top-2 size-2 rounded-full holographic-bg" />}
        </Button>
      </SimpleTooltip>
      <SimpleTooltip content={t('topbar.appearanceSettings')}>
        <Button variant="ghost" size="icon" onClick={() => setSettingsOpen(true)} aria-label={t('common.settings')}>
          <Settings className="size-[18px]" />
        </Button>
      </SimpleTooltip>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="ms-1 flex items-center gap-2 rounded-full p-0.5 transition-colors hover:bg-[var(--color-glass-bg)]">
            <UserAvatar user={currentUser} size="sm" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">{currentUser.name}</span>
              <span className="text-xs font-normal text-text-tertiary">{currentUser.role}</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate(paths.profile)}>{t('user.profile')}</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSettingsOpen(true)}>{t('user.preferences')}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem destructive onClick={handleLogout}>{t('user.logout')}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Badge variant="cyan" className="ms-1 hidden sm:inline-flex">
        {t('topbar.pro')}
      </Badge>
    </div>
  );
}
