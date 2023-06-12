const islandModel = require("../models/islandModel");
const {
  getAllItemsService,
  newItemService,
  getItemById,
  updateItemById,
  deleteItemById,
} = require("../services/crudService");

const createIsland = async (req, res, next) => {
  try {
    const { workSpaceName, repositories, squad } = req.body;
    const islandCreated = await newItemService({
      model: islandModel,
      data: { workSpaceName, repositories, squad },
    })();
    res.status(201).json(islandCreated);
  } catch (err) {
    next({
      code: "500",
      message: err.message,
      status: "error",
    });
  }
};

const getAllIsland = async (req, res, next) => {
  try {
    const allIslands = await getAllItemsService({
      model: islandModel,
      populationFields: ["squad"],
      entity: "island",
    })();
    if (!allIslands) res.status(404).json({ message: "No islands found" });
    res.status(200).json(allIslands);
  } catch (err) {
    next({
      code: "500",
      message: err.message,
      status: "error",
    });
  }
};

const getIslandById = async (req, res, next) => {
  try {
    const islandFounded = await getItemById({
      model: islandModel,
      populationFields: ["squad"],
      entity: "island",
      id: req.params.id,
    })();
    res.status(200).json(islandFounded);
  } catch (err) {
    next({
      code: "500",
      message: err.message,
      status: "error",
    });
  }
};

const updateIsland = async (req, res, next) => {
  try {
    const islandUpdated = await updateItemById({
      model: islandModel,
      id: req.params.id,
      data: req.body,
    })();
    res.status(200).json(islandUpdated);
  } catch (err) {
    next({
      code: "500",
      message: err.message,
      status: "error",
    });
  }
};

const deleteIsland = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const islandDeleted = await deleteItemById({
      id: req.params.id,
      model: islandModel,
    })();
    res.status(200).json(islandDeleted);
  } catch (err) {
    next({
      code: "500",
      message: err.message,
      status: "error",
    });
  }
};

module.exports = {
  createIsland,
  getAllIsland,
  getIslandById,
  updateIsland,
  deleteIsland,
};
