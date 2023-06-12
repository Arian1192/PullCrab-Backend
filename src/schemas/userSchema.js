const { Schema } = require("mongoose");

const userSchema = new Schema({
  photo: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  githubNameAccount: {
    type: String,
    default: null,
  },
  slackNameAccount: {
    type: String,
    default: null,
  },
  githubMailAccount: {
    type: String,
    default: null,
  },
  slackMailAccount: {
    type: String,
    default: null,
  },
});

module.exports = userSchema;
