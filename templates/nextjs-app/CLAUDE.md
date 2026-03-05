# CLAUDE.md

## Project Overview

This is a Next.js web application MVP. It uses the App Router, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Deployment**: Vercel

## Project Structure

- `app/` — Pages and layouts (file-based routing)
- `app/layout.tsx` — Root layout shared by all pages
- `app/page.tsx` — Home page (fetches data from the API)
- `app/api/` — API routes (backend endpoints)
- `app/globals.css` — Global styles and Tailwind imports
- `components/` — Reusable UI components
- `public/` — Static assets (images, favicon)
- `lib/` — Utility functions and shared logic (create as needed)

## Data Flow

The app follows a client-fetch pattern:
1. API routes in `app/api/` return JSON data
2. Client components fetch from those routes using `fetch("/api/...")`
3. Components render the data

Example: `app/page.tsx` fetches from `/api/stats` and renders Card components.

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — Run ESLint

## Conventions

- Use the App Router (`app/` directory), not the Pages Router
- Components go in `components/` with PascalCase filenames
- Utility functions go in `lib/` with camelCase filenames
- Use Tailwind utility classes for styling — avoid separate CSS files
- Use Lucide React for icons: `import { IconName } from "lucide-react"`
- Server Components are the default; add `"use client"` only when needed (event handlers, hooks, browser APIs)
- Keep components small and focused — one component per file

## Environment Variables

- Server-only: `process.env.VARIABLE_NAME`
- Client-accessible: must be prefixed with `NEXT_PUBLIC_`
- Defined in `.env.local` (not committed to git)

## Adding a New Page

Create `app/route-name/page.tsx`:

```tsx
export default function PageName() {
  return <div>Page content</div>;
}
```

## Adding an API Route

Create `app/api/route-name/route.ts`:

```ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello" });
}
```

## Workshop Skills

Two skills are available for this project:

- **`/project-init`** — Run this first to scope your project into a spec + roadmap
- **`/checkpoint`** — Run this after completing each feature to review changes and commit

Workflow: implement a feature → run `npm run dev` → verify it works → `/checkpoint` → next feature.
