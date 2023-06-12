const { Router } = require("express");
const passport = require("passport");
const authRouter = Router();

// const CLIENT_URL = "http://localhost:5173/profile";
// const CLIENT_URL_SIGNIN = "http://localhost:5173/signin";

authRouter.get("/error", (req, res) => res.send("Error desconocido"));
authRouter.get("/slack", passport.authorize("Slack"));
authRouter.get("/github", passport.authorize("github"));
authRouter.get(
  "/slack/callback",
  passport.authenticate("Slack", { failureRedirect: "/login" }),
  (req, res) => res.redirect("/api/v1/users/profile")
);
authRouter.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/api/v1/users/profile");
  }
);

module.exports = authRouter;
