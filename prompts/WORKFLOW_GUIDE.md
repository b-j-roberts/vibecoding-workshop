# Vibecoding Workflow Guide

Your workflow for building an MVP with Claude Code.

---

## The Core Loop

```
/project-init  →  /do-task X.Y  →  Test  →  Debug  →  /checkpoint  →  repeat
```

1. **`/project-init`** — Scope and plan your project. Creates `docs/SPEC.md`, `docs/STYLES.md`, and `docs/ROADMAP.md`.
2. **`/do-task X.Y`** — Implement a specific roadmap task (e.g., `/do-task 1.1`).
3. **Test** — Follow the test plan that `/do-task` provides. Actually try each step.
4. **Debug** (if needed) — Describe what's wrong in plain language. Claude fixes it.
5. **`/checkpoint`** — Light code review + commit your changes.
6. **Repeat** — Move to the next task (`/do-task 1.2`, `/do-task 1.3`, ...).

Work through tasks in order: 1.1, 1.2, 1.3, then 2.1, 2.2, etc.

---

## Step-by-Step Walkthrough

### 1. Scope Your Project (`/project-init`)

Fill out the **Project Scoping Template** ([templates/PROJECT_SCOPING_TEMPLATE.md](https://github.com/b-j-roberts/vibecoding-workshop/blob/main/templates/PROJECT_SCOPING_TEMPLATE.md)) first, then paste it as input when `/project-init` asks.

This creates three files in `docs/`:
- **SPEC.md** — What you're building, tech stack, architecture
- **STYLES.md** — Visual design system (colors, fonts, components)
- **ROADMAP.md** — Ordered list of implementation tasks (1.1, 1.2, 2.1, ...)

Review the roadmap before you start building. If anything looks off, tell Claude to adjust it.

### 2. Implement a Task (`/do-task X.Y`)

After project-init creates your roadmap, run `/do-task 1.1` to implement the first task. Claude will:

- Read your roadmap, spec, and styles
- Look at existing code to understand what's been built
- Ask clarifying questions if requirements are ambiguous (this is expected, not an error)
- Implement the task
- Give you a test plan

**Example:**
```
/do-task 1.1
```

### 3. Test

Follow the test plan `/do-task` gives you. Actually try each step:

- Run the command it tells you to run
- Navigate to the URL it specifies
- Click the buttons, fill in the forms
- Check that the output matches what it describes

**This is where you catch problems.** Don't skip this step.

### 4. Debug (If Needed)

If something doesn't work or look right, describe the problem to Claude in plain language:

| Good (specific) | Bad (vague) |
|---|---|
| "The button is cut off on mobile" | "The UI is broken" |
| "I get a 404 when I click Submit" | "It doesn't work" |
| "The chart shows no data even though I added 3 entries" | "The chart is wrong" |
| "The page loads but the sidebar overlaps the main content" | "Fix the layout" |

Claude will investigate and fix the issue. Re-test after each fix.

You can go back and forth as many times as needed — this is normal. Debugging is part of building.

### 5. Commit (`/checkpoint`)

Once everything checks out, do the following:
1. Run `/clear` to clear Claude's context window. This will make claude forget everything you were working on, but will give it a fresh perspective. ( if needed, you can always `/resume` to get your context window back so claude will remember your work ).
2. Run `/checkpoint`. This does a light code review of the work you and claude did and commits your changes with a meaningful message if everything looks good.
3. Run `/clear` again before starting the next task in (6)

### 6. Next Task

Move to the next task: `/do-task 1.2`, then `/do-task 1.3`, etc.

If you realize something is missing from your roadmap, use `/scope-task` to research and add it:

```
/scope-task 2.5 Add search filtering
```

This scopes the new task (researches best practices, asks you clarifying questions) and inserts it into your roadmap. Then implement it with `/do-task 2.5`.

---

## Prompting Tips

### When Using `/do-task`

`/do-task` reads your roadmap automatically — you don't need to re-explain the task. Just give it the ID:

```
/do-task 2.1
```

If it asks you a question, answer it. The questions mean it found something ambiguous in your requirements — your answer helps it build the right thing.

### When Debugging

Be specific about what you see vs. what you expected:

```
When I click "Save", nothing happens. I expected it to show a success message
and redirect to the dashboard.
```

Include error messages if you see them:

```
I see this error in the terminal:
Error: Cannot find module './utils/format'
```

### When You Want to Change Something

If the implementation is correct but you want it different, say what you want changed:

```
The task list works but I want the completed items to have a strikethrough
and be moved to the bottom of the list.
```

### When You're Stuck

If you're not sure what to do next, try:

```
What tasks have I completed so far and what's next on the roadmap?
```

If you're still unsure, please reach out in the slack channel. I will be happy to help.

---

## Do This, Not That

| Do This | Not That |
|---|---|
| Work through tasks in order (1.1, 1.2, 1.3...) | Jump to random tasks out of order |
| Follow the test plan after each `/do-task` | Skip testing and move straight to `/checkpoint` |
| Describe problems specifically | Say "it's broken" without details |
| Let `/do-task` ask its clarifying questions | Try to pre-empt by writing huge prompts |
| Run `/checkpoint` after each working task | Wait until you've done 5 tasks to commit |
| Fix one thing at a time when debugging | Ask for 10 changes in one message |

---

## Quick Reference

| What you want to do | Command / action |
|---|---|
| Plan your project | `/project-init` |
| Implement a task | `/do-task 1.1` (replace with task ID) |
| Test your implementation | Follow the test plan from `/do-task` |
| Fix a bug or visual issue | Describe the problem to Claude |
| Save your progress | `/checkpoint` |
| See available tasks | Ask Claude: "What tasks are in my roadmap?" |
| Add a missing task to the roadmap | `/scope-task 2.5 Add search filtering` (replace with ID + title) |
| Change the plan | Ask Claude to update `docs/ROADMAP.md` |
