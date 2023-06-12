const { SlackApp } = require("../utils/initSlackApp");
const { Octokit } = require("@octokit/rest");
const redis = require("redis");
const redisClient = redis.createClient(6379, "localhost");
redisClient.connect();
redisClient.on("connect", function (err) {
  console.log("Connected to Redis");
});

const getUsersFromSpaceSlack = async (req, res) => {
  try {
    let realUsers = [];
    const ttl = 10;
    const cachedData = await redisClient.get("slackUsers");
    if (cachedData) {
      res.status(200).json(JSON.parse(cachedData));
    } else {
      const slackClient = await SlackApp.client;
      const users = await slackClient.users.list();
      users.members.forEach((user) => {
        if (
          user.is_bot === false &&
          user.is_app_user === false &&
          user.id !== "USLACKBOT"
        ) {
          realUsers.push(user);
          redisClient.set("slackUsers", JSON.stringify(realUsers), "EX", ttl);
          res.status(200).json(realUsers);
        } else {
          res.status(400).json({ message: "SlackUsers not found" });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getRepoContributors = async (req, res) => {
  const octokit = new Octokit();
  try {
    const ttl = 10;
    const cachedData = await redisClient.get("githubUsers");
    if (cachedData) {
      res.status(200).json(JSON.parse(cachedData));
    } else {
      const response = await octokit.rest.repos.listContributors({
        owner: "Arian1192",
        repo: "test",
      });
      console.log(response.data);
      const contributors = response.data.map((contributor) => {
        return {
          username: contributor.login,
          contributor: contributor.contributions,
        };
      });
      redisClient.set("githubUsers", JSON.stringify(contributors), "EX", ttl);
      return res.status(200).json(contributors);
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getUsersFromSpaceSlack, getRepoContributors };
