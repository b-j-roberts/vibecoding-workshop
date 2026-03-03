# Starknet USDC Dashboard Development Roadmap

---

## Phase 1: Project Setup

### 1.1 Initialize Next.js Application

**Description**: Scaffold a new Next.js 15 app with TypeScript, Tailwind CSS v4, and App Router. Install starknet.js as the core blockchain dependency. This is the foundation everything else builds on.

**Requirements**:
- [ ] Initialize Next.js 15 with `npx create-next-app@latest` (TypeScript, Tailwind, App Router, src directory: no)
- [ ] Install starknet.js: `npm install starknet`
- [ ] Install lucide-react for icons: `npm install lucide-react`
- [ ] Verify `npm run dev` starts successfully on localhost:3000
- [ ] Set up `.env.local` with `NEXT_PUBLIC_RPC_URL` (optional, defaults to public node)

**Implementation Notes**:
- Use the latest Next.js 15 with App Router — do not use Pages Router
- Tailwind CSS v4 ships built-in with `create-next-app` when selected
- starknet.js v9.x is current stable — provides RpcProvider and Contract classes
- No additional state management libraries needed (React hooks are sufficient)

---

### 1.2 Makefile and Developer Tooling

**Description**: Create a top-level Makefile exposing common development tasks. Ensures consistent commands for anyone running the project.

**Requirements**:
- [ ] `make dev` — starts Next.js dev server
- [ ] `make build` — production build
- [ ] `make lint` — run ESLint
- [ ] `make clean` — remove `.next` and `node_modules`
- [ ] `make install` — install npm dependencies

**Implementation Notes**:
- Keep the Makefile simple — it wraps `npm` commands for convenience
- No Docker for this project (it's a single-page demo app deployed to Vercel)

---

### 1.3 Global Styles and Layout Shell

**Description**: Set up the dark-themed dashboard layout with fonts, CSS custom properties, and the root layout component. Establish the visual foundation before building any data components.

**Requirements**:
- [ ] Configure Inter font (sans) and JetBrains Mono (mono) via `next/font`
- [ ] Set up CSS custom properties for the color palette defined in STYLES.md
- [ ] Create root `layout.tsx` with dark background, centered max-width container, and metadata
- [ ] Create `page.tsx` with placeholder dashboard grid layout
- [ ] Add page header with title ("Starknet USDC Dashboard") and a "Last updated" timestamp area

**Implementation Notes**:
- Use `next/font/google` for both Inter and JetBrains Mono — automatic optimization
- Tailwind config should extend with custom colors matching STYLES.md tokens
- The layout grid should be responsive: single column on mobile, multi-column on desktop
- Use semantic HTML: `<main>`, `<header>`, `<section>` for the dashboard regions

---

### 1.4 Component Stubs

**Description**: Create placeholder components for each dashboard widget with "Coming Soon" content. This establishes the component structure and verifies the layout grid works before wiring up real data.

**Requirements**:
- [ ] `TotalSupplyCard.tsx` — hero card placeholder showing "$---,---,---.--"
- [ ] `StatsBar.tsx` — three stat cards row with placeholder values
- [ ] `TransferFeed.tsx` — card with "Recent Transfers" title and empty state
- [ ] `WhaleAlert.tsx` — card with "Whale Alerts" title and empty state
- [ ] All components render in the dashboard grid with proper spacing

**Implementation Notes**:
- Mark all components as `"use client"` since they will fetch data client-side
- Use Tailwind classes matching the card styles from STYLES.md
- Include loading skeleton styles from the start — they'll be needed once real data loads

---

## Phase 2: MVP

### 2.1 Starknet RPC Provider Setup

**Description**: Configure the starknet.js RpcProvider to connect to Starknet mainnet. This is the data layer foundation — every contract read flows through this provider.

**Requirements**:
- [ ] Create `lib/starknet.ts` exporting a configured `RpcProvider` instance
- [ ] Support configurable RPC URL via `NEXT_PUBLIC_RPC_URL` env var
- [ ] Fall back to starknet.js default public node if no env var set
- [ ] Verify connectivity by calling `provider.getBlockNumber()` (test manually)

**Implementation Notes**:
- Import `RpcProvider` from `starknet`
- The provider is a singleton — instantiate once and export
- Public nodes have soft rate limits but are fine for a demo dashboard
- If hitting rate limits, users can swap in an Alchemy or Infura URL via the env var

---

### 2.2 USDC Total Supply Integration

**Description**: Read the USDC total supply from the Starknet mainnet contract and display it in the hero card. This is the first "real data" moment — the dashboard comes alive.

**Requirements**:
- [ ] Create `lib/usdc.ts` with the native USDC contract address constant
- [ ] Implement `getTotalSupply()` function using `starknet_call` to the `total_supply` entrypoint
- [ ] Handle uint256 return value (low + high felt) and convert to human-readable format (6 decimals)
- [ ] Create `hooks/useTotalSupply.ts` polling hook with configurable interval (default 30s)
- [ ] Wire `TotalSupplyCard` to display the live total supply formatted as "$X,XXX,XXX.XX"
- [ ] Show loading skeleton while initial data loads

**Implementation Notes**:
- Native USDC address: `0x033068F6539f8e6e6b131e6B2B814e6c34A5224bC66947c47DaB9dFeE93b35fb`
- USDC uses 6 decimals (not 18 like ETH)
- `total_supply` returns a `Uint256` (two felts: low, high) — combine as `high * 2^128 + low`
- Use `starknet.js` Contract class with a minimal ABI (just the `total_supply` function) rather than raw RPC calls
- Format large numbers with `Intl.NumberFormat` for proper comma separation

---

### 2.3 Transfer Events Integration

**Description**: Fetch recent USDC Transfer events from the blockchain and display them in the transfer feed. This is the most visually dynamic part of the dashboard.

**Requirements**:
- [ ] Define the `Transfer` type in `lib/types.ts`
- [ ] Implement `getRecentTransfers()` in `lib/usdc.ts` using `starknet_getEvents`
- [ ] Parse Transfer event data: extract `from`, `to`, `value` (uint256) fields
- [ ] Create `hooks/useTransfers.ts` polling hook (default 15s interval)
- [ ] Wire `TransferFeed` component to show transfers as a scrollable list
- [ ] Display truncated addresses (`0x1234...5678`), formatted amounts, and relative timestamps
- [ ] Show empty state when no transfers are found in the query window

**Implementation Notes**:
- Transfer event key: the Starknet selector hash for `Transfer` — compute using `starknet.hash.getSelectorFromName('Transfer')`
- `starknet_getEvents` requires a block range — use last ~100 blocks or a `from_block`/`to_block` range
- Event data layout for ERC-20 Transfer: keys = [selector, from, to], data = [amount_low, amount_high]
- Truncate addresses to first 6 + last 4 characters for display
- Sort transfers by block number descending (newest first)

---

### 2.4 Whale Alerts and Stats

**Description**: Identify large transfers ("whale" activity) and compute aggregate stats for the stats bar. This adds the analytical layer that makes the dashboard feel like a real monitoring tool.

**Requirements**:
- [ ] Define whale threshold constant (default: 10,000 USDC)
- [ ] Filter transfers to identify whales (`amount >= threshold`)
- [ ] Wire `WhaleAlert` component to display whale transfers with distinct visual treatment
- [ ] Compute and display stats: transfer count, largest transfer, unique addresses
- [ ] Wire `StatsBar` component to show computed stats
- [ ] Whale transfers should appear with warning-colored left border and alert icon

**Implementation Notes**:
- Whale detection is purely client-side — filter the already-fetched transfers
- Stats are derived from the same transfer data — no additional RPC calls needed
- Use `Set` to count unique addresses across from/to fields
- The whale threshold could be made configurable later, but hardcode for MVP
- Use Lucide `AlertTriangle` icon for whale alerts

---

## Phase 3: Nice to Have

### 3.1 Auto-Refresh with Live Indicator

**Description**: Add a visible live-updating indicator and smooth transitions when data refreshes. This transforms the dashboard from "static page" to "live monitor."

**Requirements**:
- [ ] Pulsing green dot in the header indicating "Live" status
- [ ] "Last updated: X seconds ago" counter that updates every second
- [ ] Smooth number transitions when total supply changes (brief accent flash)
- [ ] New transfer rows animate in from top (slide + fade, 300ms)
- [ ] Pause/resume polling on tab visibility change (`document.hidden`)

**Implementation Notes**:
- Use `requestAnimationFrame` or `setInterval` for the "seconds ago" counter
- Respect `prefers-reduced-motion` for all animations
- Use the Page Visibility API to stop polling when the tab is backgrounded — saves RPC calls
- CSS `@keyframes` for the pulsing dot; Tailwind's `animate-pulse` works as a starting point

---

### 3.2 Error Handling and Edge Cases

**Description**: Handle network errors, empty states, and RPC failures gracefully so the dashboard never shows a broken state during the live demo.

**Requirements**:
- [ ] Show user-friendly error message if RPC calls fail (with retry button)
- [ ] Maintain stale data on screen while retrying (don't flash to empty)
- [ ] Handle case where USDC contract returns unexpected data
- [ ] Add loading skeletons that match the shape of real content
- [ ] Graceful fallback if Transfer events return empty (show "No recent transfers")

**Implementation Notes**:
- Wrap RPC calls in try/catch; on failure, keep previous state and show a subtle error banner
- Use `SWR`-style stale-while-revalidate pattern — show old data while fetching new
- Skeleton components should use the shimmer animation from STYLES.md
- Consider adding a small toast/banner for transient errors rather than replacing the whole UI

---

### 3.3 Responsive Design and Polish

**Description**: Ensure the dashboard looks great on mobile, tablet, and desktop. Add final visual polish — spacing, alignment, and micro-interactions.

**Requirements**:
- [ ] Single column layout on mobile (< 768px)
- [ ] Two column layout for feed + whale alerts on tablet (768px+)
- [ ] Full grid layout on desktop (1024px+)
- [ ] Touch-friendly tap targets on mobile (min 44px)
- [ ] Proper text truncation for addresses at all screen sizes
- [ ] Favicon and page title with Starknet branding

**Implementation Notes**:
- Use Tailwind responsive prefixes: `md:`, `lg:` for breakpoint-specific styles
- Test the transfer feed scrollability on mobile — may need `max-height` with overflow
- Consider horizontal scroll for stat cards on small screens vs. stacking

---

## Phase 4: Future

### 4.1 Historical Charts

**Description**: Time-series visualizations showing USDC supply and transfer volume over time, turning the dashboard into an analytics tool.

**Features**:
- Total supply over time (line chart)
- Transfer volume by day/hour (bar chart)
- Average transfer size trends
- Integration with a lightweight charting library (e.g., Recharts, Chart.js)

**Rationale**: Charts transform raw numbers into visual stories. PMs love charts for tracking metrics and telling narratives about adoption trends.

---

### 4.2 Address Lookup

**Description**: Search functionality to look up a specific address's USDC balance and transfer history on Starknet.

**Features**:
- Search bar to input a Starknet address
- Display address USDC balance via `balanceOf()` call
- Show that address's transfer history (filtered events)
- Link out to Starkscan/Voyager block explorer for full details

**Rationale**: Adds interactivity beyond passive monitoring. Useful for PMs tracking specific wallets (treasury, partner addresses, test accounts).

---

### 4.3 Multi-Token Support

**Description**: Expand beyond USDC to track other major tokens on Starknet (ETH, STRK, USDT, DAI).

**Features**:
- Token selector dropdown
- Dynamic contract address switching
- Comparative metrics across tokens
- Token-specific branding and colors

**Rationale**: Generalizes the dashboard from a single-token viewer to a multi-asset monitor, dramatically increasing utility.

---

### 4.4 Deployment and CI/CD

**Description**: Production deployment to Vercel with automated builds on push.

**Features**:
- Vercel project connected to GitHub repo
- Automatic preview deployments on PRs
- Environment variable management via Vercel dashboard
- Custom domain configuration
- Performance monitoring via Vercel Analytics

**Rationale**: Completes the "ship it" story — the demo goes from localhost to a real URL anyone can visit.
