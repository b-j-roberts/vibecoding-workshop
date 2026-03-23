**What**:

  Answer questions like:
  - What is your project?
  - What features would you like it to support?
  - Are there any other existing projects similar to this one that you know of?
  - What differentiates your project from those other similar projects (if anything)?

  The more details you explain here, the better the AI will understand what you want. It cannot read your mind (for the most part).

**Why this project**:

  Answer questions like:
  - Why do you want this project to exist?
  - Who will it serve, and how/why will those people use it?
  - What goals do you hope this project will help you achieve?

  These details will provide the AI with a high-level understanding of your goals to help scope out features you may not have even considered you needed.

**Stack**:

  List tech stack for the project. If you don't know, simply remove this section and/or explain that you are unsure what is best for this kind of project.

  **example**: Next.js (With App Router & Nextjs API) + Tailwind CSS + Remotion + Starknet JS

**External Integrations**:

  If any, list external APIs, data sources, and such that you will use. If you don't know, simply remove this section and/or explain that you are unsure what is best for this kind of project.

  **example**: Starknet public RPC node and Dune Dashboard

**Deploy Target**:

  Where you will deploy each part of the stack. If you don't know, simply remove this section and/or explain that you are unsure what is best for this kind of project.

  **example**: Vercel

**Example Repo Template**:

  If you are using another repo/codebase as a template/reference for your codebase provide those links here.

  I set up 3 example templates you can choose between if you are working on any of the following:
  - **Next JS App**: https://github.com/b-j-roberts/vibecoding-workshop/tree/main/templates/nextjs-app
  - **Python Automation**: https://github.com/b-j-roberts/vibecoding-workshop/tree/main/templates/python-automation
  - **Slack Bot**: https://github.com/b-j-roberts/vibecoding-workshop/tree/main/templates/slack-bot

---

Completed Project Scope Example:

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
