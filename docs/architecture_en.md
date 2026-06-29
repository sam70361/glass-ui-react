# Architecture

## Overview

Glass UI React uses a **registry-driven routing** + **layered component system** architecture. Core principles: separation of concerns, single source of truth, zero-config scenario extensibility.

## Layer Architecture

```
┌─────────────────────────────────────────────────────────┐
│  scenarios/          Feature pages (views + local state) │
├─────────────────────────────────────────────────────────┤
│  scenarios/_kit/     Scenario layout templates           │
├─────────────────────────────────────────────────────────┤
│  layouts/            App shell (sidebar, topbar, nav)    │
├─────────────────────────────────────────────────────────┤
│  components/shared/  Business composites                 │
├─────────────────────────────────────────────────────────┤
│  components/ui/      Atomic primitives (Button, Dialog)  │
├─────────────────────────────────────────────────────────┤
│  theme/              Design tokens, CSS variables        │
└─────────────────────────────────────────────────────────┘
```

**Dependency direction is strictly one-way**: lower layers never import from upper layers.

## Registry-Driven Routing

All pages are registered in `src/scenarios/registry.ts`. Adding a new page requires only one line — routes, sidebar nav, command palette items, and scenario hub all derive automatically.

### Scenario Tiers

| Tier   | Purpose              | Routing                      |
|--------|----------------------|------------------------------|
| `core` | Main product pages   | Fixed path (e.g. `/dashboard`) |
| `util` | Utility pages        | Fixed path, not in sidebar   |
| `demo` | Industry demo scenes | Dynamic `/scenarios/:id`     |

### Registration Example

```ts
{ id: 'my-page', title: 'My Page', icon: Star, tier: 'demo', category: 'ai', component: lazy(() => import('./my-page/my-page-view')) }
```

This single line auto-generates:
- Route → `/scenarios/my-page`
- Sidebar nav item
- Command palette search entry
- Scenario hub card

## Key Directories

| Directory               | Responsibility                                     |
|-------------------------|----------------------------------------------------|
| `src/theme/`            | Design tokens (CSS vars), theme config, settings   |
| `src/components/ui/`    | 40+ atomic components (Radix/shadcn pattern)       |
| `src/components/shared/`| Business composites (PageHeader, StatCard)          |
| `src/scenarios/_kit/`   | Scenario layout templates (MasterDetail, Toolbar)  |
| `src/scenarios/<id>/`   | Each scenario: view + local components + mock      |
| `src/layouts/`          | App shell (dashboard/auth/centered layouts)         |
| `src/api/`              | TanStack Query hooks + fetcher layer               |
| `src/mocks/`            | MSW handlers + fixture data                        |
| `src/store/`            | Zustand stores (app data, UI state)                |
| `src/i18n/`             | i18next config + locale JSON files                 |

## State Management

| Layer        | Tool                  | Scope                          |
|--------------|-----------------------|--------------------------------|
| Server state | TanStack Query        | Async data (via MSW mock API)  |
| App state    | Zustand (persisted)   | User, projects, tasks          |
| Settings     | Zustand (persisted)   | Theme, font, layout, locale    |
| UI state     | Zustand (session)     | Modals, drawers, navigation    |

## Build Tooling

| Tool            | Role                  |
|-----------------|-----------------------|
| Vite 6          | Dev server + build    |
| SWC             | Fast JSX/TS transform |
| Tailwind CSS v4 | Utility-first styling |
| TypeScript 5.7  | Type safety           |
| ESLint 9        | Linting               |
| MSW 2           | Mock Service Worker   |
| Storybook 8     | Component docs        |
| vite-plugin-pwa | PWA support           |

## Hard Rules

1. **No hardcoded colors** — all via CSS variables or `DATA_PALETTE` constants
2. **Single source of truth** — scenarios in `registry.ts`, paths in `paths.ts`
3. **Scenario data** via TanStack Query + MSW, not direct store reads
4. **One-way dependency** — `theme → ui → shared → kit → scenarios`
5. **i18n-ready** — all UI text via `useTranslation()` / `t()` calls
