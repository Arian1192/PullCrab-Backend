const express = require("express");
const { eventGitHubController } = require("../../controllers/eventController");
const eventRouter = express.Router();
eventRouter.post("/github", eventGitHubController);

module.exports = eventRouter;