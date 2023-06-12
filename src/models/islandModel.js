const { model } = require("mongoose");
const islandSchema = require("../schemas/islandSchema");
const islandModel = model("island", islandSchema);
module.exports = islandModel;
