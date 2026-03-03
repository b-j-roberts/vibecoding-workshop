require("dotenv").config();
const { App } = require("@slack/bolt");

// Initialize Slack app with Socket Mode (no public URL needed for development)
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

// ---------------------------------------------------------------------------
// Example 1: Slash Command — /hello
// Users type /hello in Slack and get a response
// ---------------------------------------------------------------------------
app.command("/hello", async ({ command, ack, respond }) => {
  await ack();
  await respond({
    text: `Hey <@${command.user_id}>! Your bot is working.`,
  });
});

// ---------------------------------------------------------------------------
// Example 2: Message Listener — responds when someone says "hello" in a channel
// The bot must be invited to the channel to see messages
// ---------------------------------------------------------------------------
app.message(/hello/i, async ({ message, say }) => {
  await say({
    text: `Hey <@${message.user}>! I heard you say hello.`,
  });
});

// ---------------------------------------------------------------------------
// Example 3: App Home — shows a welcome message when users open the bot's Home tab
// ---------------------------------------------------------------------------
app.event("app_home_opened", async ({ event, client }) => {
  await client.views.publish({
    user_id: event.user,
    view: {
      type: "home",
      blocks: [
        {
          type: "header",
          text: { type: "plain_text", text: "Welcome to Your Bot" },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "This is your bot's *Home tab*. Edit `app.js` to customize what appears here.",
          },
        },
        { type: "divider" },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*Try these:*\n• Type `/hello` in any channel\n• Say \"hello\" in a channel the bot is in",
          },
        },
      ],
    },
  });
});

// ---------------------------------------------------------------------------
// Start the app
// ---------------------------------------------------------------------------
(async () => {
  const port = process.env.PORT || 3000;
  await app.start(port);
  console.log(`Bot is running on port ${port}`);
  console.log("Connected via Socket Mode — no public URL needed");
})();
