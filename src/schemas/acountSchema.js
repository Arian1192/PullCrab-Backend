const { Schema } = require("mongoose");

const accountSchema = new Schema({
  slackUserName: {
    type: String,
    required: true,
  },
  gitHubUserName: {
    type: String,
    required: true,
  },
  githubRepos: {
    type: Array,
  },
});

module.exports = accountSchema;
