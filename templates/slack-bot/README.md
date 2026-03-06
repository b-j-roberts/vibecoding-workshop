# Slack Bot Template

A minimal Slack bot that handles slash commands, message events, and App Home. Uses Socket Mode so you can develop locally without a public URL.

## What's Included

- Slash command handler (`/hello`)
- Message event listener (responds to "hello")
- App Home tab with a welcome message
- Local connection test script
- Auto-reload during development

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Create a Slack app and get your tokens (see "Slack App Setup" below)

# 3. Copy the env template and fill in your tokens
cp .env.example .env

# 4. Test your connection
npm test

# 5. Start the bot
npm run dev
```

## Building Your Project

After cloning this template and completing the Slack App Setup below, follow the vibecoding workflow loop:

1. **`/project-init`** — Scope your project (creates spec + roadmap in `docs/`)
2. **`/do-task 1.1`** — Implement the first roadmap task
3. **Test** — Follow the test plan `/do-task` gives you (run `npm run dev`, test commands in Slack)
4. **Debug** — If something doesn't work, describe the issue to Claude (e.g., "the bot responds but the message formatting is wrong" or "I get a 'missing_scope' error")
5. **`/checkpoint`** — Review + commit your changes
6. **Repeat** — `/do-task 1.2`, test, debug, `/checkpoint`, and so on through the roadmap

See `prompts/WORKFLOW_GUIDE.md` for the full guide.

## Slack App Setup

You need to create a Slack app to get the required tokens. This takes about 5 minutes.

### Step 1: Create the App

1. Go to [api.slack.com/apps](https://api.slack.com/apps)
2. Click **Create New App** → **From scratch**
3. Name it anything (e.g., "My Workshop Bot") and pick your workspace
4. Click **Create App**

### Step 2: Enable Socket Mode

1. In the left sidebar, click **Socket Mode**
2. Toggle **Enable Socket Mode** to ON
3. When prompted, name the token (e.g., "socket") and click **Generate**
4. Copy the `xapp-...` token → this is your `SLACK_APP_TOKEN`

### Step 3: Add Bot Permissions

1. In the left sidebar, click **OAuth & Permissions**
2. Scroll to **Scopes** → **Bot Token Scopes** and add:
   - `chat:write` — send messages
   - `commands` — handle slash commands
3. Scroll up and click **Install to Workspace** → **Allow**
4. Copy the `xoxb-...` token → this is your `SLACK_BOT_TOKEN`

### Step 4: Register the Slash Command

1. In the left sidebar, click **Slash Commands**
2. Click **Create New Command**
   - Command: `/hello`
   - Description: "Say hello"
   - Leave the Request URL empty (Socket Mode handles it)
3. Click **Save**

### Step 5: Subscribe to Events

1. In the left sidebar, click **Event Subscriptions**
2. Toggle **Enable Events** to ON
3. Under **Subscribe to bot events**, add:
   - `message.channels` — hear messages in public channels
   - `message.im` — hear direct messages
   - `app_home_opened` — detect when users open the Home tab
4. Click **Save Changes**

### Step 6: Get the Signing Secret

1. In the left sidebar, click **Basic Information**
2. Under **App Credentials**, copy the **Signing Secret** → this is your `SLACK_SIGNING_SECRET`

### Step 7: Invite the Bot

In Slack, go to any channel and type:
```
/invite @YourBotName
```

Now your bot can see messages in that channel.

## Project Structure

```
slack-bot/
├── app.js           # Bot logic — all handlers live here
├── test.js          # Config check + connection test
├── package.json     # Dependencies
├── .env.example     # Token template
├── .gitignore       # Ignores node_modules, .env
├── Makefile         # setup/run/test/clean
├── CLAUDE.md        # Context for Claude Code
└── README.md        # This file
```

## Configuration

All config is in `.env`. Copy the example and fill in your values:

```bash
cp .env.example .env
```

| Variable | What it is | Where to find it |
|----------|-----------|-----------------|
| `SLACK_BOT_TOKEN` | Bot's API token | OAuth & Permissions → Bot User OAuth Token |
| `SLACK_APP_TOKEN` | Socket Mode token | Basic Information → App-Level Tokens |
| `SLACK_SIGNING_SECRET` | Request verification | Basic Information → App Credentials |

## Deployment

For production, you'll switch from Socket Mode to HTTP mode and deploy to a hosting provider.

### Option A: Render

1. Push your code to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Set the **Start Command** to `npm start`
4. Add your environment variables in the Render dashboard
5. In your Slack app settings, set the **Request URL** to `https://your-app.onrender.com/slack/events`
6. In `app.js`, set `socketMode: false` and remove the `appToken` line

### Option B: Railway

1. Push your code to GitHub
2. Create a new project on [railway.app](https://railway.app)
3. Add your environment variables
4. Railway auto-detects Node.js and deploys
5. Update your Slack app's Request URL with the Railway domain

## Common Commands

| Command | What it does |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start bot with auto-reload |
| `npm start` | Start bot (production) |
| `npm test` | Check config + test connection |
| `make setup` | Same as npm install |
| `make run` | Same as npm run dev |
| `make test` | Same as npm test |
| `make clean` | Remove node_modules |
