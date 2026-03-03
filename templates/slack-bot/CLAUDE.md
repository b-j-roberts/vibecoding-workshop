# CLAUDE.md — Slack Bot Template

## Project Overview

Minimal Slack bot using the Bolt SDK with Socket Mode. Handles slash commands, message events, and App Home. Designed as a starting point for building Slack integrations, notification bots, and webhook automations.

## Tech Stack

- **Runtime**: Node.js 20+
- **Framework**: @slack/bolt (official Slack SDK)
- **Connection**: Socket Mode (no public URL needed for development)
- **Config**: dotenv for environment variables

## Project Structure

```
slack-bot/
├── app.js           # Entry point — Bolt app setup + all handlers
├── test.js          # Config check + connection test script
├── package.json     # Dependencies and scripts
├── .env.example     # Slack token template (copy to .env)
├── .gitignore       # Ignores node_modules, .env
├── Makefile         # setup/run/test/clean targets
└── CLAUDE.md        # This file
```

## How It Works

1. App starts → connects to Slack via Socket Mode (WebSocket)
2. Slack sends events (slash commands, messages, app home opens) through the socket
3. Handlers in `app.js` receive events and respond
4. Responses are sent back through the Bolt SDK

### Event Flow

```
User action in Slack
  → Slack sends event via Socket Mode
    → Bolt SDK routes to matching handler
      → Handler processes + responds
        → Response appears in Slack
```

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start bot with auto-reload (--watch)
npm start            # Start bot (production)
npm test             # Check config + test Slack connection
```

## Conventions

- **Single-file entry point**: Keep all handlers in `app.js` initially. Split into separate files only when it gets unwieldy.
- **Handler pattern**: Each handler is a self-contained block with a comment header explaining what it does.
- **Socket Mode for dev**: Uses Socket Mode so no ngrok or public URL is needed during development.
- **Environment variables**: All secrets go in `.env` (never committed). Copy `.env.example` to get started.
- **Error handling**: Bolt handles most errors internally. Add try/catch only for external API calls.
- **Block Kit for UI**: Use Slack's Block Kit format for rich messages (sections, buttons, inputs).

## Adding a New Slash Command

```javascript
app.command("/mycommand", async ({ command, ack, respond }) => {
  await ack(); // Always acknowledge within 3 seconds
  // command.text contains everything after /mycommand
  await respond({
    text: `You said: ${command.text}`,
  });
});
```

Remember to register the command in your Slack app settings (Slash Commands page).

## Adding a New Event Listener

```javascript
app.event("reaction_added", async ({ event, client }) => {
  // event contains the reaction details
  console.log(`${event.user} reacted with :${event.reaction}:`);
});
```

Remember to subscribe to the event in your Slack app settings (Event Subscriptions page).

## Adding Interactive Components (Buttons, Menus)

```javascript
// Send a message with a button
await say({
  blocks: [
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: { type: "plain_text", text: "Click me" },
          action_id: "my_button",
        },
      ],
    },
  ],
});

// Handle the button click
app.action("my_button", async ({ ack, respond }) => {
  await ack();
  await respond("Button clicked!");
});
```

## Environment Variables

| Variable | Where to find it |
|----------|-----------------|
| `SLACK_BOT_TOKEN` | OAuth & Permissions → Bot User OAuth Token (xoxb-...) |
| `SLACK_APP_TOKEN` | Basic Information → App-Level Tokens (xapp-...) |
| `SLACK_SIGNING_SECRET` | Basic Information → App Credentials |

## Deployment

For production, switch from Socket Mode to HTTP mode:

1. Set `socketMode: false` in app.js
2. Remove the `appToken` config
3. Deploy to a server with a public URL (Render, Railway, etc.)
4. Set the Request URL in your Slack app settings to `https://your-domain.com/slack/events`
