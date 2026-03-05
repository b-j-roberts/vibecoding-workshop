# Day 1 Live Demo Script

**Presenter**: Brandon Roberts
**Duration**: 50 minutes (target)
**Format**: Screen share — terminal + browser side-by-side
**Project**: Starknet USDC Dashboard (live-demo/)

---

## Pre-Demo Checklist

- [ ] Terminal font size: 18pt+ (readable on screen share)
- [ ] Browser zoom: 125%+
- [ ] Two windows ready: terminal (left), browser at `localhost:3000` (right)
- [ ] Git repo at `demo/empty` tag: `git checkout demo/empty`
- [ ] `node_modules` pre-installed in live-demo/ (so `npm run dev` is instant after checkout)
- [ ] Vercel deployment ready to show at the end
- [ ] Slack `#pm-vibecoding-workshop` open for questions

---

## Section 1: What Is Vibecoding? (8 min)

### Opening (2 min)

> "By the end of this workshop — in three days — each of you will have shipped a working tool. Not a mockup, not a slide deck. A real thing that runs, that you built, that solves a problem you care about."
>
> "Today I'm going to show you exactly how that works, start to finish, in about 45 minutes."

### What Vibecoding Is (3 min)

> "Vibecoding is using AI to write code while you focus on *what* to build, not *how* to build it. You describe the outcome. The AI writes the implementation. You run it, check it, steer it."
>
> "The key insight: **PMs are actually well-positioned for this.** You already think in terms of requirements, user flows, and acceptance criteria. That's exactly what the AI needs from you."

**Slide/talking points:**
- You are the product owner. The AI is a fast, tireless junior developer.
- You don't need to understand every line of code. You need to understand what the code *should do*.
- The AI handles syntax, frameworks, boilerplate. You handle scope, priorities, and quality judgment.

### Why It Matters for PMs (3 min)

> "Three things this unlocks for you:"

1. **Build POCs that communicate product vision** — stop waiting for eng bandwidth to prototype an idea. Show, don't tell.
2. **Build internal tools for yourself and your team** — dashboards, automations, Slack bots. Things that save you hours per week.
3. **Speak engineering's language** — when you've built something, you understand the tradeoffs. You become a better PM.

> "This isn't about replacing engineers. It's about expanding what *you* can do."

---

## Section 2: The 4-Loop Method (5 min)

> "There's a method to this. Vibecoding without structure is just... vibes. And vibes don't ship."

### The Four Loops

| Loop | What You Do | Analogy |
|------|-------------|---------|
| **Specify** | Scope the problem tightly | Writing a 1-pager |
| **Generate** | Ask AI to build one piece | Delegating to a teammate |
| **Run** | Execute immediately, check the result | QA testing |
| **Debug** | If broken, give AI the error + context | Filing a bug with repro steps |

> "You repeat these four steps over and over. Small loops. Each loop adds one thing. That's it."

### The Golden Rule

> "**One feature per loop.** Never ask the AI to build the whole app at once. Ask for one thing, run it, verify it, checkpoint it, then ask for the next thing. This is the single most important discipline."

### What to Use AI For vs. Not

**Use AI for:**
- Scaffolding projects (boilerplate, config, folder structure)
- Writing UI components and styling
- Connecting to APIs and parsing data
- Generating repetitive code
- Debugging errors (paste the error, get the fix)
- Deployment configuration

**Don't use AI for (yet):**
- Deciding *what* to build — that's your job as PM
- Judging if the result is correct — you verify, not the AI
- Security-critical code without review
- Understanding your users' needs

> "You are the brain. AI is the hands."

---

## Section 3: Live Build — Specify (7 min)

> "Alright, let's build something. I'm going to build a Starknet USDC Dashboard from scratch — a real-time view of USDC activity on Starknet mainnet."

### Show the empty directory

**Terminal action**: Show the current state.

```
git checkout demo/empty
ls -la
```

> "Empty directory. Nothing here. This is where every project starts."

### Install Workshop Skills

> "Before I start, I need to install two skills that make the workflow smoother. Skills are like plugins for Claude Code — they teach it specific workflows."

**Terminal action**: Install the skills.

```bash
npx skills add https://github.com/b-j-roberts/vibecoding-workshop --skill project-init
npx skills add https://github.com/b-j-roberts/vibecoding-workshop --skill checkpoint
```

> "`project-init` will guide me through scoping my project into a spec and roadmap. `checkpoint` will review my code and commit after each step. You'll install these same skills when you start building."

### The Specify Prompt

> "First loop: Specify. I need to turn my vague idea into a concrete spec. Instead of writing a big prompt, I use the `project-init` skill — it asks me the right questions."

**Show this command** (type it in Claude Code):

```
/project-init
```

> "Now it's going to ask me questions about my project. I describe my idea, it digs into the details, does some research, and produces a full spec and roadmap."

**Describe the idea when prompted:**

```
I want to build a real-time dashboard that tracks USDC stablecoin activity
on Starknet mainnet. It should show total supply, recent transfers, and
flag large transactions as "whale alerts."

Stack: Next.js with Tailwind CSS, using starknet.js for RPC calls.
Deploy target: Vercel.
```

> "Notice what I'm doing: I'm giving it the *what* and the *constraints*. Not the *how*. The skill handles the scoping process — it asks clarifying questions, does research, then generates structured docs."

### Show the result

**Terminal action**: Jump to the generated spec.

```
git checkout demo/start
```

> "Claude generated three documents: a spec, a roadmap, and a style guide."

**Open and walk through briefly:**
- `docs/SPEC.md` — "Here's the spec. It defined the components, the data flow, which contract we're reading from. It made decisions — polling every 30 seconds, dark theme, specific card layout."
- `docs/ROADMAP.md` — "And here's the roadmap — broken into phases. Phase 1 is MVP, Phase 2 is nice-to-have. This is my build plan."

> "The `project-init` skill produced all of this. When you scope your own MVP later, you'll use the same skill. It asks the right questions so you don't miss anything."

### Key Takeaway

> "I didn't write a single line of code. I described what I wanted, and the skill guided me to a structured plan. **This is the most important step.** A clear spec prevents you from wandering. If you skip this, you'll spend twice as long going in circles."

---

## Section 4: Live Build — Generate + Run (18 min)

> "Now I build. Loop by loop. Generate one piece, run it, verify, move on."

### Checkpoint 1: Scaffold (5 min)

**The prompt** (show to audience):

```
Follow the roadmap Phase 0. Initialize the Next.js app, set up Tailwind,
create the layout shell, add component stubs for: TotalSupplyCard,
TransferFeed, WhaleAlert, StatsBar. Include a Makefile for common commands.
```

> "I'm pointing it at the roadmap it already wrote. One phase at a time."

**Terminal action**: Jump to scaffold.

```
git checkout demo/scaffold
npm run dev
```

**Browser action**: Show the app at `localhost:3000`.

> "Look — it's running. There's a layout, placeholder components, the dark theme is applied. No data yet, but the structure is there. This is the skeleton."

**Checkpoint action**: Save progress.

```
/checkpoint "scaffold"
```

> "See that? I just ran `/checkpoint`. It reviewed my changes, did a quick code review, and committed everything cleanly. This is how you save your progress — after every feature, checkpoint it."

**Key takeaway:**
> "I asked for the scaffold, I got the scaffold. I ran it immediately. It works. I checkpointed it. Now I move on. **Don't polish at this stage.** Get the structure right first."

### Checkpoint 2: MVP — Live Data (8 min)

**The prompt** (show to audience):

```
Now implement Phase 1 from the roadmap. Connect to Starknet mainnet RPC,
read USDC total supply from the contract, fetch recent Transfer events,
add whale alert detection for transfers over $3,000, and wire up the
StatsBar with transfer count, largest transfer, and unique addresses.
```

> "This is the big one — the core value. Everything the dashboard actually *does*."

**Terminal action**: Jump to MVP.

```
git checkout demo/mvp
npm run dev
```

**Browser action**: Show the full dashboard with live data.

> "Look at this. Real data. That total supply number? That's the actual USDC supply on Starknet right now. Those transfers? Real transfers happening on-chain. The whale alerts? Those are real large movements."
>
> "This is not a mock. We're reading directly from Starknet mainnet. And it took... a few prompts."

**Walk through what's on screen:**
- Total supply card with formatted number
- Transfer feed with addresses and amounts
- Whale alerts highlighted in yellow/orange
- Stats bar with metrics

**Checkpoint action**: Save progress.

```
/checkpoint "mvp with live data"
```

**Key takeaway:**
> "Two prompts got us from empty directory to a working dashboard with live blockchain data. That's the power of staying focused: clear spec, one phase at a time, run after each step, checkpoint to save."

### Checkpoint 3: Polish (5 min)

**The prompt** (show to audience):

```
Implement Phase 2 from the roadmap: add auto-refresh with a live indicator,
error handling with a banner and retry, responsive design for mobile,
and polish the scrollbar styling.
```

**Terminal action**: Jump to polished version.

```
git checkout demo/nice-to-have
npm run dev
```

**Browser action**: Show the polished dashboard.

> "Now we have auto-refresh — see the green dot and the 'updated X seconds ago' text. Error handling if the RPC goes down. Mobile-responsive layout. Custom scrollbars. This is shipping quality."

**Key takeaway:**
> "Notice the pattern: I didn't ask for all of this upfront. I got the MVP working first, *then* layered on polish. **MVP first, then iterate.** This is how you avoid the trap of spending two hours on styling before the app even works."

---

## Section 5: Live Build — Debug (7 min)

> "Now the part everyone dreads — something breaks. Let me show you why you don't need to dread it."

### Introduce the Bug

**Terminal action**: Checkout the buggy version.

```
git checkout demo/bug
npm run dev
```

**Browser action**: Show the broken dashboard — total supply shows a wrong number or crashes.

> "See that? The total supply is wrong — it's showing some garbage number. This is a real bug. The Starknet RPC returns the total supply as a hex-encoded Uint256, and our code isn't parsing it correctly."

### The Debug Prompt

> "Here's what I do. I don't panic. I don't try to read the code and figure it out. I copy the error and tell Claude:"

**Show this prompt:**

```
The total supply is showing an incorrect value. The Starknet RPC returns
totalSupply as a Uint256 with low and high felts in hex. I think the hex
parsing is wrong. Here's what I see in the browser: [describe the symptom].
Can you check the parsing logic in lib/usdc.ts and fix it?
```

> "Three things in this prompt: **what's wrong**, **what I think the cause might be**, and **where to look**. You don't need to know the fix. You need to describe the problem clearly."

### Show the Fix

> "Claude identifies the issue — the hex values need to be combined as `high * 2^128 + low` and the code was doing it wrong. One-line fix."

**Terminal action**: Checkout the fixed MVP.

```
git checkout demo/mvp
npm run dev
```

**Browser action**: Show the correct total supply.

> "Fixed. The whole debug cycle took about 30 seconds. Copy the error, give context, get the fix, verify."

### Key Takeaway

> "**Most errors are one prompt away from solved.** The key is: stay in the same Claude Code session so it has all the context from building the code. Don't start a new conversation — the context is gold."

---

## Section 6: When to Ask for Help (3 min)

> "You *will* get stuck. That's normal. Here's the framework."

### The 3-Strike Rule

1. **Strike 1**: Describe the error to Claude Code with full context. This fixes ~80% of issues.
2. **Strike 2**: If Claude's fix doesn't work, give it the new error message. Say "That didn't work, here's what happened instead: [new error]." This fixes ~15% more.
3. **Strike 3**: If you're still stuck after two rounds, **stop and ask for help.** Post in `#pm-vibecoding-workshop` or flag a tutor. Don't spend 30 minutes going in circles.

### Who Helps With What

| Problem | Who to Ask |
|---------|-----------|
| AI gives wrong code / prompt not working | Brandon |
| Git issues, repo problems | Tutor |
| App won't start, missing dependencies | Tutor |
| API errors, deployment issues | Tutor |
| "I don't know what to build next" | Brandon |
| Everything else | Post in Slack, someone will jump in |

> "The tutors — Boaz, Ohad, and Oded — are here for the non-AI stuff. Git, environment, APIs. I'm here for the AI and prompting questions. Use us. That's what we're here for."

---

## Section 7: Common Pitfalls (3 min)

> "Before you start building, let me save you from the five mistakes I see most often."

### The Five Pitfalls

1. **The Everything Prompt** — Asking AI to build the entire app in one shot. It will produce something, but it'll be a mess you can't debug. **Fix: One feature per prompt.**

2. **The Endless Loop** — Going back and forth with AI on the same error for 20 minutes. You're adding confusion, not clarity. **Fix: 3-strike rule. Then ask a human.**

3. **Scope Creep** — "Oh, I should also add user auth, and a database, and notifications..." No. Ship the MVP first. **Fix: Write down your non-goals. If it's not in the spec, it doesn't exist yet.**

4. **Not Running** — Writing three features before running the app once. Now you have three potential sources of bugs and no idea which one broke. **Fix: Run after every generation. Every. Single. Time.**

5. **Ignoring the Spec** — You wrote a spec for a reason. When you're tempted to add something, check the spec first. **Fix: Keep your spec open in a tab. It's your compass.**

---

## Section 8: The Deployed Result (2 min)

**Browser action**: Open the Vercel deployment URL.

> "This is the same app, deployed. Live on the internet. Real Starknet data. Anyone with the URL can see it."
>
> "We went from an empty directory to a deployed, live dashboard in about 45 minutes. And the method was simple: specify what you want, generate one piece at a time, run it immediately, debug when it breaks."
>
> "You can do this. That's why you're here."

---

## Transition to Scoping Clinic (2 min)

> "Now it's your turn. First, let's get your tools set up. Clone your starter template, then install the two skills we used in the demo:"

```bash
npx skills add https://github.com/b-j-roberts/vibecoding-workshop --skill project-init
npx skills add https://github.com/b-j-roberts/vibecoding-workshop --skill checkpoint
```

> "`project-init` will guide you through scoping your MVP — same process I just showed you. `checkpoint` will save your progress after each feature. Install them now, then we'll start scoping."
>
> "For the next 35 minutes, you're going to scope *your* MVP. You each came with 1-2 project ideas. We're going to narrow those down to something you can build in the next two days. Run `/project-init` and let it guide you."
>
> "The rules for your MVP:"
>
> 1. **One primary user** (probably you or your team)
> 2. **No auth** — skip login, skip accounts
> 3. **Minimal data** — a file, a spreadsheet, one API. Not a database.
> 4. **One external API max** — keep integrations simple
> 5. **Fits on one screen** — if you need navigation, you've scoped too big
>
> "I'll be walking around — well, walking around Zoom — to push back on scope. If I tell you to cut something, trust me. You can always add it on Day 3."

---

## Timing Summary

| Section | Topic | Duration |
|---------|-------|----------|
| 1 | What Is Vibecoding? | 8 min |
| 2 | The 4-Loop Method | 5 min |
| 3 | Specify (empty → spec) | 7 min |
| 4 | Generate + Run (scaffold → MVP → polish) | 18 min |
| 5 | Debug (bug → fix) | 7 min |
| 6 | When to Ask for Help | 3 min |
| 7 | Common Pitfalls | 3 min |
| 8 | Deployed Result + Transition | 4 min |
| | **Total** | **~55 min** |

**Buffer**: 5 minutes of flex time built in. Sections 6 and 7 can be shortened if running long. Section 4 can be compressed by combining scaffold + MVP into one transition.

---

## Quick Reference: Git Checkpoints

Run these during the demo to jump between states:

```bash
git checkout demo/empty         # Section 3: Empty starting point
git checkout demo/start         # Section 3: Spec + roadmap generated
git checkout demo/scaffold      # Section 4: Layout + component stubs
git checkout demo/mvp           # Section 4: Full MVP with live data
git checkout demo/nice-to-have  # Section 4: Polish + auto-refresh
git checkout demo/bug           # Section 5: Intentional bug for debug demo
git checkout demo/mvp           # Section 5: Return to working version after debug
```

**Important**: Run `npm run dev` after each checkout to show the running app. Have `node_modules/` pre-installed so startup is instant.

---

## Backup Plans

**If RPC is down during demo**: The UI has error handling built in — show the error banner and explain "this is what error handling looks like." Then use the Vercel deployment as fallback.

**If running long**: Cut Section 7 (pitfalls) to a single sentence: "I'll share a list of common pitfalls in Slack." Compress Section 6 to: "3 tries with AI, then ask a human."

**If a participant asks a deep technical question**: "Great question — let's cover that during the build block. Right now I want to keep the flow going."
