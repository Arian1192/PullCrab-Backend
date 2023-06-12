const express = require("express");
const {
  getAllUsersFromIsland,
  createUser,
  getUserFromIsland,
  deleteUser,
} = require("../../controllers/userController");
const passport = require("passport");

const userRouter = express.Router();

userRouter.get("/getAllUsersFromIsland/:id", getAllUsersFromIsland);
userRouter.get("/getUserFromIsland/:userId/island/:id", getUserFromIsland);
userRouter.post("/createNewUser", createUser);
userRouter.delete("/deleteUser/:id", deleteUser);

//TODO: Esta ruta hay que pasarla para un controlador de usuarios aqui no debe estar.
userRouter.get("/profile", (req, res) => {
  console.log("req.user", req.user);
});

module.exports = userRouter;
