import { Bot } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { Logo } from 'src/components/shared/logo';
import { NavSection } from 'src/components/nav-section';
import { SimpleTooltip } from 'src/components/ui/tooltip';
import { useSettingsStore } from 'src/theme/settings';
import { useUIStore } from 'src/store';
import { useTranslation } from 'src/i18n';
import { getDashboardNav } from 'src/layouts/dashboard/nav-config';

/** 最左侧图标导航栏（展开含文字 / 迷你图标+小标签，由外观设置控制） */
export function IconSidebar() {
  const { t } = useTranslation();
  const navExpanded = useSettingsStore((s) => s.navLayout) === 'expanded';
  const setCopilotOpen = useUIStore((s) => s.setCopilotOpen);
  const navData = getDashboardNav();

  return (
    <aside
      className="glass-nav z-[var(--z-nav)] flex h-full shrink-0 flex-col border-e py-4 transition-[width] duration-200"
      style={{ width: navExpanded ? 'var(--sidebar-width-expanded)' : 'var(--sidebar-width)' }}
    >
      <div className={cn('pb-4', navExpanded ? 'px-4' : 'px-2 text-center')}>
        <Logo showText={navExpanded} className={navExpanded ? '' : 'justify-center'} />
      </div>

      <NavSection
        data={navData}
        variant={navExpanded ? 'vertical' : 'mini'}
        className={cn('flex-1 overflow-y-auto', navExpanded ? 'px-3' : 'px-2')}
      />

      <div className={cn('mt-2 flex flex-col gap-1', navExpanded ? 'px-3' : 'px-2')}>
        <BottomAction icon={Bot} label={t('copilot.title')} expanded={navExpanded} onClick={() => setCopilotOpen(true)} />
      </div>
    </aside>
  );
}

function BottomAction({
  icon: Icon,
  label,
  expanded,
  onClick,
}: {
  icon: typeof Bot;
  label: string;
  expanded: boolean;
  onClick: () => void;
}) {
  const btn = (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center rounded-[var(--radius-md)] font-medium text-text-tertiary transition-colors hover:bg-[var(--color-glass-bg)] hover:text-foreground',
        expanded ? 'gap-3 px-3 py-2.5 text-sm' : 'w-full flex-col justify-center gap-1 px-1 py-2'
      )}
    >
      <Icon className="size-[18px] shrink-0" />
      <span className={expanded ? 'flex-1 text-start' : 'w-full truncate text-center text-[10px] leading-none'}>
        {label}
      </span>
    </button>
  );
  return expanded ? btn : <SimpleTooltip content={label} side="right">{btn}</SimpleTooltip>;
}
