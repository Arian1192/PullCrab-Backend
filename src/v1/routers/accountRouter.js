const express = require("express");
const {
  getRepoContributors,
  getUsersFromSpaceSlack,
} = require("../../controllers/accountController");
const accountRouter = express.Router();

accountRouter.get("/getRepoContributors", getRepoContributors);
accountRouter.get("/getUsersFromSpaceSlack", getUsersFromSpaceSlack);

module.exports = accountRouter;
