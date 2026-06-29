import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { Logo } from 'src/components/shared/logo';
import { Badge } from 'src/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';
import { getDashboardNav } from 'src/layouts/dashboard/nav-config';
import { useTranslation } from 'src/i18n';
import { SearchTrigger, TopActions } from './top-actions';

/** 横向顶部导航：一级分类为下拉触发器，二级场景在下拉中点击进入（与侧栏同源 registry） */
export function TopNav() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const navData = getDashboardNav();

  return (
    <header
      className="glass-topbar z-[var(--z-nav)] flex shrink-0 items-center gap-4 border-b px-5"
      style={{ height: 'var(--topbar-height)' }}
    >
      <Logo className="shrink-0" />

      <nav className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
        {navData.map((group) => {
          const items = group.items;
          if (items.length === 0) return null;
          const groupActive = items.some((it) => it.path === pathname);

          // 单项分组（如个别系统入口）直接渲染为链接，无需下拉
          if (items.length === 1 && !group.subheader) {
            const it = items[0];
            return <TopLink key={it.path} path={it.path} title={it.title} active={pathname === it.path} />;
          }

          return (
            <DropdownMenu key={group.subheader ?? items[0].path}>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    'relative flex items-center gap-1 whitespace-nowrap rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium transition-colors',
                    groupActive
                      ? 'text-foreground'
                      : 'text-text-tertiary hover:bg-[var(--color-glass-bg)] hover:text-foreground'
                  )}
                >
                  {group.subheader ?? t('common.more')}
                  <ChevronDown className="size-3.5" />
                  {groupActive && <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full holographic-bg" />}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="max-h-[70vh] w-52 overflow-y-auto">
                {items.map((it) => {
                  const Icon = it.icon;
                  return (
                    <DropdownMenuItem
                      key={it.path}
                      onClick={() => navigate(it.path)}
                      className={cn(pathname === it.path && 'text-cyan')}
                    >
                      <Icon className="size-4" />
                      <span className="flex-1">{it.title}</span>
                      {it.badge !== undefined && (
                        <Badge variant="cyan" className="px-1.5 py-0">
                          {it.badge}
                        </Badge>
                      )}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        })}
      </nav>

      <SearchTrigger className="hidden w-56 shrink-0 md:flex" />
      <div className="shrink-0">
        <TopActions />
      </div>
    </header>
  );
}

function TopLink({ path, title, active }: { path: string; title: string; active: boolean }) {
  return (
    <NavLink
      to={path}
      className={cn(
        'relative flex items-center gap-1.5 whitespace-nowrap rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium transition-colors',
        active ? 'text-foreground' : 'text-text-tertiary hover:bg-[var(--color-glass-bg)] hover:text-foreground'
      )}
    >
      {title}
      {active && <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full holographic-bg" />}
    </NavLink>
  );
}
