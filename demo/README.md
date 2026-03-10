# Demo Project: Starknet USDC Dashboard

## Project Choice

**What**: A real-time dashboard tracking USDC stablecoin activity on Starknet — total supply, recent transfers, and large transaction alerts ("whale watch").

**Why this project**:
- **PM-relevant**: Dashboards are a core PM artifact. Tracking on-chain metrics is directly relevant to StarkWare PMs
- **Universally understood**: Everyone knows what USDC is — no domain expertise needed to follow along
- **Visually impressive**: Clean cards, live data, transfer feed creates an immediate "wow" moment
- **Right complexity**: Simple enough to build in 45min-1hr demo, complex enough to feel real
- **Real data**: Pulls live Starknet mainnet data — not mock data, not a toy

**Stack**: Next.js (App Router) + Tailwind CSS + Starknet JSON-RPC

**External Integration**: Starknet public RPC node (JSON-RPC calls to read USDC contract state and events)

**Deploy Target**: Vercel

**Example Repo Template**: https://github.com/b-j-roberts/vibecoding-workshop/tree/main/templates/nextjs-app

---

## Contract Details

| Field | Value |
|-------|-------|
| Token | USDC (Circle) |
| Network | Starknet Mainnet |
| Contract | `0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8` |
| Standard | ERC-20 (Cairo) |
| RPC Endpoint | Public Starknet RPC (e.g., `https://starknet-mainnet.public.blastapi.io`) |

---

## Dashboard Features (MVP)

1. **Total Supply Card** — Current USDC total supply on Starknet via `starknet_call` to `totalSupply()`
2. **Recent Transfers Feed** — Last N Transfer events via `starknet_getEvents`, showing from/to/amount
3. **Whale Alert Highlight** — Flag transfers above a threshold (e.g., >$10k) with visual emphasis
4. **Auto-refresh** — Poll for new data every 30s (or manual refresh button)

---

## Demo Flow — 4-Loop Method Mapping

### Loop 1: Specify

**What the instructor does**: Shows how to scope a project from a vague idea to a concrete spec.

**Narrative**: "I want a dashboard that shows USDC activity on Starknet. Let me use Claude Code to help me turn this idea into a real project spec."

**Demo actions**:
- Open terminal, show the empty directory
- Install workshop skills: `npx skills add https://github.com/b-j-roberts/vibecoding-workshop --skill project-init && npx skills add https://github.com/b-j-roberts/vibecoding-workshop --skill do-task && npx skills add https://github.com/b-j-roberts/vibecoding-workshop --skill scope-task && npx skills add https://github.com/b-j-roberts/vibecoding-workshop --skill checkpoint`
- Run `/project-init` in Claude Code — describe the project idea and let the skill guide you through discovery questions
- Show back-and-forth with AI agent to define spec from questions
- Walk through the generated spec — what it chose, what it scoped out

**Key takeaway**: Start with a clear, narrow spec. The `project-init` skill structures this process for you. YOU decide what's in and what's out.

---

### Loop 2: Generate

**What the instructor does**: Shows how to go from spec to working code, one piece at a time.

**Narrative**: "Now I have a spec and a roadmap. Let me ask Claude Code to build this piece by piece, starting with the scaffold."

**Demo actions** (each is a checkpoint/commit):
1. **Project Setup**: Use roadmap Phase 0 items → `/checkpoint` to review + commit
2. **MVP**: Use roadmap Phase 1 items → `/checkpoint` to review + commit
3. **Nice to have**: Use roadmap Phase 2 items → `/checkpoint` to review + commit

**Key takeaway**: One feature at a time, with a repeated prompt. Run & test after each step. Don't try to generate the whole app in one shot. Use `/checkpoint` after each step to review your changes and commit cleanly.

---

### Loop 3: Run

**What the instructor does**: Runs the app after each generation step, shows the result, points out what works and what might need fixing.

**Narrative**: "Every time Claude generates code, I run it immediately. I don't wait until the end to see if it works."

**Demo actions**:
- After each checkpoint: `npm run dev`, open browser, follow test steps, show the result
- Point out: "Look — it's already pulling real data from Starknet. This isn't a mock."
- Show the progressive build: empty layout → data loading → full dashboard

**Key takeaway**: Run early, run often. If something breaks, you catch it immediately when the context is fresh. Can always restart from last working state.

---

### Loop 4: Debug

**What the instructor does**: Encounters (or introduces) an error and shows how to debug with Claude Code.

**Narrative**: "Something broke. This is normal — it happens. Here's how you handle it."

**Planned debug scenario** (introduce artificially if no natural error occurs):
- **Error**: RPC call returns unexpected data format (e.g., hex-encoded uint256 not parsing correctly)
- **What the instructor shows**: Copy the error message, paste it to Claude Code with context ("I'm getting this error: [error].")
- **Resolution**: Claude suggests parsing the hex response correctly
- **Alternative error**: CORS issue when calling RPC from browser (fix: move to API route)

**Key takeaway**: Don't panic. Copy the error, give Claude the context, let it fix it. Most errors are one prompt away from solved. Use the same context that made the code changes.

---

## Pre-Run Strategy

The demo uses **pre-built checkpoints** so the instructor doesn't wait for live generation:

| Checkpoint | Git Tag | What's Visible |
|------------|---------|----------------|
| 0 - Empty | `demo/empty` | Empty directory, where we install skills and run `/project-init` |
| 1 - Start | `demo/start` | Spec, roadmap, style guide — output from `/project-init` skill |
| 2 - Scaffold | `demo/scaffold` | Next.js app with layout and core components, result of roadmap Phase 0 |
| 3 - MVP | `demo/mvp` | Result after all Phase 1 items |
| 4 - Bug | `demo/bug` | Introduced bug for debugging demo |
| 5 - Nice-to-have | `demo/nice-to-have` | Results after all Phase 2 items |
| 6 - Deploy | `demo/deployed` | Live on Vercel |

**Live demo flow**: Show prompt → Explain what it does/run it → `git checkout demo/[tag]` → Show result → Repeat

---

## Artificial Debug Error

To ensure the "Debug" loop has a clear example, the instructor will:

1. At checkpoint 4, checkout a version with a **known bug** (e.g., `demo/bug`)
2. The bug: incorrect hex parsing of the `totalSupply` response, showing a wrong number or crashing
3. Show the error in the browser/terminal
4. Demo the fix prompt: paste error + context to Claude Code
5. Show the fix, then checkout the working version

This guarantees the debug loop is visible even if everything else goes perfectly.

---
