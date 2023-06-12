const { model } = require("mongoose");
const accountSchema = require("../schemas/acountSchema");
const accountUser = model("accountUser", accountSchema);
module.exports = accountUser;
