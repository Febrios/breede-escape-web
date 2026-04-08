# Breede Escape Web

This is the web frontend for Breede Escape, a boutique guest house and eco-retreat. See the [project plan](./PROJECT_PLAN.md) for more detail on features, milestones, and upcoming tasks.

## Overview
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Type Checking:** TypeScript
- **CMS:** [Sanity.io](https://sanity.io) (planned)

## Features
- Room listings with dynamic CMS content
- Gallery & booking/availability
- Contact form with API integration
- Responsive, mobile-friendly UI
- Domain + production deploy via Vercel

## Project Structure
- `app/` — Main application folder (Next.js App Router)
  - `components/` — Shared UI components
  - `features/` — Feature-specific modules/components
  - `lib/` — Utility functions, modules
  - `styles/` — Global and modular CSS
  - `types/` — Shared TypeScript types/interfaces
  - `page.tsx`, `layout.tsx` — Main entry layout/pages
- `public/` — Static assets

## Tasks & Planning
See [../TASKS.md](../TASKS.md) for the top-level project board. Task details live in [../tasks/](../tasks/).

## Development
```bash
npm install
npm run dev
```
Local: http://localhost:3000

## Contribution Workflow
- Follow [conventional commits](https://www.conventionalcommits.org/)
- Open a Pull Request for all changes
- Keep main branch deployable

## License
[MIT](./LICENSE)
