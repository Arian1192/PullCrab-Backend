const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { underline } = require("colors");
dotenv.config();
const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD } = process.env;
const connectDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@cluster0.qpv40qq.mongodb.net/`
    ),
      console.log(" 📗 Database connected successfully ".underline.bgMagenta);
  } catch (error) {
    console.log(error.message.red.bold);
  }
};

module.exports = { connectDatabase };
