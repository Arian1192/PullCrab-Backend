const userModel = require("../models/userModel");
const islandModel = require("../models/islandModel");
const { getIsland } = require("../services/islandServices");
const { getUser, deleteOneUser } = require("../services/userServices");

const getAllUsersFromIsland = async (req, res, next) => {
  const { id } = req.params;
  try {
    const island = await islandModel.findById(id).populate("squad");
    if (island) {
      res.status(200).json(island.squad);
    } else {
      next({
        code: "404",
        message: "No users found",
        status: "error",
      });
    }
  } catch (err) {
    next({
      code: "500",
      message: err.message,
      status: "error",
    });
  }
};

const getUserFromIsland = async (req, res, next) => {
  const { id, userId } = req.params;
  try {
    const island = await getIsland(id, next);
    if (island) {
      const user = island.squad.find((user) => user.id === userId);
      if (user) {
        res.status(200).json(user);
      } else {
        next({
          code: "404",
          message: "User not found",
          status: "error",
        });
      }
    } else {
      next({
        code: "404",
        message: "Island not found",
        status: "error",
      });
    }
  } catch (err) {
    next({
      code: "500",
      message: err.message,
      status: "error",
    });
  }
};

// const createNewUser = async (req, res, next) => {
//   const { body } = req;
//   try {
//     const isUserOnDatabase = await userModel.findOne({
//       githubMailAccount: body.githubMailAccount,
//     });
//     console.log("isUserOnDatabase", isUserOnDatabase);
//     if (isUserOnDatabase) {
//       next({
//         code: "409",
//         message: "User already exists",
//         status: "error",
//       });
//     } else {
//       const newUser = new userModel(body);
//       await newUser.save();
//       res.status(201).json(newUser);
//     }
//   } catch (err) {
//     next({
//       code: "500",
//       message: err.message,
//       status: "error",
//     });
//   }
// };
const createUser = async (req, res, next) => {
  const { body } = req;
  try {
    const userCreated = await newUserService({
      model: userModel,
      data: body,
    })();
    res.status(201).json(userCreated);
  } catch (err) {
    next({
      code: "500",
      message: err.message,
      status: "error",
    });
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const user = await getUser(id, next);
    res.status(200).json(user);
  } catch (err) {
    next({
      code: "500",
      message: err.message,
      status: "error",
    });
  }
};

const deleteUser = async (req, res, next) => {
  console.log("entro aqui delete");
  const { id } = req.params;
  try {
    const userDeleted = await deleteOneUser(id, next);
    res.status(200).json("User Deleted");
  } catch (err) {
    next({
      code: "500",
      message: err.message,
      status: "error",
    });
  }
};

module.exports = {
  getAllUsersFromIsland,
  getUserFromIsland,
  createUser,
  updateUser,
  deleteUser,
};
