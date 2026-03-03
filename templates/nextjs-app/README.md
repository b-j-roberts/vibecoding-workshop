# Next.js Web App Template

A minimal Next.js starter for building web app MVPs — dashboards, internal tools, simple UIs.

## What's Included

- **Next.js 16** with App Router and TypeScript
- **Tailwind CSS 4** for styling
- **Lucide React** for icons
- One example page with a card component to show the pattern
- A `CLAUDE.md` file for Claude Code context

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout (metadata, fonts, global styles)
│   ├── page.tsx            # Home page — fetches data from the API
│   ├── globals.css         # Global styles (Tailwind imports)
│   └── api/
│       └── stats/
│           └── route.ts    # Example API endpoint (returns JSON)
├── components/
│   └── Card.tsx            # Example reusable component
├── public/                 # Static assets (images, favicon)
├── CLAUDE.md               # Context file for Claude Code
├── .env.example            # Environment variable template
└── package.json
```

## Adding Pages

Create a new folder inside `app/` with a `page.tsx` file:

```
app/
├── page.tsx            # → /
├── about/
│   └── page.tsx        # → /about
└── dashboard/
    └── page.tsx        # → /dashboard
```

## Environment Variables

If your project needs API keys or config:

1. Copy the example file: `cp .env.example .env.local`
2. Fill in your values
3. Access server-side: `process.env.API_KEY`
4. Access client-side: `process.env.NEXT_PUBLIC_APP_URL` (must start with `NEXT_PUBLIC_`)

## Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Click **Deploy**

That's it. Vercel auto-detects Next.js and handles the build.

If you have environment variables, add them in the Vercel dashboard under **Settings > Environment Variables** before deploying.

## Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (with Turbopack) |
| `npm run build` | Build for production |
| `npm run start` | Run production build locally |
| `npm run lint` | Run ESLint |
