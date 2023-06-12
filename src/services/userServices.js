const userModel = require("../models/userModel");
const getUser = async (id, next) => {
  const result = await userModel.findById(id);
  if (result) return result;
  if (!result) {
    next({
      code: "404",
      message: "User not found",
      status: "error",
    });
  }
};

const deleteOneUser = async (id, next) => {
  const result = await userModel.findByIdAndDelete(id);
  console.log(result);
  if (result) return result;
  if (!result) {
    next({
      code: "404",
      message: "User not found",
      status: "error",
    });
  }
};

module.exports = {
  getUser,
  deleteOneUser,
};
