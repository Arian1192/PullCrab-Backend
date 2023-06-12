const express = require("express");
const {
  getAllIsland,
  getIslandById,
  createIsland,
  updateIsland,
  deleteIsland,
} = require("../../controllers/islandController");
const islandRouter = express.Router();
const asyncHandler = require("express-async-handler");

islandRouter.get("/getAll", asyncHandler(getAllIsland));
islandRouter.get("/getIsland/:id", getIslandById);
islandRouter.post("/create", createIsland);
islandRouter.patch("/update/:id", updateIsland);
islandRouter.delete("/delete/:id", deleteIsland);

/**
 * @openapi
 * /api/v1/island/getAll:
 *  get:
 *   tags:
 *   - Island
 *   responses:
 *    '200':
 *       description: A successful response
 *       content:
 *         application/json:
 *           schema:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                workSpaceName:
 *                  type: string
 *                  example: "BCN_OVERENGINEERING"
 *                repositories:
 *                  type: array
 *                  items:
 *                    type: string
 *                  example: ["http://https://github.com/Arian1192/test"]
 *                squad:
 *                  type: array
 *                  items:
 *                    type: string
 *                  example: ["5f9d7b3b9d3b1b2a3c4d5e6f", "6f5e4d3c2b1d3b9d7f5e6a"]
 *
 *           example:
 *             - workSpaceName: "BCN_OVERENGINEERING"
 *               repositories: ["http://https://github.com/Arian1192/test"]
 *               squad: ["5f9d7b3b9d3b1b2a3c4d5e6f", "6f5e4d3c2b1d3b9d7f5e6a"]
 *             - workSpaceName: "BCNs_OVERENGINEERING"
 *               repositories: ["http://https://github.com/Arian1192/tests"]
 *               squad: ["5f9d7b3b9d3b1b2a3c4d5e6p", "6f5e4d3c2b1d3b9d7f5e6w"]
 *
 *
 */

module.exports = islandRouter;
