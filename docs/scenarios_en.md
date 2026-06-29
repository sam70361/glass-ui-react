# Scenario System

## Overview

Glass UI React includes 30+ business scenarios across 6 categories: AI Workspace, Commerce, Data & Ops, Collaboration, Content & Editing, and Industry Verticals. Each scenario is an independent feature page managed via a unified registry.

## Scenario Categories

### AI Workspace

| Scenario ID   | Name         | Description                          |
|---------------|--------------|--------------------------------------|
| `chat`        | Chat         | Multi-turn conversation, streaming   |
| `agents`      | Agents       | Agent orchestration, tool calls      |
| `prompts`     | Prompts      | Template management, versioning      |
| `rag`         | Knowledge Base| Document retrieval, chunking        |
| `memory`      | Memory       | Long-term memory, user profiles      |
| `skills`      | Skills       | Plugin marketplace, capability assembly |
| `api-keys`    | Model Config | API keys, quota, routing             |

### Commerce

| Scenario ID   | Name     | Description                    |
|---------------|----------|--------------------------------|
| `orders`      | Orders   | Order lifecycle, fulfillment   |
| `inventory`   | Inventory| Stock levels, replenishment    |
| `crm`         | CRM      | Customer profiles, pipeline    |
| `billing`     | Billing  | Subscriptions, usage billing   |
| `trading`     | Trading  | Market data, matching engine   |
| `risk`        | Risk     | Rule engine, hits and actions  |

### Data & Ops

| Scenario ID     | Name          | Description                  |
|-----------------|---------------|------------------------------|
| `observability` | Observability | Metrics, logs, alert dashboards |
| `iot`           | IoT           | Device topology, telemetry   |
| `data-pipeline` | Data Pipeline | ETL orchestration, lineage   |
| `sql-console`   | SQL Console   | Query editor, result sets    |
| `experiments`   | A/B Tests     | Experiment splits, significance |

### Collaboration & Services

| Scenario ID   | Name        | Description                  |
|---------------|-------------|------------------------------|
| `tickets`     | Tickets     | Ticket routing, SLA tracking |
| `code-review` | Code Review | Diff view, comments, merging |
| `workflow`    | Workflow    | Node canvas, conditions      |

### Content & Editing

| Scenario ID       | Name            | Description                |
|-------------------|-----------------|----------------------------|
| `cms`             | CMS             | Content entries, publishing |
| `files`           | Files           | File tree, preview, versions |
| `doc-editor`      | Documents       | Rich text, collaborative editing |
| `report-designer` | Report Designer | Drag-and-drop, export      |

### Industry Verticals

| Scenario ID   | Name       | Description                    |
|---------------|------------|--------------------------------|
| `healthcare`  | Healthcare | Patient vitals, medical records |
| `logistics`   | Logistics  | Shipment tracking, delivery    |
| `lms`         | Education  | Courses, chapters, progress    |
| `recruiting`  | Recruiting | Candidate pipeline, interviews |

## Skills Feature

Skills is a core scenario in the AI Workspace, providing **plugin marketplace and capability assembly**:

### Core Capabilities

- **Plugin Marketplace** — Browse and search available skill plugins
- **Capability Assembly** — Configure and compose skill sets for Agents
- **Custom Extensions** — Developers can write custom skills
- **Version Control** — Skill plugin versioning and rollback
- **Access Control** — Permission and rate limiting for skill invocations

### Skill Types

| Type         | Description                               |
|--------------|-------------------------------------------|
| Tool         | API calls, data queries, file operations  |
| Knowledge    | RAG retrieval, knowledge graph queries    |
| Process      | Multi-step orchestration, conditionals    |
| Integration  | Third-party services (Slack, GitHub, etc.)|

## Adding a New Scenario

Add one line in `src/scenarios/registry.ts`:

```ts
{
  id: 'my-scenario',
  title: 'My Scenario',
  icon: MyIcon,
  tier: 'demo',
  category: 'ai',
  component: lazy(() => import('./my-scenario/my-scenario-view')),
}
```

Then create the directory:

```
src/scenarios/my-scenario/
├── my-scenario-view.tsx    # Main view
├── components/             # Local components (optional)
└── my-scenario.mock.ts     # Mock data (optional)
```

The system auto-handles routing, navigation, and command palette registration.

## Scenario Development Guidelines

1. Each scenario gets its own directory
2. Main view file named `<id>-view.tsx`
3. Local components go in a `components/` subdirectory
4. Mock data named `<id>.mock.ts`
5. Use `_kit` layout templates for visual consistency
6. Data via TanStack Query + MSW — no direct global store access in views
