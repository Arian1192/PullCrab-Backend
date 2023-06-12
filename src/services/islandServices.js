const islandModel = require("../models/islandModel");
const { path } = require("../schemas/islandSchema");

const getIsland = async (id, next) => {
  const result = await islandModel.findById(id).populate("squad");

  if (result) return result;
  if (!result) {
    next({
      code: "404",
      message: "Island not found",
      status: "error",
    });
  }
};

module.exports = {
  getIsland,
};
