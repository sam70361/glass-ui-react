# Component Library

## Tech Stack

Built on the **shadcn/ui pattern**: Radix UI headless primitives + Tailwind CSS v4 + CVA variants.

| Layer    | Technology        |
|----------|-------------------|
| Headless | Radix UI          |
| Styling  | Tailwind CSS v4   |
| Variants | CVA (class-variance-authority) |
| Utility  | clsx + tailwind-merge → `cn()` |
| Icons    | lucide-react      |
| Animation| framer-motion     |
| Charts   | recharts          |

## Component Categories

### Atomic Components (`src/components/ui/`)

40+ base components providing a complete UI primitive set:

| Category  | Components                                            |
|-----------|-------------------------------------------------------|
| Input     | Button, Input, Textarea, Select, Checkbox, Switch, Slider |
| Display   | Badge, Avatar, Card, Separator, Progress, Skeleton    |
| Navigation| Tabs, Breadcrumb, Pagination                          |
| Overlay   | Dialog, Sheet, Popover, Tooltip, DropdownMenu         |
| Feedback  | Toast, Alert                                          |
| Data      | Table, DataTable (with sort/filter/pagination)        |
| Specialty | Command (palette), Calendar, DatePicker               |

### Business Composites (`src/components/shared/`)

| Component      | Purpose                                |
|----------------|----------------------------------------|
| `PageHeader`   | Page title + description + actions     |
| `StatCard`     | Stat card (value + trend + icon)       |
| `TaskCard`     | Task card (drag-and-drop kanban)       |
| `QuickAction`  | Quick action button group              |
| `UserAvatar`   | User avatar (with online status)       |
| `Timeline`     | Timeline (vertical/horizontal)         |
| `Logo`         | Brand logo (text/icon-only modes)      |
| `EmptyState`   | Empty state placeholder                |

### Scenario Templates (`src/scenarios/_kit/`)

| Template           | Purpose                             |
|--------------------|-------------------------------------|
| `MasterDetail`     | Master-detail layout (list + panel) |
| `ScenarioToolbar`  | Toolbar (filter/search/view toggle) |
| `ScenarioGate`     | Loading/error/empty state handler   |
| `CodeBlock`        | Code display (syntax highlighted)   |

### Chart Components (`src/components/charts/`)

| Component    | Purpose           |
|--------------|-------------------|
| `AreaTrend`  | Area trend chart  |
| `DonutChart` | Donut chart       |
| `Heatmap`    | Heatmap           |

## Glass Utility Classes

Defined in `src/theme/glass.css`:

| Class               | Effect                                   |
|---------------------|------------------------------------------|
| `.glass-card`       | Frosted card (backdrop-blur + border)    |
| `.glass-nav`        | Navigation glass surface                 |
| `.glass-panel`      | Modal/panel glass background             |
| `.glass-topbar`     | Top bar glass effect                     |
| `.holographic-text` | Holographic gradient text                |
| `.holographic-bg`   | Holographic gradient background          |

### Usage Example

```tsx
<div className="glass-card p-6 rounded-[var(--radius-lg)]">
  <h3 className="holographic-text text-lg font-semibold">Title</h3>
  <p className="text-text-secondary">Description</p>
  <button className="holographic-bg px-4 py-2 rounded-[var(--radius-md)] text-white">
    Primary Action
  </button>
</div>
```

## Responsive & Accessibility

- Fluid layout via CSS Grid + `--content-gutter` variable
- Navigation adapts: mini sidebar → expanded sidebar → horizontal top nav
- All interactive elements have proper `aria-*` labels
- `prefers-reduced-motion` respected via `data-reduce-motion`
- High-contrast mode via `data-contrast="high"`
- Full keyboard navigation (Command palette: `Cmd+K`)

## Component Development Guidelines

1. New components go in `src/components/ui/` (atomic) or `src/components/shared/` (composite)
2. Use `cn()` for className merging
3. Style only via Tailwind classes + CSS variables, no inline styles (unless dynamic values)
4. Export props types for external extensibility
5. Write Storybook stories for every component
