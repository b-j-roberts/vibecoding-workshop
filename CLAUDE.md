# CLAUDE.md — PM Vibe Coding Workshop

## Project Context

This repo contains all materials for a StarkWare internal PM Vibe Coding Workshop led by Brandon Roberts. The workshop teaches Product Managers to ship small MVPs using AI-assisted development (vibecoding).

- **What**: 3-session hands-on workshop (3h each), March 23-25 2026, 15:00-18:00 Israel time
- **Who**: StarkWare PMs with varying technical backgrounds
- **Goal**: Each PM ships a working MVP and gains a repeatable vibecoding workflow
- **Primary AI tool**: Claude Code (CLI)

## Workshop Structure

- **Day 1**: Brandon does a 45min-1hr live demo of vibecoding a project end-to-end (with pre-run outputs to skip wait times), then participants scope their MVP and get a skeleton running
- **Day 2**: Participants implement core value, learn debugging patterns, do midpoint demo pairs
- **Day 3**: Reliability polish, deployment, final demos, reflection

## Repo Layout

- `docs/TODO.md` — Brandon's preparation task list (ordered, with requirements)
- `demo/` — Brandon's live demo project (the project he vibeodes during Day 1 kickoff)
- `templates/` — 3 starter templates participants choose from (Next.js app, Python automation, Slack bot)
- `prompts/` — Standard prompts and prompting best practices guide
- `troubleshooting/` — Common errors + fixes playbook

## Key Constraints

- Participants are PMs, not engineers — keep everything accessible
- Templates must be minimal and runnable with a single command after setup
- All content targets Claude Code as the primary AI tool
- Workshop is remote-first — materials must be self-explanatory
- Starter templates must fit the "buildable in 1-2 days" constraint:
  - Single primary user or small internal audience
  - No complex auth
  - Minimal data model (files, Google Sheets, Airtable, or tiny DB)
  - 1-2 external APIs max

## When Working on This Repo

- Check `docs/TODO.md` for current preparation status
- Templates should include a clear README with setup instructions
- Prompts should follow the "4-loop method": Specify (tiny) → Generate (AI) → Run (immediately) → Debug (logs + minimal change)
- The demo project needs pre-run outputs at each step (git commits/branches) so Brandon can skip ahead during the live presentation
- 3 technical PM tutors will assist with non-AI troubleshooting — there will be a tutor prep doc

## Participants Prerequisites (for reference)

- Laptop with admin rights, stable internet
- Claude account, GitHub account, Vercel account
- VS Code + Git + Node.js LTS or Python 3.11+
- 1-2 candidate project ideas (problem, user, trigger, output, MVP success criteria)
