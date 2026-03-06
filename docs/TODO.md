# Workshop Preparation TODO

Preparation tasks for the PM Vibe Coding Workshop (March 23-25, 2026).

---

## Table of Contents

- [Phase 1: Planning & Coordination](#phase-1-planning--coordination)
- [Phase 2: Demo Preparation](#phase-2-demo-preparation)
- [Phase 3: Starter Templates](#phase-3-starter-templates)
- [Phase 4: Workshop Materials](#phase-4-workshop-materials)
- [Phase 5: Logistics & Dry Run](#phase-5-logistics--dry-run)

---

## Phase 1: Planning & Coordination

Tasks to align with stakeholders and get organizational pieces in place.

### 1.1 Sync with Natan

**Description**: Schedule and complete a sync with Natan to review the full workshop plan, identify gaps, and align on expectations. Natan is OOO until March 9.

**Requirements**:
- [ ] Schedule sync for week of March 9 (Natan back from OOO)
- [ ] Review the full Google Doc together
- [ ] Identify gaps in the plan
- [ ] Confirm final participant list
- [ ] Align on success metrics and how they'll be measured

**Notes**:
- Natan asked Brandon to review the doc and add detailed notes before the sync
- Consider bringing additional tutor candidates into the sync

---

### 1.2 Review & Annotate Workshop Doc

**Description**: Thoroughly review Natan's Google Doc and leave detailed notes, suggestions, and corrections.

**Requirements**:
- [ ] Read through entire doc in detail
- [ ] Add notes on anything that needs clarification
- [ ] Suggest adjustments to the schedule based on the demo taking 45min-1hr at the start of Day 1
- [ ] Flag any unrealistic time estimates
- [ ] Note where Claude Code-specific guidance should replace generic AI references

**Notes**:
- Natan specifically asked for detailed notes since participants have different backgrounds and remote can create a mess
- The doc currently references ChatGPT and Cursor alongside Claude — standardize recommendation around Claude Code

---

### 1.3 Coordinate Technical PM Tutors

**Description**: Recruit and prepare 3 technical PMs to assist with non-AI troubleshooting (repo, Git, APIs, environment issues) during the workshop.

**Requirements**:
- [ ] Confirm 3 tutors from the volunteers (Boaz, Ohad, Oded, Balouka, Maya reacted in Slack)
- [ ] Schedule a prep call with tutors before the workshop
- [ ] Create a tutor brief doc covering: their role, common issues to expect, escalation path
- [ ] Share troubleshooting playbook with tutors in advance
- [ ] Decide on tutor assignment strategy (per-participant, round-robin, or queue-based)

**Notes**:
- Maya is in NY March 22-28 so she cannot be a tutor for this set of dates
- Tutors handle non-AI issues only — Brandon handles AI/prompting questions
- Consider a shared Slack thread or queue for help requests during build blocks

---

### 1.4 Confirm Participant Project Choices

**Description**: Before the workshop, confirm what each participant plans to build so you can prepare the right templates and identify any special needs (e.g., Slack bot setup requires extra lead time).

**Requirements**:
- [ ] Collect each participant's chosen project idea and preferred template (Next.js, Python, Slack bot)
- [ ] Identify if anyone plans to build a Slack bot — if so, test the Slack bot template end-to-end before the workshop (see 3.3)
- [ ] Flag any projects that seem too ambitious or too vague and follow up individually
- [ ] Share the finalized list with tutors so they can prepare

**Notes**:
- This should happen after participant prerequisites are confirmed but before the workshop starts
- If no one wants to build a Slack bot, you can deprioritize testing that template

---

### 1.5 Confirm Participant Prerequisites

**Description**: Ensure all participants complete the mandatory checklist before Day 1 to avoid wasting workshop time on setup.

**Requirements**:
- [ ] Post prerequisites checklist to `#pm-vibecoding-workshop` with clear deadlines
- [ ] Include Claude Code installation instructions (not just Claude web — participants need the CLI)
- [ ] Include instructions for installing workshop skills (`project-init` and `checkpoint`) — participants run `npx skills add` from their project directory on Day 1
- [ ] Set a deadline for prerequisite completion (at least 2 days before Day 1)
- [ ] Plan a "setup office hours" slot for anyone who gets stuck on prerequisites
- [ ] Verify participants have submitted their 1-2 candidate MVP ideas

**Notes**:
- The Google Doc lists prerequisites but they need to be adapted for Claude Code as the primary tool
- Consider a simple form or thread where participants confirm they've completed setup
- Node.js LTS and Python 3.11+ are both valid runtimes — participants pick one
- Workshop skills are installed per-project, not globally — instruct participants to install them after cloning their template on Day 1

---

## Phase 2: Demo Preparation

The Day 1 kickoff demo where Brandon vibeodes a project end-to-end in 45min-1hr.

### 2.1 Choose Demo Project

**Description**: Pick a project to vibecode live during the Day 1 kickoff. It should be impressive enough to inspire, simple enough to follow, and representative of what participants will build.

**Requirements**:
- [x] Project must be completable end-to-end in the demo timeframe
- [x] Should showcase the "4-loop method" (Specify → Generate → Run → Debug)
- [x] Should demonstrate at least one external integration (API, webhook, etc.)
- [x] Must be deployable (Vercel or similar) by end of demo
- [x] Should be relevant to PM work (dashboard, automation, internal tool)

**Chosen Project**: Starknet USDC Dashboard — see `demo/README.md` for full details.

**Notes**:
- **Project**: Real-time dashboard tracking USDC stablecoin activity on Starknet (total supply, transfers, whale alerts)
- **Stack**: Next.js + Tailwind + Starknet JSON-RPC (public node, no API key needed)
- **Deploy**: Vercel
- **External Integration**: Starknet public RPC — `starknet_call` for total supply, `starknet_getEvents` for transfers
- The demo sets the tone — it should show that vibecoding is fast, structured, and produces real results
- For Specify: Use the `project-init` skill (`/project-init` in Claude Code) to generate spec + roadmap from idea — demo installing the skill and running it live
- For Generate: Build piece by piece — scaffold → data layer → UI → events → polish
- For Generate (saving progress): Use the `checkpoint` skill (`/checkpoint` in Claude Code) after each generation step to review + commit changes
- For Run: Run `npm run dev` after each generation step, show live Starknet data in browser
- For Debug: Introduce artificial bug (hex parsing error or CORS issue), demo fixing with Claude Code
- Pre-run strategy: git tags at each checkpoint (`demo/start`, `demo/scaffold`, `demo/data`, etc.) for smooth transitions


---

### 2.2 Build the Demo Project

**Description**: Actually build the demo project using Claude Code, saving each step as a git commit/branch so you can jump between checkpoints during the live presentation.

**Requirements**:
- [ ] Build the project from scratch using Claude Code
- [ ] Use `/project-init` to generate the initial spec + roadmap (this becomes the `demo/start` checkpoint)
- [ ] Use `/checkpoint` after each generation step to review + commit (this creates natural git tags)
- [ ] Create git commits at each meaningful checkpoint (after each prompt/generation cycle)
- [ ] Document the exact prompts used at each step
- [ ] Tag or branch each checkpoint for easy navigation during the demo
- [ ] Verify the final result deploys cleanly

**Notes**:
- The pre-run approach means you show the prompt, explain what it does, then `git checkout` to the result
- This avoids dead air while waiting for Claude Code to generate
- Practice the flow to ensure transitions are smooth
- Show participants the `/checkpoint` workflow during the demo so they adopt it for their own builds

---

### 2.3 Write Demo Script

**Description**: Create a script/outline for the demo presentation that covers the narrative, each checkpoint, and talking points.

**Requirements**:
- [x] Write intro section: what is vibecoding, why it matters for PMs
- [x] Outline each checkpoint with: the prompt shown, what it does, key takeaway
- [x] Include "what to use AI for vs. not" guidance
- [x] Include the "when to ask for help" framework
- [x] Include common pitfalls and how to avoid them
- [x] Time each section to fit within 45min-1hr total

**Notes**:
- The demo replaces the "Kickoff: Vibe Coding with Discipline (25 min)" section from the original doc
- Should cover: workshop outcome, constraints, 4-loop method, what "good" looks like, the full build flow
- End with the deployed result to land the "you can do this too" message

---

## Phase 3: Starter Templates

Three minimal, runnable templates participants choose from on Day 1.

### 3.1 Next.js Web App Template

**Description**: A minimal Next.js starter template for participants building web apps (dashboards, internal tools, simple UIs).

**Requirements**:
- [x] Next.js with App Router
- [x] Simple, clean UI (Tailwind CSS or similar)
- [x] One example page/component showing the pattern
- [x] README with: what it is, how to run, how to deploy to Vercel
- [x] `npm run dev` works out of the box
- [x] Includes a CLAUDE.md with project-specific context for Claude Code

**Notes**:
- Keep dependencies minimal — participants shouldn't need to understand a complex setup
- Include a `.env.example` if any env vars are needed
- The template is a starting point, not a finished app — just enough structure to build on
- **Location**: `templates/nextjs-app/`

---

### 3.2 Python Automation Template

**Description**: A minimal Python CLI automation template for participants building scripts, data pipelines, or scheduled automations.

**Requirements**:
- [ ] Python 3.11+ with a simple CLI entry point
- [ ] Config file support (YAML or .env)
- [ ] Basic logging setup
- [ ] One example automation (e.g., fetch data from an API + format output)
- [ ] README with: what it is, how to run, how to schedule (cron / GitHub Actions)
- [ ] `python main.py` works out of the box
- [ ] Includes a CLAUDE.md with project-specific context for Claude Code

**Notes**:
- Use minimal dependencies (requests, python-dotenv at most)
- Include a simple GitHub Actions workflow file for scheduling
- Avoid complex virtual env setups — keep it as simple as possible

---

### 3.3 Slack Bot / Webhook Template

**Description**: A minimal Slack bot or webhook automation template for participants building integrations and notification systems.

**Requirements**:
- [ ] Simple webhook receiver or Slack bot setup
- [ ] One example handler (e.g., receive event → process → respond)
- [ ] README with: what it is, how to set up Slack app, how to run, how to deploy
- [ ] Works locally with a test command
- [ ] Includes a CLAUDE.md with project-specific context for Claude Code

**Notes**:
- Consider using a simple Express or FastAPI server as the webhook receiver
- Include instructions for creating a Slack app and getting tokens
- This is the most "integration-heavy" template — keep the code simple, focus on clear setup docs

---

### 3.4 Test Slack Bot Template End-to-End (Conditional)

**Description**: If any participant confirms they want to build a Slack bot (see 1.4), test the Slack bot template end-to-end to ensure it works smoothly. Skip this if no one picks the Slack template.

**Requirements**:
- [ ] Create a test Slack app in a sandbox workspace
- [ ] Run through the full template setup following only the README instructions
- [ ] Verify the example handler works (receive event → process → respond)
- [ ] Note any setup friction or confusing steps and fix the README
- [ ] Confirm deployment path works (e.g., can receive webhooks from a public URL)

**Notes**:
- Only do this if confirmed via task 1.4 — Slack setup is the most involved template and not worth testing if no one needs it
- If someone does want a Slack bot, testing this early gives time to fix issues

---

## Phase 4: Workshop Materials

Supporting documents, prompts, and guides for the workshop.

### 4.1 Standard Prompts Guide

**Description**: A guide with standard prompts participants can use with Claude Code to stay productive and avoid prompt thrash.

**Requirements**:
- [ ] Prompts for each phase: scoping, scaffolding, implementing, debugging, deploying
- [ ] "Do this, not that" examples showing good vs. bad prompting
- [ ] Claude Code-specific tips (how to use CLAUDE.md, how to structure requests, etc.)
- [ ] Prompts for the 4-loop method at each step
- [ ] Quick reference card format (easy to scan during build blocks)

**Notes**:
- The Google Doc has a "Standard Prompts" section but it's empty (just `"."`)
- This is one of the highest-value deliverables — good prompts prevent the #1 failure mode (thrashing)
- Include prompts for common stuck points: "my app won't start", "the API returns an error", "I need to change my approach"

---

### 4.2 Troubleshooting Playbook

**Description**: A guide covering common errors and fixes that participants and tutors can reference during build blocks.

**Requirements**:
- [ ] Common environment issues (Node/Python version, missing deps, port conflicts)
- [ ] Common Git issues (merge conflicts, push rejected, wrong branch)
- [ ] Common deployment issues (Vercel build fails, env vars missing, CORS errors)
- [ ] Common API integration issues (auth failures, rate limits, wrong endpoints)
- [ ] Each issue has: symptom, cause, fix (copy-pasteable commands where possible)
- [ ] Organized by category for quick scanning

**Notes**:
- Share with tutors before the workshop so they can familiarize themselves
- Keep it practical — real error messages, real fixes
- Include a "when to escalate to Brandon" section

---

### 4.3 MVP Scoping Template

**Description**: A one-page template participants fill out during the Day 1 Scoping Clinic to define their MVP. This is the input they provide to `/project-init`.

**Requirements**:
- [x] What (project description, features, differentiators)
- [x] Why (goals, audience, purpose)
- [x] Stack (or "unsure" if they don't know)
- [x] External integrations
- [x] Deploy target
- [x] Example repo template (links to the 3 starter templates)
- [x] Completed example included (Starknet USDC Dashboard)
- [x] Template format (markdown file)

**Done**: `templates/PROJECT_SCOPING_TEMPLATE.md` — referenced in the demo script (Section 3 + Transition to Scoping Clinic) and in each starter template's CLAUDE.md.

**Notes**:
- This is used during the "MVP Scoping Clinic (35 min)" on Day 1
- Participants fill this out, then paste it into `/project-init` as input
- Brandon should review and push back on scope during this session

---

### 4.4 Tutor Brief

**Description**: A brief document for the 3 technical PM tutors explaining their role, what to expect, and how to help effectively.

**Requirements**:
- [ ] Role definition: non-AI troubleshooting (repo, Git, APIs, environment, deployment)
- [ ] Common issues they'll encounter (reference the troubleshooting playbook)
- [ ] Escalation path: when to handle themselves vs. escalate to Brandon
- [ ] Communication protocol during the workshop (Slack thread, queue, etc.)
- [ ] Schedule overview so they know when build blocks happen

**Notes**:
- Send to tutors at least a few days before the workshop
- Include the troubleshooting playbook as a companion doc
- Keep it short — tutors are PMs too, they don't need a manual

---

## Phase 5: Logistics & Dry Run

Final preparations and rehearsal before March 23.

### 5.1 Set Up Workshop Repo/Org

**Description**: Create the GitHub organization or repo structure where participants will create their projects.

**Requirements**:
- [ ] Decide on repo strategy: one org with per-participant repos, or participants use personal repos
- [ ] Set up any shared repos (templates, workshop materials)
- [ ] Ensure all participants have GitHub access
- [ ] Test that templates can be forked/cloned easily

**Notes**:
- Simpler is better — personal repos with template cloning is probably easiest
- Make sure templates are public or participants have access

---

### 5.2 Dry Run the Demo

**Description**: Do a full rehearsal of the Day 1 demo presentation, timing each section and practicing transitions between checkpoints.

**Requirements**:
- [ ] Run through the full demo end-to-end
- [ ] Time each section
- [ ] Practice checkpoint transitions (switching between pre-run git states)
- [ ] Test screen sharing setup (terminal font size, visibility)
- [ ] Identify and fix any rough spots

**Notes**:
- Consider doing the dry run with one of the tutors as an audience
- Make sure terminal text is readable on screen share (large font, good contrast)
- Have a backup plan if something breaks during the live portions

---

### 5.3 Pre-Workshop Communication

**Description**: Send final communications to participants with everything they need to show up ready on Day 1.

**Requirements**:
- [ ] Send "1 week before" reminder with prerequisites checklist and deadline
- [ ] Send "day before" reminder with: Zoom/Meet link, schedule, what to have ready
- [ ] Pin key resources in `#pm-vibecoding-workshop`
- [ ] Confirm all tutors are available for the confirmed dates
- [ ] Share the prompts guide and troubleshooting playbook in the channel

**Notes**:
- The more setup participants do before Day 1, the more building time they get
- Consider a short video or screenshot walkthrough for Claude Code setup (it's less familiar than ChatGPT for most PMs)
