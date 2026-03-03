# PM Vibe Coding Workshop

A 3-session hands-on workshop where StarkWare PMs ship a real, working MVP (app, dashboard, or automation) using AI-assisted development — and leave with a repeatable playbook to build the next one in days, not weeks.

## Workshop Details

- **Instructor**: Brandon Roberts (Exploration Engineer, StarkWare)
- **Organizer**: Natan Granit
- **Dates**: March 23-25, 2026 (3 consecutive days)
- **Time**: 15:00-18:00 Israel time (3 hours per session)
- **Format**: Remote-first (short syncs + long focused build blocks + high-availability troubleshooting)
- **Channel**: `#pm-vibecoding-workshop` (Slack)

## Workshop Goals

Post-workshop, PMs should be able to:

1. Envision and deliver internal tools, products, and automation for personal/group use
2. Build a POC product for internal checks or to convey product vision to engineering/management
3. Be effective in discussions with engineering around AI-driven features and AI usage

## Structure

### Day 1 — From Idea to Working Skeleton (3h)
- **Brandon's Live Demo** (45min-1hr): Full vibecoding flow demonstration using Claude Code, showing prompts and pre-run outputs to avoid wait times
- MVP Scoping Clinic
- Tool/Stack Choice + Repo Setup
- Build Block #1: Skeleton to First End-to-End Run

### Day 2 — Implement the Core Value (3h)
- Quick Reset + Scope Recommit
- Build Block #2: Implement the Core Value
- Debugging That Actually Converges
- Midpoint Demo Pairs

### Day 3 — Reliability, Shipping, and Demo (3h)
- Build Block #3: Reliability + Minimum UX
- Ship It: Deploy or Schedule
- Demo Time (each participant: 3-5 min)
- Reflection + What's Next

## Starter Templates

Participants choose one of three paths:

1. **Web App** — Next.js + simple UI
2. **Python Automation** — CLI + config + logging
3. **Slack Bot / Webhook Automation** — Simple events

## Primary Tools

- **AI Assistant**: Claude Code (CLI) — primary recommendation
- **IDE**: VS Code / Cursor
- **Deployment**: Vercel (web), Railway/Render (services), GitHub Actions (automation)

## Support Structure

- Brandon (instructor + AI troubleshooting)
- 3 technical PM tutors (repo, Git, API, non-AI troubleshooting)
- `#pm-vibecoding-workshop` Slack channel
- Office-hours queue (time-boxed help slots)

## Repo Structure

```
.
├── README.md              # This file
├── CLAUDE.md              # AI assistant instructions for this project
├── docs/
│   └── TODO.md            # Preparation task list
├── demo/                  # Brandon's live demo project (TBD)
├── templates/             # Starter templates for participants
│   ├── nextjs-app/        # Web app template
│   ├── python-automation/ # Python CLI automation template
│   └── slack-bot/         # Slack webhook bot template
├── prompts/               # Standard prompts & prompting guide
└── troubleshooting/       # Troubleshooting playbook
```
