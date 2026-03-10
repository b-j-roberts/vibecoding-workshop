# Troubleshooting Playbook

Quick fixes for common issues during the workshop. Find your symptom, apply the fix.

---

## Table of Contents

- [Workshop Skills (`/project-init`, `/do-task`, `/scope-task`, `/checkpoint`)](#workshop-skills)
- [Environment & Setup](#environment--setup)
- [Git Issues](#git-issues)
- [Deployment (Vercel)](#deployment-vercel)
- [API & Integration Issues](#api--integration-issues)
- [When to Escalate to the Instructor](#when-to-escalate-to-the-instructor)

---

## Workshop Skills

### `/do-task`: "ROADMAP.md not found"

**Symptom**: `/do-task 1.1` says it can't find `ROADMAP.md`.

**Cause**: You haven't run `/project-init` yet, or you're in the wrong directory.

**Fix**:
1. Make sure you've run `/project-init` first — it creates `docs/ROADMAP.md`
2. Check you're in your project root (not inside a subdirectory):
   ```bash
   ls docs/ROADMAP.md
   ```
3. If the file exists but `/do-task` still can't find it, check if it's at the project root instead of `docs/`:
   ```bash
   ls ROADMAP.md
   ```

### `/do-task`: "Task ID not found"

**Symptom**: `/do-task 2.3` says the task ID doesn't exist.

**Cause**: The task ID you entered doesn't match any heading in your roadmap.

**Fix**:
1. Ask Claude: "What tasks are in my roadmap?"
2. Or open `docs/ROADMAP.md` and look for the `### X.Y` headings
3. Task IDs match the `### X.Y` format exactly (e.g., `1.1`, `2.3`, not `Phase 1 Task 1`)

### `/do-task`: "Future-phase tasks can't be implemented directly"

**Symptom**: You try to `/do-task` on a Future-phase item and Claude says it's not a scoped task.

**Cause**: Future-phase items in the roadmap are high-level directions, not specific implementation tasks. They use a different format (Description/Features/Rationale instead of Description/Requirements/Implementation Notes).

**Fix**: Ask Claude to break the future item down into concrete tasks:
```
Can you break down Future item F.1 into concrete action items
and add them to the roadmap?
```

### `/do-task`: Claude asks a lot of questions before building

**Symptom**: You run `/do-task 1.1` and Claude asks clarifying questions instead of immediately building.

**Cause**: This is expected behavior, not an error. `/do-task` asks questions when your requirements are ambiguous — your answers help it build the right thing.

**Fix**: Just answer the questions. They're usually quick choices like "should this be a modal or a full page?" or "which API endpoint should I use?"

### `/project-init`: Didn't create all three files

**Symptom**: After `/project-init`, you're missing `SPEC.md`, `STYLES.md`, or `ROADMAP.md`.

**Cause**: The process may have been interrupted, or the project type didn't warrant a styles file.

**Fix**: Ask Claude to generate the missing file:
```
I ran /project-init but docs/STYLES.md wasn't created. Can you generate it?
```

### `/checkpoint`: "Nothing to commit"

**Symptom**: `/checkpoint` says there are no changes to commit.

**Cause**: Either you haven't made changes since the last commit, or your changes aren't saved.

**Fix**:
1. Check if you have changes: `git status`
2. If files are modified but not showing, make sure they're saved in your editor

---

## Environment & Setup

### Node.js: "command not found: node"

**Fix**: Install Node.js LTS from [nodejs.org](https://nodejs.org/) or use:
```bash
# macOS
brew install node

# Check version (should be 18+)
node --version
```

### Python: "command not found: python"

**Fix**: On macOS, you may need `python3`:
```bash
python3 --version
pip3 install -r requirements.txt
python3 main.py
```

### "EADDRINUSE: port 3000 already in use"

**Cause**: Another process is using port 3000.

**Fix**:
```bash
# Find what's using port 3000
lsof -i :3000

# Kill it
kill -9 <PID>

# Or use a different port
PORT=3001 npm run dev
```

### "Module not found" or "Cannot find package"

**Fix**:
```bash
# Node.js
rm -rf node_modules && npm install

# Python
pip install -r requirements.txt
```

---

## Git Issues

### "push rejected: failed to push some refs"

**Cause**: The remote has commits you don't have locally.

**Fix**:
```bash
git pull --rebase
git push
```

### "You have unstaged changes"

**Cause**: You have modified files that aren't committed.

**Fix**: Run `/checkpoint` to review and commit them, or:
```bash
git add .
git commit -m "save progress"
```

### "merge conflict"

**Cause**: Two changes touched the same lines.

**Fix**: Ask Claude:
```
I have a merge conflict. Can you help me resolve it?
```

---

## Deployment (Vercel)

### Build fails with "Module not found"

**Cause**: A dependency is missing from `package.json`.

**Fix**:
```bash
# Make sure all imports have matching dependencies
npm install <missing-package>
git add package.json package-lock.json
git commit -m "add missing dependency"
git push
```

### "Environment variable not set"

**Cause**: Your `.env.local` variables aren't in Vercel.

**Fix**: Add them in the Vercel dashboard under **Settings > Environment Variables**. Redeploy after adding them.

### CORS errors in the browser

**Cause**: Your frontend is calling an API that doesn't allow cross-origin requests.

**Fix**: Use Next.js API routes as a proxy — call `/api/your-endpoint` instead of the external API directly. The API route runs server-side and isn't subject to CORS.

---

## API & Integration Issues

### "401 Unauthorized" from an API

**Cause**: Your API key is missing, expired, or wrong.

**Fix**:
1. Check your `.env` or `.env.local` file has the right key
2. Make sure the variable name matches what your code reads
3. Restart your dev server after changing `.env` files

### "429 Too Many Requests"

**Cause**: You've hit the API's rate limit.

**Fix**: Wait a few minutes and try again. For development, add a delay between requests or cache responses.

### Slack bot: "missing_scope" error

**Cause**: Your Slack app doesn't have the required permissions.

**Fix**: Go to your Slack app settings → **OAuth & Permissions** → **Bot Token Scopes**, add the missing scope, then reinstall the app to your workspace.

---

## When to Escalate to the Instructor

Escalate if:
- Claude Code itself is broken or unresponsive
- You've tried the fix above and it didn't work
- You're stuck on a conceptual/architecture question (not a bug)
- You're unsure if your MVP scope is realistic
- You're still stuck after 10-15 minutes debugging/asking Claude for help.

Don't escalate for:
- Git problems (ask a tutor first)
- "Claude gave me wrong code" (describe the problem to Claude and let it fix it)
