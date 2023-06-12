/**
 * MIRAR CON DETENIMIENTO ESTO Y REHACER TODO EL LOGIN CON PASSPORT
 * https://github.com/ChisomUma/Login-Auth-App-with-Passport.js/blob/main/Backend/passport.js
 * AQUI APARECE COMO HACER EL LOGIN CON PASSPORT Y MONGODB Y COMO HACER EL LOGIN CON GITHUB
 */

const express = require("express");
const bodyParser = require("body-parser");
require("colors");
const cors = require("cors");
const eventRouter = require("./src/v1/routers/eventRouter");
const accountRouter = require("./src/v1/routers/accountRouter");
const islandRouter = require("./src/v1/routers/islandRouter");
const { connectDatabase } = require("./src/mongo/index");
const { SlackApp } = require("./src/utils/initSlackApp");
const { swaggerDocs: V1SwaggerDocs } = require("./src/v1/swagger");
const { errorHandler } = require("./src/middlewares/errorHandler");
const authRouter = require("./src/v1/routers/auth");
const userRouter = require("./src/v1/routers/userRouter");
const passport = require("passport");
const session = require("express-session");
const isLoggedIn = require("./src/middlewares/auth");
require("dotenv").config();
require("./src/middlewares/passport");

const app = express();
app.use(express.json());

app.use(cors());

app.use(
  session({
    secret: "mysecret", // Cambia esto a una cadena secreta más segura en producción
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
// app.use(passport.authenticate("session"));

app.use("/auth", authRouter);


// -- THIS IS THE ROUTE FOR GITHUB EVENTS
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/get", accountRouter);
app.use("/api/v1/island", islandRouter);
app.use("/api/v1/users", isLoggedIn, userRouter);

// --
app.use(errorHandler);

connectDatabase();
// --- HERE WE START THE EXPRESS SERVER AND THE SLACK APP
app.listen(process.env.EXPRESS_PORT || 3006, () => {
  console.log(
    `🚄 Express server is running on port ${process.env.EXPRESS_PORT || 3007}`
      .bgYellow.black
  );
  V1SwaggerDocs(app, process.env.EXPRESS_PORT || 3007);
});
SlackApp.start(process.env.BOLT_PORT || 3007);
