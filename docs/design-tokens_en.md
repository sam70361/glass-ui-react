# Design Tokens & Theme System

## Design Philosophy

Glass UI React follows a **Dark Glassmorphism** design language:

- Translucent frosted-glass surfaces on deep dark canvases
- Holographic gradients as accent and primary action markers
- Subtle ambient glow effects for spatial depth

### Core Principles

1. **Depth through transparency** — layered glass surfaces create hierarchy without hard borders
2. **Color as signal** — holographic gradients mark primary actions; semantic colors convey status
3. **Motion with purpose** — Framer Motion animations guide attention, reduced-motion respected
4. **Token-driven consistency** — every visual decision maps to a CSS variable

## Color System

### Base Palette

Theme-independent raw color values serving as the color source for all themes:

| Name      | Variable             | Value      | Usage                    |
|-----------|----------------------|------------|--------------------------|
| Cyan      | `--palette-cyan`     | `#00d4ff`  | Primary accent, links    |
| Magenta   | `--palette-magenta`  | `#ff2d92`  | Secondary accent, gradient |
| Amber     | `--palette-amber`    | `#ffb347`  | Warm accent, gradient tail |
| Emerald   | `--palette-emerald`  | `#00ff94`  | Success, completion      |
| Violet    | `--palette-violet`   | `#a855f7`  | Special marks, cyber theme |
| Blue      | `--palette-blue`     | `#5b8cff`  | Info links, chart colors |
| Red       | `--palette-red`      | `#ff4757`  | Danger, delete, errors   |
| Neutral   | `--palette-neutral`  | `#6b7280`  | Neutral gray, helper text |

Each color also provides an RGB variant (e.g. `--palette-cyan-rgb: 0, 212, 255`) for `rgba()` composition.

### Semantic Colors

Mapped to functional meanings, theme-independent:

| Semantic   | Variable             | Mapped To  | Usage              |
|------------|----------------------|------------|--------------------|
| Success    | `--color-success`    | Emerald    | Success messages   |
| Warning    | `--color-warning`    | Amber      | Warnings, caution  |
| Danger     | `--color-danger`     | Red        | Errors, destructive |
| Info       | `--color-info`       | Cyan       | Information tips   |

### Accent Colors

Used for primary action buttons and active states:

| Variable                     | Value      | Usage                 |
|------------------------------|------------|-----------------------|
| `--color-accent-cyan`        | `#00d4ff`  | Primary buttons, active |
| `--color-accent-magenta`     | `#ff2d92`  | Secondary accent      |
| `--color-accent-amber`       | `#ffb347`  | Warm accent, tail     |

## Token Architecture

All visual variables are defined in `src/theme/tokens.css`. Theme switching is implemented by React dynamically setting `data-*` attributes on the root element at runtime (the React app renders within the HTML document, using CSS attribute selectors to respond to theme changes).

### Token Layers

```
Layer 1: Raw Palette (theme-independent)
  --palette-cyan, --palette-magenta, --palette-amber ...
  --palette-*-rgb (for rgba composition)

Layer 2: Semantic Surfaces (theme × mode dependent)
  --color-bg-primary / secondary / tertiary
  --color-glass-bg, --color-glass-border
  --color-surface-card, --color-surface-nav
  --color-text-primary / secondary / tertiary / muted

Layer 3: Functional Tokens
  --gradient-holographic, --color-holo-foreground
  --color-success / warning / danger / info
  --shadow-glass, --shadow-card, --shadow-dialog
  --blur-sm / md / lg / xl
  --radius, --radius-sm / md / lg / xl / 2xl
```

### Key CSS Variable Reference

| Variable                      | Purpose                      |
|-------------------------------|------------------------------|
| `--color-glass-bg`            | Glass surface base (with alpha) |
| `--color-glass-border`        | Glass border (subtle divider) |
| `--color-glass-bg-hover`      | Interactive hover state       |
| `--gradient-holographic`      | Three-color holo gradient     |
| `--color-accent-cyan-rgb`     | Primary accent RGB value      |
| `--shadow-glow-cyan`          | Cyan glow shadow              |
| `--blur-md`                   | Medium blur value (12px)      |

## Theme System

5 built-in themes, each with dark and light modes (10 total color schemes):

| ID        | Name           | Character               | Signature Gradient           |
|-----------|----------------|-------------------------|------------------------------|
| `aurora`  | Aurora Holo    | Cold, glass, holographic | cyan → magenta → amber      |
| `cyber`   | Cyber Neon     | Neon, OLED, strong glow  | purple → pink → sky         |
| `sunset`  | Warm Minimal   | Warm, flat, soft shadows | orange → pink → amber       |
| `forest`  | Forest Natural | Green, organic, soft     | emerald → teal → lime       |
| `scholar` | Scholar Pro    | Indigo, structured       | indigo → sky → violet       |

### Runtime Switching

React dynamically sets data attributes on the root element via `src/theme/settings/apply-settings.ts`. CSS attribute selectors switch the corresponding variable sets:

```html
<!-- React sets data-* attributes on the root <html> element -->
<html
  data-theme="aurora"
  data-mode="dark"
  data-density="standard"
  data-contrast="default"
  data-font="sans"
  data-reduce-motion="false"
  data-ambient="on"
>
```

CSS selector example:

```css
[data-theme="aurora"][data-mode="dark"] {
  --color-bg-primary: #0a0a0f;
  --gradient-holographic: linear-gradient(135deg, #00d4ff, #ff2d92, #ffb347);
}
```

### Adding a New Theme

1. Add `[data-theme="xxx"][data-mode="dark|light"]` rule sets in `src/theme/tokens.css`
2. Register in the `THEMES` array in `src/theme/theme-config.ts`
3. Add translations in `src/i18n/locales/` under `settings.themes.xxx`
4. Done — no other changes needed

## Font Presets

| Preset ID  | Font Stack                        | Description        |
|------------|-----------------------------------|--------------------|
| `sans`     | Manrope + system fallback         | Default (geometric)|
| `system`   | system-ui                         | OS default         |
| `noto`     | Noto Sans SC                      | Google Noto CJK    |
| `misans`   | MiSans                            | Xiaomi typeface    |
| `puhui`    | Alibaba PuHuiTi                   | Alibaba typeface   |

## Border Radius Scale

| Token            | Value | Usage                  |
|------------------|-------|------------------------|
| `--radius-sm`    | 4px   | Small buttons, badges  |
| `--radius-md`    | 8px   | Cards, inputs          |
| `--radius-lg`    | 12px  | Dialogs, drawers       |
| `--radius-xl`    | 16px  | Panels                 |
| `--radius-2xl`   | 24px  | Large overlays         |

## Shadow Elevation

| Token             | Effect                        |
|-------------------|-------------------------------|
| `--shadow-z1`     | Slight lift (cards)           |
| `--shadow-z2`     | Medium lift (dropdowns)       |
| `--shadow-z3`     | High lift (dialogs)           |
| `--shadow-glass`  | Glass surface shadow          |
| `--shadow-glow-*` | Glow shadows (cyan/magenta/amber) |
