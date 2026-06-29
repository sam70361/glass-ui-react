# UI Design Guide

This document is the visual design specification for Glass UI React, helping designers and developers understand and replicate this UI system.

## Visual Foundation

| Dimension | Specification                                 |
|-----------|-----------------------------------------------|
| Style     | Dark Glassmorphism                            |
| Canvas    | Deep dark base (#0a0a0f ~ #0f172a)            |
| Surface   | Translucent frosted glass (backdrop-blur + rgba) |
| Accent    | Holographic tri-color gradient                |
| Borders   | Subtle dividers (rgba white 6-12% opacity)    |
| Radius    | Unified scale (4px ~ 24px progression)        |

## Spacing System

Based on a 4px baseline grid:

| Level | Value | Usage                       |
|-------|-------|-----------------------------|
| xs    | 4px   | Icon-to-text gap            |
| sm    | 8px   | Intra-component spacing     |
| md    | 12px  | Card internal padding       |
| lg    | 16px  | Section spacing             |
| xl    | 24px  | Panel/card padding          |
| 2xl   | 32px  | Page-level section gaps     |
| 3xl   | 48px  | Major region spacing        |

## Typography

### Size Scale

| Level       | Size   | Line Height | Weight | Usage         |
|-------------|--------|-------------|--------|---------------|
| Display     | 30px   | 1.2         | 700    | Page title    |
| Heading 1   | 24px   | 1.3         | 600    | Section title |
| Heading 2   | 20px   | 1.4         | 600    | Card title    |
| Heading 3   | 16px   | 1.5         | 600    | Subtitle      |
| Body        | 14px   | 1.5         | 400    | Body text     |
| Caption     | 12px   | 1.4         | 400    | Helper text   |
| Overline    | 10px   | 1.3         | 500    | Labels/badges |

### Text Colors

| Level             | CSS Variable                 | Opacity | Usage        |
|-------------------|------------------------------|---------|--------------|
| Primary           | `--color-text-primary`       | 95%     | Headings     |
| Secondary         | `--color-text-secondary`     | 72%     | Body text    |
| Tertiary          | `--color-text-tertiary`      | 50%     | Helper info  |
| Muted             | `--color-text-muted`         | 35%     | Disabled     |

## Glass Surface Specs

### Card (glass-card)

```css
background: rgba(255, 255, 255, 0.03);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: var(--radius-lg);  /* 12px */
box-shadow: var(--shadow-glass);
```

### Navigation Panel (glass-nav)

```css
background: rgba(10, 10, 15, 0.85);
backdrop-filter: blur(20px);
border-right: 1px solid rgba(255, 255, 255, 0.06);
```

### Overlay Panel (glass-panel)

```css
background: rgba(15, 15, 20, 0.92);
backdrop-filter: blur(24px);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: var(--radius-xl);  /* 16px */
box-shadow: var(--shadow-z3);
```

## Holographic Gradient Specs

Primary action elements use holographic gradients as visual identifiers:

```css
/* Gradient background (buttons/progress/active states) */
background: linear-gradient(135deg, var(--holo-1), var(--holo-2), var(--holo-3));

/* Gradient text */
background: linear-gradient(135deg, var(--holo-1), var(--holo-2), var(--holo-3));
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

Signature colors per theme:

| Theme    | Color 1   | Color 2   | Color 3   |
|----------|-----------|-----------|-----------|
| aurora   | `#00d4ff` | `#ff2d92` | `#ffb347` |
| cyber    | `#a855f7` | `#ec4899` | `#38bdf8` |
| sunset   | `#ff8a4c` | `#ff5d8f` | `#ffb347` |
| forest   | `#10b981` | `#14b8a6` | `#84cc16` |
| scholar  | `#4f46e5` | `#0ea5e9` | `#8b5cf6` |

## Interaction States

| State    | Visual Change                                  |
|----------|------------------------------------------------|
| Default  | Glass base + subtle border                     |
| Hover    | Lighten background (+0.02 alpha), brighten border |
| Active   | Holographic border / cyan accent               |
| Focus    | Outer glow ring (cyan glow)                    |
| Disabled | Reduce overall opacity to 50%                  |

## Navigation Layouts

### Expanded Sidebar (default)

- Width: 260px (`--sidebar-width-expanded`)
- Contains: Logo + grouped nav + bottom shortcuts
- Group headers: 12px uppercase, text-muted

### Mini Sidebar

- Width: 72px (`--sidebar-width`)
- Icons only + 10px abbreviated text
- Tooltip on hover shows full name

### Horizontal Top Nav

- Height: 56px (`--topbar-height`)
- Logo + dropdown groups + search + actions

## Icon Standards

- Library: lucide-react
- Default sizes: 18px (sidebar) / 16px (toolbar) / 20px (large)
- Stroke width: 1.5px ~ 2px
- Color: inherits text color (`currentColor`)

## Animation Standards

| Context      | Duration | Easing                      |
|--------------|----------|-----------------------------|
| Micro        | 150ms    | ease-out                    |
| Panel expand | 200ms    | cubic-bezier(0.4,0,0.2,1)  |
| Page switch  | 250ms    | ease-in-out                 |
| Dialog enter | 300ms    | spring (bounce)             |
| Drag feedback| 0ms      | linear                      |

When `data-reduce-motion="true"`, all animation durations are set to zero.
