const pkg = require("@slack/bolt");
const { App } = pkg;
const dotenv = require("dotenv");
dotenv.config();

const SlackApp = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

module.exports = {
  SlackApp,
};
