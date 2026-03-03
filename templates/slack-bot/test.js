/**
 * Local test script — verifies your bot can connect to Slack.
 * Run: npm test
 *
 * This does NOT require a public URL. It uses Socket Mode to connect.
 */

require("dotenv").config();

const checks = {
  SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN,
  SLACK_APP_TOKEN: process.env.SLACK_APP_TOKEN,
  SLACK_SIGNING_SECRET: process.env.SLACK_SIGNING_SECRET,
};

console.log("\n--- Slack Bot Config Check ---\n");

let allSet = true;
for (const [key, value] of Object.entries(checks)) {
  if (!value || value.startsWith("xoxb-your") || value.startsWith("xapp-your") || value === "your-signing-secret") {
    console.log(`  ✗ ${key} — not set (update .env)`);
    allSet = false;
  } else {
    const masked = value.slice(0, 8) + "..." + value.slice(-4);
    console.log(`  ✓ ${key} — ${masked}`);
  }
}

if (!allSet) {
  console.log("\n⚠ Some tokens are missing. Copy .env.example to .env and fill in your values.");
  console.log("  See README.md for setup instructions.\n");
  process.exit(1);
}

console.log("\n--- Connection Test ---\n");

const { App } = require("@slack/bolt");

(async () => {
  try {
    const app = new App({
      token: process.env.SLACK_BOT_TOKEN,
      signingSecret: process.env.SLACK_SIGNING_SECRET,
      socketMode: true,
      appToken: process.env.SLACK_APP_TOKEN,
    });

    // Test the bot token by calling auth.test
    const auth = await app.client.auth.test({ token: process.env.SLACK_BOT_TOKEN });
    console.log(`  ✓ Connected as: ${auth.bot_id} (@${auth.user})`);
    console.log(`  ✓ Workspace: ${auth.team}`);
    console.log("\n✅ Everything looks good! Run 'npm run dev' to start your bot.\n");
    process.exit(0);
  } catch (error) {
    console.log(`  ✗ Connection failed: ${error.message}`);
    console.log("\n  Check your tokens and try again.\n");
    process.exit(1);
  }
})();
