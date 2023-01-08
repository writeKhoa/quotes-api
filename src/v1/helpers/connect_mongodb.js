require("dotenv").config("");
const mongoose = require("mongoose");

let mongodbUrl = process.env.MONGO_URI || "mongodb://localhost:27017/quotes";

const connectMongodb = async () => {
  try {
    await mongoose.connect(mongodbUrl);
    console.log("---CONNECT MONGODB SUCCESSED!---");
  } catch (error) {
    console.log(error.message);
  }
};

connectMongodb();
