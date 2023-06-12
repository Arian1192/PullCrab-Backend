const { Schema } = require("mongoose");

const islandSchema = new Schema({
  workSpaceName: {
    type: String,
    required: true,
    unique: true,
  },
  repositories: {
    type: Array,
  },
  squad: [{ type: Schema.Types.ObjectId, ref: "user" }],
});

module.exports = islandSchema;
