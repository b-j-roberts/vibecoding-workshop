# Starknet USDC Dashboard — Specification

## Project Overview

**Name**: Starknet USDC Dashboard
**Purpose**: A real-time dashboard tracking USDC stablecoin activity on Starknet mainnet — total supply, recent transfers, and large transaction alerts ("whale watch").
**Target Users**: StarkWare PMs (as workshop audience), anyone interested in on-chain USDC metrics.
**Context**: Live demo project for the StarkWare PM Vibe Coding Workshop (Day 1). Built end-to-end in ~45 minutes to demonstrate vibecoding with Claude Code.

### Why This Project

- Dashboards are a core PM artifact — universally relatable
- USDC is universally understood — no domain expertise needed
- Real data from Starknet mainnet — not mock data
- Visually impressive with minimal complexity
- Directly relevant to StarkWare PMs tracking on-chain metrics

---

## Architecture

```
┌─────────────────────────────────────────────┐
│              Next.js App (Vercel)            │
│                                             │
│  ┌──────────┐ ┌──────────┐ ┌─────────────┐ │
│  │  Total    │ │ Transfer │ │   Whale     │ │
│  │  Supply   │ │   Feed   │ │   Alerts    │ │
│  │  Card     │ │          │ │             │ │
│  └────┬─────┘ └────┬─────┘ └──────┬──────┘ │
│       │             │              │        │
│  ┌────▼─────────────▼──────────────▼──────┐ │
│  │         lib/usdc.ts                    │ │
│  │    (contract read functions)           │ │
│  └────────────────┬───────────────────────┘ │
│                   │                         │
│  ┌────────────────▼───────────────────────┐ │
│  │         lib/starknet.ts                │ │
│  │    (RpcProvider configuration)         │ │
│  └────────────────┬───────────────────────┘ │
└───────────────────┼─────────────────────────┘
                    │ JSON-RPC
                    ▼
         ┌──────────────────┐
         │  Starknet Mainnet │
         │   (Public RPC)    │
         │                   │
         │  USDC Contract    │
         │  0x03306...5fb    │
         └──────────────────┘
```

**Data Flow**:
1. Next.js page loads → client components mount
2. Components call functions in `lib/usdc.ts`
3. `usdc.ts` uses starknet.js `RpcProvider` to make JSON-RPC calls to Starknet mainnet
4. `starknet_call` reads total supply from the USDC contract
5. `starknet_getEvents` fetches recent Transfer events
6. Components render the data with auto-refresh polling

**Key Architectural Decisions**:
- **Read-only**: No wallet connection, no transactions — purely reads on-chain state
- **Client-side fetching**: Data fetched in React client components for live updates
- **No backend**: All data comes directly from public Starknet RPC — no server, no database
- **Polling over WebSocket**: Simpler for a demo; polls every 15-30 seconds for new data

---

## Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | Next.js 15 (App Router) | Industry standard, great DX, Vercel-native deployment |
| Styling | Tailwind CSS v4 | Utility-first, fast iteration, no CSS files to manage |
| Blockchain | starknet.js | Official Starknet JS SDK — handles RPC, felt encoding, ABI parsing |
| Language | TypeScript | Type safety for contract data, good IDE support |
| Deployment | Vercel | Zero-config for Next.js, free tier sufficient |

---

## Project Structure

```
live-demo/
├── app/
│   ├── layout.tsx              # Root layout with fonts, metadata
│   ├── page.tsx                # Main dashboard page
│   └── globals.css             # Tailwind imports + custom properties
├── components/
│   ├── TotalSupplyCard.tsx     # USDC total supply display
│   ├── TransferFeed.tsx        # Recent transfers list
│   ├── WhaleAlert.tsx          # Large transfer highlights
│   └── StatsBar.tsx            # Secondary metrics bar
├── lib/
│   ├── starknet.ts             # RpcProvider setup + configuration
│   ├── usdc.ts                 # USDC contract read functions
│   └── types.ts                # Shared TypeScript types
├── hooks/
│   ├── useTotalSupply.ts       # Hook for total supply polling
│   └── useTransfers.ts         # Hook for transfer events polling
├── docs/
│   ├── SPEC.md
│   ├── STYLES.md
│   └── ROADMAP.md
├── public/
│   └── (static assets)
├── Makefile
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## Core Modules

### 1. RPC Provider (`lib/starknet.ts`)

Configures a starknet.js `RpcProvider` pointed at Starknet mainnet. Uses the default public node or an environment-configurable RPC URL.

```typescript
// Key exports:
export const provider: RpcProvider
```

### 2. USDC Contract Interface (`lib/usdc.ts`)

Functions to read USDC contract state via starknet.js. Handles felt-to-number conversion and decimal formatting (USDC has 6 decimals).

```typescript
// Key exports:
export async function getTotalSupply(): Promise<string>
export async function getRecentTransfers(limit?: number): Promise<Transfer[]>
```

**Contract details**:
- **Address**: `0x033068F6539f8e6e6b131e6B2B814e6c34A5224bC66947c47DaB9dFeE93b35fb` (Native USDC by Circle)
- **Standard**: SNIP-2 (Starknet ERC-20)
- **Decimals**: 6
- **Key selectors**: `totalSupply`, `Transfer` event

### 3. Dashboard Page (`app/page.tsx`)

Main page composing all dashboard widgets. Server component wrapper with client component children for live data.

### 4. Total Supply Card (`components/TotalSupplyCard.tsx`)

Displays the current USDC total supply on Starknet, formatted with commas and dollar sign. Polls for updates.

### 5. Transfer Feed (`components/TransferFeed.tsx`)

Scrollable list of recent USDC transfers showing truncated from/to addresses, amount, and relative timestamp. New transfers animate in.

### 6. Whale Alert (`components/WhaleAlert.tsx`)

Filters and highlights transfers exceeding a threshold (default: $10,000 USDC). Distinct visual treatment — colored border, alert icon.

### 7. Stats Bar (`components/StatsBar.tsx`)

Secondary metrics: number of transfers in last hour, largest transfer, number of unique addresses.

---

## Data Models

### Transfer

```typescript
interface Transfer {
  from: string          // Starknet address (hex)
  to: string            // Starknet address (hex)
  amount: bigint        // Raw amount (6 decimals)
  formattedAmount: string  // Human-readable (e.g., "$1,234.56")
  transactionHash: string
  blockNumber: number
  timestamp?: number    // Unix timestamp if available
  isWhale: boolean      // amount >= whale threshold
}
```

### DashboardStats

```typescript
interface DashboardStats {
  totalSupply: string           // Formatted total supply
  recentTransferCount: number   // Transfers in observation window
  largestTransfer: string       // Largest recent transfer amount
  uniqueAddresses: number       // Unique addresses in recent transfers
}
```

---

## External Integrations

### Starknet Mainnet RPC

- **Protocol**: JSON-RPC (Starknet RPC spec v0.7/v0.8)
- **Provider**: starknet.js default public node (configurable via `NEXT_PUBLIC_RPC_URL` env var)
- **Methods used**:
  - `starknet_call` — read `totalSupply()` from USDC contract
  - `starknet_getEvents` — fetch `Transfer` events with pagination
  - `starknet_blockNumber` — get latest block for event queries
- **Rate limits**: Public nodes have soft limits; sufficient for a demo dashboard
- **No API key required** for default public nodes

### USDC Contract

- **Native USDC (Circle)**: `0x033068F6539f8e6e6b131e6B2B814e6c34A5224bC66947c47DaB9dFeE93b35fb`
- **Standard**: SNIP-2 (ERC-20 equivalent on Starknet)
- **ABI functions used**: `total_supply`, `name`, `symbol`, `decimals`
- **Events used**: `Transfer(from, to, value)`

---

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| USDC variant | Native USDC (not bridged USDC.e) | Canonical form, issued by Circle directly on Starknet |
| Data fetching | Client-side with starknet.js | Live updates, no server needed, simpler architecture |
| Refresh strategy | Polling (15-30s interval) | Simpler than WebSocket for demo; adequate refresh rate |
| Project structure | Flat (single Next.js app) | 45-min demo — monorepo structure adds unnecessary complexity |
| RPC provider | starknet.js default public node | No API key setup needed; can upgrade to Alchemy/etc. via env var |
| Styling approach | Tailwind utility classes | Fast iteration, no separate CSS files, great for live coding |
| State management | React hooks + useState | No Redux/Zustand needed for 3-4 pieces of read-only state |
