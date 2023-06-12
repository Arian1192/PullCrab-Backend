const { model } = require("mongoose");
const userSchema = require("../schemas/userSchema");
const userModel = model("user", userSchema);
module.exports = userModel;
