<p align="center">
  <img src="public/favicon.svg" width="64" height="64" alt="Glass UI Logo" />
</p>

<h1 align="center">Glass UI React</h1>

<p align="center">A dark glassmorphism React workspace template</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite" alt="Vite 6" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss" alt="Tailwind 4" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript" alt="TypeScript" />
  <a href="README.md">中文</a>
</p>

---

## Preview

<p align="center">
  <img src="docs/screenshots/dashboard-dark.png" width="100%" alt="Dashboard" />
</p>

<p align="center">
  <img src="docs/screenshots/theme-switching.png" width="49%" alt="Theme Switching" />
  <img src="docs/screenshots/command-palette.png" width="49%" alt="Command Palette" />
</p>

<p align="center">
  <img src="docs/screenshots/glass-components.png" width="100%" alt="Glass Components" />
</p>

---

## Features

- **Dark Glassmorphism UI** — frosted glass surfaces + holographic gradients + ambient glow
- **5 Theme Presets** — Aurora / Cyber / Sunset / Forest / Scholar (each with dark/light)
- **Registry-Driven Architecture** — add a page in one line, routes/nav/commands auto-derive
- **40+ Components** — Radix + shadcn pattern, fully token-driven
- **30+ Business Scenarios** — Dashboard, Board, Inbox, CRM, AI Chat, IoT, Healthcare…
- **Skills System** — plugin marketplace, capability assembly, custom extensions
- **i18n Ready** — Chinese + English, `useTranslation()` throughout
- **PWA Support** — installable progressive web app

---

## Tech Stack

| Category   | Technology                    |
|------------|-------------------------------|
| Framework  | React 19 + React Router 7    |
| Build      | Vite 6 + SWC                 |
| Styling    | Tailwind CSS v4 + CVA        |
| Components | Radix UI + shadcn pattern    |
| State      | Zustand 5 + TanStack Query 5 |
| Forms      | React Hook Form + Zod        |
| i18n       | i18next + react-i18next      |
| Charts     | Recharts                     |
| Animation  | Framer Motion                |
| DnD        | @dnd-kit                     |
| Mock API   | MSW 2                        |
| Types      | TypeScript 5.7               |

---

## Quick Start

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Type check
pnpm typecheck

# Lint
pnpm lint
```

---

## Project Structure

```
src/
├── theme/              Design tokens, CSS variables, theme config
├── components/
│   ├── ui/             40+ atomic components (Button, Dialog, Table...)
│   ├── shared/         Business composites (PageHeader, StatCard...)
│   ├── charts/         Chart wrappers (recharts)
│   ├── overlays/       Command palette, Copilot panel
│   └── settings-drawer/  Appearance settings panel
├── scenarios/
│   ├── registry.ts     Scenario registry (single source of truth)
│   ├── _kit/           Scenario layout templates
│   ├── dashboard/      Dashboard
│   ├── board/          Kanban board
│   ├── skills/         Skill plugin marketplace
│   └── ...             30+ more scenarios
├── layouts/            App shell (sidebar, topbar, auth)
├── api/                TanStack Query hooks
├── mocks/              MSW handlers + fixture data
├── store/              Zustand stores
├── i18n/               Internationalization (zh-CN, en)
├── routes/             Route path constants
└── lib/                Utilities (cn, format, platform)
```

---

## Documentation

| Document    | Description                        |
|-------------|------------------------------------|
| [Architecture](docs/architecture_en.md) | Layer architecture, registry routing, state management |
| [Design Tokens](docs/design-tokens_en.md) | Token system, themes, fonts |
| [Components](docs/components_en.md) | Atomic, composite, utilities |
| [Scenarios](docs/scenarios_en.md) | 30+ business scenarios, Skills |
| [UI Guide](docs/ui-guide_en.md) | Visual specs, spacing, typography, motion |

---

## Contact

Feel free to reach out — scan the QR code to add me on WeChat:

<p align="center">
  <img src="docs/screenshots/wechat-qr.jpg" width="200" alt="WeChat QR Code" />
</p>

---

## License

MIT
