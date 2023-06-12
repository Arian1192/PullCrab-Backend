const passport = require('passport')
const SlackStrategy = require("passport-slack-oauth2").Strategy
const GithubStrategy = require("passport-github2").Strategy

require("dotenv").config();


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user)
});


passport.use(new SlackStrategy({
  clientID: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  skipUserProfile: false,
  scope: ['identity.basic', 'identity.email', 'identity.avatar',  'identity.team']

},(accesToken, refreshToken, profile, done)=> {
  return done(null, profile)
}))

passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  skipUserProfile: false,
  scope: ['user:email']
  },
  function(accessToken, refreshToken, profile, done) {
  return done(null, profile)
  }
));

