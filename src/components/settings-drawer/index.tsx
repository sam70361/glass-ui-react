import { useRef } from 'react';
import { Contrast, Maximize2, Minus, Moon, Plus, Sparkles, Sun, Type, ZapOff } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { Sheet, SheetBody, SheetContent } from 'src/components/ui/sheet';
import { Button } from 'src/components/ui/button';
import { useSettings } from 'src/theme/settings';
import { themeConfig, THEMES, FONT_PRESETS, type ThemeDef, type ThemeMode } from 'src/theme';
import {
  FONT_SIZE_RANGE,
  CONTENT_GUTTER_RANGE,
  CONTENT_GUTTER_STEP,
  CONTENT_GUTTER_TICK,
  CONTENT_GUTTER_MAJOR,
} from 'src/theme/theme-config';
import { changeLocale, LOCALE_LABELS, supportedLocales, useTranslation } from 'src/i18n';
import { useUIStore } from 'src/store';
import { BaseOption } from './base-option';
import { OptionBlock } from './option-block';
import { FullscreenButton } from './fullscreen-button';

const defaults = themeConfig.defaultSettings;

/** 外观设置抽屉：主题/明暗/对比度/密度/动画/背景/字号/导航/语言 —— 卡片式、可逐项重置 */
export function SettingsDrawer() {
  const { t } = useTranslation();
  const open = useUIStore((s) => s.settingsOpen);
  const setOpen = useUIStore((s) => s.setSettingsOpen);
  const s = useSettings();

  const changed =
    s.theme !== defaults.theme ||
    s.mode !== defaults.mode ||
    s.density !== defaults.density ||
    s.contrast !== defaults.contrast ||
    s.reduceMotion !== defaults.reduceMotion ||
    s.ambient !== defaults.ambient ||
    s.fontSize !== defaults.fontSize ||
    s.fontFamily !== defaults.fontFamily ||
    s.navLayout !== defaults.navLayout;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" hideClose className="w-full max-w-sm">
        <div className="flex items-center gap-1 border-b border-[var(--color-glass-border)] px-5 py-3.5">
          <h2 className="flex-1 font-display text-base font-semibold">{t('settings.title')}</h2>
          <FullscreenButton />
          <div className="relative">
            <Button variant="ghost" size="icon-sm" onClick={() => s.reset()} aria-label={t('settings.resetAll')}>
              <RotateIcon />
            </Button>
            {changed && <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-danger" />}
          </div>
          <Button variant="ghost" size="icon-sm" onClick={() => setOpen(false)} aria-label={t('common.close')}>
            <CloseIcon />
          </Button>
        </div>

        <SheetBody className="space-y-6">
          {/* 主题 */}
          <OptionBlock title={t('settings.theme')} canReset={s.theme !== defaults.theme} onReset={() => s.setState({ theme: defaults.theme })}>
            <div className="grid grid-cols-3 gap-2.5">
              {THEMES.map((th) => (
                <ThemeCard key={th.id} theme={{ ...th, localLabel: t(`settings.themes.${th.id}`) }} mode={s.mode} active={s.theme === th.id} onClick={() => s.setState({ theme: th.id })} />
              ))}
            </div>
          </OptionBlock>

          {/* 明暗 */}
          <OptionBlock title={t('settings.mode')}>
            <div className="grid grid-cols-2 gap-2.5">
              <ModeButton icon={Moon} label={t('settings.dark')} active={s.mode === 'dark'} onClick={() => s.setState({ mode: 'dark' })} />
              <ModeButton icon={Sun} label={t('settings.light')} active={s.mode === 'light'} onClick={() => s.setState({ mode: 'light' })} />
            </div>
          </OptionBlock>

          {/* 通用开关网格 */}
          <div className="grid grid-cols-2 gap-2.5">
            <BaseOption icon={Contrast} label={t('settings.highContrast')} selected={s.contrast === 'high'} onToggle={() => s.setState({ contrast: s.contrast === 'high' ? 'default' : 'high' })} />
            <BaseOption icon={Maximize2} label={t('settings.compactLayout')} selected={s.density === 'compact'} onToggle={() => s.setState({ density: s.density === 'compact' ? 'standard' : 'compact' })} />
            <BaseOption icon={ZapOff} label={t('settings.reduceMotion')} selected={s.reduceMotion} onToggle={() => s.setState({ reduceMotion: !s.reduceMotion })} />
            <BaseOption icon={Sparkles} label={t('settings.ambient')} selected={s.ambient} onToggle={() => s.setState({ ambient: !s.ambient })} />
          </div>

          {/* 字体 */}
          <OptionBlock title={t('settings.font')} canReset={s.fontFamily !== defaults.fontFamily} onReset={() => s.setState({ fontFamily: defaults.fontFamily })}>
            <div className="grid grid-cols-2 gap-2.5">
              {FONT_PRESETS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => s.setState({ fontFamily: f.value })}
                  className={cn(
                    'flex items-center justify-center gap-2 rounded-[var(--radius-md)] border py-2 text-sm font-medium transition-colors',
                    s.fontFamily === f.value
                      ? 'border-[rgba(var(--color-accent-cyan-rgb),0.45)] bg-[rgba(var(--color-accent-cyan-rgb),0.1)] text-cyan'
                      : 'border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] hover:bg-[var(--color-glass-bg-hover)]'
                  )}
                >
                  {t(`settings.fonts.${f.value}`)}
                </button>
              ))}
            </div>
          </OptionBlock>

          {/* 字号 */}
          <OptionBlock title={t('settings.fontSize')} canReset={s.fontSize !== defaults.fontSize} onReset={() => s.setState({ fontSize: defaults.fontSize })}>
            <div className="flex items-center gap-3">
              <Type className="size-3.5 text-text-tertiary" />
              <Button variant="ghost" size="icon-sm" disabled={s.fontSize <= FONT_SIZE_RANGE[0]} onClick={() => s.setState({ fontSize: s.fontSize - 1 })} aria-label="−">
                <Minus className="size-3.5" />
              </Button>
              <div className="flex-1">
                <div className="h-2 rounded-full bg-[var(--color-track)]">
                  <div
                    className="h-2 rounded-full holographic-bg"
                    style={{ width: `${((s.fontSize - FONT_SIZE_RANGE[0]) / (FONT_SIZE_RANGE[1] - FONT_SIZE_RANGE[0])) * 100}%` }}
                  />
                </div>
              </div>
              <Button variant="ghost" size="icon-sm" disabled={s.fontSize >= FONT_SIZE_RANGE[1]} onClick={() => s.setState({ fontSize: s.fontSize + 1 })} aria-label="+">
                <Plus className="size-3.5" />
              </Button>
              <span className="w-10 text-right text-sm font-medium tabular-nums">{s.fontSize}px</span>
            </div>
          </OptionBlock>

          {/* 内容边距 */}
          <OptionBlock title={t('settings.contentGutter')} canReset={s.contentGutter !== defaults.contentGutter} onReset={() => s.setState({ contentGutter: defaults.contentGutter })}>
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-xs text-text-tertiary">{t('settings.gutterLabel')}</span>
              <span className="font-mono text-sm font-semibold tabular-nums text-cyan">{s.contentGutter}px</span>
            </div>
            <GutterRuler value={s.contentGutter} onChange={(v) => s.setState({ contentGutter: v })} />
          </OptionBlock>

          {/* 导航布局 */}
          <OptionBlock title={t('settings.navLayout')} canReset={s.navLayout !== defaults.navLayout} onReset={() => s.setState({ navLayout: defaults.navLayout })}>
            <div className="grid grid-cols-3 gap-2.5">
              <LayoutOption label={t('settings.navMini')} active={s.navLayout === 'mini'} onClick={() => s.setState({ navLayout: 'mini' })} kind="mini" />
              <LayoutOption label={t('settings.navExpanded')} active={s.navLayout === 'expanded'} onClick={() => s.setState({ navLayout: 'expanded' })} kind="expanded" />
              <LayoutOption label={t('settings.navHorizontal')} active={s.navLayout === 'horizontal'} onClick={() => s.setState({ navLayout: 'horizontal' })} kind="horizontal" />
            </div>
          </OptionBlock>

          {/* 语言 */}
          <OptionBlock title={t('settings.language')}>
            <div className="grid grid-cols-2 gap-2.5">
              {supportedLocales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    s.setState({ locale: loc });
                    void changeLocale(loc);
                  }}
                  className={cn(
                    'rounded-[var(--radius-md)] border py-2 text-sm font-medium transition-colors',
                    s.locale === loc
                      ? 'border-[rgba(var(--color-accent-cyan-rgb),0.4)] bg-[rgba(var(--color-accent-cyan-rgb),0.1)] text-cyan'
                      : 'border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] hover:bg-[var(--color-glass-bg-hover)]'
                  )}
                >
                  {LOCALE_LABELS[loc] ?? loc}
                </button>
              ))}
            </div>
          </OptionBlock>
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
}

/** 内容边距刻度尺：拖拽 / 点击设值，带小刻度与带数字的大刻度 */
function GutterRuler({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [min, max] = CONTENT_GUTTER_RANGE;
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const clamp = (v: number) => Math.min(max, Math.max(min, Math.round(v / CONTENT_GUTTER_STEP) * CONTENT_GUTTER_STEP));
  const pct = ((value - min) / (max - min)) * 100;

  const setFromClientX = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    onChange(clamp(min + ratio * (max - min)));
  };

  const ticks: number[] = [];
  for (let v = min; v <= max; v += CONTENT_GUTTER_TICK) ticks.push(v);

  return (
    <div className="select-none">
      <div
        ref={trackRef}
        role="slider"
        aria-label="Content gutter"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        tabIndex={0}
        className="relative h-11 cursor-pointer touch-none outline-none"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          setFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (dragging.current) setFromClientX(e.clientX);
        }}
        onPointerUp={(e) => {
          dragging.current = false;
          e.currentTarget.releasePointerCapture(e.pointerId);
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
            e.preventDefault();
            onChange(clamp(value - CONTENT_GUTTER_STEP));
          } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
            e.preventDefault();
            onChange(clamp(value + CONTENT_GUTTER_STEP));
          }
        }}
      >
        {/* 基线 */}
        <div className="absolute inset-x-0 top-2 h-0.5 rounded-full bg-[var(--color-track)]" />
        {/* 已选区段 */}
        <div className="absolute left-0 top-2 h-0.5 rounded-full holographic-bg" style={{ width: `${pct}%` }} />
        {/* 刻度 */}
        {ticks.map((v) => {
          const major = v % CONTENT_GUTTER_MAJOR === 0;
          const left = ((v - min) / (max - min)) * 100;
          return (
            <div key={v} className="absolute top-2" style={{ left: `${left}%` }}>
              <div
                className={cn('w-px -translate-x-1/2 bg-[var(--color-glass-border-hover)]', major ? 'h-2.5' : 'h-1.5')}
              />
              {major && (
                <span className="absolute top-3 -translate-x-1/2 font-mono text-[9px] text-text-muted">{v}</span>
              )}
            </div>
          );
        })}
        {/* 滑块 */}
        <div
          className="absolute top-2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--color-surface-solid)] bg-cyan shadow-[var(--shadow-glow-cyan)] transition-transform"
          style={{ left: `${pct}%`, marginTop: '1px' }}
        />
      </div>
    </div>
  );
}

/** 主题卡：用主题注册表里各自的 preview 色（按当前明暗）渲染缩略图——画布底 + 签名渐变条 */
function ThemeCard({ theme, mode, active, onClick }: { theme: ThemeDef & { localLabel: string }; mode: ThemeMode; active: boolean; onClick: () => void }) {
  const pv = theme.preview[mode];
  const [c1, c2, c3] = pv.gradient;
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'flex flex-col items-center gap-2 rounded-[var(--radius-md)] border p-2 transition-all',
        active
          ? 'border-[rgba(var(--color-accent-cyan-rgb),0.6)] bg-[var(--color-glass-bg)] shadow-[var(--shadow-z1)]'
          : 'border-[var(--color-glass-border)] hover:bg-[var(--color-glass-bg)]'
      )}
    >
      <div className="flex h-12 w-full flex-col justify-end overflow-hidden rounded-[var(--radius-sm)] p-1.5" style={{ background: pv.bg }}>
        <span className="h-2 w-full rounded-full" style={{ background: `linear-gradient(90deg, ${c1}, ${c2}, ${c3})` }} />
      </div>
      <span className={cn('text-xs font-medium', active ? 'text-cyan' : 'text-text-tertiary')}>{theme.localLabel}</span>
    </button>
  );
}

/** 明暗子模式按钮 */
function ModeButton({ icon: Icon, label, active, onClick }: { icon: LucideIcon; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'flex items-center justify-center gap-2 rounded-[var(--radius-md)] border py-2.5 text-sm font-medium transition-colors [&_svg]:size-4',
        active
          ? 'border-[rgba(var(--color-accent-cyan-rgb),0.45)] bg-[rgba(var(--color-accent-cyan-rgb),0.1)] text-cyan'
          : 'border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] hover:bg-[var(--color-glass-bg-hover)]'
      )}
    >
      <Icon /> {label}
    </button>
  );
}

/** 导航布局可视化选项卡 */
function LayoutOption({
  label,
  active,
  onClick,
  kind,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  kind: 'mini' | 'expanded' | 'horizontal';
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center gap-2 rounded-[var(--radius-md)] border p-3 transition-all',
        active
          ? 'border-[rgba(var(--color-accent-cyan-rgb),0.4)] bg-[var(--color-glass-bg)] shadow-[var(--shadow-z1)]'
          : 'border-[var(--color-glass-border)] hover:bg-[var(--color-glass-bg)]'
      )}
    >
      {kind === 'horizontal' ? (
        <div className="flex h-12 w-full flex-col gap-1.5">
          <div className={cn('h-2.5 w-full rounded bg-[var(--color-glass-bg-active)]', active && 'holographic-bg')} />
          <div className="flex-1 rounded bg-[var(--color-glass-bg)]" />
        </div>
      ) : (
        <div className="flex h-12 w-full gap-1.5">
          <div className={cn('h-full rounded bg-[var(--color-glass-bg-active)]', kind === 'mini' ? 'w-3' : 'w-6', active && 'holographic-bg')} />
          <div className="flex-1 rounded bg-[var(--color-glass-bg)]" />
        </div>
      )}
      <span className={cn('text-xs font-medium', active ? 'text-cyan' : 'text-text-tertiary')}>{label}</span>
    </button>
  );
}

function RotateIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
