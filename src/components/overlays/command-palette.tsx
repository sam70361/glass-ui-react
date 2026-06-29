import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Compass, Settings, Sparkles, FolderKanban, ArrowUpDown, CornerDownLeft } from 'lucide-react';

import {
  CommandDialog,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandKbd,
  CommandList,
  CommandShortcut,
} from 'src/components/ui/command';
import { MOD_KEY } from 'src/lib/platform';
import { getDashboardNav } from 'src/layouts/dashboard/nav-config';
import { useAppStore } from 'src/store';
import { useUIStore } from 'src/store';
import { useTranslation } from 'src/i18n';

type Scope = 'all' | 'pages' | 'actions' | 'projects';

export function CommandPalette() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const open = useUIStore((s) => s.commandOpen);
  const setOpen = useUIStore((s) => s.setCommandOpen);
  const setSettingsOpen = useUIStore((s) => s.setSettingsOpen);
  const setCopilotOpen = useUIStore((s) => s.setCopilotOpen);
  const recentPaths = useUIStore((s) => s.recentPaths);
  const addRecentPath = useUIStore((s) => s.addRecentPath);
  const projects = useAppStore((s) => s.projects);
  const setActiveProject = useAppStore((s) => s.setActiveProject);

  const [query, setQuery] = useState('');
  const [scope, setScope] = useState<Scope>('all');

  const scopes: { id: Scope; label: string }[] = [
    { id: 'all', label: t('command.scopeAll') },
    { id: 'pages', label: t('command.scopePages') },
    { id: 'actions', label: t('command.scopeActions') },
    { id: 'projects', label: t('command.scopeProjects') },
  ];

  useEffect(() => {
    if (!open) {
      setQuery('');
      setScope('all');
    }
  }, [open]);

  const navItems = useMemo(
    () => getDashboardNav().flatMap((g) => g.items),
    [t]
  );

  const recentNavItems = useMemo(
    () => recentPaths.map((p) => navItems.find((i) => i.path === p)).filter(Boolean),
    [recentPaths, navItems]
  );

  const run = (fn: () => void) => {
    fn();
    setOpen(false);
  };

  const navigateTo = (path: string) => {
    run(() => {
      addRecentPath(path);
      navigate(path);
    });
  };

  const showRecent = scope === 'all' && !query && recentNavItems.length > 0;
  const showPages = scope === 'all' || scope === 'pages';
  const showActions = scope === 'all' || scope === 'actions';
  const showProjects = scope === 'all' || scope === 'projects';

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      footer={
        <CommandFooter>
          <span className="flex items-center gap-1.5">
            <CommandKbd><ArrowUpDown className="size-3" /></CommandKbd>
            <span>{t('command.navigate')}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CommandKbd><CornerDownLeft className="size-3" /></CommandKbd>
            <span>{t('command.select')}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CommandKbd>Esc</CommandKbd>
            <span>{t('command.close')}</span>
          </span>
          <span className="ms-auto flex items-center gap-1.5 text-text-tertiary">
            <CommandKbd>{MOD_KEY} K</CommandKbd>
          </span>
        </CommandFooter>
      }
    >
      <CommandInput placeholder={t('command.placeholder')} value={query} onValueChange={setQuery} />

      {/* Scope 标签栏 */}
      <div className="flex items-center gap-1 border-b border-[var(--color-glass-border)] px-3 py-1.5">
        {scopes.map((s) => (
          <button
            key={s.id}
            onClick={() => setScope(s.id)}
            className={`rounded-[var(--radius-sm)] px-2.5 py-1 text-xs font-medium transition-colors ${
              scope === s.id
                ? 'bg-[var(--color-glass-bg-active)] text-foreground'
                : 'text-text-tertiary hover:bg-[var(--color-glass-bg)] hover:text-text-secondary'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <CommandList>
        <CommandEmpty>{t('command.noResults')}</CommandEmpty>

        {showRecent && (
          <CommandGroup heading={t('command.recentVisited')}>
            {recentNavItems.map((item) => {
              if (!item) return null;
              const Icon = item.icon;
              return (
                <CommandItem key={`recent-${item.path}`} value={`recent ${item.title}`} onSelect={() => navigateTo(item.path)}>
                  <Clock className="size-4 text-text-muted" />
                  <Icon />
                  {item.title}
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}

        {showPages && (
          <CommandGroup heading={t('command.pages')}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <CommandItem key={item.path} value={item.title} onSelect={() => navigateTo(item.path)}>
                  <Compass className="size-4 text-text-muted" />
                  <Icon />
                  {item.title}
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}

        {showActions && (
          <CommandGroup heading={t('command.quickActions')}>
            <CommandItem value="settings preferences appearance" onSelect={() => run(() => setSettingsOpen(true))}>
              <Settings />
              {t('command.openSettings')}
              <CommandShortcut>{MOD_KEY} ,</CommandShortcut>
            </CommandItem>
            <CommandItem value="copilot ai assistant" onSelect={() => run(() => setCopilotOpen(true))}>
              <Sparkles />
              {t('command.openCopilot')}
            </CommandItem>
          </CommandGroup>
        )}

        {showProjects && (
          <CommandGroup heading={t('command.switchProject')}>
            {projects.map((p) => (
              <CommandItem
                key={p.id}
                value={`project ${p.name}`}
                onSelect={() => run(() => setActiveProject(p.id))}
              >
                <FolderKanban className="size-4 text-text-muted" />
                <span className="size-2.5 rounded-full" style={{ background: p.color }} />
                {p.name}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
